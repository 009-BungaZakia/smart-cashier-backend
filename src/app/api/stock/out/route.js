import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const { productId, quantity } = await request.json();

    // Cari produk
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    // Produk tidak ditemukan
    if (!product) {
      return NextResponse.json(
        {
          message: "Produk tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    // Cek stok
    if (product.stock < quantity) {
      return NextResponse.json(
        {
          message: "Stok tidak mencukupi.",
        },
        {
          status: 400,
        }
      );
    }

    // Transaction
    await prisma.$transaction(async (tx) => {
      await tx.stockMovement.create({
        data: {
          productId,
          quantity,
          type: "OUT",
        },
      });

      await tx.product.update({
        where: {
          id: productId,
        },
        data: {
          stock: {
            decrement: quantity,
          },
        },
      });
    });

    return NextResponse.json({
      message: "Stok berhasil dikurangi.",
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