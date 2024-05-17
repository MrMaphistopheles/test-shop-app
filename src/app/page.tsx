import { api } from "~/trpc/server";
import Card from "./_components/Card/Card";

export default async function Home() {
  const product = await api.product.products();

  return (
    <>
      {product &&
        product?.map((i) => (
          <Card
            id={i.id}
            key={i.id}
            src={i.imageUrl ?? ""}
            alt={i.name}
            name={i.name}
            count={i.count}
          />
        ))}
    </>
  );
}
