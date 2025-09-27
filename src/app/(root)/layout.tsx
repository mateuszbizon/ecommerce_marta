import Nav from "@/components/common/Nav";
import { plPL } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={plPL}>
        <Nav />
        <main>
            {children}
        </main>
    </ClerkProvider>
  );
}