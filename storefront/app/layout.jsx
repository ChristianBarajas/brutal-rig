import "./globals.css";

export const metadata = {
  title: "Search Gear | Brutal Rig",
  description: "Curious about gear? Search guitars, basses, amps, and pedals. Compare estimated prices and explore the sounds behind heavy music.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
