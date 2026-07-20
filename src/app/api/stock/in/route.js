import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const { productId, quantity } = await request.json();

    await prisma.$transaction(async (tx) => {
      await tx.stockMovement.create({
        data: {
          productId,
          quantity,
          type: "IN",
        },
      });

      await tx.product.update({
        where: {
          id: productId,
        },
        data: {
          stock: {
            increment: quantity,
          },
        },
      });
    });

    return NextResponse.json({
      message: "Stok berhasil ditambahkan.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan.",
      },
      {
        status: 500,
      }
    );
  }
}