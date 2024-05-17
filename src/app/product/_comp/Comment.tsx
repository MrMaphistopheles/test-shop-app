"use client";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function Comment({ id }: { id: string }) {
  const [comment, setComment] = useState<string>("");

  const { data, refetch } = api.product.comment.useQuery({ id });
  const { mutate } = api.product.addComment.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const { mutate: deleteCommet } = api.product.deleteCommet.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const handleComment = () => {
    mutate({ id, comment });
  };
  return (
    <div className="flex max-w-[20em] flex-col gap-2 rounded-lg bg-white p-3">
      <div className="flex min-h-[10em] flex-col gap-2 bg-slate-100 p-1">
        {data?.map((i) => (
          <div
            key={i.id}
            className="flex w-full items-center justify-between rounded-full bg-blue-400 px-3 py-1 text-white "
          >
            <p>{i.description}</p>

            <Button
              size="sm"
              color="danger"
              onClick={() => deleteCommet({ id: i.id })}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter your comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <Button color="primary" onClick={handleComment}>
          Send
        </Button>
      </div>
    </div>
  );
}
