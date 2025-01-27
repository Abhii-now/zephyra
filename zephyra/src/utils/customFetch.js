import { store } from "app/store";

const customFetch = async (url, options = {}) => {
  const state = store.getState();
  const token = state.auth.accessToken;
  console.log(token);
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const updatedOptions = {
    ...options,
    headers,
  };

  return fetch(url, updatedOptions);
};

export default customFetch;
