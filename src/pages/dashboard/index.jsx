import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import nookies from "nookies";
import api from "@/api";
import Input from "@/components/Input";
import InputImage from "@/components/InputImage";
import TextArea from "@/components/TextArea";
import { createAccount } from "@/api/services";
import UserCard from "@/components/UserCard";
import Loading from "@/components/Loading";
import ButtonSubmit from "@/components/ButtonSubmit";

export default function Dashboard() {
  const [userData, setUserData] = useState({
    account: {
      fullname: "(Your Full Name)",
      bio: "",
      slug: "",
    },
  });
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
          console.log(response);

          if (response.data.account) {
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
    <main className="lg:flex">
      <Sidebar />
      <div className="p-6 lg:p-12 pt-12 w-full mt-12 lg:mt-0">
        <h1 className="text-4xl font-semibold mb-6">Dashboard</h1>
        {userData ? (
          <div className="bg-gradient-to-l from-blue-950 to-transparent flex flex-col-reverse lg:flex-row">
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap gap-10 py-8 px-3 lg:pr-12 justify-between w-full lg:w-9/12"
            >
              <div className="w-full lg:basis-2/4">
                <Input
                  label="Full Name"
                  isRequire
                  name="fullname"
                  placeholder="Your Name..."
                  handleChangeInput={handleChangeInput}
                />
              </div>

              <div className="w-full lg:basis-1/3">
                <Input
                  label="URL"
                  isRequire
                  name="slug"
                  placeholder="your.name"
                  handleChangeInput={handleChangeInput}
                />
              </div>

              <div className="w-full lg:basis-2/4">
                <TextArea
                  label="Bio"
                  name="bio"
                  placeholder="I am..."
                  handleChangeInput={handleChangeInput}
                />
              </div>

              <div className="flex flex-col w-full lg:basis-1/3 items-start lg:items-end">
                <InputImage
                  label="Photo"
                  selectedImage={selectedImage}
                  handleImageChange={handleImageChange}
                />
              </div>

              <ButtonSubmit />
            </form>

            <UserCard userData={userData} />
          </div>
        ) : (
          <div className="-mt-32">
            <Loading />
          </div>
        )}
      </div>
    </main>
  );
}
