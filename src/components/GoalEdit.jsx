// GoalEditComponent.jsx
import React, { useState } from "react";

const GoalEditComponent = ({ onSave, onCancel }) => {
  const [goalName, setGoalName] = useState("");
  const [startPeriod, setStartPeriod] = useState("");
  const [endPeriod, setEndPeriod] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  const handleSave = () => {
    // Validate and save the goal data
    const goalData = {
      goalName,
      startPeriod,
      endPeriod,
      paymentAmount,
    };

    onSave(goalData);
  };

  return (
    <div>
      <p>Goal Name: <input type="text" value={goalName} onChange={(e) => setGoalName(e.target.value)} /></p>
      <p>Start Period: <input type="text" value={startPeriod} onChange={(e) => setStartPeriod(e.target.value)} /></p>
      <p>End Period: <input type="text" value={endPeriod} onChange={(e) => setEndPeriod(e.target.value)} /></p>
      <p>Payment Amount: <input type="text" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} /></p>

      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default GoalEditComponent;
