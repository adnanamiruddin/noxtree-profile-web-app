import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import nookies from "nookies";
import api from "@/api";
import Image from "next/image";

export default function MyLinks() {
  const [userData, setUserData] = useState(null);
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

  // ---------------------
  const handleChangeInputLinks = (e) => {
    const { name, value } = e.target;
    if (!isEditing) setNewLink({ ...newLink, [name]: value });
    else setEditingLink({ ...editingLink, [name]: value });
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      setNewLink({ ...newLink, icon: file });
    }
  };

  const handleSubmitLinks = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      if (isEditing) {
        formData.append("data", JSON.stringify(editingLink));
        formData.append("files.icon", editingLink.icon);
        const success = await updateLink(editingLinkId, formData, token);
        if (success) {
          const links = await getAccountLinks(userAccount.slug);
          setAccountLinks(links.data.data);
          setIsEditing(false);
        }
      } else {
        formData.append("data", JSON.stringify(newLink));
        formData.append("files.icon", newLink.icon);
        const success = await createLink(formData, userAccount, token);
        if (success) {
          const links = await getAccountLinks(userAccount.slug);
          setAccountLinks(links.data.data);
        }
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const success = await deleteLink(id, token);
      if (success) {
        const links = await getAccountLinks(userAccount.slug);
        setAccountLinks(links.data.data);
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const linkToEdit = accountLinks.find((link) => link.id === id);
      if (linkToEdit) {
        setEditingLinkId(linkToEdit.id);
        setEditingLink(linkToEdit.attributes);
        setIsEditing(true);
      }
    } catch (error) {
      console.error("Error editting link:", error);
    }
  };

  return (
    <main className="flex">
      <Sidebar />
      <div className="p-12 w-full">
        <h1 className="text-4xl font-semibold mb-6">Dashboard</h1>
        <div className="bg-gradient-to-l from-blue-950 to-transparent">
          {userData ? (
            <div className="bg-gradient-to-l from-blue-950 to-transparent">
              <form
                onSubmit={handleSubmitLinks}
                className="flex flex-col my-14"
              >
                <div className="flex flex-col">
                  <label className="mr-4">Icon</label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleIconChange}
                    // value={isEditing ? editingLink.icon : newLink.icon.data.attributes.formats.small}
                  />
                  {selectedImage ? (
                    <Image
                      width={50}
                      height={50}
                      src={selectedImage}
                      alt="Selected"
                      className="mt-4 max-w-xs"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <label className="mr-4">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Type here"
                  onChange={handleChangeInputLinks}
                  className="input input-bordered w-full max-w-xs"
                  value={isEditing ? editingLink.title : newLink.title}
                />
                <div className="form-control">
                  <div className="input-group">
                    <select
                      className="select select-bordered"
                      name="status"
                      onChange={handleChangeInputLinks}
                      value={isEditing ? editingLink.status : newLink.status}
                    >
                      <option disabled selected>
                        Status
                      </option>
                      <option value="active">Active</option>
                      <option value="deactive">Deactive</option>
                      <option value="suspend">Suspend</option>
                    </select>
                  </div>
                </div>
                <label className="mr-4">URL</label>
                <input
                  type="text"
                  name="url"
                  placeholder="Type here"
                  onChange={handleChangeInputLinks}
                  className="input input-bordered w-full max-w-xs"
                  value={isEditing ? editingLink.url : newLink.url}
                />
                <button type="submit">SIMPAN</button>
              </form>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Type</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>URL</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountLinks.map((value, index) => (
                      <tr key={index} className="hover">
                        <th>{index + 1}</th>
                        <td>
                          <div className="relative w-8 h-8">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_ASSET_URL}${value.attributes.icon.data.attributes.url}`}
                              alt={value.attributes.title}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-full"
                            />
                          </div>
                        </td>
                        <td>{value.attributes.title}</td>
                        <td>{value.attributes.status}</td>
                        <td>{value.attributes.url}</td>
                        <td className="flex gap-2">
                          <button
                            className="bg-blue-500 text-white btn"
                            onClick={() => handleEdit(value.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white btn"
                            onClick={() => handleDelete(value.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </main>
  );
}
