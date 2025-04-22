import { BonsaiController } from "@/components/bonsai-controller";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 sm:p-8 bg-gradient-to-b from-slate-50 to-slate-100">
      <BonsaiController />
    </main>
  );
}
