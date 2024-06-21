import styles from './banner.module.scss'
import Image from 'next/image'
import HomeBtn from '@/components/UI/home-btn'

export default function Banner() {
  return (
    <>
      <div className={styles['banner']}>
        <Image
          src="/home/bg-big.png"
          alt="banner-background"
          fill="true"
          priority={true}
          className={styles['banner-key']}
        />
        <div className={styles['banner-text01']}>
          <Image
            src="/home/bg-text-01.png"
            alt="banner-background"
            fill="true"
            sizes="30%"
            priority={false}
          />
        </div>
        <div className={styles['banner-text02']}>
          <Image
            src="/home/bg-text-02.png"
            alt="banner-background"
            fill="true"
            sizes="30%"
            priority={false}
          />
        </div>
      </div>
      <div className={styles['banner-btn']}>
        <HomeBtn
          linkSrc="/teams"
          btnText="立即去揪團"
          color="#b7b7b7"
          borderColor="#b7b7b7"
          hoverBorderColor="#7B7B7B"
        />
        <HomeBtn
          linkSrc="/themes"
          btnText="第一次遊玩"
          color="#b7b7b7"
          borderColor="#b7b7b7"
          hoverBorderColor="#7B7B7B"
        />
      </div>
    </>
  )
}
