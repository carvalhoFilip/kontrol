import type { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnnouncementBar } from '@/components/home/AnnouncementBar';
import { getDropStatus } from '@/lib/drop';
import './globals.css';

export const metadata: Metadata = {
  title: 'kontrol. — training club',
  description: 'TC-11 DROP. Built for training. No noise. Just discipline.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dropStatus = getDropStatus();

  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <AnnouncementBar initialStatus={dropStatus} />
          <Header />
          <main className="site-main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
