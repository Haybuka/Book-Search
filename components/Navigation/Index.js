import Link from "next/link";
import React from "react";

const Index = () => {
  return (
    <header className="bg-white py-4 shadow-lg px-6 z-10 w-full top-0 relative">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Randoms</h1>
        <div className="w-[400px]">
          <ul className="flex justify-between items-center">
            <Link href="/coffee-store" className="text-xl">
              <li>
                <p>Coffee Connoisseur</p>
              </li>
            </Link>
            <Link href="/ricky" className="text-xl">
              <li>
                <p>Ricky Morty</p>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Index;
