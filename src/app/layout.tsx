import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "WoW Level Tracker ",
  description: "Track your WoW characters level for Andy's 3E ",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-[#0e1015]">
        <nav className="flex h-16 items-center justify-center text-white">
          <span className="text-lg font-bold tracking-wide">
            WoW Level Tracker
          </span>
        </nav>
        {children}
      </body>
    </html>
  );
}
