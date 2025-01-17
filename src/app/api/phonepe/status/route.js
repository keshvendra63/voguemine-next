import crypto from "crypto";
import axios from "axios";
const SHA256 = (data) => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const merchantTransactionId = searchParams.get("merchantTransactionId");

    const orderData =JSON.parse(searchParams.get("orderData"))
  
    if (!merchantTransactionId) {
      return Response.json(
        { success: false, error: "Merchant Transaction ID is required" },
        { status: 400 }
      );
    }
  
    try {
      const statusEndpoint = `/pg/v1/status/${process.env.PMID}/${merchantTransactionId}`;
      const xVerify = SHA256(statusEndpoint + process.env.PSALT) + "###" + process.env.PSALATINDEX;
  
      const options = {
        method: "GET",
        url: `${process.env.PHONEPE_HOST}${statusEndpoint}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": xVerify,
          "X-MERCHANT-ID": process.env.PMID,
        },
      };
  
      const statusResponse = await axios.request(options);
  
      if (statusResponse.data.code === "PAYMENT_SUCCESS") {
        const response = await axios.post(
          "http://localhost:3000/api/order/create-order",
          (orderData.parsedBody)
        );
    
        // Step 5: Extract the necessary details from the API response
        const { success, orderNumber, amount, firstname } = response.data;
        
        if (success) {
          // Step 6: Construct the redirect URL with query parameters
          const redirectUrl = `http://localhost:3000/thankyou?orderNumber=${orderNumber}&firstname=${firstname}&amount=${amount}`;
    
          // Step 7: Redirect the user to the thank you page
          return new Response(null, {
            status: 302,
            headers: {
              Location: redirectUrl,  // Redirect user to the thank you page
            },
          });
        }
      } else {
        return Response.json(
          { success: false, status: "Payment Failed" },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("Error in GET handler:", error.message);
      return Response.json(
        { success: false, error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }