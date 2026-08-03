import { getDropStatus } from '@/lib/drop';
import { Hero } from '@/components/home/Hero';
import { DropMeter } from '@/components/home/DropMeter';
import { DropGrid } from '@/components/home/DropGrid';
import { Manifesto } from '@/components/home/Manifesto';
import { FAQ } from '@/components/home/FAQ';
import { NewsletterDrops } from '@/components/home/NewsletterDrops';

export default function HomePage() {
  const status = getDropStatus();

  return (
    <div className="home">
      <Hero initialStatus={status} mockupSrc="/images/logo.png" />
      <DropMeter initialStatus={status} />
      <DropGrid />
      <Manifesto />
      <FAQ />
      <NewsletterDrops />
    </div>
  );
}
