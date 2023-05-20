import Image from "next/image";
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
    title,
    subtitle,
    url,
    authors,
    description,
    download,
    image,
    publisher,
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
        <p className="mb-4 flex justify-end" onClick={handleDownload}>
          <span className="bg-blue-400 block px-3 py-2 ">Download</span>
        </p>
        <section>
          <h3 className="mb-4">
            <span className="md:text-2xl uppercase block">{title}</span>
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
