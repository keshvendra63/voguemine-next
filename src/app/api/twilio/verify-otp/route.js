import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = twilio(accountSid, authToken);

export async function POST(req) {
  const {searchParams}=new URL(req.url)
  const phone =searchParams.get("phone") || ""
  const code =searchParams.get("code") || ""


  try {
    const verification_check = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to:`+91${phone}`, code });

    if (verification_check.status === 'approved') {
        return Response.json({ success: true, message: 'OTP verified successfully' },{status:200})
    } else {
        return Response.json({ success: false, message: 'Invalid or expired OTP' },{status:400})
    }
  } catch (error) {
    return Response.json({ success: false, message: 'OTP verification failed', error: error.message },{status:500})
  }
}
