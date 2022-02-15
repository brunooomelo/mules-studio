import { ConnectButton } from "../ConnectButton";

export function Header() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:px-10 items-center justify-around  h-28">
      <h1 className="text-3xl font-bold text-white">Mules Studio</h1>
      <ConnectButton />
    </div>
  );
}
