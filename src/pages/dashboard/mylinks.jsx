import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import nookies from "nookies";
import api from "@/api";
import LinksTable from "@/components/LinksTable";
import {
  getAccountLinks,
  createLink,
  deleteLink,
  updateLink,
} from "@/api/services";
import Input from "@/components/Input";
import InputImage from "@/components/InputImage";
import InputStatus from "@/components/InputStatus";
import UserCard from "@/components/UserCard";
import Loading from "@/components/Loading";
import ButtonSubmit from "@/components/ButtonSubmit";
import { toast } from "react-toastify";
import ToastNotif from "@/components/ToastNotif";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function MyLinks() {
  const [userData, setUserData] = useState({
    account: {
      fullname: "(Your Full Name...)",
      bio: "(Your Bio...)",
      slug: "(your.slug)",
    },
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [token, setToken] = useState(null);
  const [accountLinks, setAccountLinks] = useState([]);
  const [newLink, setNewLink] = useState({
    title: "",
    status: "active",
    icon: null,
    url: "",
    account: null,
  });
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [editingLink, setEditingLink] = useState({
    title: "",
    status: "active",
    icon: null,
    url: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [deleteLinkId, setDeleteLinkId] = useState(null);

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
            setNewLink({ ...newLink, account: response.data.account.id });
          }

          if (response.data.account) {
            setUserData(response.data);

            const links = await getAccountLinks(response.data.account.slug);
            setAccountLinks(links.data.data);
          }
        } catch (error) {
          toast.error("Error fetching user data");
        }
      };

      fetchUserData();
    }
  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (!isEditing) setNewLink({ ...newLink, [name]: value });
    else setEditingLink({ ...editingLink, [name]: value });
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      if (!isEditing) setNewLink({ ...newLink, icon: file });
      else setEditingLink({ ...editingLink, icon: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      if (isEditing) {
        formData.append("data", JSON.stringify(editingLink));
        formData.append("files.icon", editingLink.icon);

        const success = await updateLink(editingLinkId, formData, token);
        if (success) {
          const links = await getAccountLinks(userData.account.slug);
          setAccountLinks(links.data.data);
          setIsEditing(false);
          toast.success("Link updated successfully!");
        }
      } else {
        formData.append("data", JSON.stringify(newLink));
        formData.append("files.icon", newLink.icon);

        const success = await createLink(formData, token);
        if (success) {
          const links = await getAccountLinks(userData.account.slug);
          setAccountLinks(links.data.data);
          setNewLink({
            title: "",
            status: "active",
            icon: null,
            url: "",
            account: userData.account.id,
          });
          setSelectedImage(null);
          toast.success("Link created successfully!");
        }
      }
      setSelectedImage(null);
    } catch (error) {
      toast.error("Error creating link!");
    }
  };

  const handleDelete = (id) => {
    setDeleteLinkId(id);
    window.my_delete_modal.showModal();
  };

  const handleDeleteConfirm = async () => {
    if (deleteLinkId) {
      await deleteLink(deleteLinkId, token);
      const links = await getAccountLinks(userData.account.slug);
      setAccountLinks(links.data.data);
      setDeleteLinkId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteLinkId(null);
  };

  const handleEdit = async (id) => {
    try {
      const linkToEdit = accountLinks.find((link) => link.id === id);
      if (linkToEdit) {
        setEditingLinkId(linkToEdit.id);
        setEditingLink(linkToEdit.attributes);
        setIsEditing(true);

        if (linkToEdit.attributes.icon?.data?.attributes?.url) {
          const imageUrl = `${process.env.NEXT_PUBLIC_ASSET_URL}${linkToEdit.attributes.icon.data.attributes.url}`;
          const response = await fetch(imageUrl);
          const blob = await response.blob();

          const imageFile = new File([blob], "icon.jpg", {
            type: "image/jpeg",
          });

          setSelectedImage(imageUrl);
          setEditingLink((prevEditingLink) => ({
            ...prevEditingLink,
            icon: imageFile,
          }));
        } else {
          setSelectedImage(null);
        }
      }
    } catch (error) {
      toast.error("Error editing link!");
    }
  };

  return (
    <main className="lg:flex">
      <ToastNotif />
      <Sidebar />
      <div className="p-6 lg:p-12 pt-12 w-full mt-12 sm:mt-16 lg:mt-0">
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        <div className="divider my-6" />

        <div>
          {accountLinks ? (
            <div className="flex flex-col mb-14">
              <p className="text-3xl font-bold self-center mb-4 lg:mb-8">
                My Links
              </p>
              <p className="text-sm self-center mb-8 block lg:hidden">
                You can edit and delete links by swiping right
              </p>
              <LinksTable
                accountLinks={accountLinks}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
              <ConfirmDeleteModal
                handleDeleteConfirm={handleDeleteConfirm}
                handleCancel={handleDeleteCancel}
              />
            </div>
          ) : (
            <div className="-mt-72">
              <Loading />
            </div>
          )}

          {userData ? (
            <div className="bg-gradient-to-l from-blue-950 to-transparent flex flex-col-reverse lg:flex-row lg:py-8">
              <form
                onSubmit={handleSubmit}
                className="flex flex-wrap gap-10 py-8 px-3 lg:pr-12 justify-between w-full lg:w-9/12"
              >
                <div className="w-full lg:basis-2/4">
                  <Input
                    label="Title"
                    isRequire
                    name="title"
                    placeholder="your account name..."
                    value={isEditing ? editingLink.title : newLink.title}
                    handleChangeInput={handleChangeInput}
                  />
                </div>

                <div className="w-full lg:basis-1/3">
                  <InputStatus
                    label="Status"
                    isRequire
                    options={[
                      { value: "active", label: "Active" },
                      { value: "deactive", label: "Deactive" },
                      { value: "suspend", label: "Suspend" },
                    ]}
                    name="status"
                    selectedValue={
                      isEditing ? editingLink.status : newLink.status
                    }
                    handleChange={handleChangeInput}
                  />
                </div>

                <div className="w-full lg:basis-2/4">
                  <Input
                    label="Link"
                    isRequire
                    name="url"
                    placeholder="your account link..."
                    value={isEditing ? editingLink.url : newLink.url}
                    handleChangeInput={handleChangeInput}
                  />
                </div>

                <div className="flex flex-col w-full lg:basis-1/3 items-start">
                  <InputImage
                    label="Icon"
                    name="icon"
                    selectedImage={selectedImage}
                    handleImageChange={handleChangeImage}
                  />
                </div>

                <ButtonSubmit disabled={false} />
              </form>

              <UserCard userData={userData} />
            </div>
          ) : (
            <div className="-mt-72">
              <Loading />
            </div>
          )}
        </div>
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
