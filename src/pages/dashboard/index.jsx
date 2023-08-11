import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import nookies from "nookies";
import api from "@/api";
import Input from "@/components/Input";
import InputImage from "@/components/InputImage";
import TextArea from "@/components/TextArea";
import { createAccount, getSelectedAccount } from "@/api/services";
import UserCard from "@/components/UserCard";
import Loading from "@/components/Loading";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import ToastNotif from "@/components/ToastNotif";

export default function Dashboard() {
  const [userData, setUserData] = useState({
    account: {
      fullname: "(Your Full Name...)",
      bio: "(Your Bio...)",
      slug: "(your.slug)",
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
  const [inputValues, setInputValues] = useState({
    fullname: "",
    bio: "",
    slug: "",
  });
  const [isEditing, setIsEditing] = useState(false);

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

          if (response) {
            setNewAccount({ ...newAccount, user: response.data.id });
          }
          if (response.data.account) {
            setUserData(response.data);

            const account = await getSelectedAccount(
              response.data.account.slug
            );

            if (account.data.data[0].attributes.photo?.data?.attributes?.url) {
              const photoUrl = `${process.env.NEXT_PUBLIC_ASSET_URL}${account.data.data[0].attributes.photo.data.attributes.url}`;
              const response = await fetch(photoUrl);
              const blob = await response.blob();

              const imageFile = new File([blob], "photo.jpg", {
                type: "image/jpeg",
              });

              setSelectedImage(photoUrl);
              setNewAccount((prevNewAccount) => ({
                ...prevNewAccount,
                photo: imageFile,
              }));
            } else {
              setSelectedImage(null);
            }
          }
        } catch (error) {
          toast.error("Error fetching user data");
        }
      };

      fetchUserData();
    }
  }, []);

  // useEffect(() => {
  //   if (userData.account.fullname) {
  //     setInputValues((prevInputValues) => ({
  //       ...prevInputValues,
  //       fullname: userData.account.fullname,
  //     }));
  //   }

  //   if (userData.account.slug) {
  //     setInputValues((prevInputValues) => ({
  //       ...prevInputValues,
  //       slug: userData.account.slug,
  //     }));
  //   }

  //   if (userData.account.bio) {
  //     setInputValues((prevInputValues) => ({
  //       ...prevInputValues,
  //       bio: userData.account.bio,
  //     }));
  //   }
  // }, [userData.account.fullname, userData.account.slug, userData.account.bio]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
    // setInputValues((prevInputValues) => ({
    //   ...prevInputValues,
    //   [name]: value,
    // }));
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

      formData.append("data", JSON.stringify(newAccount));
      formData.append("files.photo", newAccount.photo);

      const success = await createAccount(formData, token);
      if (success) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error("Failed to create account");
    }
  };

  return (
    <main className="lg:flex">
      <ToastNotif />
      <Sidebar />
      <div className="p-6 lg:p-12 pt-12 w-full mt-12 sm:mt-16 lg:mt-0">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        <div className="divider my-6" />
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
                  handleInputChange={handleInputChange}
                />
              </div>

              <div className="w-full lg:basis-1/3">
                <Input
                  label="URL"
                  isRequire
                  name="slug"
                  placeholder="your.name"
                  handleInputChange={handleInputChange}
                />
              </div>

              <div className="w-full lg:basis-2/4">
                <TextArea
                  label="Bio"
                  name="bio"
                  placeholder="I am..."
                  handleInputChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col w-full lg:basis-1/3 items-start">
                <InputImage
                  label="Photo"
                  name="photo"
                  selectedImage={selectedImage}
                  handleImageChange={handleImageChange}
                />
              </div>

              <Button
                label={
                  userData.account.fullname !== "(Your Full Name...)"
                    ? "UPDATE"
                    : "SAVE"
                }
              />
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

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  if (!cookies.token) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: {},
  };
}
