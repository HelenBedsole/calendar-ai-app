// app/layout.tsx
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "AI Calendar Assistant",
  description: "Chat with an AI to manage your Google Calendar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">
        <Providers>
          <div className="min-h-screen flex items-center justify-center">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

