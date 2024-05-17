import Image from "next/image";
import { api } from "~/trpc/server";
import Edit from "../_comp/Edit";
import Comment from "../_comp/Comment";

export default async function Product({ params }: { params: { id: string } }) {
  const product = await api.product.product({ id: params.id });

  return (
    <div>
      <div className="flex max-w-[20em] flex-col gap-2 rounded-lg bg-white p-3">
        <Image
          src={
            product?.imageUrl ??
            "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
          }
          height={300}
          width={500}
          alt={product?.name ?? ""}
        />
        <p className="text-2xl font-bold text-black">{product?.name}</p>
        <p className="text-2xl font-normal text-black">
          count: {product?.count}
        </p>
        <p className="text-2xl font-normal text-black">
          heigth: {product?.heigth}
        </p>
        <p className="text-2xl font-normal text-black">
          width: {product?.width}
        </p>
        <p className="text-2xl font-normal text-black">
          weigth: {product?.weigth}
        </p>
        <Edit product={product} />
      </div>
      <Comment id={params.id} />
    </div>
  );
}
