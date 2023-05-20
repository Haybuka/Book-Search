import Banner from "@/components/banner/banner";
import Head from "next/head";
import React from "react";
import styles from "../styles/home.module.css";
import Image from "next/image";
import Card from "@/components/card/card";
import coffeeStoreData from "../data/coffee-stores.json";
import Link from "next/link";

export async function getStaticProps(context) {
  //api request goes here
  //ssg, runs at build time
  const request = await fetch("https://www.dbooks.org/api/recent");
  const { books } = await request.json();
  
  return {
    props: {
      coffeeStores: coffeeStoreData,
      books,
      //passed into component as props
    },
  };
}
const Home = ({ books }) => {
  
 const newbook = books.map(book => {
  
  return {
   ...book,
   downloaded : false
  }
 })
 console.log({newbook})
  const handleOnBannerBtnClick = () => {};

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
              <article
                id={book.id}
                className={styles.bookArticle}
              >
                <Image
                  src={`${book.image}`}
                  height={200}
                  width={250}
                  className="w-full"
                />
                <aside className="my-2 px-2 cursor-pointer text-white hover:text-gray-400">
                  <p className="font-bold text-lg">{book.title}</p>
                  {/* <p className="font-bold my-3 text-white">{book.subtitle}</p> */}
                </aside>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default Home;
