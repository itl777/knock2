import styles from "./banner.module.scss";
import Image from "next/image";


export default function Banner() {
  return (
    <>
      <div className={styles["banner"]}>
        <Image
          src="/images/sections/home/banner/bg-1.png"
          alt="banner-background"
          fill="true"
          priority={true}
          className={styles["banner-key"]}
        />
        <div className={styles["banner-text01"]}>
          <Image
            src="/images/sections/home/banner/bg-text-01.png"
            alt="banner-background"
            fill="true"
            sizes="30%"
            priority={false}
          />
        </div>
        <div className={styles["banner-text02"]}>
          <Image
            src="/images/sections/home/banner/bg-text-02.png"
            alt="banner-background"
            fill="true"
            sizes="30%"
            priority={false}
          />
        </div>
      </div>
    </>
  );
}
