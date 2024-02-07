import { useEffect, useState } from 'react';
import Skeleton from './Skeleton';

export default function CardSkeleton() {
  const mediaMatch = window.matchMedia('(max-width: 600px)');
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    mediaMatch.addEventListener('change', handler);
    return () => mediaMatch.removeEventListener('change', handler);
  });

  return !matches ? (
    <div>
      <Skeleton height={200} />
      <Skeleton height={100} />
    </div>
  ) : (
    <div>
      <Skeleton height={300} />
      <Skeleton height={80} />
    </div>
  );
}
