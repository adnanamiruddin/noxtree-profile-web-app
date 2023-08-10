import { register } from "@/api/services";
import Input from "@/components/Input";
import { useState } from "react";
import nookies from "nookies";

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
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
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
