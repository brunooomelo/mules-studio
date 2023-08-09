import Link from "next/link";
import { ConnectButton } from "../ConnectButton";
const isProduction = process.env.NODE_ENV === "production";

export function Header() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:px-10 items-center justify-around  h-28">
      <h1 className="text-3xl font-bold text-white">Mules Studio </h1>
      {!isProduction && <span className="text-white uppercase">testnet</span>}
      <div className="flex">
        <ul className="flex gap-3 text-lg font-bold items-center mr-4 text-white">
          <Link href="/">MULES</Link>
          <Link href="/your-mules">YOUR MULES</Link>
        </ul>
        <ConnectButton />
      </div>
    </div>
  );
}
