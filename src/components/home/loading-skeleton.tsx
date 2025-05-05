"use client";

import { Skeleton } from "../ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="flex items-center space-x-4 space-y-10 p-4 bg-white rounded-2xl shadow-sm">
      <div className="space-y-4 flex-1">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-10 w-1/3" />
      </div>
    </div>
  );
}
