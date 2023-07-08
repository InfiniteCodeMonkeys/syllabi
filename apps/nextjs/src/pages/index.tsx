import React from "react";
import Header from "layouts/MarketingLayout/Header/MarketingHeader";
import Footer from "layouts/MarketingLayout/Footer";
import ChatBox from "ui/organisms/ChatBox";
import Search from "ui/organisms/Search";

const Home = () => {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-screen flex-col bg-slate-100 lg:flex-row">
        <div className="container mt-8 px-4">
          <h1 className="ml-4 text-2xl font-bold">
            Search bills, amendments, hearings and more
          </h1>
          <Search />
        </div>
        <div className="mr-12 mt-6 min-w-[50%] max-w-[50%]">
          <ChatBox />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
