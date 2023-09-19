import React from "react";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="rounded-full">
      <Image src={`/queen-dark.svg`} alt="Logo" width={30} height={30} />
    </div>
  );
}
