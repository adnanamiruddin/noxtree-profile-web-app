import React from "react";

const Hero = ({ handlePreviewClick }) => {
  return (
    <div
      className="hero min-h-screen mt-16"
      style={{
        backgroundImage: "url(/hero.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5 text-gray-300">
            NoxTree is your personal link management tool, designed to help you
            share multiple links with just one link. Whether you are an
            influencer, a content creator, or a business professional, NoxTree
            makes it easy for you to showcase all your important links in one
            place.
          </p>
          <button className="btn btn-primary" onClick={handlePreviewClick}>
            PREVIEW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
