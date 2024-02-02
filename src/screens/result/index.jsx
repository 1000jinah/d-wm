import Demo from "components/Demo";
import Drowdown from "components/Drowdown";
// import Footer from "components/Footer";
import GoalBar from "components/GoalBar";
import Header from "components/Header";
import LineChart from "components/LineChart";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const responses = location.state?.responses || [];
  const [activeTab, setActiveTab] = useState(0);
  const [activeChartTab, setActiveChartTab] = useState(0);
  const goals = location.state?.goals || []
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div>
            {responses.map((response, index) => (
              <div key={index}>
                <p>Response {index + 1}:</p>
                <p>Slider Value: {response.slider}</p>
                <p>Input Value: {response.input}</p>
              </div>
            ))}
          </div>
        );
      case 1:
        return (
          <div>
           {/* Render the list of goals */}
           <ul>
              {goals.map((goal, index) => (
                <li key={index}>
                  <p>Goal Name: {goal.goalName}</p>
                  <p>Start Period: {goal.startPeriod}</p>
                  <p>End Period: {goal.endPeriod}</p>
                  <p>Payment Amount: {goal.paymentAmount}</p>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  const handleChartTabClick = (index) => {
    setActiveChartTab(index);
  };

  const renderChart = () => {
    switch (activeChartTab) {
      case 0:
        return <LineChart />;
      case 1:
        return <Drowdown />;
      case 2:
        return <GoalBar />;
      // Add other cases for different chart types
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <div
        style={{
          maxWidth: 1600,
          margin: "0 auto",
          padding: 20,
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Demo
            width={500}
            height={"calc(100vh - 156px)"}
            text={"탭을 가진 survey result & goal list"}
            contents={
              <div>
                {/* Render tabs for content types */}
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  {["Survey Result", "Goal List"].map((tab, index) => (
                    <div
                      key={index}
                      onClick={() => handleTabClick(index)}
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        borderBottom:
                          activeTab === index
                            ? "2px solid blue"
                            : "2px solid transparent",
                      }}
                    >
                      {tab}
                    </div>
                  ))}
                </div>
                {/* Render the selected content based on the active tab */}
                {renderContent()}
              </div>
            }
          />
          <div style={{ width: "100%", height: "calc(100vh - 156px)" }}>
            <Demo
              width={"100%"}
              height={"50%"}
              text={"차트"}
              contents={
                <div>
                  {/* Render tabs for chart types */}
                  <div style={{ display: "flex", marginBottom: "10px" }}>
                    {["Line Chart", "Bar Chart", "Pie Chart"].map(
                      (tab, index) => (
                        <div
                          key={index}
                          onClick={() => handleChartTabClick(index)}
                          style={{
                            padding: "10px",
                            cursor: "pointer",
                            borderBottom:
                              activeChartTab === index
                                ? "2px solid blue"
                                : "2px solid transparent",
                          }}
                        >
                          {tab}
                        </div>
                      )
                    )}
                  </div>
                  {/* Render the selected chart based on the active tab */}
                  {renderChart()}
                </div>
              }
            />
            <div
              style={{
                width: "100%",
                height: "50%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Demo width={"100%"} text={"백분위수"} />
              <Demo width={"100%"} text={"포트폴리오 분배"} />
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Result;
