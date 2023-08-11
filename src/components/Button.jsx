export default function Button({ type, disabled, onClick, label }) {
  return (
    <button
      type={type ? type : "submit"}
      disabled={disabled}
      onClick={onClick}
      className={`btn-md basis-1/4 m-auto rounded-lg text-lg font-semibold text-white ${
        disabled
          ? "bg-gray-400 hover:bg-red-800 cursor-not-allowed "
          : "btn-primary hover:bg-blue-900"
      }}`}
    >
      {label}
    </button>
  );
}
