import Link from "next/link";
import { ConnectButton } from "../ConnectButton";

export function Header() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:px-10 items-center justify-around  h-28">
      <h1 className="text-3xl font-bold text-white">Mules Studio</h1>
      <div className="flex">
        <ul className="flex gap-3 text-lg font-bold items-center mr-4 text-white">
          <Link href="/" passHref>
            <a>MULES</a>
          </Link>
          {/* <Link href="/worldcup22" passHref>
            <a>WC22</a>
          </Link> */}
          <Link href="/your-mules" passHref>
            <a>YOUR MULES</a>
          </Link>
        </ul>
        <ConnectButton />
      </div>
    </div>
  );
}
