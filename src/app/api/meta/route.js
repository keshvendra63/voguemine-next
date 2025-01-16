import axios from 'axios';

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the JSON body from the request
    const { eventName, eventData } = body;

    const pixelId = process.env.NEXT_PUBLIC_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;
    const response = await axios.post(
      `https://graph.facebook.com/v16.0/${pixelId}/events`,
      {
        data: [
          {
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000), // Current timestamp in seconds
            user_data: {
              client_ip_address: req.headers.get('x-forwarded-for') || '127.0.0.1',
              client_user_agent: req.headers.get('user-agent') || 'Unknown',
            },
            custom_data: eventData,
          },
        ],
        test_event_code: "TEST75239",
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return new Response(JSON.stringify({ success: true, response: response.data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending event:', error);

    return new Response(
      JSON.stringify({ success: false, error:error?.response?.data || error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
