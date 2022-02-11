export function StatusMint({ supply }) {
  return (
    <span className="text-white text-4xl font-bold">
      {Number(supply) ? supply : "-"} / 1337
    </span>
  );
}
