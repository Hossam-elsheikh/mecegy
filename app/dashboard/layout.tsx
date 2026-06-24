import "../globals.css";

export const metadata = {
  title: "MEC Admin",
};

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
