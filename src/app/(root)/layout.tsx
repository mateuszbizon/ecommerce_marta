import Nav from "@/components/common/Nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Nav />
        <main>
            {children}
        </main>
    </>
  );
}