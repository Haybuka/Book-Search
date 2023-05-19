import Banner from "@/components/banner/banner";
import Head from "next/head";
import React from "react";
import styles from "../../styles/home.module.css";
import Image from "next/image";
import Card from "@/components/card/card";
import coffeeStoreData from "../../data/coffee-stores.json";
import fourSquare from "../../data/foursquare-api-data.json";
import Link from "next/link";
import { getListOfStores } from "../../lib/coffee-stores";
import useTrackLocation from "@/hooks/use-track-location";

export async function getStaticProps(context) {
  //api request goes here
  //ssg, runs at build time
  const photos = await getListOfStores();
  // getListOfStores()
  return {
    props: {
      coffeeStores: fourSquare.results.map((square, id) => ({
        ...square,
        imgUrl: photos[id],
      })),
      //passed into component as props
    },
  };
}
const Home = ({ coffeeStores }) => {
  // const {results} = coffeeStores
  const { handleTrackLocation, latLong, isFindingLocation, locationMsg } =
    useTrackLocation();
  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
    console.log({ latLong, locationMsg });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
      </Head>
      <Banner
        handleOnClick={handleOnBannerBtnClick}
        buttonText={isFindingLocation ? "Locating ..." : "View stores nearby"}
      />
      <div className={styles.heroImage}>
        <Image alt="hero" src="/hero-image.png" width={700} height={400} />
      </div>
      {coffeeStores.length > 0 && (
        <>
          <h2 className={styles.heading2}>Toronto Coffee stores</h2>
          <div className={styles.cardLayout}>
            {coffeeStores.map((store, id) => (
              <Card
                // name={store.name}
                // imgUrl={store.imgUrl}
                href={`/coffee-store/${store.fsq_id}`}
                data={store}
                className={styles.card}
                key={store.fsq_id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
