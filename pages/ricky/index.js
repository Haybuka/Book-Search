import Banner from "@/components/banner/banner";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../../styles/home.module.css";
import Image from "next/image";
import Card from "@/components/card/card";
import Link from "next/link";
import { fetchRickMort } from "@/lib/rickmort";
import cls from "classnames";
import getRickCharacter from "../api/getRickCharacter";

export async function getStaticProps(context) {
  //api request goes here
  //ssg, runs at build time

  const ricky = await fetchRickMort();

  return {
    props: {
      ricky,
      //passed into component as props
    },
  };
}
const Home = ({ ricky }) => {
  const results = ricky.results;
  const [rickMort, setRickMort] = useState(results);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const fetchCharacter = async () => {
   const response = await fetch(`/pages/api/getRickCharacter/?name=${searchTerm}&status=alive`)
   const data = await response.json()
   console.log(data)
  };
  useEffect(() => {
    if (searchTerm.length > 1) {
      // fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
      //   .then((result) => result.json())
      //   .then((data) => setRickMort(data.results));
      const result = fetchCharacter(searchTerm);
    
    } else {
      setIsSearching(false);
      setRickMort(results);
    }
  }, [isSearching]);

  //
  const handleOnBannerBtnClick = () => {};
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.length >= 2) {
      setSearchTerm(searchTerm);
      setIsSearching((previous) => !previous);
    } else {
      setIsSearching((previous) => !previous);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm((value) => event.target.value);
    console.log(searchTerm.length);
    if (searchTerm.length <= 2) {
      setIsSearching((previous) => !previous);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Ricky morty</title>
      </Head>
      <h2 className={cls(styles.heading2, "flex justify-between items-center")}>
        <span>Rick and Mortys - {searchTerm}</span>
        <form onSubmit={handleSearchSubmit}>
          <input value={searchTerm} onChange={handleInputChange} />
        </form>
      </h2>

      {rickMort.length > 0 && (
        <>
          <div className={styles.cardLayout}>
            {rickMort.map((store) => (
              <Link href={`/ricky/${store.id}`} key={store.id}>
                <Image
                  src={store.image}
                  alt={store.name}
                  width={200}
                  height={50}
                  className="shadow-md"
                />
                <section className="mt-3">
                  <h3 className="font-bold text-xl">{store.name}</h3>
                  <p className="">Gender : {store.gender}</p>
                  <p className="">Origin : {store.origin.name}</p>
                  <p className="">Species : {store.species}</p>
                </section>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
