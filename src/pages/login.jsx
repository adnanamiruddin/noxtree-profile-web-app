import { login } from "@/api/services";
import { useState } from "react";
import nookies from "nookies";
import Input from "@/components/Input";
import Link from "next/link";
import ToastNotif from "@/components/ToastNotif";

export default function Login() {
  const [fields, setFields] = useState({
    identifier: "",
    password: "",
  });

  const handleFieldChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(fields);
  };

  return (
    <div className="hero min-h-screen">
      <ToastNotif />
      <div className="hero-content flex-col lg:flex-row-reverse p-8">
        <div className="text-center lg:ml-12 lg:text-left lg:w-3/6">
          <h1 className="text-5xl font-bold text-center tracking-wide">
            Login now!
          </h1>
          <p className="pt-10 pb-4 text-center">
            Welcome back! Log in to manage your links and share your content.
          </p>
        </div>

        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control gap-6">
              <div>
                <Input
                  label="Email"
                  isRequire
                  name="identifier"
                  placeholder="youremail99@email.com"
                  handleInputChange={handleFieldChange}
                />
              </div>

              <div>
                <Input
                  type="password"
                  label="Password"
                  isRequire
                  name="password"
                  placeholder="yourpassword"
                  handleInputChange={handleFieldChange}
                />
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </form>

          <Link href="/register">
            <button className="text-blue-500 hover:underline text-sm w-full pb-4">
              Do not have an account? Click for registration
            </button>
          </Link>

          <Link href="/" className="flex justify-end px-4 pt-2 pb-6">
            <button className="btn btn-sm btn-outline btn-warning">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  if (cookies.token) {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }
  return {
    props: {},
  };
}
