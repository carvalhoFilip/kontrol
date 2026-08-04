import { Hero } from '@/components/home/Hero';
import { DropStatus } from '@/components/home/DropStatus';
import { DropGrid } from '@/components/home/DropGrid';
import { Manifesto } from '@/components/home/Manifesto';
import { FAQ } from '@/components/home/FAQ';
import { NewsletterDrops } from '@/components/home/NewsletterDrops';

export default function HomePage() {
  return (
    <div className="home">
      <Hero mockupSrc="/images/logo.png" />
      <DropStatus />
      <DropGrid />
      <Manifesto />
      <FAQ />
      <NewsletterDrops />
    </div>
  );
}
