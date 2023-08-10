import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="bg-gray-800 text-white p-6 min-h-screen flex flex-col justify-between w-1/6">
      <div>
        <h1 className="text-4xl font-semibold mb-6">NoxTree</h1>
        <ul className="mt-10">
          <Link href="/dashboard">
            <li
              className={`hover:bg-gray-700 p-2 pl-4 mb-3 rounded cursor-pointer font-semibold ${
                router.pathname === "/dashboard"
                  ? "bg-blue-600 cursor-default"
                  : ""
              }`}
            >
              <p>My Account</p>
            </li>
          </Link>
          <Link href="/dashboard/mylinks">
            <li
              className={`hover:bg-gray-700 p-2 pl-4 rounded cursor-pointer font-semibold ${
                router.pathname === "/dashboard/mylinks"
                  ? "bg-blue-600 cursor-default"
                  : ""
              }`}
            >
              <p>My Links</p>
            </li>
          </Link>
        </ul>
      </div>
      <div className="mb-4">
        <p className="text-sm">Logged in as John Doe</p>
      </div>
    </aside>
  );
}
