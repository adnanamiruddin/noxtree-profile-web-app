import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import nookies from "nookies";
import api from "@/api";
import Input from "@/components/Input";
import InputImage from "@/components/InputImage";
import TextArea from "@/components/TextArea";
import Image from "next/image";
import { getAccountLinks, getSelectedAccount } from "@/api/services";
import Link from "next/link";
import UserCard from "@/components/UserCard";

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

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      setNewAccount({ ...newAccount, photo: file });
    }
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
        {userData ? (
          <div className="bg-gradient-to-l from-blue-950 to-transparent flex">
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap gap-10 py-8 pr-12 justify-between w-9/12"
            >
              <div className="basis-2/4">
                <Input
                  label="Full Name"
                  isRequire
                  name="fullname"
                  placeholder="Your Name..."
                  handleChangeInput={handleChangeInput}
                />
              </div>

              <div className="basis-1/3">
                <Input
                  label="URL"
                  isRequire
                  name="slug"
                  placeholder="your.name"
                  handleChangeInput={handleChangeInput}
                />
              </div>

              <div className="basis-2/4">
                <TextArea
                  label="Bio"
                  name="bio"
                  placeholder="I am..."
                  handleChangeInput={handleChangeInput}
                />
              </div>

              <div className="flex flex-col basis-1/3 items-end">
                <InputImage
                  label="Photo"
                  selectedImage={selectedImage}
                  handleImageChange={handleImageChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary basis-1/4 m-auto"
              >
                SAVE
              </button>
            </form>

            <UserCard userData={userData} />
          </div>
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
