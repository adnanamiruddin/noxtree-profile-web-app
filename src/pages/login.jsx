import { login } from "@/api/services";
import { useState } from "react";
import nookies from "nookies";
import Input from "@/components/Input";

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
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:ml-12 lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
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
