import type { Metadata } from "next";
import SignupClient from "./SignupClient";

export const metadata: Metadata = {
  title: "Create account | Baazzo",
  description: "Create your Baazzo customer account.",
};

export default function SignupPage() {
  return <SignupClient />;
}
