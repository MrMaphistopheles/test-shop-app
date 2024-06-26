"use client";

import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import Plus from "./svg/Plus";
import ModalMain from "./comp/ModalBody";

export default function Nav() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <nav className="flex h-[6dvh] w-full items-center justify-between bg-white px-4">
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new product
              </ModalHeader>
              <ModalMain onClose={onClose} />
            </>
          )}
        </ModalContent>
      </Modal>
      <span className="text-xl font-medium ">Test Shop App</span>
      <Button color="primary" onClick={onOpen}>
        <Plus />
        Add
      </Button>
    </nav>
  );
}
