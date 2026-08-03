'use client';

import { type DropStatus } from '@/lib/drop';
import { useDropStatus } from '@/hooks/useDropStatus';

type Props = {
  initialStatus: DropStatus;
};

export function DropMeter({ initialStatus }: Props) {
  const { status } = useDropStatus(initialStatus);
  const sold = status?.sold ?? initialStatus.sold;
  const total = status?.total ?? initialStatus.total;

  return (
    <section className="drop-meter">
      <div className="drop-meter-inner">
        <p className="k-label">STATUS DO DROP</p>
        <div className="drop-meter-ticks" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={`drop-meter-tick${i < sold ? ' drop-meter-tick--sold' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
