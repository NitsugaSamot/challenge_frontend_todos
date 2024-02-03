import Image from "next/image";
import { Inter } from "next/font/google";
import LandingPage from "@/components/landing-page/landing-page";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      {/* <Header/> */}
      <LandingPage/>
    </>
  );
}
