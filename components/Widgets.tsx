import { SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
function Widgets() {
  const [input, setinput] = useState("sonnysangha");
  const [userInput, setUserInput] = useState("sonnysangha");
  const [reload, setReload] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserInput(input);
    console.log(userInput);
	setReload(!reload);
  };
  return (
    <div className="mt-2 px-2 col-span-3 hidden lg:inline ">
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-2 bg-slate-600 p-3 rounded-full mt-2"
      >
        <SearchIcon className="h-5 w-5 text-gray-400 cursor-pointer" />
        <input
          value={input}
          onChange={(e) => setinput(e.target.value)}
          type="text"
          placeholder="Search Twitter"
          className="bg-transparent flex-1 outline-none "
        />
        <button type="submit" className="text-twitter disabled:text-gray-200 ">
          Search
        </button>
      </form>
      <div>
		{reload && (
			<TwitterTimelineEmbed
			sourceType="profile"
			//   screenName="sonnysangha"
			screenName={userInput}
			options={{ height: 1000 }}
		  />
		)}
		{!reload && (
			<TwitterTimelineEmbed
			sourceType="profile"
			//   screenName="sonnysangha"
			screenName={userInput}
			options={{ height: 1000 }}
		  />
		)}
        
      </div>
    </div>
  );
}

export default Widgets;
