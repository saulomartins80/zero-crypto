import '../styles/globals.css'

export const metadata = {
  title: 'BOVINEXT - Revolução Digital na Pecuária',
  description: 'Plataforma completa de gestão pecuária com IA especializada',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 antialiased">{children}</body>
    </html>
  )
}
