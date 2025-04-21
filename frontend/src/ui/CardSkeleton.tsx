import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export default function CardSkeleton() {
  const mediaMatch = window.matchMedia("(max-width: 600px)");
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addEventListener("change", handler);
    return () => mediaMatch.removeEventListener("change", handler);
  });

  return !matches ? (
    <div>
      <Skeleton className='h-[300px] ' />
    </div>
  ) : (
    <div>
      <Skeleton className='h-[400px]' />
    </div>
  );
}
