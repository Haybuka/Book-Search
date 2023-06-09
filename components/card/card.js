import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";
import cls from 'classnames'
const Card = ({ data,href}) => {
  const {name, imgUrl,location:{address}  } = data
  return (
    <Link href={href} className={styles.cardLink}>
      <div className={cls('glass',styles.container)}>
      <div className={styles.cardHeaderWrapper}>
        <h2 className={styles.cardHeader}>{name}</h2>
        <p className={styles.cardHeader}>{address}</p>
      </div>
      <div className={styles.cardImageWrapper}>
        <Image
          src={imgUrl}
          width={260}
          height={160}
          className={styles.cardImage}
          alt={imgUrl}
        />

      </div>
      </div>
    </Link>
  );
};

export default Card;
