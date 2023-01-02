import React, { useEffect, useState } from "react";
import { Comment, CommentBody, Tweet } from "../typings";
import ReactTimeAgo from 'react-time-ago'
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { fetchComments } from "../utils/fetchComments";
// import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
interface Props {
  tweet: Tweet;
}

function Tweet({ tweet }: Props) {
  const [commentBoxVisible, setcommentBoxVisible] = useState<Boolean>();
  const [input, setInput] = useState<string>("");
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  // const { data: session } = useSession();
  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);
  const tryPostComment = () => {
    if (false) {
      setcommentBoxVisible(!commentBoxVisible);
    } else {
      toast.error("Please Sign In first");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("This is the comment", input);
    const commentToast = toast.loading("Posting Comment...");
    const commentInfo: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username:  "Unknown User",
      profileImg: "https://links.papareact.com/gll",
    };
    const result = await fetch(`/api/addComments`, {
      body: JSON.stringify(commentInfo),
      method: "POST",
    });

    const json = await result.json();
    toast.success("Comment Posted!", {
      id: commentToast,
    });

    setInput("");
    setcommentBoxVisible(false);
    refreshComments();
  };
  return (
    <div className="flex flex-col space-x-3 border-y p-5">
      <div className="flex space-x-3">
        <img
          //   src="https://d.newsweek.com/en/full/1618623/mrbeast-profile.jpg"
          src={tweet.profileImg}
          alt="No image"
          className="h-10 w-10 rounded-full object-cover"
        />

        <div className="group">
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-twitter sm:inline cursor-pointer hover:underline">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()}
            </p>
            <div className="text-sm text-gray-500">
              {/* <TimeAgoTest date={tweet._createdAt} /> */}
			  {/* <ReactTimeAgo date={new Date(tweet._createdAt)} /> */}
            </div>
          </div>
          <p className="pt-1">{tweet.text}</p>
          {tweet.image && (
            <img
              src={tweet.image}
              alt=""
              className="m-5 ml-0 mb-1 max-h-60 object-cover rounded shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
            />
          )}
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <div
          onClick={tryPostComment}
          className="flex items-center hover:text-twitter transition ease-out duration-100 hover:scale-125"
        >
          <ChatAlt2Icon className="h-5 w-5" />
          <p className="ml-2">{comments.length} </p>
        </div>
        <div
          onClick={() => setCount2(count2 + 1)}
          className="flex cursor-pointer items-center hover:text-twitter transition ease-out duration-100 hover:scale-125"
        >
          <HeartIcon className="h-5 w-5" />
          <p className="ml-2">{count2}</p>
        </div>
        <div
          onClick={() => setCount3(count3 + 1)}
          className="flex cursor-pointer items-center hover:text-twitter transition ease-out duration-100 hover:scale-125"
        >
          <SwitchHorizontalIcon className="h-5 w-5" />
          <p className="ml-2">{count3}</p>
        </div>
        <div
          onClick={() => setCount4(count4 + 1)}
          className="flex cursor-pointer items-center hover:text-twitter transition ease-out duration-100 hover:scale-125"
        >
          <UploadIcon className="h-5 w-5" />
          <p className="ml-2">{count4}</p>
        </div>
      </div>
      {commentBoxVisible && (
        <form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
            type="text"
            placeholder="Write a comment"
          ></input>
          <button
            disabled={!input}
            type="submit"
            className="text-twitter disabled:text-gray-200 "
          >
            POST
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="flex space-x-2 relative">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <img
                src={comment.profileImg}
                alt=""
                className="mt-2 h-7 w-7 object-cover rounded-full"
              />
              <div>
                <div className="flex items-center space-x-3">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-twitter sm:inline cursor-pointer hover:underline">
                    {" "}
                    @{comment.username.replace(/\s+/g, "").toLowerCase()}
                  </p>
                  {/* <TimeAgoTest
                    date={comment._createdAt}
                    className="text-sm text-gray-500"
                  /> */}
				  <ReactTimeAgo  className="text-sm text-gray-500" date={new Date(tweet._createdAt)} />
                </div>

                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tweet;
