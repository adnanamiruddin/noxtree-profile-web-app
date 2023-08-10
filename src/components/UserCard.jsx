import { getSelectedAccount } from "@/api/services";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserCard({ userData }) {
  const [userPhoto, setUserPhoto] = useState(null);

  // useEffect(() => {
  //   const fetchUserPhoto = async () => {
  //     if (userData) {
  //       const response = await getSelectedAccount(userData.account.slug);
  //       if (response)
  //         setUserPhoto(
  //           response.data.data[0].attributes.photo.data.attributes.url
  //         );
  //     }
  //   };

  //   fetchUserPhoto();
  // }, [userData]);

  return (
    <div className="w-full lg:w-3/12 bg-base-100 shadow-xl p-6 rounded-3xl rounded-r-none">
      <div className="card-body">
        <h2 className="text-xl font-semibold mb-2">
          {userData.account.fullname}
        </h2>
        <p className="text-gray-200 mb-4">{userData.account.bio}</p>
        <Link
          href={`/${userData.account.slug}`}
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {userData.account.slug}
        </Link>
      </div>
    </div>
  );
}

{
  /* <figure>
                <Image
                  src={`${process.env.NEXT_PUBLIC_ASSET_URL}${userPhoto}`}
                  alt={userData.account.fullname}
                  width={300}
                  height={300}
                />
              </figure> */
}
