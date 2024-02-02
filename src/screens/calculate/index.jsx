import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const moveToSurvey = () => {
    navigate("/survey");
  };
  return (
    <div>
      <Header />
      재무설계
      <Footer />
      <button onClick={moveToSurvey}>Get Start</button>
    </div>
  );
};

export default Main;
