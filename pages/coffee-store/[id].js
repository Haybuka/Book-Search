import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const CoffeeStore = () => {
   const {query} = useRouter()
   console.log(query.id)
  return (
    <>
    <Head>
        <title>{query.id} page</title>
    </Head>
    <div>
        <p>CoffeeStore id - {query.id}</p>
        <Link href="/">Home</Link>
    </div>
    </>
  );
};

export default CoffeeStore;
