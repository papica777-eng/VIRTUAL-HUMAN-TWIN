"use client";

import { signIn } from "next-auth/react";
import { Github, Mail, ShieldAlert } from "lucide-react";
import { useState } from "react";

export default function LoginMatrix() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleLogin = async (provider: string) => {
    setIsLoading(provider);
    await signIn(provider, { callbackUrl: "/team" });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Background Matrix/Grid effect */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
      </div>

      <div className="z-10 w-full max-w-md relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-30 animate-pulse"></div>
        <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl p-8 backdrop-blur-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
              QANTUM NEXUS
            </h1>
            <p className="text-zinc-400 text-sm">
              Sovereign Authentication Protocol
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleLogin("github")}
              disabled={!!isLoading}
              className="w-full flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition-colors py-3 px-4 rounded-lg text-sm font-medium"
            >
              {isLoading === "github" ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Github className="w-5 h-5" />
              )}
              Authenticate via CyberSpace (GitHub)
            </button>

            <button
              onClick={() => handleLogin("google")}
              disabled={!!isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-200 transition-colors py-3 px-4 rounded-lg text-sm font-medium"
            >
              {isLoading === "google" ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Mail className="w-5 h-5 text-red-500" />
              )}
              Authenticate via Google Workspace
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-emerald-500 shrink-0" />
            <p className="text-xs text-zinc-500">
              Zero-Entropy Guarantee. By continuing, you agree to the Fortress Security Protocol and End-User constraints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
