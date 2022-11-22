import React, { useRef, useState, MouseEvent } from "react";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";

import { useSession } from "next-auth/react";
import { Tweet, TweetBody } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";
import { toast } from "react-hot-toast";


interface Props{
	setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>

}
function TweetBox({setTweets} : Props) {
  const { data: session } = useSession();

  const [input, setInput] = useState("");
  const [imageTweet, setImageNow] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [imageURlBoxIsOpen, setImage] = useState<Boolean>(false);

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (!imageInputRef.current?.value) {
      return;
    }

    setImageNow(imageInputRef.current?.value);
	// console.log("No boy cares", image);
    imageInputRef.current.value = "";
    setImage(false);
  };
  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || "Unknown User", 
      profileImg: session?.user?.image || "https://links.papareact.com/gll",
      image: imageTweet,
    };

	const result = await fetch(`/api/addTweet`, {
		body: JSON.stringify(tweetInfo),
		method: "POST"
	})

	const json = await result.json();
	const newTweets = await fetchTweets();
	setTweets(newTweets);

	toast("Tweet posted", {
		icon: '🚀'
	})

	return json
  };
  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    postTweet();

	setImage(false)
	setInput('')
	setImageNow('')
  };
  return (
    <div className="flex space-x-2 p-5">
      <img
        src={session?.user?.image || "https://links.papareact.com/gll"}
        alt=""
        className="mt-4 h-14 w-14 rounded-full object-cover"
      />
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-col flex-1" action="">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What's happening"
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
          />
          <div className="flex justify-between items-center px-2">
            <div className="flex space-x-2 text-twitter">
              {/* Icons */}
              <PhotographIcon
                onClick={() => setImage(!imageURlBoxIsOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!input}
              className="bg-twitter px-3 py-2 font-bold text-white rounded-full disabled:opacity-40"
            >
              Tweet
            </button>
          </div>
          {imageURlBoxIsOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent text-white p-2 outline-none placeholder:text-white"
                type="text"
                placeholder="Enter URL image..."
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white "
              >
                Add Image
              </button>
            </form>
          )}
          {imageTweet && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={imageTweet}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
