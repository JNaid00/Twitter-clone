import { Tweet } from "../typings";

export const fetchTweets =async () => {
	console.log(process.env.NEXT_PUBLIC_BASE_URL);
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`)
	console.log(res);
	const data = await res.json()
	const tweets: Tweet[] = data.tweets
	return tweets
}

