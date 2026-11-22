"use client";

import { useState } from "react";
import AuthForm from "../components/auth/AuthForm";
import AuthModal from "../components/auth/AuthModal";

export default function SignupClient() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <main className="flex min-h-[calc(100vh-180px)] items-center justify-center bg-dark-base px-4 py-12">
        <section className="w-full max-w-md rounded-2xl border border-dark-border bg-dark-deep p-6 shadow-xl sm:p-8">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">Join Baazzo</p>
            <h1 className="font-heading text-3xl font-extrabold text-white">Create your account</h1>
            <p className="mt-2 text-sm text-slate-500">Shop faster and keep track of every order.</p>
          </div>
          <AuthForm mode="signup" />
          <p className="mt-5 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <button type="button" onClick={() => setLoginOpen(true)} className="font-bold text-primary transition-colors hover:text-primary-hover cursor-pointer">
              Sign in
            </button>
          </p>
        </section>
      </main>
      <AuthModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
