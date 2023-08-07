import Image from "next/image";
import React from "react";

const Preview = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse">
        <Image
          src="/preview.png"
          width={500}
          height={500}
          alt="Picture of the author"
          className="max-w-sm rounded-lg shadow-2xl mt-8"
        />
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
