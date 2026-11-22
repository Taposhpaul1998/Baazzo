"use client";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AuthForm from "./AuthForm";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [rendered, setRendered] = useState(open);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      setRendered(true);

      const timer = setTimeout(() => {
        if (backdropRef.current && modalRef.current) {
          gsap.fromTo(
            backdropRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: "power2.out" }
          );
          gsap.fromTo(
            modalRef.current,
            { scale: 0.9, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.2)" }
          );
        }
      }, 10);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      if (backdropRef.current && modalRef.current) {
        gsap.to(backdropRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        });
        gsap.to(modalRef.current, {
          scale: 0.9,
          opacity: 0,
          y: 20,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            setRendered(false);
          },
        });
      } else {
        setRendered(false);
      }
    }
  }, [open]);

  if (!rendered) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md px-4 py-6 opacity-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative max-h-[calc(100vh-3rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-dark-border bg-dark-deep p-6 shadow-2xl sm:p-8 opacity-0 scale-90"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close authentication dialog"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-primary transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
        </button>
        <div className="mb-6 pr-8 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">
            Baazzo account
          </p>
          <h2
            id="auth-modal-title"
            className="font-heading text-2xl font-extrabold text-white"
          >
            Sign in to Baazzo
          </h2>
          <p className="mt-2 text-sm text-slate-400">Access your orders and saved details.</p>
        </div>
        <AuthForm mode="login" />
        <div className="mt-5 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            href="/signup"
            onClick={onClose}
            className="font-bold text-primary hover:text-primary-hover transition-colors cursor-pointer"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
