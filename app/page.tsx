"use client";

import React from "react"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, LogOut, Wallet, Receipt, Clock, CheckCircle, XCircle, AlertCircle, Copy, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PresaleEntry {
  id: string;
  paymentReference: string;
  solanaWallet: string;
  solAmount: number;
  sodmAmount: number;
  status: "pending" | "verified" | "rejected";
  createdAt: { seconds: number };
  verifiedAt?: { seconds: number };
  rejectionReason?: string;
}

const PRESALE_WALLET = "FqNj9NhbA6LAcYhrSeaY5HeNsBtUKM9u6pi51qHZ9c1g";
const PRESALE_RATE = 200000; // SODM per SOL

export default function DashboardPage() {
  const { user, userData, loading, signOut } = useAuth();
  const router = useRouter();
  const [entries, setEntries] = useState<PresaleEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copied, setCopied] = useState(false);

  const [paymentRef, setPaymentRef] = useState("");
  const [solanaWallet, setSolanaWallet] = useState("");
  const [solAmount, setSolAmount] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "presale_entries"),
      where("userId", "==", user.uid)
    );

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
  }, [user]);

  const copyWallet = async () => {
    await navigator.clipboard.writeText(PRESALE_WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!paymentRef.trim()) {
      setError("Payment reference is required");
      return;
    }

    if (!solanaWallet.trim()) {
      setError("Solana wallet address is required");
      return;
    }

    if (solanaWallet.length < 32 || solanaWallet.length > 44) {
      setError("Invalid Solana wallet address");
      return;
    }

    const amount = parseFloat(solAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid SOL amount");
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "presale_entries"), {
        userId: user?.uid,
        userEmail: user?.email,
        paymentReference: paymentRef.trim(),
        solanaWallet: solanaWallet.trim(),
        solAmount: amount,
        sodmAmount: amount * PRESALE_RATE,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setSuccess("Presale entry submitted successfully! We will verify your payment shortly.");
      setPaymentRef("");
      setSolanaWallet("");
      setSolAmount("");
    } catch {
      setError("Failed to submit entry. Please try again.");
    } finally {
      setIsSubmitting(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050a18] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) return null;

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
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm hidden sm:block">{user.email}</span>
            {userData?.isAdmin && (
              <Link href="/admin">
                <Button variant="outline" size="sm" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white bg-transparent">
                  Admin Panel
                </Button>
              </Link>
            )}
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-slate-400 hover:text-white">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Presale Dashboard</h1>
            <p className="text-slate-400">Submit your presale contribution and track your entries</p>
          </div>

          {/* Presale Wallet Info */}
          <Card className="bg-[#0a1628] border-[#1e3a5f]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-blue-400" />
                Presale Wallet
              </CardTitle>
              <CardDescription className="text-slate-400">
                Send your SOL to this address, then submit your payment details below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 p-3 bg-[#0f2340] rounded-lg border border-[#1e3a5f]">
                <code className="text-blue-400 text-sm flex-1 break-all">{PRESALE_WALLET}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyWallet}
                  className="text-slate-400 hover:text-white shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-sm text-slate-500 mt-3">
                Rate: 1 SOL = {PRESALE_RATE.toLocaleString()} SODM
              </p>
            </CardContent>
          </Card>

          {/* Submit Entry Form */}
          <Card className="bg-[#0a1628] border-[#1e3a5f]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-blue-400" />
                Submit Presale Entry
              </CardTitle>
              <CardDescription className="text-slate-400">
                After sending SOL, fill in the details below for verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-900">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="mb-4 bg-green-900/20 border-green-900">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-green-400">{success}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sol-amount" className="text-slate-300">SOL Amount Sent</Label>
                    <Input
                      id="sol-amount"
                      type="number"
                      step="0.001"
                      placeholder="e.g., 1.5"
                      value={solAmount}
                      onChange={(e) => setSolAmount(e.target.value)}
                      className="bg-[#0f2340] border-[#1e3a5f] text-white placeholder:text-slate-500"
                      required
                    />
                    {solAmount && !isNaN(parseFloat(solAmount)) && (
                      <p className="text-xs text-blue-400">
                        You will receive: {(parseFloat(solAmount) * PRESALE_RATE).toLocaleString()} SODM
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-ref" className="text-slate-300">Payment Reference / TX Hash</Label>
                    <Input
                      id="payment-ref"
                      type="text"
                      placeholder="Transaction signature or reference"
                      value={paymentRef}
                      onChange={(e) => setPaymentRef(e.target.value)}
                      className="bg-[#0f2340] border-[#1e3a5f] text-white placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="solana-wallet" className="text-slate-300">Your Solana Wallet Address (to receive SODM)</Label>
                  <Input
                    id="solana-wallet"
                    type="text"
                    placeholder="Your Solana wallet address"
                    value={solanaWallet}
                    onChange={(e) => setSolanaWallet(e.target.value)}
                    className="bg-[#0f2340] border-[#1e3a5f] text-white placeholder:text-slate-500"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Submit Entry
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Entries Table */}
          <Card className="bg-[#0a1628] border-[#1e3a5f]">
            <CardHeader>
              <CardTitle className="text-white">Your Presale Entries</CardTitle>
              <CardDescription className="text-slate-400">
                Track the status of your submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {entries.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No entries yet. Submit your first presale contribution above.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#1e3a5f]">
                        <TableHead className="text-slate-400">Date</TableHead>
                        <TableHead className="text-slate-400">SOL</TableHead>
                        <TableHead className="text-slate-400">SODM</TableHead>
                        <TableHead className="text-slate-400">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {entries.map((entry) => (
                        <TableRow key={entry.id} className="border-[#1e3a5f]">
                          <TableCell className="text-slate-300">
                            {entry.createdAt?.seconds
                              ? new Date(entry.createdAt.seconds * 1000).toLocaleDateString()
                              : "Processing..."}
                          </TableCell>
                          <TableCell className="text-white font-medium">{entry.solAmount} SOL</TableCell>
                          <TableCell className="text-blue-400">{entry.sodmAmount?.toLocaleString()} SODM</TableCell>
                          <TableCell>
                            {getStatusBadge(entry.status)}
                            {entry.rejectionReason && (
                              <p className="text-xs text-red-400 mt-1">{entry.rejectionReason}</p>
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
    </div>
  );
}
