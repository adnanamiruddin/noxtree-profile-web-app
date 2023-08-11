import api from ".";
import nookies from "nookies";
import Router from "next/router";
import { toast } from "react-toastify";

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
    if (response.data.jwt) {
      nookies.set(null, "token", response.data.jwt);
      Router.replace("/dashboard");
      setTimeout(() => {
        toast.success("Welcome back ngab 👋😅 How are you? 😀");
      }, 500);
    }
  } catch (error) {
    toast.error("Failed to login! 🗿");
  }
};

const register = async (account) => {
  try {
    const response = await api.post(`/auth/local/register`, account);
    if (response.data.jwt) {
      nookies.set(null, "token", response.data.jwt);
      Router.replace("/dashboard");
      setTimeout(() => {
        toast.success("Welcome ngab 👋😁 Lets manage your NoxTree links! 😎");
      }, 500);
    }
  } catch (error) {
    toast.error("Failed to regist! 🗿");
  }
};

const createAccount = async (accountData, token) => {
  try {
    const response = await api.post(`${ENDPOINTS.accounts}`, accountData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) return true;
  } catch (error) {
    throw Error(error);
  }
};

const createLink = async (linkData, token) => {
  try {
    const response = await api.post(`${ENDPOINTS.links}`, linkData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) return true;
  } catch (error) {
    throw Error(error);
  }
};

const deleteLink = async (linkId, token) => {
  try {
    const response = await api.delete(`${ENDPOINTS.links}/${linkId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) return true;
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
    if (response.status === 200) return true;
  } catch (error) {
    throw Error(error);
  }
};

export {
  getAllAccounts,
  getSelectedAccount,
  getAccountLinks,
  login,
  register,
  createAccount,
  createLink,
  deleteLink,
  updateLink,
};
