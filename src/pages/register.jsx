import { register } from "@/api/services";
import Input from "@/components/Input";
import { useState } from "react";
import nookies from "nookies";
import Link from "next/link";

export default function Register() {
  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
    console.log(fields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(fields);
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse p-9">
        <div className="text-center lg:ml-12 lg:text-left lg:w-3/6">
          <h1 className="text-5xl font-bold text-center tracking-wide leading-tight">
            Register now!
          </h1>
          <p className="pt-10 pb-4 text-center">
            Lets create your account to start managing your links and sharing
            your content with ease
          </p>
        </div>

        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control gap-6">
              <div>
                <Input
                  label="Username"
                  isRequire
                  name="username"
                  placeholder="yourusername99"
                  handleChangeInput={handleFieldChange}
                />
              </div>

              <div>
                <Input
                  label="Email"
                  isRequire
                  name="email"
                  placeholder="youremail99@email.com"
                  handleChangeInput={handleFieldChange}
                />
              </div>

              <div>
                <Input
                  type="password"
                  label="Password"
                  isRequire
                  name="password"
                  placeholder="yourpassword"
                  handleChangeInput={handleFieldChange}
                />
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Register
              </button>
            </div>
          </form>

          <Link href="/register">
            <button className="text-blue-600 hover:underline text-sm w-full pb-4">
              Already have an account? Click for login
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
