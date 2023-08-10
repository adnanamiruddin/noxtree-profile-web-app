import React, { useRef } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Preview from "@/components/Preview";

export default function Home() {
  const previewRef = useRef(null);

  const handlePreviewClick = () => {
    if (previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      <Hero handlePreviewClick={handlePreviewClick} />
      <div ref={previewRef}>
        <Preview />
      </div>
    </>
  );
}
