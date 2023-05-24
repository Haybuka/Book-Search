import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
export const getStaticProps = async (context) => {
  try {
    const id = context.params.id;
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    const data = await response?.json();
    console.log(data);
    return {
      props: {
        character: data,
      },
    };
  } catch (error) {
    return { props: { error: true, message: "network error" } };
  }
};
export const getStaticPaths = async () => {
  try {
    const response = await fetch(
      "https://rickandmortyapi.com/api/character",
      {
          headers: {
            //GETS KEY FROM .ENV.LOCAL, and accessed through process.env
              Authorization:process.env.API_KEY
          },
      }
    );
 
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

const RickyMorty = ({ character }) => {
  console.log(character);
  const route = useRouter();
  return (
    <div>
      {" "}
      <Link href="/">Home</Link>
      <div key={character.id} className="flex items-center ">
        <Image src={character.image} alt={character.name} width={200} height={50} />
        <section className="ml-3">
          <h3 className="font-bold text-xl">{character.name} </h3>
          <p className="">Gender : {character.gender}</p>
          <p className="">Origin : {character.origin.name}</p>
          <p className="">Species : {character.species}</p>
          {/* <p className="font-bold text-xl">Species : {store.species}</p> */}
        </section>
      </div>
    
    </div>
  );
};

export default RickyMorty;
