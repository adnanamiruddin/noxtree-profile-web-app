import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();

  return (
    <>
      <aside className="bg-gray-800 text-white p-6 min-h-screen hidden lg:flex flex-col justify-between w-3/12">
        <div>
          <h1 className="text-3xl font-semibold mb-4">NoxTree</h1>
          <div className="divider"></div>
          <ul>
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

      <aside className="bg-gray-800 text-white p-4 flex lg:hidden justify-between w-full items-center fixed top-0">
        <h1 className="text-2xl font-bold ml-2">NoxTree</h1>
        <ul className="flex gap-1">
          <Link href="/dashboard">
            <li
              className={`hover:bg-gray-700 py-2 px-4 rounded cursor-pointer text-sm sm:text-base font-semibold ${
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
              className={`hover:bg-gray-700 py-2 px-4 rounded cursor-pointer text-sm sm:text-base font-semibold ${
                router.pathname === "/dashboard/mylinks"
                  ? "bg-blue-600 cursor-default"
                  : ""
              }`}
            >
              <p>My Links</p>
            </li>
          </Link>
        </ul>
      </aside>
    </>
  );
}
