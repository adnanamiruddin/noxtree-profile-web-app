export default function Button({ type, onClick, label }) {
  return (
    <button
      type={type ? type : "submit"}
      onClick={onClick}
      className={`btn btn-primary btn-md basis-1/4 m-auto rounded-lg text-lg font-semibold text-white}`}
    >
      {label}
    </button>
  );
}
