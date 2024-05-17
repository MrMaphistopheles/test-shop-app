"use client";

import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import ModalBody from "./ModalBody";
type product = {
  id: string;
  imageUrl: string | null;
  name: string;
  count: number;
  width: number;
  heigth: number;
  weigth: number;
} | null;

export default function Edit({ product }: { product: product }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button color="primary" onClick={onOpen}>
        Edit
      </Button>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new product
              </ModalHeader>
              <ModalBody onClose={onClose} product={product} />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
