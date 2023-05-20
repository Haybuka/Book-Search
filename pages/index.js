import Banner from "@/components/banner/banner";
import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/home.module.css";
import Image from "next/image";
import Card from "@/components/card/card";
import coffeeStoreData from "../data/coffee-stores.json";
import Link from "next/link";

export async function getStaticProps(context) {
  //api request goes here
  //ssg, runs at build time
  const request = await fetch("https://www.dbooks.org/api/recent");
  const data = await request.json();
  const newbook = data.books.map((book) => {
    return {
      ...book,
      downloaded: false,
    };
  });
  return {
    props: {
      coffeeStores: coffeeStoreData,
      allBooks: newbook,
      //passed into component as props
    },
  };
}
const Home = ({ allBooks }) => {
  const [books, setBooks] = useState(allBooks);
  const [page, setPage] = useState(6);
  const handleOnBannerBtnClick = () => {};
  console.log(books);

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>
      <main>
        <section>
          <h3 className="my-3 text-2xl font-semibold">
            Books Search and Download
          </h3>
        </section>

        <section className="grid grid-cols-12 gap-4">
          {books.map((book) => {
            // console.log(book);
            return (
              <Link key={book.id} href={`/${book.id}`}  className={styles.bookArticle}>
                <article>
                  <Image
                    src={`${book.image}`}
                    height={200}
                    width={250}
                    className="w-full"
                    alt={book.title}
                  />
                  <aside className="my-2 cursor-pointer text-white hover:text-gray-400">
                    <p className="font-bold uppercase">{book.title}</p>
                  </aside>
                </article>
              </Link>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default Home;
