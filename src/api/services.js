import api from ".";
import nookies from "nookies";
import Router from "next/router";

const ENDPOINTS = {
  accounts: "/accounts",
  links: "/links",
  users: "/users",
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
      nookies.set(null, "token", response.data.jwt);
      Router.replace("/dashboard");
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    throw Error(error);
  }
};

const createAccount = async (accountData, token) => {
  try {
    await api.post(`${ENDPOINTS.accounts}`, accountData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch (error) {
    throw Error(error);
  }
};

const createLink = async (linkData, token) => {
  try {
    await api.post(`${ENDPOINTS.links}`, linkData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch (error) {
    throw Error(error);
  }
};

const deleteLink = async (linkId, token) => {
  try {
    await api.delete(`${ENDPOINTS.links}/${linkId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    throw Error(error);
  }
};

const updateLink = async (linkId, linkData, token) => {
  try {
    const response = await api.put(`${ENDPOINTS.links}/${linkId}`, linkData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return true;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};

export {
  getAllAccounts,
  getSelectedAccount,
  getAccountLinks,
  login,
  createAccount,
  createLink,
  deleteLink,
  updateLink,
};
