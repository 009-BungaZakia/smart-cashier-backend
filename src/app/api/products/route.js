import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


// GET semua produk
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(products);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}


// POST tambah produk
export async function POST(request) {
  try {
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        price: Number(body.price),
        stock: Number(body.stock),
      },
    });

    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal menambahkan produk." },
      { status: 500 }
    );
  }
}


// PUT update produk
export async function PUT(request) {
  try {
    const body = await request.json();

    console.log(body); // cek data masuk

    const product = await prisma.product.update({
      where: {
        id: Number(body.id),
      },
      data: {
        name: body.name,
        price: Number(body.price),
        stock: Number(body.stock),
      },
    });

    return NextResponse.json(product);

  } catch (error) {

    console.error("ERROR UPDATE:", error);

    return NextResponse.json(
      { 
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// DELETE hapus produk
export async function DELETE(request) {
  try {

    const body = await request.json();

    const product = await prisma.product.delete({
      where: {
        id: Number(body.id),
      },
    });


    return NextResponse.json({
      message: "Produk berhasil dihapus",
      product
    });


  } catch (error) {

    console.error("ERROR DELETE:", error);

    return NextResponse.json(
      {
        message: "Gagal menghapus produk."
      },
      {
        status: 500
      }
    );
  }
}