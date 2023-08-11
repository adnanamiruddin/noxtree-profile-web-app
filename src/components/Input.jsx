export default function Input({
  type,
  label,
  isRequire,
  name,
  placeholder,
  value,
  handleInputChange,
}) {
  return (
    <>
      <label>
        {label}{" "}
        {isRequire ? <span className="text-red-500 align-middle">*</span> : ""}
      </label>
      <input
        type={type ? type : "text"}
        name={name}
        placeholder={placeholder}
        onChange={handleInputChange}
        value={value}
        className="input input-bordered w-full mt-1 focus:border-2 focus:border-blue-500 active:shadow-lg"
      />
    </>
  );
}
