"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

interface AuthFormProps {
  mode: "login" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === "login";
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const password = String(data.get("password") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    // Authentication API integration will be connected once the customer endpoint is configured.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsSubmitting(false);
    setError("Authentication is not connected yet. Please try again later.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {!isLogin && (
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">Full name</label>
          <input id="name" name="name" type="text" required autoComplete="name" className="auth-input" placeholder="Enter your full name" />
        </div>
      )}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="auth-input" placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
        <div className="relative">
          <input id="password" name="password" type={showPassword ? "text" : "password"} required minLength={8} autoComplete={isLogin ? "current-password" : "new-password"} className="auth-input pr-20" placeholder="At least 8 characters" />
          <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary hover:text-primary-hover" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button>
        </div>
      </div>
      {!isLogin && (
        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-slate-700">Confirm password</label>
          <input id="confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"} required minLength={8} autoComplete="new-password" className="auth-input" placeholder="Repeat your password" />
        </div>
      )}
      {isLogin ? (
        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-slate-600"><input type="checkbox" name="remember" className="h-4 w-4 rounded border-slate-300 accent-primary" /> Remember me</label>
          <Link href="/forgot-password" className="font-semibold text-primary hover:text-primary-hover">Forgot password?</Link>
        </div>
      ) : (
        <label className="flex items-start gap-2 text-sm text-slate-600"><input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-primary" /> <span>I agree to the terms and privacy policy.</span></label>
      )}
      {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-primary px-4 py-3.5 font-heading text-sm font-bold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Please wait..." : isLogin ? "Sign in" : "Create account"}</button>
      <p className="text-center text-sm text-slate-600">{isLogin ? "New to Baazzo?" : "Already have an account?"}</p>
    </form>
  );
}
