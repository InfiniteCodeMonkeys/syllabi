import React from "react";
import MarketingFooter from "./Footer";
import MarketingHeader from "./Header/MarketingHeader";

type Props = {
  children: JSX.Element;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="">
      <div className="relative">
        <MarketingHeader />
      </div>
      <main className="bg-gray-900">{children}</main>
      <MarketingFooter />
    </div>
  );
};

export default MarketingLayout;
