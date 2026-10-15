"use client";

import { useEffect, useState, type FormEvent } from "react";
import { LockKeyhole, ShieldCheck, Eye, EyeOff } from "lucide-react";

const ACCESS_CODE = "MR2026@123"; // Change your code here
const STORAGE_KEY = "sales-management-access";
const ACCESS_DURATION = 24 * 60 * 60 * 1000;

type AccessSession = {
  verified: boolean;
  expiresAt: number;
};

export default function LocalAccessLock({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const session = JSON.parse(saved) as AccessSession;

        if (
          session.verified === true &&
          Number.isFinite(session.expiresAt) &&
          session.expiresAt > Date.now()
        ) {
          setVerified(true);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (code.trim() !== ACCESS_CODE) {
      setError("Incorrect verification code. Please try again.");
      setLoading(false);
      return;
    }

    const session: AccessSession = {
      verified: true,
      expiresAt: Date.now() + ACCESS_DURATION,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      setVerified(true);
      setCode("");
    } catch {
      setError("Unable to save verification. Please enable browser storage.");
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  if (verified) {
    return <>{children}</>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-7 shadow-2xl sm:p-9">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
            <LockKeyhole size={30} />
          </div>
        </div>

        <div className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-700">
            <ShieldCheck size={18} />
            PRIVATE ACCESS
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Sales Management
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Enter the verification code provided by the administrator to access
            this website.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="access-code"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Verification code
            </label>

            <div className="relative">
              <input
                id="access-code"
                type={showCode ? "text" : "password"}
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Enter your access code"
                autoComplete="off"
                autoFocus
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              />

              <button
                type="button"
                onClick={() => setShowCode((current) => !current)}
                aria-label={showCode ? "Hide code" : "Show code"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-700"
              >
                {showCode ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            {error && (
              <p role="alert" className="mt-2 text-sm font-medium text-red-600">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3.5 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LockKeyhole size={18} />
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>

        <div className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-center text-xs leading-5 text-emerald-800">
          Access remains valid for 24 hours on this browser after successful
          verification.
        </div>
      </section>
    </main>
  );
}
