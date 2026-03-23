import React, { useState } from "react";
import InputForm from "./components/InputForm";
import ResultPanel from "./components/ResultPanel";
import CostChart from "./components/CostChart";

function App() {

  const [result, setResult] = useState(null);

  return (
    <div style={{ padding: "40px" }}>

      <h1>Agentic AI FTTP Cost Estimator</h1>

      <InputForm setResult={setResult} />

      <ResultPanel result={result} />

      <CostChart result={result} />

    </div>
  );
}

export default App;