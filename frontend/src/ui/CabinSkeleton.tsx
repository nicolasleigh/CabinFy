import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export default function CabinSkeleton() {
  const mediaMatch = window.matchMedia("(max-width: 735px)");
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addEventListener("change", handler);
    return () => mediaMatch.removeEventListener("change", handler);
  });

  return (
    <>
      <div>
        <Skeleton className='h-[50px]' />
      </div>
      <div className='grid grid-cols-1 gap-2 py-5 sm:grid-cols-2'>
        <Skeleton className='rounded-t-xl w-full h-full object-cover sm:rounded-none sm:rounded-l-xl aspect-[3/2]' />
        <div className='grid grid-cols-2 rounded-b-lg sm:rounded-none sm:rounded-r-xl overflow-hidden gap-[6px]'>
          <Skeleton className='aspect-[3/2]' />
          <Skeleton className='aspect-[3/2]' />
          <Skeleton className='aspect-[3/2]' />
          <Skeleton className='aspect-[3/2]' />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-[3fr_2fr] md:gap-x-5 '>
        <Skeleton className='h-[700px]' />
        <Skeleton className='h-[700px]' />
      </div>
    </>
  );
}
