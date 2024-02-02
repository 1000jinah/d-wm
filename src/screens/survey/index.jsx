import Header from "components/Header";
import SurveyComponent from "components/Survey";
import React, { useState, useEffect } from "react";

const Survey = () => {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const showPageTimeout = setTimeout(() => {
      setShowPage(true);
    }, 100);

    return () => clearTimeout(showPageTimeout); // 컴포넌트가 언마운트될 때 clearTimeout을 호출하여 메모리 누수를 방지합니다.
  }, []);

  return (
    <div className={`survey-page ${showPage ? "show" : ""}`}>
      <Header />
      <SurveyComponent />
    </div>
  );
};

export default Survey;
