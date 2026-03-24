import React from "react";

function ResultPanel({ result }) {

  if (!result) return null;

  return (
    <div>

      <h3>Cost Estimation Result</h3>

      <p><b>Estimated Cost:</b> {result.estimated_cost}</p>

      

      <p><b>Material Cost:</b> {result.material_cost}</p>
<p><b>Labor Cost:</b> {result.labor_cost}</p>
<p><b>Distance Cost:</b> {result.distance_cost}</p>
<p><b>Risk Adjustment:</b> {result.risk_adjustment}</p>

<p><b>Risk Score:</b> {result.risk_score}</p>

      <p><b>Explanation:</b> {result.explanation}</p>

    </div>
  );
}

export default ResultPanel;