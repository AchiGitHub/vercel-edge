import { KeyValuePair } from "types/common";

const setBearerToken = (headers: KeyValuePair) => {

  const token = localStorage.getItem('authToken');

  if (token) {
    return {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  } else {
    return headers;
  }
};

export { setBearerToken };
