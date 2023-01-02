import React from "react";
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import SidebarRow from "./SidebarRow";
// import {useSession, signIn, signOut} from "next-auth/react"
function Sidebar() {
	// const {data : session} = useSession();

  return <div className="flex flex-col col-span-2 items-center md:items-start">
	<img className="h-10 w-10 m-3" src="https://links.papareact.com/drq" alt="" />
	<SidebarRow Icon={HomeIcon} title="Home"></SidebarRow>
	<SidebarRow Icon={HashtagIcon} title="Explore	"></SidebarRow>
	<SidebarRow Icon={BellIcon} title="Notifications"></SidebarRow>
	<SidebarRow Icon={MailIcon} title="Messages"></SidebarRow>
	<SidebarRow Icon={BookmarkIcon} title="Bookmarks"></SidebarRow>
	<SidebarRow Icon={CollectionIcon} title="Lists"></SidebarRow>
  {/* onClick={session ? signOut : signIn} Icon={UserIcon} title={session ? "Sign Out" : " Sign In"} */}
	<SidebarRow Icon={UserIcon} title={"Sign In"}></SidebarRow>
	<SidebarRow Icon={DotsCircleHorizontalIcon} title="More"></SidebarRow>
  </div>;
}

export default Sidebar;
