import './globals.css';

export const metadata = {
  title: 'Coffee New Cammary — Order Online',
  description: 'Pesan kopi & makanan lezat dari Coffee New Cammary, Bandung.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
