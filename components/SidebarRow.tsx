import React, { SVGProps } from "react";

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () =>{}
}
function SidebarRow({ Icon, title, onClick }: Props) {
  return (
    <div onClick={() => onClick?.()} className="flex max-w-fit items-center space-x-2 px-4 py-3 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-200 group ">
      <Icon className="h-6 w-6 group-hover:text-twitter rounded-full" />
      <p className="group-hover:text-twitter hidden md:inline text-base lg:text-xl transition-all duration-500 ease-out">{title}</p>
    </div>
  );
}

export default SidebarRow;
