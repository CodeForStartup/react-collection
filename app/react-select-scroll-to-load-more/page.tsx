import React from "react";
import ScrollToLoadMore from "./ScrollToLoadMore";

const Page = () => {
  return (
    <div className="container p-20">
      <div className="m-auto">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          <code>React-Select</code> async scroll to load more
        </h1>

        <div className="flex flex-col gap-4 items-center p-40">
          <ScrollToLoadMore />
        </div>
      </div>
    </div>
  );
};

export default Page;
