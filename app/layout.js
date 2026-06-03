import "./globals.css";

export const metadata = {
  title: "Knihovna filmů",
  description: "Správa filmové knihovny přes Next.js a Supabase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
