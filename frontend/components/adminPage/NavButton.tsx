import React from "react";

type NavButtonProps = {
  label: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export function NavButton({ label, icon, active, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2 rounded-xl transition text-lg ${
        active ? "bg-white/20 text-white" : "hover:bg-white/10 text-white/70"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}