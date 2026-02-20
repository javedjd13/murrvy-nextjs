import { CommonPath } from "@/Constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeadingLogo = () => {
  return (
    <div className="brand-logo">
      <Link href={"/"}>
        <Image
          width={68}
          height={25}
          priority
          src={`${CommonPath}/murrvy-logo.png`}
          className="img-fluid no-dark-invert"
          alt="logo"
        />
      </Link>
    </div>
  );
};
export default HeadingLogo;
