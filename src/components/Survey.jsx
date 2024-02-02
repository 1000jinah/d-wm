import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoalEditComponent from "components/GoalEdit";
import TransitionsModal from "components/Modal";
const SurveyComponent = () => {
  const [step, setStep] = useState(1);
  const [showPage, setShowPage] = useState(false);
  const [goals, setGoals] = useState([]);
  const [showGoalEdit, setShowGoalEdit] = useState(false);

  const handleGoalEditClick = () => {
    setShowGoalEdit(true);
  };
  const handleGoalSave = (goalData) => {
    console.log("Goal data saved:", goalData);
    setGoals((prevGoals) => [...prevGoals, goalData]);
    setShowGoalEdit(false);
  };
  const handleGoalCancel = () => {
    setShowGoalEdit(false);
  };
  const [value, setValue] = useState(0);
  useEffect(() => {
    const showPageTimeout = setTimeout(() => {
      setShowPage(true);
    }, 100);
    return () => clearTimeout(showPageTimeout); // 컴포넌트가 언마운트될 때 clearTimeout을 호출하여 메모리 누수를 방지합니다.
  }, []);
  const [responses, setResponses] = useState([
    { slider: 18, input: "" },
    { slider: 50, input: "" },
    { slider: 85, input: "" },
    { slider: 20000, input: "" },
    { slider: 3000, input: "" },
    { slider: 200000, input: "" },
    { slider: 10000, input: "" },
    ...Array(1)
      .fill("")
      .map(() => ({ slider: "", input: "" })),
  ]);
  const TitleArray = [
    "Tell us your age, ideal retirement age, and life expectancy.",
    "What's your average monthly income?",
    "How much do you save for your retirement every month?",
    "How much have you saved for retirement?",
    "What will your monthly expenses be after you retire?",
    "Create Investment Goal",
  ];
  const yearsOfWork = responses[1].slider - responses[0].slider;
  const yearsOfRetirement = responses[2].slider - responses[1].slider;
  const monthlyContributions = (
    (responses[4].slider / responses[3].slider) *
    100
  ).toFixed(2);
  const contentsTextArray = [
    <p
      style={{
        fontWeight: "normal",
        fontSize: "16px",
        color: "#000ad2",
        textAlign: "center",
      }}
    >
      Age
    </p>,
    <p
      style={{
        fontWeight: "normal",
        fontSize: "16px",
        color: "#5ff0ff",
        textAlign: "center",
      }}
    >
      Retirement age
    </p>,
    <p
      style={{
        fontWeight: "normal",
        fontSize: "16px",
        color: "#6ee66e",
        textAlign: "center",
      }}
    >
      Life expectancy
    </p>,
    <p
      style={{
        fontWeight: "bold",
        fontSize: "1rem",
        color: "#000",
        textAlign: "center",
      }}
    >
      You have <span style={{ color: "#5ff0ff" }}>{yearsOfWork} years </span> of
      work and you'll enjoy
      <span style={{ color: "#6ee66e" }}> {yearsOfRetirement} years </span>
      of retirement life.
    </p>,
    <p
      style={{
        fontWeight: "normal",
        fontSize: "1rem",
        color: "#000",
        textAlign: "center",
      }}
    >
      Your average monthly retirement contributions are{" "}
      <span style={{ color: "#000ad2" }}>{monthlyContributions}% </span>
      of your monthly income
    </p>,
    <p
      style={{
        fontWeight: "normal",
        fontSize: "16px",
        color: "#000",
        textAlign: "center",
      }}
    >
      This includes your liquid income.
    </p>,
    <p
      style={{
        fontWeight: "normal",
        fontSize: "1rem",
        color: "#000",
        textAlign: "center",
      }}
    >
      We can help you estimate them.
    </p>,
    <p
      style={{
        fontSize: "0.875rem",
        textAlign: "center",
      }}
    >
      CALCULATE HERE
    </p>,
    <p
      style={{
        fontSize: "0.875rem",

        textAlign: "center",
      }}
    >
      Create Goal
    </p>,
  ];

  const navigate = useNavigate();
  const moveToResult = () => {
    navigate("/result", { state: { responses, goals } }); // Include goals in the state
  };
  const handleNext = () => {
    if (step < 6) {
      setStep((prevStep) => prevStep + 1);
    } else {
      console.log("Survey completed. Responses:", responses);
    }
  };
  const handleInputChange = (event, index) => {
    let { value } = event.target;
    const minMaxElement =
      event.target.parentElement.querySelector(".min-max-values");
    // min, max 값을 업데이트
    minMaxElement.innerText = `Min: ${event.target.min}, Max: ${event.target.max}`;
    setResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      newResponses[index] = { ...newResponses[index], slider: value };
      return newResponses;
    });
  };
  const handleSliderChange = (event, index) => {
    const gradientValue = (100 / event.target.max) * event.target.value;
    const backgroundColor = `linear-gradient(to right, ${
      index === 0 ? "#000ad2" : index === 1 ? "#5ff0ff" : "#6ee66e"
    } 0%, ${
      index === 0 ? "#000ad2" : index === 1 ? "#5ff0ff" : "#6ee66e"
    } ${gradientValue}%, rgb(236, 236, 236) ${gradientValue}%, rgb(236, 236, 236) 100%)`;
    event.target.style.background = backgroundColor;

    setValue(event.target.value);
    const { value } = event.target;
    setResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      newResponses[index] = { ...newResponses[index], slider: value };
      return newResponses;
    });
  };
  const handleStepperClick = (clickedStep) => {
    if (clickedStep <= step - 1) {
      setStep(clickedStep);
    }
  };
  useEffect(() => {
    const handleSliderChange = (event) => {
      const val = event.target.value;
      event.target.style.background = `linear-gradient(to right, dodgerblue 0%, dodgerblue ${val}%, #d5d4d3 ${val}%, #d5d4d3 100%)`;
    };
    document.querySelectorAll('input[type="range"]').forEach((input) => {
      input.addEventListener("input", handleSliderChange);
    });
    return () => {
      document.querySelectorAll('input[type="range"]').forEach((input) => {
        input.removeEventListener("input", handleSliderChange);
      });
    };
  }, []);
  return (
    <div>
      <div>
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 300,
              marginBottom: 50,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {Array.from({ length: 6 }, (_, index) => {
              if (index + 1 <= step) {
                return (
                  <div
                    key={index + 1}
                    className={`stepper-item active`}
                    onClick={() => handleStepperClick(index + 1)}
                  >
                    <span className={`step-label ${showPage ? "show" : ""}`}>
                      {index + 1}
                    </span>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index + 1}
                    className={`stepper-item default`}
                    onClick={() => handleStepperClick(index + 1)}
                  >
                    <span className={`step-label ${showPage ? "" : "show"}`}>
                      {index + 1}
                    </span>
                  </div>
                );
              }
            })}
          </div>
          {/* 시작, 은퇴, 종료 */}
          {step === 1 && (
            <div style={{ maxWidth: 600 }}>
              <p
                style={{
                  fontSize: 32,
                  marginBottom: 60,
                  textAlign: "center",
                  fontWeight: 900,
                }}
              >
                {TitleArray[0]}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 45,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <input
                    className="numInput"
                    style={{
                      border: "none",
                      borderBottom: "1px solid #000ad2",
                      fontSize: 54,
                      maxWidth: 100,
                      padding: 0,
                      textAlign: "center",
                    }}
                    type="number"
                    name="input"
                    value={responses[0].slider}
                    onChange={(e) => handleInputChange(e, 0)}
                  />
                  {contentsTextArray[0]}
                  <input
                    type="range"
                    className="rangeInput"
                    style={{ margin: "20px 0", color: "#000ad2" }}
                    name="slider"
                    value={responses[0].slider}
                    onChange={(e) => handleSliderChange(e, 0)}
                    min={18}
                    max={responses[1].slider - 1}
                  />
                  <div className="min-max-values">{`Min: ${responses[0].slider}, Max: ${responses[1].slider}`}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <input
                    className="numInput"
                    style={{
                      border: "none",
                      borderBottom: "1px solid #5ff0ff",
                      fontSize: 54,
                      maxWidth: 100,
                      padding: 0,
                      textAlign: "center",
                    }}
                    type="number"
                    name="input"
                    value={responses[1].slider}
                    onChange={(e) => handleInputChange(e, 1)}
                  />
                  {contentsTextArray[1]}
                  <input
                    type="range"
                    className="rangeInput"
                    style={{
                      margin: "20px 0",
                    }}
                    name="slider"
                    value={responses[1].slider}
                    onChange={(e) => handleSliderChange(e, 1)}
                    min={responses[0].slider}
                    max={responses[2].slider - 1}
                  />{" "}
                  <div className="min-max-values">{`Min: ${responses[1].slider}, Max: ${responses[2].slider}`}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <input
                    className="numInput"
                    style={{
                      border: "none",
                      borderBottom: "1px solid #6ee66e",
                      fontSize: 54,
                      maxWidth: 100,
                      padding: 0,

                      textAlign: "center",
                    }}
                    type="number"
                    name="input"
                    value={responses[2].slider}
                    onChange={(e) => handleInputChange(e, 2)}
                  />
                  {contentsTextArray[2]}
                  <input
                    type="range"
                    className="rangeInput"
                    style={{ margin: "20px 0" }}
                    name="slider"
                    value={responses[2].slider}
                    onChange={(e) => handleSliderChange(e, 2)}
                    min={responses[1].slider}
                    max={100}
                  />{" "}
                  <div className="min-max-values">{`Min: ${
                    responses[2].slider
                  }, Max: ${100}`}</div>
                </div>
              </div>

              {contentsTextArray[3]}
            </div>
          )}
          {/* 최대 500,000 */}
          {step === 2 && (
            <div style={{ maxWidth: 600 }}>
              <p
                style={{
                  fontSize: 32,
                  marginBottom: 60,
                  textAlign: "center",
                  fontWeight: 900,
                }}
              >
                {TitleArray[1]}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <input
                  className="numInput"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #333",
                    fontSize: 54,
                    maxWidth: 240,
                    padding: 0,

                    textAlign: "center",
                  }}
                  type="number"
                  name="input"
                  value={responses[3].slider}
                  onChange={(e) => handleInputChange(e, 3)}
                />
                <input
                  style={{ width: "100%", margin: "40px 0" }}
                  type="range"
                  className="rangeInput"
                  name="slider"
                  value={responses[3].slider}
                  onChange={(e) => handleSliderChange(e, 3)}
                  min={1}
                  max={500000}
                />{" "}
                <div className="min-max-values">{`Min: ${responses[3].slider.min}, Max: ${responses[3].slider.max}`}</div>
              </div>
            </div>
          )}
          {/* 최대 Step 2 Value */}
          {step === 3 && (
            <div style={{ maxWidth: 600 }}>
              <p
                style={{
                  fontSize: 32,
                  marginBottom: 60,
                  textAlign: "center",
                  fontWeight: 900,
                }}
              >
                {TitleArray[2]}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <input
                  className="numInput"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #333",
                    fontSize: 54,
                    maxWidth: 240,
                    padding: 0,

                    textAlign: "center",
                  }}
                  type="number"
                  name="input"
                  value={responses[4].slider}
                  onChange={(e) => handleInputChange(e, 4)}
                />{" "}
                <input
                  style={{ width: "100%", margin: "40px 0" }}
                  type="range"
                  className="rangeInput"
                  name="slider"
                  value={responses[4].slider}
                  onChange={(e) => handleSliderChange(e, 4)}
                  min={1}
                  max={responses[3].slider}
                />{" "}
                <div className="min-max-values">{`Min: ${responses[4].slider.min}, Max: ${responses[4].slider.max}`}</div>
                <p style={{ textAlign: "center" }}>{contentsTextArray[4]}</p>
              </div>
            </div>
          )}
          {/* 최대 50,000,000 */}
          {step === 4 && (
            <div style={{ maxWidth: 600 }}>
              <p
                style={{
                  fontSize: 32,
                  marginBottom: 60,
                  textAlign: "center",
                  fontWeight: 900,
                }}
              >
                {TitleArray[3]}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p style={{ textAlign: "center" }}>{contentsTextArray[5]}</p>
                <input
                  className="numInput"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #333",
                    fontSize: 54,
                    maxWidth: 280,
                    padding: 0,

                    textAlign: "center",
                  }}
                  type="number"
                  name="input"
                  value={responses[5].slider}
                  onChange={(e) => handleInputChange(e, 5)}
                />{" "}
                <input
                  style={{ width: "100%", margin: "40px 0" }}
                  type="range"
                  className="rangeInput"
                  name="slider"
                  value={responses[5].slider}
                  onChange={(e) => handleSliderChange(e, 5)}
                  min={1}
                  max={50000000}
                />{" "}
                <div className="min-max-values">{`Min: ${responses[5].slider.min}, Max: ${responses[5].slider.max}`}</div>
              </div>
            </div>
          )}
          {/* 최대 500,000 */}
          {step === 5 && (
            <div style={{ maxWidth: 600 }}>
              <p
                style={{
                  fontSize: 32,
                  marginBottom: 60,
                  textAlign: "center",
                  fontWeight: 900,
                }}
              >
                {TitleArray[4]}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", marginBottom: 30 }}>
                  <p style={{ textAlign: "center" }}>{contentsTextArray[6]}</p>
                  <TransitionsModal
                    modalButton={contentsTextArray[7]}
                    modalButtonStyle={{
                      textAlign: "center",
                      backgroundColor: "transparent",
                      color: "#000ad2",
                      border: "1px solid #000ad2",
                    }}
                    modalContents={<div>asdasdasd</div>}
                  />
                </div>
                <input
                  className="numInput"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #333",
                    fontSize: 54,
                    maxWidth: 240,
                    padding: 0,

                    textAlign: "center",
                  }}
                  value={responses[6].slider}
                  onChange={(e) => handleInputChange(e, 6)}
                />{" "}
                <input
                  style={{ width: "100%", margin: "40px 0" }}
                  type="range"
                  className="rangeInput"
                  name="slider"
                  value={responses[6].slider}
                  onChange={(e) => handleSliderChange(e, 6)}
                  min={1}
                  max={500000}
                />{" "}
                <div className="min-max-values">{`Min: ${responses[6].slider.min}, Max: ${responses[6].slider.max}`}</div>
              </div>
            </div>
          )}
          {/* 은퇴 이후 얼마나 쓸거야 */}
          {step === 6 && (
            <div style={{ maxWidth: 600 }}>
              <p
                style={{
                  fontSize: 32,
                  marginBottom: 60,
                  textAlign: "center",
                  fontWeight: 900,
                }}
              >
                {TitleArray[5]}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Render GoalEditComponent when showGoalEdit is true */}
                {showGoalEdit && (
                  <GoalEditComponent
                    onSave={handleGoalSave}
                    onCancel={handleGoalCancel}
                  />
                )}
                <div>
                  {goals.map((goal, index) => (
                    <div key={index}>
                      <p>Goal Name: {goal.goalName}</p>
                      <p>Start Period: {goal.startPeriod}</p>
                      <p>End Period: {goal.endPeriod}</p>
                      <p>Payment Amount: {goal.paymentAmount}</p>
                      <hr />
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex" }}>
                  <button
                    style={{
                      textAlign: "center",
                      backgroundColor: "transparent",
                      color: "#000ad2",
                      border: "1px solid #000ad2",
                    }}
                    onClick={handleGoalEditClick}
                  >
                    {contentsTextArray[8]}
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* 버튼 */}
          <button
            style={{
              marginTop: 20,
              border: "none",
              cursor: "pointer",
              minWidth: 200,
              backgroundColor: "#000ad2",
              borderRadius: "5px",
              padding: "15px 35px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: ".875rem",
              color: "#fff",
            }}
            onClick={step === 6 ? moveToResult : handleNext}
          >
            {step === 6 ? "Calculate" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyComponent;
