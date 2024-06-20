import styles from "./nav-styles.module.scss";
import { FaCircleUser, FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <header className={styles.navbar}>
        <nav>
          <ul>
            <li>
              <Link href="#">
                <span>首頁</span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <span>密室逃脫</span>
              </Link>
            </li>
            <li className="logo">
              <Link href="#">
              <Image
                src="images/layout/navbar/LOGO.svg"
                alt="LOGO"
                width={134.96}
                height={61.26}
              />
              </Link>
            </li>
            <li>
              <Link href="#">
                <span>揪團</span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <span>桌遊商城</span>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="#">
                <FaCircleUser />
              </Link>
            </li>
            <li>
              <Link href="#">
                <FaCartShopping />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
