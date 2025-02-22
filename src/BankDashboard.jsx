import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import "chart.js/auto";

ChartJS.register(ArcElement);

const BankDashboard = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [loanTerm, setLoanTerm] = useState(10);
  const [interestRate, setInterestRate] = useState(7.5);

  const totalLoanMonths = loanTerm * 12;
  const interestPerMonth = interestRate / 100 / 12;
  const monthlyPayment =
    (loanAmount * interestPerMonth * (1 + interestPerMonth) ** totalLoanMonths) /
    ((1 + interestPerMonth) ** totalLoanMonths - 1);
  const totalInterestGenerated = monthlyPayment * totalLoanMonths - loanAmount;

  const data = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [loanAmount, totalInterestGenerated],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2>Bank Dashboard</h2>
      <div className="inputs">
        <label>
          Loan Amount:
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
          />
        </label>
        <label>
          Loan Term (Years):
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
          />
        </label>
        <label>
          Interest Rate (%):
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="chart-container">
        <Pie data={data} />
      </div>
      <p>Monthly Payment: ₹{monthlyPayment.toFixed(2)}</p>
      <p>Total Interest: ₹{totalInterestGenerated.toFixed(2)}</p>
    </div>
  );
};

export default BankDashboard;
