// lib/onextelApi.js

const BASE_URL = 'https://365cx.io';


// Function to get the authentication token (from memory or re-generate)
// export async function getAuthToken() {
//   if (authToken) {
//     return authToken;
//   }

//   const email = process.env.NEXT_PUBLIC_ONEXTEL_API_EMAIL;
//   const password = process.env.NEXT_PUBLIC_ONEXTEL_API_PASSWORD;

//   if (!email || !password) {
//     throw new Error('Onextel API email and password are not configured in environment variables.');
//   }

//   const response = await fetch(`${BASE_URL}/account/enterprise/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
//   });

//   const data = await response.json();

//   if (data.status && data.response && data.response.token) {
//     authToken = data.response.token;
//     return authToken;
//   } else {
//     throw new Error(`Failed to generate token: ${data.message.message || 'Unknown error'}`);
//   }
// }

// Common function for sending messages
async function sendMessage(payload) {
  const token = "QcJw7G6iZIdkyMzhhIfDPYawZbdSY3kZeaVAFyAgenIfXZJCEMLuKFgxM9RtZPcl";
  try{
    const response = await fetch(`${BASE_URL}/chatbird/api/message/send`, {
    method: 'POST',
    headers: {
      'authentication-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.status) {
    return data.data; // Returns the message ID
  } else {
    throw new Error(`Failed to send message: ${data.message?.message || data.message || 'Unknown error'}`);
  }

  }catch(err){
    console.log(err)
  }

  
}

export async function sendTextMessage({ from, to, journeyId, templateId, deptId, callbackUrl, metaData }) {
  const payload = {
    from,
    to,
    journeyId,
    message: {
      template: {
        templateId,
      },
    },
  };

  if (deptId) payload.deptId = deptId;
  if (callbackUrl) payload.callbackUrl = callbackUrl;
  if (metaData) payload.metaData = metaData;

  return sendMessage(payload);
}


export async function sendVariableMessage({
  from,
  to,
  journeyId,
  templateId,
  headerParameterValues,
  parameterValues,
  buttons,
  deptId,
  callbackUrl,
  metaData,
}) {
  const payload = {
    from,
    to,
    journeyId,
    message: {
      template: {
        templateId,
      },
    },
  };

  if (headerParameterValues) payload.message.template.headerParameterValues = headerParameterValues;
  if (parameterValues) payload.message.template.parameterValues = parameterValues;
  if (buttons) payload.message.template.buttons = buttons;
  if (deptId) payload.deptId = deptId;
  if (callbackUrl) payload.callbackUrl = callbackUrl;
  if (metaData) payload.metaData = metaData;

  return sendMessage(payload);
}

export async function sendMediaMessage({ from, to, journeyId, templateId, media, deptId, callbackUrl, metaData }) {
  const payload = {
    from,
    to,
    journeyId,
    message: {
      template: {
        templateId,
        media,
      },
    },
  };

  if (deptId) payload.deptId = deptId;
  if (callbackUrl) payload.callbackUrl = callbackUrl;
  if (metaData) payload.metaData = metaData;

  return sendMessage(payload);
}

export async function sendMediaVariableButtonMessage({
  from,
  to,
  journeyId,
  templateId,
  parameterValues,
  media,
  buttons,
  deptId,
  callbackUrl,
  metaData,
}) {
  const payload = {
    from,
    to,
    journeyId,
    message: {
      template: {
        templateId,
        media,
      },
    },
  };

  if (parameterValues) payload.message.template.parameterValues = parameterValues;
  if (buttons) payload.message.template.buttons = buttons;
  if (deptId) payload.deptId = deptId;
  if (callbackUrl) payload.callbackUrl = callbackUrl;
  if (metaData) payload.metaData = metaData;

  return sendMessage(payload);
}

export async function sendCarouselMessage({ from, to, journeyId, templateId, cards, parameterValues, callbackUrl }) {
  const payload = {
    from,
    to,
    journeyId,
    message: {
      template: {
        templateId,
        cards,
      },
    },
  };

  if (parameterValues) payload.message.template.parameterValues = parameterValues;
  if (callbackUrl) payload.callbackUrl = callbackUrl;

  return sendMessage(payload);
}

export async function submitLiveAgentRating({ chatId, customerPhoneNumber, rating }) {
  const response = await fetch(`${BASE_URL}/whatsapp/chat/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // The document says "Headers: Add a new key referring to the table below."
      // but then shows the parameters in the body of the curl request.
      // Assuming these are part of the request body based on the curl sample.
      // If they are meant to be HTTP headers, you would add them here:
      // 'chatId': chatId,
      // 'customerPhoneNumber': customerPhoneNumber,
      // 'rating': rating
    },
    body: JSON.stringify({
      chatId,
      customerPhoneNumber,
      rating,
    }),
  });

  // The document doesn't provide a success/failure response for this API,
  // so we'll just check if the response was OK.
  if (response.ok) {
    return { success: true, message: 'Rating submitted successfully' };
  } else {
    const errorData = await response.json().catch(() => ({})); // Try to parse error response
    throw new Error(`Failed to submit rating: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
  }
}
