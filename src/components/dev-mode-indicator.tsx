"use client";

import { Badge } from "ui/badge";
import { AlertTriangle } from "lucide-react";

export function DevModeIndicator() {
  const isDev = process.env.NODE_ENV === "development";
  const useDevAuth =
    typeof window !== "undefined" && window.location.search.includes("dev");

  if (!isDev) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Badge
        variant="secondary"
        className="border-orange-500 text-orange-700 bg-orange-50 dark:bg-orange-950 dark:text-orange-300"
      >
        <AlertTriangle className="size-3 mr-1" />
        Development Mode
      </Badge>
    </div>
  );
}
