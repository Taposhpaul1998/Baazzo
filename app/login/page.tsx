import type { Metadata } from "next";
import AuthForm from "../components/auth/AuthForm";

export const metadata: Metadata = { title: "Sign in | Baazzo", description: "Sign in to your Baazzo account." };

export default function LoginPage() {
  return <main className="flex min-h-[calc(100vh-180px)] items-center justify-center bg-slate-50 px-4 py-12"><section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="mb-8 text-center"><p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">Welcome back</p><h1 className="font-heading text-3xl font-extrabold text-slate-900">Sign in to Baazzo</h1><p className="mt-2 text-sm text-slate-500">Access your orders and saved details.</p></div><AuthForm mode="login" /></section></main>;
}
