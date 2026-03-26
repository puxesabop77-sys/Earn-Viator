import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EarnViator Admin Control',
  description: 'Internal Management Systems',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <nav className="bg-viator-card border-b border-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-viator-primary tracking-wider">EARNVIATOR <span className="text-white">HQ</span></h1>
            <div className="flex gap-6">
              <a href="/sufiyan" className="hover:text-viator-primary transition">Coins Panel</a>
              <a href="/mailev" className="hover:text-viator-primary transition">Mail Panel</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
