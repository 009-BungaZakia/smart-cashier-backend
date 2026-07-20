import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  try {

    const transactions = await prisma.transaction.findMany({
      orderBy:{
        createdAt:"desc"
      },

      include:{
        items:{
          include:{
            product:true
          }
        }
      }
    });


    return NextResponse.json({
      data: transactions
    });


  } catch(error){

    console.error(error);

    return NextResponse.json(
      {
        message:"Gagal mengambil transaksi"
      },
      {
        status:500
      }
    );

  }
}