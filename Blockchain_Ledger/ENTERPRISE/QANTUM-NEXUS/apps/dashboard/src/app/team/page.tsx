import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Users, UserPlus, Shield, Activity, Zap } from "lucide-react";

export default async function TeamWorkspace() {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/login");
  }

  // Mocking the backend entitlement. In a full Prisma integration we would check: await prisma.tenant.findUnique()
  // As per Phase 4 plan, this simulates pulling the limits based on the Stripe Plan.
  const teamLimits = {
    planType: "Sovereign PRO",
    usedSeats: 1,
    maxSeats: 5,
  };

  const isLimitReached = teamLimits.usedSeats >= teamLimits.maxSeats;

  return (
    <div className="min-h-screen bg-black text-white p-8 animate-in fade-in zoom-in duration-500">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
              The Swarm Hive: Team Collaboration
            </h1>
            <p className="text-zinc-400 mt-2">
              Manager workspace. Authenticated as: <span className="text-white">{session.user?.email}</span>
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 flex flex-col">
              <span className="text-xs text-zinc-500">Active Plan</span>
              <span className="text-sm font-semibold text-emerald-400">{teamLimits.planType}</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 flex flex-col">
              <span className="text-xs text-zinc-500">Swarm Drones</span>
              <span className="text-sm font-semibold">{teamLimits.usedSeats} / {teamLimits.maxSeats} Limit</span>
            </div>
          </div>
        </header>

        {/* Invite Node */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl filter -translate-y-1/2 translate-x-1/3"></div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <UserPlus className="text-emerald-500" /> Spawn New Drone
          </h2>
          
          <div className="flex items-center gap-4">
            <input 
              type="email" 
              placeholder="engineer@enterprise.com" 
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              disabled={isLimitReached}
            />
            <select 
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:outline-none"
              disabled={isLimitReached}
            >
              <option value="member">Swarm Drone (Read-Only)</option>
              <option value="admin">Sovereign Admin</option>
            </select>
            <button 
              disabled={isLimitReached}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold px-6 py-3 rounded-lg transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              Dispatch Invite
            </button>
          </div>
          {isLimitReached && (
            <p className="text-red-400 text-sm mt-3 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Capacity Limit Reached. Upgrade Stripe Tier to spawn more drones.
            </p>
          )}
        </div>

        {/* Members Grid */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-4 flex items-center gap-2">
            <Users /> Active Swarm Topology
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* The Current User */}
            <div className="bg-zinc-900/50 border border-emerald-500/30 rounded-xl p-5 flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
                <span className="text-emerald-500 font-bold">You</span>
              </div>
              <div>
                <h4 className="font-semibold">{session.user?.name || "QAntum Architect"}</h4>
                <p className="text-xs text-zinc-400 truncate">{session.user?.email}</p>
                <div className="mt-3 flex gap-2">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">Sovereign Node</span>
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded border border-cyan-500/20 flex items-center gap-1">
                    <Activity className="w-3 h-3" /> Online
                  </span>
                </div>
              </div>
            </div>

            {/* Empty Spot Representation */}
            {Array.from({ length: teamLimits.maxSeats - teamLimits.usedSeats }).map((_, idx) => (
              <div key={idx} className="bg-zinc-950 border border-zinc-800 border-dashed rounded-xl p-5 flex items-center justify-center opacity-50">
                <div className="text-center">
                  <Zap className="w-6 h-6 text-zinc-600 mx-auto mb-2" />
                  <p className="text-xs text-zinc-500">Available Drone Socket</p>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}
