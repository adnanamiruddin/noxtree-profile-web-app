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
    <div className="w-full lg:w-3/12 bg-base-100 shadow-xl p-6 lg:p-0 rounded-3xl rounded-r-none">
      <div className="card-body">
        <h2 className="text-3xl font-bold mb-6">{userData.account.fullname}</h2>
        <p className="text-gray-200 mb-4 text-left">{userData.account.bio}</p>
        {userData.account.slug !== "(your.slug)" ? (
          <Link
            href={`/${userData.account.slug}`}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {userData.account.slug}
          </Link>
        ) : (
          <span className="text-blue-500">{userData.account.slug}</span>
        )}
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
