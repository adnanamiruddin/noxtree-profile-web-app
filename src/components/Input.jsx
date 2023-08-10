export default function Input({ name, placeholder, value, handleChangeInput }) {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      onChange={handleChangeInput}
      value={value}
      className="input input-bordered w-full mt-1 focus:border-2 focus:border-blue-500 active:shadow-lg"
    />
  );
}
