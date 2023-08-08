import { useEffect, useState } from "react";
import nookies from "nookies";
import api from "@/api";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [userAccounts, setUserAccounts] = useState({});

  useEffect(() => {
    // Mengambil token JWT dari cookie menggunakan nookies
    const cookies = nookies.get();
    const token = cookies.token;

    // Jika token ada, kirim permintaan ke API Strapi untuk mendapatkan data pengguna
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await api.get("/users/me?populate=*", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log(response.data);

          if (response.status === 200) {
            // Berhasil mendapatkan data pengguna
            setUserData(response.data);
            setUserAccounts(response.data.account);
          } else {
            // Tangani jika permintaan gagal
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
          <h1>Welcome, {userAccounts.fullname}!</h1>
          <p>Email: {userData.email}</p>
          {/* Tampilkan data pengguna lainnya */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
