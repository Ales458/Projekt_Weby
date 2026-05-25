import "./globals.css";

export const metadata = {
  title: "Knihovna filmu",
  description: "Sprava filmove knihovny pres Next.js a Supabase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
