export const handleLoginWithGoogle = (redirect_uri, id) => {
  const googleAuthUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: redirect_uri,
      response_type: "code",
      include_granted_scopes: true,
      scope: [
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/gmail.send",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
      ].join(" "),
      access_type: "offline",
      state: id || "params",
      prompt: "consent",
    }).toString();
  window.open(googleAuthUrl, "_self");
  // window.open(
  //   `https://accounts.google.com/o/oauth2/v2/auth?
  //   scope=https://www.googleapis.com/auth/gmail.send%20https%3A//www.googleapis.com/auth/gmail.readonly%20https://www.googleapis.com/auth/gmail.readonly%20https://www.googleapis.com/auth/gmail.insert&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https://4555-103-181-34-157.ngrok-free.app/signup&client_id=104072870053-2qcfgqpkspo568lc5njd3gkku33g3sjp.apps.googleusercontent.com`,
  //   "_self"
  // );
};
