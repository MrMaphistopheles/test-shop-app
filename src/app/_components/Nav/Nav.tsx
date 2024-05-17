import { Button } from "@nextui-org/react";
import React from "react";
import Plus from "./svg/Plus";

export default function Nav() {
  return (
    <nav className="flex h-[6dvh] w-full items-center justify-between bg-white px-4">
      <span className="text-xl font-medium ">Test Shop App</span>
      <Button color="primary">
        <Plus />
        Add
      </Button>
    </nav>
  );
}
