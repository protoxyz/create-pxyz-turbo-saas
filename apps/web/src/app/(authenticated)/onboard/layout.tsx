import Images from "@/components/images";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full min-h-screen  bg-slate-50 py-8">
      <Images.logo className="md:h-18 mx-auto mb-8 h-12" />
      {children}
    </div>
  );
}
