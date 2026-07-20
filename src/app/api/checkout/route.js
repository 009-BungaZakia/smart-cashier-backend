import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const total = body.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    let transaction;

    await prisma.$transaction(async (tx) => {
      // Buat transaksi
      transaction = await tx.transaction.create({
        data: {
          total,
        },
      });

      // Simpan semua item transaksi
      for (const item of body.items) {
        await tx.transactionItem.create({
          data: {
            transactionId: transaction.id,
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.price * item.quantity,
          },
        });

        // Ambil data produk
        const product = await tx.product.findUnique({
          where: {
            id: item.id,
          },
        });

        // Validasi produk
        if (!product) {
          throw new Error(`Produk dengan ID ${item.id} tidak ditemukan.`);
        }

        // Validasi stok
        if (product.stock < item.quantity) {
          throw new Error(
            `Stok ${product.name} tidak mencukupi.`
          );
        }

        // Kurangi stok
        await tx.product.update({
          where: {
            id: item.id,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        // Catat Stock Movement
        await tx.stockMovement.create({
          data: {
            productId: item.id,
            type: "OUT",
            quantity: item.quantity,
          },
        });
      }
    });

    return NextResponse.json({
      message: "Transaksi berhasil dibuat",
      transaction,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}