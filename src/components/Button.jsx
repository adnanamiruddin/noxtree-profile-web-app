export default function Button({ type, disabled, onClick, label }) {
  return (
    <button
      type={type ? type : "submit"}
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-primary btn-md basis-1/4 m-auto rounded-lg text-lg font-semibold text-white}`}
    >
      {label}
    </button>
  );
}
