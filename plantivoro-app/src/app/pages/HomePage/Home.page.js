import React from "react";
import Header from "../../components/Home/Header/header";
import MainContent from "../../components/Home/MainContent/mainContent";
import Footer from "../../components/Home/Footer/footer";

const Home = () => {
  return (
    <div className="o-container">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default Home;
