import Image from "next/image";
import Link from "next/link";
import React from "react";

//

export const getStaticProps = async (context) => {
  try {
    const id = context.params.id;
    const response = await fetch(`https://www.dbooks.org/api/book/${id}`);
    const data = await response?.json();
    console.log(data);
    return {
      props: {
        book: data,
      },
    };
  } catch (error) {
    return { props: { error: true, message: "network error" } };
  }
};
export const getStaticPaths = async () => {
  try {
    const response = await fetch("https://www.dbooks.org/api/recent", {
      headers: {
        //GETS KEY FROM .ENV.LOCAL, and accessed through process.env
        Authorization: process.env.API_KEY,
      },
    });

    const data = await response.json();
    const paths = data.map((post) => {
      return {
        params: { id: post?.id.toString() },
      };
    });
    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
};

const BookId = ({ book }) => {
  console.log(book);
  const {
    title = "Not Available",
    subtitle = "Not Available",
    url = "Not Available",
    authors = "Not Available",
    description = "Not Available",
    download = "Not Available",
    image = "Not Available",
    publisher = "Not Available",
  } = book;

  const handleDownload = () => {
    console.log("Download clicked");
  };
  return (
    <section className="text-white flex items-start w-[1000px] mx-auto my-10">
      <aside className="w-[400px]">
        <Image
          alt={title}
          src={image}
          height={400}
          width={400}
          className="w-full h-full"
        />
      </aside>
      <article className="ml-4 w-[700px]">
        <p className="mb-4 flex justify-between items-center">
          <Link href="/" className="bg-red-400 text-white flex px-3 py-2 cursor-pointer">
        
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 mr-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            Back
          </Link>
          <span
            className="bg-blue-400 text-white flex px-3 py-2 cursor-pointer"
            onClick={handleDownload}
          >
            Download
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mx-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
          </span>
        </p>
        <section>
          <h3 className="mb-4">
            <span className="md:text-2xl uppercase block">{book.title}</span>
            <span>{subtitle ? subtitle : ""}</span>
          </h3>
          {description && (
            <p className="my-4">
              <span className="block uppercase">Description :</span>
              <span>{description}</span>
            </p>
          )}
          {authors && (
            <p className="my-4">
              <span className="block uppercase">Authors :</span>
              <span>{authors}</span>
            </p>
          )}
          {publisher && (
            <p className="my-4">
              <span className="block uppercase">Publisher :</span>
              <code>{publisher}</code>
            </p>
          )}
        </section>
      </article>
    </section>
  );
};

export default BookId;
