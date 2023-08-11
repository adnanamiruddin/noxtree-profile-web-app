import {
  getAccountLinks,
  getAllAccounts,
  getSelectedAccount,
} from "@/api/services";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function SlugPage({ data }) {
  const [accountLinks, setAccountLinks] = useState([]);

  useEffect(() => {
    const fetchAccountLinks = async () => {
      try {
        const links = await getAccountLinks(data.attributes.slug);
        setAccountLinks(links.data.data);
      } catch (error) {
        console.error("Error fetching account links:", error);
      }
    };
    fetchAccountLinks();
  }, [data.attributes.slug]);

  return (
    <main
      className={`flex min-h-screen max-w-2xl m-auto flex-col items-center p-4 pt-24 ${inter.className}`}
    >
      <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden mb-10">
        {data.attributes.photo?.data?.attributes?.url ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSET_URL}${data.attributes.photo.data.attributes.url}`}
            alt={data.attributes.fullname}
            layout="fill"
            objectFit="cover"
            className="relative"
          />
        ) : (
          <div className="absolute w-full h-full bg-gray-300 rounded-full"></div>
        )}
      </div>

      <div className="flex flex-col items-center gap-3 w-full mb-12">
        <h3 className="text-2xl font-bold">{data.attributes.fullname}</h3>
        <p className="text-lg">{data.attributes.bio}</p>
      </div>

      <div className="flex flex-col items-center w-full gap-8">
        {accountLinks.length > 0 ? (
          accountLinks.map((value, index) => {
            const linkStatus = value.attributes.status;
            const isDeactive = linkStatus === "deactive";
            const isSuspend = linkStatus === "suspend";

            if (isDeactive) return null;

            return (
              <a
                key={index}
                href={!isSuspend ? value.attributes.url : null}
                target="_blank"
                rel="noopener noreferrer"
                className={`h-full w-full flex items-center gap-3 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[20px] p-4  transition-all duration-300 ${
                  isSuspend ? "filter brightness-50" : ""
                } ${!isSuspend ? "hover:scale-105" : ""} ${
                  !isSuspend ? "hover:cursor-pointer" : ""
                }`}
              >
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                  <div
                    className="w-full h-full relative"
                    style={{ paddingBottom: "100%" }}
                  >
                    {value.attributes.icon?.data?.attributes?.url ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_ASSET_URL}${value.attributes.icon.data.attributes.url}`}
                        alt={value.attributes.title}
                        layout="fill"
                        objectFit="cover"
                        className="absolute rounded-full"
                      />
                    ) : (
                      <div className="absolute w-full h-full bg-gray-300 rounded-full"></div>
                    )}
                  </div>
                </div>
                <span className="text-lg">{value.attributes.title}</span>
              </a>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full w-full gap-3 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[20px] p-4  transition-all duration-300">
            <p className="text-2xl text-gray-400">No links available 😐</p>
          </div>
        )}
      </div>
    </main>
  );
}

// getStaticPaths adalah function yang nanti akan di-execute next.js ketika project di-build
// yang mana fungsinya untuk menghasilkan file .html apa saja berdasarkan dynamic routes-nya
export async function getStaticPaths() {
  // Fetching data untuk keperluan dynamic routes apa aja yang ada
  const accounts = await getAllAccounts();
  const dataAccounts = await accounts.data.data;

  // Deklarasi variable untuk menentukan ada slug apa saja yang nantinya
  // akan menghasilkan file .html
  const paths = dataAccounts.map((value) => {
    return {
      params: { slug: value.attributes.slug },
    };
  });

  // - Return ini yang nantinya akan memberitahu next.js akan ada path apa saja
  // berdasarkan slug/url dari BE
  // - Blocking tujuannya untuk nanti ketika user mengetik suatu path yang
  // tidak ada di list slug, maka akan di-return error/tidak ada
  return { paths, fallback: "blocking" };
}

// getStaticProps adalah function untuk get data yang nantinya akan dikirim ke component
// Return-nya harus ada props dengan tipe data object dan ada revalidate untuk menjalankan ISR-nya
export async function getStaticProps({ params }) {
  const selectedAccount = await getSelectedAccount(params.slug);

  // Mengecek apakah data ditemukan atau tidak
  if (!selectedAccount.data.data || selectedAccount.data.data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: selectedAccount.data.data[0],
    },
    revalidate: 10,
  };
}
