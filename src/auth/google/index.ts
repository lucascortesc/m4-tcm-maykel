import * as queryString from "query-string"

const queryParams = queryString.stringify({
    client_id: process.env.GOOGLE_ID,
    redirect_uri: "https://localhost:8080/auth/google",
    scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent"
})

const loginGoogleUrl = `https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`