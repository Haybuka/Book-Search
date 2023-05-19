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
  const request = await fetch("https://rickandmortyapi.com/api/character");
  const data = await request.json();

  return {
    props: {
      coffeeStores: coffeeStoreData,
      ricky: data,
      //passed into component as props
    },
  };
}
const Home = ({ coffeeStores, ricky }) => {
  const results = ricky.results;
  const handleOnBannerBtnClick = () => {};
  // console.log(results)
  // throw Error()
  // console.log(ricky)
  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>
      <p>WEELLLL!!! , PAGE BLEFT BLANK ON PURPOSE</p>
      
     
    </div>
  );
};

export default Home;
