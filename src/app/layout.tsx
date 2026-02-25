import Provider from "@/components/provider";
import "./globals.css";
import { CharcoalProvider } from "@charcoal-ui/react";
import '@charcoal-ui/react/dist/index.css'
import '@charcoal-ui/react/dist/layered.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <CharcoalProvider>
        <html lang="ja">
          <body>
            {children}
          </body>
        </html>
      </CharcoalProvider>
    </Provider>
  );
}