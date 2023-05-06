import Banner from "@/components/banner/banner";
import Head from "next/head";
import React from "react";
import styles from "../styles/home.module.css";
import Image from "next/image";

const Home = () => {
  const handleOnBannerBtnClick = () => {};
  // throw Error()
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
      </Head>
      <Banner
        handleOnClick={handleOnBannerBtnClick}
        buttonText="View stores nearby"
      />
      <div className={styles.heroImage}>
        <Image alt="hero" src="/hero-image.png" width={700} height={400} />
      </div>
    </div>
  );
};

export default Home;
