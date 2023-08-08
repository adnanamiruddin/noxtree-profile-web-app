import { useEffect, useState } from "react";
import nookies from "nookies";
import api from "@/api";
import Image from "next/image";
import { createAccount } from "@/api/services";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [userAccounts, setUserAccounts] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [newAccount, setNewAccount] = useState({
    fullname: "",
    bio: "",
    slug: "",
    photo: null,
    user: null,
  });
  const [token, setToken] = useState(null);

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

          // console.log(response.data);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      setNewAccount({ ...newAccount, photo: file });
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(newAccount)); // Mengirim data sebagai string JSON
      formData.append("files.photo", newAccount.photo); // Mengirim file gambar

      await createAccount(formData, userData.id, token);
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome, {userData.username}!</h1>
          <h1>Welcome, {userAccounts?.fullname}!</h1>
          <p>Email: {userData.email}</p>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="mr-4">Full Name</label>
            <input
              type="text"
              name="fullname"
              placeholder="Type here"
              onChange={handleChangeInput}
              className="input input-bordered w-full max-w-xs"
            />
            <label className="mr-4">Bio</label>
            <input
              type="text"
              name="bio"
              placeholder="Type here"
              onChange={handleChangeInput}
              className="input input-bordered w-full max-w-xs"
            />
            <label className="mr-4">URL</label>
            <input
              type="text"
              name="slug"
              placeholder="Type here"
              onChange={handleChangeInput}
              className="input input-bordered w-full max-w-xs"
            />
            <div className="flex flex-col">
              <label className="mr-4">Photo</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleImageChange}
              />
              {selectedImage && (
                <Image
                  width={500}
                  height={500}
                  src={selectedImage}
                  alt="Selected"
                  className="mt-4 max-w-xs"
                />
              )}
            </div>
            <button type="submit">SIMPAN</button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
