"use client";
import { ROUTE } from "@/constants/route";
import { Token } from "@/utils/token.utils";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();

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

  const onClickLogout = useCallback(() => {
    Token.clear();
    router.push(ROUTE.LOGIN);
  }, [router]);

  return (
    <div className="py-2 px-5 min-w-56  pl-10 mt-10">
      <div className="flex flex-col ">{generateLinks()}</div>
      <button
        onClick={onClickLogout}
        className="rounded-sm mt-16 font-bold round-md py-3 px-2 hover:text-red-500 hover:bg-red-50 hover:border hover:border-red-700"
      >
        Logout
      </button>
    </div>
  );
}
