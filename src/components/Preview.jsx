import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

const Preview = ({ previewRef }) => {
  return (
    <div className={`hero min-h-screen ${inter.className}`} ref={previewRef}>
      <div className="hero-content flex-col-reverse lg:flex-row-reverse">
        <Link href="/adnan.amiruddin" target="_blank" rel="noopener noreferrer">
          <Image
            src="/preview.png"
            width={500}
            height={500}
            alt="Picture of the author"
            className="max-w-sm rounded-lg shadow-2xl mt-8 hidden sm:block"
          />
          <Image
            src="/preview.png"
            width={300}
            height={300}
            alt="Picture of the author"
            className="max-w-sm rounded-lg shadow-2xl mt-8 block sm:hidden"
          />
          <p className="mt-2 sm:mt-4 pb-4 sm:pb-0 text-sm sm:text-base text-center text-blue-500 hover:underline">
            Click to view
          </p>
        </Link>
        <div className="p-2 sm:p-12 lg:p-0 mt-20 sm:mt-0">
          <h1 className="text-4xl font-bold text-center lg:text-left">
            PREVIEW
          </h1>
          <p className="py-6 text-center lg:text-justify mb-6 lg:mr-14">
            Welcome to NoxTree, your all-in-one link management solution. This
            is an example of a generated NoxTree, showcasing how you can
            effortlessly organize and share your important links. Whether you
            are a social media influencer, a content creator, or a professional
            looking to streamline your online presence, NoxTree makes it easy
            for you. Explore the power of NoxTree and manage your links with
            convenience. Good luck on your journey!
          </p>
          <Link href="/login">
            <button className="btn btn-primary w-full sm:w-max">START</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Preview;
