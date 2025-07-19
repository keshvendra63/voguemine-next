import * as XLSX from 'xlsx';
import connectDb from '../../../../../config/connectDb';
import { OrderModel1 } from '../../../../../models/orderModel';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get('days'), 10);

    if (isNaN(days) || days <= 0) {
      return NextResponse.json({ error: 'Invalid days value' }, { status: 400 });
    }

    await connectDb();

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const orders = await OrderModel1.find({
      createdAt: { $gte: fromDate },
    });

    if (orders.length === 0) {
      return NextResponse.json({ error: 'No orders found' }, { status: 404 });
    }

    const data = orders.map(order => ({
      OrderNumber: order.orderNumber,
      Email: order.shippingInfo.email,
      Mobile: order.shippingInfo.phone,
      FirstName: order.shippingInfo.firstname,
      OrderType: order.orderType,
      Address: order.shippingInfo.address,
      City: order.shippingInfo.city,
      State: order.shippingInfo.state,
      Pincode: order.shippingInfo.pincode,
      Amount: order.finalAmount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

    const buffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    const uint8Array = new Uint8Array(buffer);

    return new Response(uint8Array, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename="orders.xlsx"',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Length': uint8Array.length.toString(),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}