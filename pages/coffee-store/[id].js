import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./coffee-store.module.css";
// import coffeeStoreData from "../../data/coffee-stores.json"
import foursquareData from "../../data/foursquare-api-data.json";
import Image from "next/image";
import cls from "classnames";
import { getListOfStores } from "@/lib/coffee-stores";

export async function getStaticProps(context) {
  //api request goes here
  //ssg, runs at build time

  const params = context.params;
  const photos = await getListOfStores()
  const fourSquare = foursquareData.results.map((square,id) => ({...square,imgUrl : photos.length > 0 ? photos[id] : null}))
  return {
    props: {
      coffeeStore: fourSquare.find((coffeeStore) => {
        return coffeeStore.fsq_id.toString() === params.id;
      }),
      //passed into component as props
    },
  };
}


export function getStaticPaths(context) {
  
  const paths = foursquareData.results.map((store) => {
    // console.log(store)
    return {
      params: { id: store.fsq_id.toString() },
    };
  });
  return {
    paths,
    fallback: true,
    //fallback can be used to load dynamic contents that arent cached?
  };
}

const CoffeeStore = ({ coffeeStore }) => {
  const {
    name,
    imgUrl = "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80",
  } = coffeeStore;
  const handleUpvoteButton = () => {};
  const router = useRouter();
  if (router.isFallback) {
    return <div>...loading</div>;
  }

  //  console.log(router.query)
  console.log(coffeeStore);
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={cls(styles.name,' bg-black')}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={300}
            height={100}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width="24" height="24" />
            <p className={styles.text}>{coffeeStore.location.address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width="24" height="24" />
            
              {coffeeStore.location?.neighborhood.map((hood, id) => (
                <p className={styles.text} key={id}>{hood}</p>
              ))}
            
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24" />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
