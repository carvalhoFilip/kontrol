'use client';

import Link from 'next/link';
import { useDropStatus } from '@/hooks/useDropStatus';
import type { DropStatus } from '@/lib/drop';

type Props = {
  initialStatus: DropStatus;
};

export function AnnouncementBar({ initialStatus }: Props) {
  const { status } = useDropStatus(initialStatus);
  const remaining = status?.remaining ?? initialStatus.remaining;
  const soldOut = remaining === 0;

  return (
    <div className="announcement-bar" role="status">
      {soldOut ? (
        <Link href="/#lista-drops" className="announcement-bar-text">
          TC-11 · ESGOTADO · ENTRE NA LISTA DE DROPS
        </Link>
      ) : (
        <span className="announcement-bar-text">
          KONTROL · TC-11 · DROP LIMITADO
        </span>
      )}
    </div>
  );
}
