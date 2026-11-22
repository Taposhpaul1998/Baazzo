"use client";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AuthForm from "./AuthForm";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 py-6" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="relative max-h-[calc(100vh-3rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <button type="button" onClick={onClose} aria-label="Close authentication dialog" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-primary">
          <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
        </button>
        <div className="mb-6 pr-8 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">Baazzo account</p>
          <h2 id="auth-modal-title" className="font-heading text-2xl font-extrabold text-slate-900">{mode === "login" ? "Sign in to Baazzo" : "Create your account"}</h2>
          <p className="mt-2 text-sm text-slate-500">{mode === "login" ? "Access your orders and saved details." : "Shop faster and keep track of every order."}</p>
        </div>
        <AuthForm mode={mode} />
        <div className="mt-5 text-center text-sm text-slate-500">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="font-bold text-primary hover:text-primary-hover">{mode === "login" ? "Sign up" : "Sign in"}</button>
        </div>
      </section>
    </div>
  );
}
