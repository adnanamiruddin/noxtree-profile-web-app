import { useEffect, useState } from "react";
import nookies from "nookies";
import api from "@/api";
import Image from "next/image";
import {
  createAccount,
  createLink,
  deleteLink,
  getAccountLinks,
  updateLink,
} from "@/api/services";

export default function Dashboard() {

  useEffect(() => {
    // Mengambil token JWT dari cookie menggunakan nookies
    const cookies = nookies.get();
    const token = cookies.token;

    // Jika token ada, kirim permintaan ke API Strapi untuk mendapatkan data pengguna
    if (token) {
      setToken(token);
      const fetchUserData = async () => {
        try {
          const response = await api.get("/users/me?populate=*", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            setUserData(response.data);
            setNewAccount({ ...newAccount, user: response.data.id });
            setUserAccount(response.data.account);
            setNewLink({ ...newLink, account: response.data.account.id });

            const links = await getAccountLinks(response.data.account.slug);
            setAccountLinks(links.data.data);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []);



  

  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome, {userData.username}!</h1>
          <h1>Welcome, {userAccount?.fullname}!</h1>
          <p>Email: {userData.email}</p>

          

          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
