import Link from "next/link";
import Router, { useRouter } from "next/router";
import nookies from "nookies";
import { toast } from "react-toastify";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    nookies.destroy(null, "token");
    Router.replace("/");
    setTimeout(() => {
      toast.info("Thank you for using NoxTree! 😎 See you soon! 👋😄");
    }, 500);
  };

  return (
    <>
      <aside className="bg-gray-800 text-white p-6 min-h-screen hidden lg:flex flex-col justify-between w-3/12">
        <div>
          <h1 className="text-3xl font-semibold mb-4">NoxTree</h1>
          <div className="divider"></div>
          <ul className="mt-auto">
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
        <div className="relative">
          <button
            onClick={handleLogout}
            className={`bg-red-700 hover:brightness-125 py-2 px-4 rounded cursor-pointer text-base font-semibold text-white absolute bottom-0 left-0 lg:w-full`}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile View */}
      <aside className="bg-gray-800 text-white py-5 md:py-6 px-2 flex lg:hidden justify-between w-full items-center fixed top-0 z-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold ml-2">
          NoxTree
        </h1>
        <ul className="flex gap-1 sm:gap-4">
          <Link href="/dashboard">
            <li
              className={`hover:bg-gray-700 py-2 px-3 rounded cursor-pointer text-xs sm:text-base font-semibold ${
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
              className={`hover:bg-gray-700 py-2 px-4 rounded cursor-pointer text-xs sm:text-base font-semibold ${
                router.pathname === "/dashboard/mylinks"
                  ? "bg-blue-600 cursor-default"
                  : ""
              }`}
            >
              <p>My Links</p>
            </li>
          </Link>
          <li
            className={`bg-red-700 hover:brightness-125 py-2 px-4 rounded cursor-pointer text-xs sm:text-base font-semibold`}
          >
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
}
