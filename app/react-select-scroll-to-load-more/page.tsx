import React from "react";
import ScrollToLoadMore from "./ScrollToLoadMore";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "React-Select async scroll to load more",
  description:
    "I customized the react-select component to load more data when the user scrolls to the bottom of the list.",
};

const Page = () => {
  return (
    <div className="container p-20">
      <div className="m-auto flex flex-col items-center">
        <h1 className="scroll-m-20 text-4xl font-light tracking-tight lg:text-5xl text-center">
          React-Select async scroll to load more
        </h1>

        <div className="mt-20 max-w-[600px]">
          <ul className="list-disc">
            <li>
              I customized the <code>react-select</code> component to load more
              data when the user scrolls to the bottom of the list. It able to
              search data from the server.
            </li>
            <li>
              I used the <code>useInfiniteQuery</code> hook from the react-query
              library to load more data when the user scrolls to the bottom of
              the list.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 items-center py-20 max-w-[400px] justify-center">
          <ScrollToLoadMore />
        </div>
      </div>
    </div>
  );
};

export default Page;
