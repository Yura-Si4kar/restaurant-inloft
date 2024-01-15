export const startSession = (token) => {
  document.cookie = `accessToken=${token}; path=/;`;
};

export const getSession = () => {
  const cookies = Object.fromEntries(
    document.cookie.split('; ').map((cookie) => cookie.split('=')),
  );
  if (cookies.accessToken) {
    return {
      accessToken: cookies.accessToken,
    };
  } else {
    return null;
  }
};

export const endSession = () => {
  document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export const isLoggedIn = () => {
  return false && !!getSession().accessToken;
};
