import Image from "next/image";

export default function InputImage({
  label,
  name,
  selectedImage,
  handleImageChange,
}) {
  return (
    <>
      <label className="self-start mb-2">{label}</label>
      {selectedImage ? (
        <Image width={200} height={200} src={selectedImage} alt="Selected" />
      ) : (
        <Image
          width={200}
          height={200}
          src="https://via.placeholder.com/200x200"
          alt="Placeholder"
        />
      )}
      <label className="cursor-pointer mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center">
        Choose Image
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </>
  );
}
