import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SHRI.AI - AI Career Coach",
  description: "AI-powered project built with Next.js and ShadCN UI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} bg-background text-foreground`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster  richColors />
            {/* <footer className="bg-muted/50 text-center py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p className="text-sm text-muted-foreground">
                  Made by <span className="font-medium text-primary">TrywithCatch</span>
                </p>
              </div>
            </footer> */}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
