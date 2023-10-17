import { Header } from "@/components/marketing/header/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full min-h-screen bg-slate-50">
      <Header />
      <div className="mx-auto py-8 lg:max-w-3xl">{children}</div>
    </div>
  );
}
