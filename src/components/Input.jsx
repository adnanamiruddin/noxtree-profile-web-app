export default function Input({ name, placeholder, handleChangeInput }) {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      onChange={handleChangeInput}
      className="input input-bordered w-full mt-1 focus:border-2 focus:border-blue-500 active:shadow-lg"
    />
  );
}
