'use client';

import { useCallback, useEffect, useState } from 'react';
import type { DropStatus } from '@/lib/drop';

export function useDropStatus(initial?: DropStatus) {
  const [status, setStatus] = useState<DropStatus | null>(initial ?? null);
  const [loading, setLoading] = useState(!initial);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/drop');
      if (!res.ok) return;
      const data = (await res.json()) as DropStatus;
      setStatus(data);
    } catch {
      // mantém last known
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { status, loading, refresh };
}
