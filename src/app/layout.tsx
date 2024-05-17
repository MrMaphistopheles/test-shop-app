import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import Nav from "./_components/Nav/Nav";
import { Provider } from "~/app/_provider/ui/Provider";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <Provider>
            <Nav />
            <main className="flex h-[96dvh] flex-wrap items-start justify-center gap-2 overflow-auto bg-slate-200 py-2">
              {children}
            </main>
          </Provider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
