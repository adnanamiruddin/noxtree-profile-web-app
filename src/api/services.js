import api from ".";
import nookies from "nookies";
import Router from "next/router";

const ENDPOINTS = {
  accounts: "/accounts",
  links: "/links",
};

const getAllAccounts = async () => {
  try {
    const response = await api.get(ENDPOINTS.accounts);
    return response;
  } catch (error) {
    throw Error(error);
  }
};

const getSelectedAccount = async (slug) => {
  try {
    const response = await api.get(
      `${ENDPOINTS.accounts}?filters[slug][$eqi]=${slug}&populate=*`
    );
    return response;
  } catch (error) {
    throw Error(error);
  }
};

const getAccountLinks = async (slug) => {
  try {
    const response = await api.get(
      `${ENDPOINTS.links}?filters[account][slug][$eqi]=${slug}&populate=*`
    );
    return response;
  } catch (error) {
    throw Error(error);
  }
};

const login = async (account) => {
  try {
    const response = await api.post(`/auth/local`, account);

    if (response.status === 200) {
      // Login berhasil
      // const userData = response.data;
      // return userData;
      nookies.set(null, "token", response.data.jwt);
      Router.replace("/dashboard");
    } else {
      // Tangani jika permintaan login tidak berhasil
      throw new Error("Login failed");
    }
  } catch (error) {
    throw Error(error);
  }
};

// const login = async (email, password) => {
//   try {
//     const response = await api.post(`/auth/local`, {
//       identifier: email,
//       password: password,
//     });

//   } catch (error) {
//     // Tangani jika terjadi kesalahan saat melakukan login
//     console.error("Error during login:", error.message);
//     throw error;
//   }
// };

export { getAllAccounts, getSelectedAccount, getAccountLinks, login };
