import React, { useReducer, useState } from "react";
import { Button, Input, ModalBody, ModalFooter } from "@nextui-org/react";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

interface FormState {
  productName: string;
  imageUrl: string;
  productCount: string;
  productWidth: string;
  productHeight: string;
  productWeight: string;
}

type Action =
  | { type: "SET_FIELD"; field: keyof FormState; value: string }
  | { type: "RESET" };

const initialState: FormState = {
  productName: "",
  imageUrl: "",
  productCount: "",
  productWidth: "",
  productHeight: "",
  productWeight: "",
};

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function ModalMain({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isEmpty, setIsEmpty] = useState(false);

  const { mutate, isPending } = api.product.add.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch({
      type: "SET_FIELD",
      field: name as keyof FormState,
      value,
    });
  };

  const isEmptyFilds = () => {
    const newErrors: string[] = [];
    if (!state.productName) newErrors.push("Product name is required.");
    if (!state.imageUrl) newErrors.push("Image URL is required.");
    if (!state.productCount) newErrors.push("Product count is required.");
    if (!state.productWidth) newErrors.push("Product width is required.");
    if (!state.productHeight) newErrors.push("Product height is required.");
    if (!state.productWeight) newErrors.push("Product weight is required.");

    const empty = newErrors.length === 0;
    setIsEmpty(!empty);
    return empty;
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEmptyFilds()) {
      mutate(state);

      dispatch({ type: "RESET" });

      router.refresh();
    }
  };
  return (
    <>
      <ModalBody>
        {isEmpty && <p className=" text-red-600">All filds required</p>}
        <form
          onSubmit={(e) => submitHandler(e)}
          className="flex w-full flex-col items-center justify-center gap-2"
        >
          <Input
            type="text"
            placeholder="Enter product name"
            name="productName"
            onChange={(e) => handleChange(e)}
            required
          />
          <Input
            type="text"
            placeholder="Enter image url"
            name="imageUrl"
            onChange={(e) => handleChange(e)}
            required
          />
          <Input
            type="number"
            placeholder="Enter product count"
            name="productCount"
            onChange={(e) => handleChange(e)}
            required
          />
          <Input
            type="text"
            placeholder="Enter product width"
            name="productWidth"
            onChange={(e) => handleChange(e)}
            required
          />
          <Input
            type="text"
            placeholder="Enter product heigth"
            name="productHeight"
            onChange={(e) => handleChange(e)}
            required
          />
          <Input
            type="text"
            placeholder="Enter product weigth"
            name="productWeight"
            onChange={(e) => handleChange(e)}
            required
          />

          <Button type="submit" color="primary">
            {isPending ? "Loading..." : "Add"}
          </Button>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
      </ModalFooter>
    </>
  );
}
