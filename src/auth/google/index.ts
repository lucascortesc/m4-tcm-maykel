import axios from "axios";
import * as queryString from "query-string";

const queryParams = queryString.stringify({
  client_id: process.env.GOOGLE_ID,
  redirect_uri: "https://cipad.herokuapp.com/auth/google",
  scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"].join(
    " "
  ),
  response_type: "code",
  access_type: "offline",
  prompt: "consent",
});

export const loginGoogleUrl = `https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`;

export async function getGoogleToken(code: any) {
  const { data } = await axios({
    url: "https://oauth2.googleapis.com/token",
    method: "post",
    data: {
      client_id: process.env.GOOGLE_ID,
      client_secret: process.env.GOOGLE_SECRET,
      redirect_uri: "https://cipad.herokuapp.com/auth/google",
      grant_type: "authorization_code",
      code,
    },
  });

  return data.access_token;
}

export async function getGoogleInfo(token: any) {
  const { data } = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
