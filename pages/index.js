import Banner from "@/components/banner/banner";
import Head from "next/head";
import React from "react";
import styles from "../styles/home.module.css";
import Image from "next/image";
import Card from "@/components/card/card";
import coffeeStore from '../data/coffee-stores.json'

export async function getStaticProps(context) {
  //api request goes here
  //ssg, runs at build time
  return {
    props : {
      coffeeStores : coffeeStore
    }
  }
}
const Home = ({coffeeStores}) => {

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
      <div className={styles.cardLayout}>
        {
          coffeeStores.map(store => (
            <Card
            name={store.name}
            imgUrl={store.imgUrl}
            href={`/coffee-store/${store.id}`}
            className={styles.card}
            key={store.id}
          />
          ))
        }
        
      
        
      </div>
    </div>
  );
};

export default Home;
