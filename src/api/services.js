import api from ".";

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

const login = async (email, password) => {
  try {
    const response = await api.post(`/auth/local`, {
      identifier: email,
      password: password,
    });

    if (response.status === 200) {
      // Login berhasil
      const userData = response.data;
      console.log("Login successful. User data:", userData);
      return userData;
    } else {
      // Tangani jika permintaan login tidak berhasil
      throw new Error("Login failed");
    }
  } catch (error) {
    // Tangani jika terjadi kesalahan saat melakukan login
    console.error("Error during login:", error.message);
    throw error;
  }
};

export {
  getAllAccounts,
  getSelectedAccount,
  getAccountLinks,
  login,
};
