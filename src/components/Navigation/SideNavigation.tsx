"use client";
import { ROUTE } from "@/constants/route";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback } from "react";

const pathTexts = [
  {
    href: ROUTE.TODO,
    text: "TODO",
  },
  { href: ROUTE.TODO_TABLE, text: "TODO Table-View" },
];

export default function SideNavigation() {
  const currentPathName = usePathname();

  const isActiveLink = useCallback(
    (pathName: string, currentPathName: string) => {
      return pathName === currentPathName;
    },
    []
  );

  const generateLinks = useCallback(() => {
    return pathTexts.map((pathText) => (
      <Link
        key={pathText.href}
        href={pathText.href}
        className={classNames("font-bold round-md py-3 px-2", {
          "text-red-500 bg-red-50 ": isActiveLink(
            pathText.href,
            currentPathName
          ),
        })}
      >
        {pathText.text}
      </Link>
    ));
  }, [currentPathName, isActiveLink]);

  return (
    <div className="flex flex-col py-2 px-5 min-w-56  pl-10 mt-10">
      {generateLinks()}
    </div>
  );
}
