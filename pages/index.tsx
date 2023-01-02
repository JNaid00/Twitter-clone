import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { Tweet } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";
import { Toaster } from "react-hot-toast";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
interface Props {
  tweets: Tweet[];
}

const Home = ({ tweets }: Props) => {
  console.log(tweets);
  TimeAgo.addLocale(en);
  TimeAgo.addLocale(ru);

  return (
    <div className="max-w-7xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <main className="grid grid-cols-10">
        <Sidebar />
        <Feed tweets={tweets} />
        <Widgets />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const tweets = await fetchTweets();

  return {
    props: {
      tweets,
    },
  };
};
