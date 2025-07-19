import * as XLSX from 'xlsx';
import connectDb from '../../../../../config/connectDb';
import { OrderModel1 } from '../../../../../models/orderModel';
import Oldorder from '../../../../../models/oldOrderModel';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const dataType = searchParams.get('data'); // 'voguemine' or 'shopify'

    // Validate required parameters
    if (!dataType) {
      return NextResponse.json({ error: 'Data type is required' }, { status: 400 });
    }

    await connectDb();

    let orders = [];
    let filename = '';

    if (dataType === 'voguemine') {
      // Validate date range for voguemine
      if (!startDate || !endDate) {
        return NextResponse.json({ error: 'Start date and end date are required for voguemine data' }, { status: 400 });
      }

      // Parse dates and validate
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
      }

      if (start > end) {
        return NextResponse.json({ error: 'Start date cannot be later than end date' }, { status: 400 });
      }

      // Set end date to end of day
      end.setHours(23, 59, 59, 999);

      // Fetch orders from OrderModel1 within date range
      orders = await OrderModel1.find({
        createdAt: { 
          $gte: start,
          $lte: end 
        },
      });

      filename = `voguemine-orders-${startDate}-to-${endDate}.xlsx`;
    } 
    else if (dataType === 'shopify') {
      // For shopify, get all data from OldOrderModel (no date filter)
      orders = await Oldorder.find({});
      filename = `shopify-all-orders.xlsx`;
    }
    else {
      return NextResponse.json({ error: 'Invalid data type. Use "voguemine" or "shopify"' }, { status: 400 });
    }

    if (orders.length === 0) {
      return NextResponse.json({ error: 'No orders found for the specified criteria' }, { status: 404 });
    }
    const formatDate = (dateValue) => {
      if (!dateValue) return '';
      
      try {
        let date;
        
        // Handle different date formats
        if (typeof dateValue === 'string') {
          // Handle Shopify format like "2024-03-28 16:58:31 +0530"
          if (dateValue.includes('+') || dateValue.includes('-')) {
            // Remove timezone part and create date
            const dateWithoutTz = dateValue.split(' +')[0].split(' -')[0];
            date = new Date(dateWithoutTz);
          } else {
            date = new Date(dateValue);
          }
        } else {
          date = new Date(dateValue);
        }
        
        return isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-IN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (error) {
        console.error('Date formatting error:', error);
        return '';
      }
    };

    // Helper function to safely get array values
    const getArrayValue = (arr, index = 0) => {
      return Array.isArray(arr) && arr.length > index ? arr[index] : '';
    };
    let data = [];

if (dataType === 'voguemine') {
      // Format data for voguemine orders
      data = orders.map(order => ({
        OrderNumber: order.orderNumber || '',
        Email: order.shippingInfo?.email || '',
        Mobile: order.shippingInfo?.phone || '',
        FirstName: order.shippingInfo?.firstname || '',
        OrderType: order.orderType || '',
        Address: order.shippingInfo?.address || '',
        City: order.shippingInfo?.city || '',
        State: order.shippingInfo?.state || '',
        Pincode: order.shippingInfo?.pincode || '',
        Amount: order.finalAmount || 0,
        CreatedAt: formatDate(order.createdAt),
      }));
    } 
    else if (dataType === 'shopify') {
      // Format data for shopify orders
      data = orders.map(order => ({
        OrderNumber: order.orderNumber || order.id || '',
        Email: order.email || order.customer?.email || '',
        Mobile: getArrayValue(order.phone) || order.customer?.phone || '',
        OrderType: order.orderType || '',
        FirstName: getArrayValue(order.name) || order.customer?.firstName || '',
        Address: getArrayValue(order.address) || order.shippingAddress?.address || '',
        City: getArrayValue(order.city) || order.shippingAddress?.city || '',
        State: getArrayValue(order.state) || order.shippingAddress?.province || '',
        Pincode: order.zipcode || order.shippingAddress?.zip || '',
        Amount: order.finalAmount || order.total_price || 0,
        CreatedAt: formatDate(order.dateTime || order.createdAt),
      }));
    }

    // Create Excel workbook
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

    // Generate buffer
    const buffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    const uint8Array = new Uint8Array(buffer);

    return new Response(uint8Array, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Length': uint8Array.length.toString(),
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Something went wrong during export' }, { status: 500 });
  }
}