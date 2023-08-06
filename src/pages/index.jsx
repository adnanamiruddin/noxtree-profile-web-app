import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen max-w-2xl m-auto flex-col items-center p-4 pt-24 ${inter.className}`}
    >
      <div className="flex flex-col items-center gap-3 w-full mb-12">
        <h3 className="text-2xl font-bold">Name</h3>
        <p className="text-lg">Description</p>
      </div>

      <div className="flex flex-col items-center w-full gap-8">
        <div className="h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[20px] p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300">
          <p>Hello World!</p>
        </div>
        <div className="h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[20px] p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300">
          <p>Hello World!</p>
        </div>
        <div className="h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[20px] p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300">
          <p>Hello World!</p>
        </div>
        <div className="h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[20px] p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300">
          <p>Hello World!</p>
        </div>
        <div className="h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[20px] p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300">
          <p>Hello World!</p>
        </div>
      </div>
    </main>
  );
}
