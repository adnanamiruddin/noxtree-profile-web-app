import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import nookies from "nookies";
import api from "@/api";
import Image from "next/image";
import Input from "@/components/Input";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
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
    const cookies = nookies.get();
    const token = cookies.token;

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

      await createAccount(formData, token);
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <main className="flex">
      <Sidebar />
      <div className="p-12 w-full">
        <h1 className="text-4xl font-semibold mb-6">Dashboard</h1>
        <div className="bg-gradient-to-l from-blue-950 to-transparent">
          {userData ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap gap-10 py-8 pr-32 justify-between w-5/6"
            >
              <div className="basis-2/4 flex flex-col">
                <label>
                  Full Name <span className="text-red-500 align-middle">*</span>
                </label>
                <Input
                  name="fullname"
                  placeholder="John Doe..."
                  handleChangeInput={handleChangeInput}
                />
              </div>

              <div className="basis-1/3">
                <label>
                  URL <span className="text-red-500 align-middle">*</span>
                </label>
                <Input
                  name="slug"
                  placeholder="John Doe..."
                  handleChangeInput={handleChangeInput}
                />
              </div>

              <div className="basis-2/4">
                <label>Bio</label>
                <textarea
                  type="text"
                  name="bio"
                  placeholder="Type here"
                  onChange={handleChangeInput}
                  className="input input-bordered w-full h-32 p-4 resize-none focus:border-2 focus:border-blue-500 mt-1 active:shadow-lg"
                />
              </div>

              <div className="flex flex-col basis-1/3 items-end">
                <label className="self-start mb-2">Photo</label>
                {selectedImage ? (
                  <Image
                    width={500}
                    height={500}
                    src={selectedImage}
                    alt="Selected"
                  />
                ) : (
                  <Image
                    width={500}
                    height={500}
                    src="https://via.placeholder.com/500x500"
                    alt="Placeholder"
                  />
                )}
                <label className="cursor-pointer mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center">
                  Choose File
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary basis-1/4 m-auto"
              >
                SAVE
              </button>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
    </main>
  );
}
