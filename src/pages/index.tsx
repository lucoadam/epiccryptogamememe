import Head from "next/head";
import { Inter } from "next/font/google";
import Meme from "@/components/Meme";

const inter = Inter({ subsets: ["latin"] });

const styles = {
  main: "flex flex-col items-center justify-center min-h-screen py-2",
  description: "flex flex-col items-center justify-center text-center",
  code: "bg-gray-100 rounded-md text-sm font-mono p-1",
  vercelLogo: "h-4 ml-2",
  center: "flex flex-col items-center justify-center",
  logo: "h-12",
  thirteen:
    "flex items-center justify-center w-12 h-12 rounded-full bg-black text-white text-2xl font-bold",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 w-full max-w-screen-lg",
  card: "flex flex-col items-center justify-center p-6 border border-gray-300 rounded-md shadow-md text-center",
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Epic Crypto Meme Games</title>
        <meta
          name="description"
          content="Generate your memes using text prompts."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Meme />
      </main>
    </>
  );
}
