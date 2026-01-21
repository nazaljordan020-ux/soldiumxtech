"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { collection, query, onSnapshot, doc, updateDoc, serverTimestamp, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, LogOut, Shield, CheckCircle, XCircle, Clock, Copy, Check, ExternalLink, Users, Coins, TrendingUp, Flame, Settings, Save } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PresaleEntry {
  id: string;
  userId: string;
  userEmail: string;
  paymentReference: string;
  solanaWallet: string;
  solAmount: number;
  sodmAmount: number;
  status: "pending" | "verified" | "rejected";
  createdAt: { seconds: number };
  verifiedAt?: { seconds: number };
  rejectionReason?: string;
}

export default function AdminPage() {
  const { user, userData, loading, signOut } = useAuth();
  const router = useRouter();
  const [entries, setEntries] = useState<PresaleEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<PresaleEntry | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "verified" | "rejected">("all");
  
  // Countdown settings state
  const [countdownDate, setCountdownDate] = useState("");
  const [burnAmount, setBurnAmount] = useState("25,000,000 SODM");
  const [burnInterval, setBurnInterval] = useState("15 days");
  const [savingCountdown, setSavingCountdown] = useState(false);
  const [countdownSaved, setCountdownSaved] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !userData?.isAdmin)) {
      router.push("/dashboard");
    }
  }, [user, userData, loading, router]);

  useEffect(() => {
    const q = query(collection(db, "presale_entries"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entriesData: PresaleEntry[] = [];
      snapshot.forEach((doc) => {
        entriesData.push({ id: doc.id, ...doc.data() } as PresaleEntry);
      });
      // Sort client-side to avoid requiring a composite index
      entriesData.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setEntries(entriesData);
    });

    return () => unsubscribe();
  }, []);

  // Fetch countdown settings
  useEffect(() => {
    const fetchCountdownSettings = async () => {
      try {
        const docSnap = await getDoc(doc(db, "settings", "countdown"));
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Convert ISO date to datetime-local format
          if (data.nextBurnDate) {
            const date = new Date(data.nextBurnDate);
            setCountdownDate(date.toISOString().slice(0, 16));
          }
          if (data.burnAmount) setBurnAmount(data.burnAmount);
          if (data.burnInterval) setBurnInterval(data.burnInterval);
        }
      } catch (error) {
        console.log("Could not fetch countdown settings");
      }
    };
    fetchCountdownSettings();
  }, []);

  const saveCountdownSettings = async () => {
    setSavingCountdown(true);
    try {
      const isoDate = new Date(countdownDate).toISOString();
      await setDoc(doc(db, "settings", "countdown"), {
        nextBurnDate: isoDate,
        burnAmount,
        burnInterval,
        updatedAt: serverTimestamp(),
      });
      setCountdownSaved(true);
      setTimeout(() => setCountdownSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save countdown settings:", error);
    } finally {
      setSavingCountdown(false);
    }
  };

  const copyWallet = async (wallet: string) => {
    await navigator.clipboard.writeText(wallet);
    setCopiedWallet(wallet);
    setTimeout(() => setCopiedWallet(null), 2000);
  };

  const handleVerify = async (entry: PresaleEntry) => {
    setIsProcessing(true);
    try {
      await updateDoc(doc(db, "presale_entries", entry.id), {
        status: "verified",
        verifiedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Failed to verify entry:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedEntry) return;
    setIsProcessing(true);
    try {
      await updateDoc(doc(db, "presale_entries", selectedEntry.id), {
        status: "rejected",
        rejectionReason: rejectReason || "Payment could not be verified",
        verifiedAt: serverTimestamp(),
      });
      setSelectedEntry(null);
      setRejectReason("");
    } catch (error) {
      console.error("Failed to reject entry:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-600 text-white"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      case "rejected":
        return <Badge className="bg-red-600 text-white"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-600 text-white"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    }
  };

  const filteredEntries = entries.filter((entry) => {
    if (filter === "all") return true;
    return entry.status === filter;
  });

  const stats = {
    total: entries.length,
    pending: entries.filter((e) => e.status === "pending").length,
    verified: entries.filter((e) => e.status === "verified").length,
    rejected: entries.filter((e) => e.status === "rejected").length,
    totalSol: entries.filter((e) => e.status === "verified").reduce((acc, e) => acc + e.solAmount, 0),
    totalSodm: entries.filter((e) => e.status === "verified").reduce((acc, e) => acc + e.sodmAmount, 0),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050a18] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user || !userData?.isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#050a18]">
      {/* Header */}
      <header className="border-b border-[#1e3a5f] bg-[#0a1628]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/media-20-2833-29.jpeg"
              alt="SOLDIUM Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-bold text-xl text-white">SOLDIUM</span>
            <Badge className="bg-red-600 text-white ml-2">
              <Shield className="w-3 h-3 mr-1" />
              Admin
            </Badge>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="border-[#1e3a5f] text-slate-400 hover:text-white bg-transparent">
                User Dashboard
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-slate-400 hover:text-white">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Manage and verify presale entries</p>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-[#0a1628] border-[#1e3a5f]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Entries</p>
                    <p className="text-3xl font-bold text-white">{stats.total}</p>
                  </div>
                  <Users className="w-10 h-10 text-blue-400 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#0a1628] border-[#1e3a5f]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Pending Review</p>
                    <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
                  </div>
                  <Clock className="w-10 h-10 text-yellow-400 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#0a1628] border-[#1e3a5f]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">SOL Raised</p>
                    <p className="text-3xl font-bold text-green-400">{stats.totalSol.toFixed(2)}</p>
                  </div>
                  <Coins className="w-10 h-10 text-green-400 opacity-50" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#0a1628] border-[#1e3a5f]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">SODM Allocated</p>
                    <p className="text-3xl font-bold text-blue-400">{(stats.totalSodm / 1000000).toFixed(2)}M</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-blue-400 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-blue-600 text-white" : "border-[#1e3a5f] text-slate-400"}
            >
              All ({stats.total})
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("pending")}
              className={filter === "pending" ? "bg-yellow-600 text-white" : "border-[#1e3a5f] text-slate-400"}
            >
              Pending ({stats.pending})
            </Button>
            <Button
              variant={filter === "verified" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("verified")}
              className={filter === "verified" ? "bg-green-600 text-white" : "border-[#1e3a5f] text-slate-400"}
            >
              Verified ({stats.verified})
            </Button>
            <Button
              variant={filter === "rejected" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("rejected")}
              className={filter === "rejected" ? "bg-red-600 text-white" : "border-[#1e3a5f] text-slate-400"}
            >
              Rejected ({stats.rejected})
            </Button>
          </div>

          {/* Countdown Settings */}
          <Card className="bg-[#0a1628] border-[#1e3a5f]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Flame className="w-6 h-6 text-orange-500" />
                <div>
                  <CardTitle className="text-white">Countdown Settings</CardTitle>
                  <CardDescription className="text-slate-400">
                    Edit the SODM burn countdown timer displayed on the homepage
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Next Burn Date & Time</label>
                  <Input
                    type="datetime-local"
                    value={countdownDate}
                    onChange={(e) => setCountdownDate(e.target.value)}
                    className="bg-[#0f2340] border-[#1e3a5f] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Burn Amount</label>
                  <Input
                    type="text"
                    value={burnAmount}
                    onChange={(e) => setBurnAmount(e.target.value)}
                    placeholder="e.g., 25,000,000 SODM"
                    className="bg-[#0f2340] border-[#1e3a5f] text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Burn Interval</label>
                  <Input
                    type="text"
                    value={burnInterval}
                    onChange={(e) => setBurnInterval(e.target.value)}
                    placeholder="e.g., 15 days"
                    className="bg-[#0f2340] border-[#1e3a5f] text-white placeholder:text-slate-500"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <Button
                  onClick={saveCountdownSettings}
                  disabled={savingCountdown || !countdownDate}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {savingCountdown ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Countdown Settings
                </Button>
                {countdownSaved && (
                  <span className="text-green-400 text-sm flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Settings saved successfully!
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Entries Table */}
          <Card className="bg-[#0a1628] border-[#1e3a5f]">
            <CardHeader>
              <CardTitle className="text-white">Presale Entries</CardTitle>
              <CardDescription className="text-slate-400">
                Review and verify payment submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredEntries.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <p>No entries found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#1e3a5f]">
                        <TableHead className="text-slate-400">Date</TableHead>
                        <TableHead className="text-slate-400">User</TableHead>
                        <TableHead className="text-slate-400">Payment Ref</TableHead>
                        <TableHead className="text-slate-400">Wallet</TableHead>
                        <TableHead className="text-slate-400">SOL</TableHead>
                        <TableHead className="text-slate-400">SODM</TableHead>
                        <TableHead className="text-slate-400">Status</TableHead>
                        <TableHead className="text-slate-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntries.map((entry) => (
                        <TableRow key={entry.id} className="border-[#1e3a5f]">
                          <TableCell className="text-slate-300 text-sm">
                            {entry.createdAt?.seconds
                              ? new Date(entry.createdAt.seconds * 1000).toLocaleDateString()
                              : "-"}
                          </TableCell>
                          <TableCell className="text-slate-300 text-sm max-w-32 truncate">
                            {entry.userEmail}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <code className="text-xs text-blue-400 max-w-24 truncate block">
                                {entry.paymentReference}
                              </code>
                              <a
                                href={`https://solscan.io/tx/${entry.paymentReference}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-500 hover:text-blue-400"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <code className="text-xs text-slate-400 max-w-20 truncate block">
                                {entry.solanaWallet}
                              </code>
                              <button
                                onClick={() => copyWallet(entry.solanaWallet)}
                                className="text-slate-500 hover:text-blue-400"
                              >
                                {copiedWallet === entry.solanaWallet ? (
                                  <Check className="w-3 h-3 text-green-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </TableCell>
                          <TableCell className="text-white font-medium">{entry.solAmount}</TableCell>
                          <TableCell className="text-blue-400">{entry.sodmAmount?.toLocaleString()}</TableCell>
                          <TableCell>{getStatusBadge(entry.status)}</TableCell>
                          <TableCell>
                            {entry.status === "pending" && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white h-7 text-xs"
                                  onClick={() => handleVerify(entry)}
                                  disabled={isProcessing}
                                >
                                  Verify
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white h-7 text-xs bg-transparent"
                                  onClick={() => setSelectedEntry(entry)}
                                  disabled={isProcessing}
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Reject Dialog */}
      <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
        <DialogContent className="bg-[#0a1628] border-[#1e3a5f]">
          <DialogHeader>
            <DialogTitle className="text-white">Reject Entry</DialogTitle>
            <DialogDescription className="text-slate-400">
              Provide a reason for rejecting this presale entry.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Reason for rejection (optional)"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="bg-[#0f2340] border-[#1e3a5f] text-white placeholder:text-slate-500"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedEntry(null)}
              className="border-[#1e3a5f] text-slate-400"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReject}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isProcessing}
            >
              {isProcessing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Reject Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
