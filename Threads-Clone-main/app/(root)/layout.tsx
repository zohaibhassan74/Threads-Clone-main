import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Bottombar from './../../components/shared/Bottombar';
import Topbar from './../../components/shared/Topbar';
import LeftSideBar from '@/components/shared/LeftSideBar';
import RightSideBar from '@/components/shared/RightSideBar';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'threads',
  description: 'A next.js 13 meta app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Topbar />
        <main className='flex flex-row'>
          <LeftSideBar/>
          <section className='main-container'>
            <div className='w-full max-w-4xl'>
              {children}
            </div>
          </section>
          <RightSideBar/>
        </main>
        <Bottombar/>
      </body>
      </html>
      </ClerkProvider>
  )
}
