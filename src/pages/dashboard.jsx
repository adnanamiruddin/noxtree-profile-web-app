import { useEffect, useState } from "react";
import nookies from "nookies";
import api from "@/api";
import Image from "next/image";
import { createAccount, createLink, getAccountLinks } from "@/api/services";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [userAccount, setUserAccount] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [newAccount, setNewAccount] = useState({
    fullname: "",
    bio: "",
    slug: "",
    photo: null,
  });
  const [token, setToken] = useState(null);

  // ---------------------
  const [accountLinks, setAccountLinks] = useState([]);
  const [newLink, setNewLink] = useState({
    title: "",
    status: "active",
    icon: null,
    url: "",
    account: null,
  });
  const [selectedAccount, setSelectedAccount] = useState(null);

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
            // Berhasil mendapatkan data pengguna
            setUserData(response.data);
            setUserAccount(response.data.account);
            setNewLink({ ...newLink, account: response.data.account.id });

            const links = await getAccountLinks(response.data.account.slug);
            setAccountLinks(links.data.data);
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

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageURL = URL.createObjectURL(file);
  //     setSelectedImage(imageURL);
  //     setNewAccount({ ...newAccount, photo: file });
  //   }
  // };

  // const handleChangeInput = (e) => {
  //   const { name, value } = e.target;
  //   setNewAccount({ ...newAccount, [name]: value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();

  //     formData.append("data", JSON.stringify(newAccount)); // Mengirim data sebagai string JSON
  //     formData.append("files.photo", newAccount.photo); // Mengirim file gambar

  //     await createAccount(formData, userData.id, token);
  //   } catch (error) {
  //     console.error("Error creating account:", error);
  //   }
  // };

  // ---------------------
  const handleChangeInputLinks = (e) => {
    const { name, value } = e.target;
    setNewLink({ ...newLink, [name]: value });
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

      console.log(newLink);

      formData.append("data", JSON.stringify(newLink));
      formData.append("files.icon", newLink.icon);

      await createLink(formData, userAccount, token);
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <div>
      {userData ? (
        <div>
          <h1>Welcome, {userData.username}!</h1>
          <h1>Welcome, {userAccount?.fullname}!</h1>
          <p>Email: {userData.email}</p>

          {/* <form onSubmit={handleSubmit} className="flex flex-col">
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
              {selectedImage ? (
                <Image
                  width={500}
                  height={500}
                  src={selectedImage}
                  alt="Selected"
                  className="mt-4 max-w-xs"
                />
              ) : ""}
            </div>
            <button type="submit">SIMPAN</button>
          </form> */}

          <form onSubmit={handleSubmitLinks} className="flex flex-col my-14">
            {/* <div className="form-control">
              <div className="input-group">
                <select
                  className="select select-bordered"
                  name="iconName"
                  onChange={handleChangeInputLinks}
                >
                  <option disabled selected>
                    Pick Category
                  </option>
                  <option value="instagram">Instagram</option>
                  <option value="github">GitHub</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
            </div> */}
            <div className="flex flex-col">
              <label className="mr-4">Icon</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleIconChange}
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
            />
            <div className="form-control">
              <div className="input-group">
                <select
                  className="select select-bordered"
                  name="status"
                  onChange={handleChangeInputLinks}
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
            />
            <button type="submit">SIMPAN</button>
          </form>

          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
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
        <p>Loading...</p>
      )}
    </div>
  );
}
