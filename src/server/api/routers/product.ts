import { input } from "@nextui-org/react";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        productName: z.string(),
        imageUrl: z.string(),
        productCount: z.string(),
        productWidth: z.string(),
        productHeight: z.string(),
        productWeight: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.create({
        data: {
          name: input.productName,
          imageUrl: input.imageUrl,
          count: Number(input.productCount),
          width: Number(input.productWeight),
          heigth: Number(input.productHeight),
          weigth: Number(input.productWeight),
        },
      });
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string(),
        productName: z.string(),
        imageUrl: z.string(),
        productCount: z.string(),
        productWidth: z.string(),
        productHeight: z.string(),
        productWeight: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.productName,
          imageUrl: input.imageUrl,
          count: Number(input.productCount),
          width: Number(input.productWeight),
          heigth: Number(input.productHeight),
          weigth: Number(input.productWeight),
        },
      });
    }),

  products: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),

  product: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.product.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  deleteProduct: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.delete({
        where: {
          id: input.id,
        },
      });
    }),

  addComment: publicProcedure
    .input(z.object({ id: z.string(), comment: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.comment.create({
        data: {
          description: input.comment,
          productId: input.id,
        },
      });
    }),

  comment: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.comment.findMany({
        where: {
          productId: input.id,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }),

  deleteCommet: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.comment.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
