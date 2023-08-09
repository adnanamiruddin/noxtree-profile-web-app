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

const createAccount = async (accountData, userId, token) => {
  try {
    const response = await api.post(`${ENDPOINTS.accounts}`, accountData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    await api.put(
      `${ENDPOINTS.users}/${userId}`,
      {
        account: response.data.data.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw Error(error);
  }
};

const createLink = async (linkData, userAccount, token) => {
  try {
    const response = await api.post(`${ENDPOINTS.links}`, linkData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);

    // const selectedAccount = await getSelectedAccount(userAccount.slug);
    // const selectedAccountData = selectedAccount.data.data[0];
    // // console.log(selectedAccountData);

    // const newLink = response.data.data;
    // const existingLinks = await getAccountLinks(userAccount.slug);
    // const updateAccount = [...existingLinks.data.data, newLink];
    // console.log(updateAccount);

    // const up = await api.put(
    //   `${ENDPOINTS.accounts}/${userAccount.id}`,
    //   {
    //     links: {
    //       data: [...existingLinks.data.data, newLink],
    //     },
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // console.log(up);
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
};
