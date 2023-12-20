export const startSession = (user) => {
  document.cookie = `email=${user.email};`;
  document.cookie = `accessToken=${user.accessToken};`;
  document.cookie = `user=${JSON.stringify(user)};`;
}

export const getSession = () => {
  const cookies = Object.fromEntries(document.cookie.split("; ").map(cookie => cookie.split("=")));
  if (cookies.email && cookies.accessToken && cookies.user) {
    return {
      email: cookies.email,
      accessToken: cookies.accessToken,
      user: JSON.parse(cookies.user)
    };
  } else {
    return null;
  }
}

export const endSession = () => {
  document.cookie.split("; ").forEach(cookie => {
    document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
  });
}

export const isLoggedIn = () => {
  return getSession();
}