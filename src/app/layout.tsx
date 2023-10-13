import { Metadata } from 'next'
import RootLayoutt from './RootLayout'
import './globals.css'
import Providers from '@/redux/Providers';
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Amazon Clone',
  description: 'Online Shopping made easy',
  icons: {
    icon: '/Amazon_icon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-bodyFont bg-gray-300">
          <Providers>
            <RootLayoutt> {/* Header - BottomHeader - Footer */}
                {children}
            </RootLayoutt>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
