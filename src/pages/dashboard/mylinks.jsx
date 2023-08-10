import Sidebar from "@/components/Sidebar";

export default function MyLinks() {
  return (
    <main className="flex">
      <Sidebar />
      <div className="p-12 w-full">
        <h1 className="text-4xl font-semibold mb-6">Dashboard</h1>
      </div>
    </main>
  );
}
