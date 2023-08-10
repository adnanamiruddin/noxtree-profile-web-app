export default function ButtonSubmit({disabled}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="btn-primary basis-1/4 m-auto rounded-lg py-3 px-14 font-semibold text-white"
    >
      SAVE
    </button>
  );
}
