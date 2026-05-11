import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/context/ProgressContext";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Belajar Mandarin HSK 1",
  description: "Aplikasi belajar bahasa Mandarin berbasis kurikulum HSK 1 Standard Course",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${geist.className} bg-gray-50 min-h-screen`}>
        <ProgressProvider>
          <nav className="bg-red-600 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
              <span className="text-2xl">🇨🇳</span>
              <div>
                <h1 className="font-bold text-lg leading-tight">Belajar Mandarin</h1>
                <p className="text-xs text-red-200">HSK 1 Standard Course</p>
              </div>
            </div>
          </nav>
          <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
        </ProgressProvider>
      </body>
    </html>
  );
}
