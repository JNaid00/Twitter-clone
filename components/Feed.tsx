import React, { useState } from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import TweetBox from "./TweetBox";
import { Tweet } from "../typings";

import TweetComponent from "../components/Tweet";
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";
interface Props {
  tweets: Tweet[];
}

function Feed({ tweets: tweetsProp }: Props) { 

  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);
  const handleRefresh = async () => {
	const refreshToast = toast.loading("Refreshing...");
    const tweets = await fetchTweets();
    setTweets(tweets);
	
	toast.success("Feed updated",{
		id: refreshToast
	});

  };
  console.log(tweets);
  return (
    <div className="col-span-8 lg:col-span-5 border-x overflow-y-scroll max-h-screen overflow-hidden scrollbar-hide">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          onClick={handleRefresh}
          className="h-8 w-8 cursor-pointer text-twitter mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>

      {/*Tweet box*/}
      <div>
        <TweetBox setTweets={setTweets} />
      </div>
      <div>
        {tweetsProp.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet}/>
        ))}
      </div>
    </div>
  );
}

export default Feed;
