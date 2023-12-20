export const createAction = (type) => {
  return (payload) => ({ type, payload });
};
