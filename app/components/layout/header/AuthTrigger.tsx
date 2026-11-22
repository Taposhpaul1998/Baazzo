"use client";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AuthModal from "../../auth/AuthModal";

export default function AuthTrigger({ mobile = false }: { mobile?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="Open account login" className={mobile ? "w-9 h-9 flex items-center justify-center text-slate-700 hover:text-primary active:bg-slate-100 rounded-lg transition-colors" : "flex items-center gap-2 text-slate-700 hover:text-primary transition-colors text-sm font-medium"}>
        <span className={mobile ? "" : "flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600"}><FontAwesomeIcon icon={faUser} className="h-4 w-4" /></span>
        {!mobile && <span className="flex flex-col text-left text-xs leading-tight"><span className="text-slate-400 font-normal">Welcome,</span><span className="text-slate-700 font-semibold text-sm">Account</span></span>}
      </button>
      <AuthModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
