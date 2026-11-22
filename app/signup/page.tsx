import type { Metadata } from "next";
import AuthForm from "../components/auth/AuthForm";

export const metadata: Metadata = { title: "Create account | Baazzo", description: "Create your Baazzo customer account." };

export default function SignupPage() {
  return <main className="flex min-h-[calc(100vh-180px)] items-center justify-center bg-slate-50 px-4 py-12"><section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="mb-8 text-center"><p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">Join Baazzo</p><h1 className="font-heading text-3xl font-extrabold text-slate-900">Create your account</h1><p className="mt-2 text-sm text-slate-500">Shop faster and keep track of every order.</p></div><AuthForm mode="signup" /></section></main>;
}
