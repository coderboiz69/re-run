import { GraduationCap, User } from "lucide-react";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-[hsl(239,84%,71%)] to-[hsl(267,40%,58%)] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">GSTATUS</h1>
              <p className="text-white/80 text-sm">Gurukul Points Management System v2.0</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">System Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
