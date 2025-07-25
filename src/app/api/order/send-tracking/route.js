import connectDb from "../../../../../config/connectDb";
import {OrderModel1,OrderModel2} from "../../../../../models/orderModel";
import sendEmail from "../../../../../controller/emailController";
import connectDb2 from "../../../../../config/connectDb2";
import { sendVariableMessage } from "../../../../../controller/whatsappApi";
export async function PUT(req){
    const body=await req.json()
    const { name, ordernumber, partner, link, email, orderId,phone,trackingId,trackingLink } =body;
  
    try {
        await connectDb()
        await connectDb2()
      // Await the sendEmail function
      await sendEmail({
        to: email,
        subject: "Celebratory Update: Your Order is on Route!",
        text: "Celebratory Update: Your Order is on Route!",
        htmlContent: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Order Tracking</title>
              <style>
                  body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
                  .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
                  h2 { color: #333333; }
                  p { color: #555555; }
                  .order-details { margin-top: 20px; }
                  .order-details p { margin: 5px 0; }
                  .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dddddd; font-size: 12px; color: #999999; text-align: center; }
              </style>
          </head>
          <body>
              <div class="container">
                  <h2>Celebratory Update: Your Order is on Route!</h2>
                  <p>Dear ${name},</p>
  
                  <div class="order-details">
                      <p>Great news! Your eagerly awaited <strong>Order #${ordernumber}</strong> from voguemine.com has embarked on its journey, swiftly dispatched via our esteemed courier partner, ${partner}.</p>
                      <p>Prepare for the excitement of its arrival by effortlessly tracking its progress through the link provided below.</p>
                      <p><strong>${link}</strong></p>
                  </div>
  
                  <p>Thank you for choosing <strong>voguemine.com</strong> for your shopping needs!</p>
  
                  <div class="footer">
                      <p>&copy; 2024 Voguemine. All rights reserved.</p>
                  </div>
              </div>
          </body>
          </html>
        `
      });
  
      // Update the order status and tracking info
      const updatedOrder = await OrderModel1.findByIdAndUpdate(orderId, {
        orderStatus: 'Fulfilled',
        trackingInfo: {
          partner: partner,
          link: link,
        }
      }, {
        new: true,
      });
  
      const updatedOrder1 = await OrderModel2.findByIdAndUpdate(orderId, {
        orderStatus: 'Fulfilled',
        trackingInfo: {
          partner: partner,
          link: link,
        }
      }, {
        new: true,
      });
      if(updatedOrder){
        await sendVariableMessage({
        from: process.env.WHATSAPP_NUMBER,
        to: `91${phone}`,
        journeyId: process.env.WHATSAPP_JOURNEY_ID,
        templateId: "01jy8vcp36prfat2pc4bhkw744",
        parameterValues: {
                "0": name,
                "1": ordernumber,
                "2": trackingId,
                "3": trackingLink,

        }
      });
      }
  
      return Response.json({ message: 'Tracking email sent successfully', updatedOrder });
  
    } catch (error) {
      console.error('Failed to send message:', error);
      return Response.json({status:500,error:error.message});
    }
  }