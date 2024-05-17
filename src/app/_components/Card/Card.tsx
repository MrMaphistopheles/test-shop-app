"use client";

import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function Card({
  id,
  src,
  alt,
  name,
  count,
}: {
  id: string;
  src: string;
  alt: string;
  name: string;
  count: number;
}) {
  const { mutate } = api.product.deleteProduct.useMutation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const handleDeletion = (onClose: () => void) => {
    mutate({ id });
    onClose();
    router.refresh();
  };
  return (
    <div className="flex max-h-[13em] max-w-[13em] flex-col items-start justify-center gap-2 rounded-xl bg-white">
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex w-full items-center justify-center gap-2">
                  <p> Are you sure? </p>
                  <Button color="success" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => handleDeletion(onClose)}
                  >
                    Delete
                  </Button>
                </div>
              </ModalHeader>
            </>
          )}
        </ModalContent>
      </Modal>
      <Link href={`product/${id}`}>
        <Image
          src={src}
          alt={alt}
          height={300}
          width={300}
          className="h-auto rounded-xl object-cover"
        />
        <span className="px-3 font-medium">{name}</span>
      </Link>

      <div className="flex w-full items-center justify-between px-3 pb-3">
        <p>count:{count}</p>
        <Button color="danger" onClick={onOpen}>
          Delete
        </Button>
      </div>
    </div>
  );
}
