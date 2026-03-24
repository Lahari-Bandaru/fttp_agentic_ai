import React, { useEffect, useState } from "react";
import axios from "axios";

function HistoryPanel() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    axios.get("http://127.0.0.1:8000/history")
      .then(res => setHistory(res.data));

  }, []);

  return (

    <div>

      <h3>Recent Predictions</h3>

      {history.map((item, index) => (

        <p key={index}>
          {item.input.location_type} | Cost: {item.estimated_cost}
        </p>

      ))}

    </div>

  );
}

export default HistoryPanel;