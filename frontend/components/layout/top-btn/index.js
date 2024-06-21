import styles from "./top-btn.module.scss";
import "animate.css/animate.css";
import Image from "next/image";

export default function TopBtn() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 平滑滾動
    });
  };
  return (
    <>
      <button onClick={scrollToTop} className={styles["top-btn"]}>
        <Image
          src="/ghost/ghost_15.png"
          alt="top-button-default"
          width={100}
          height={84}
          className={`${styles["default"]} animate__animated animate__pulse animate__infinite animate__slow`}
          priority={false}
        />
        <Image
          src="/ghost/ghost_07.png"
          alt="top-button-hover"
          width={100}
          height={84}
          className={`${styles["hover"]} animate__animated animate__tada animate__infinite`}
          priority={false}
        />
      </button>
    </>
  );
}
