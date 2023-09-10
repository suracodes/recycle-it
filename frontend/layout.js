import './globals.css'

export const metadata = {
  title: 'Recycle It',
  description: 'Recycle IT',
  icons: {
    icon: './logo.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="subpixel-antialiased">{children}</body>
    </html>
  )
}
