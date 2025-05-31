import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = twilio(accountSid, authToken);
export async function POST(req){
const {searchParams}=new URL(req.url)
  const phone =searchParams.get("phone") || ""

  try {
    const verification = await client.verify.v2
    .services(verifySid)
    .verifications.create({ to:`+91${phone}`, channel: 'sms' });

    return Response.json({ success: true, sid: verification.sid, message: 'OTP sent successfully' },{status:200})

  } catch (error) {
    return Response.json({ success: false, message: 'Failed to send OTP', error: error.message },{status:500})
  }
}
