import React, { useState } from "react";

import { CChart } from "@coreui/react-chartjs";
import axios from "axios";

function Chart() {
  const [apidata, setApidata] = useState([]);

  const GetApi = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((data) =>  console.log(data.data))
      .catch((error) => console.log(error));
  };

 GetApi()
  return (
    <div>
      <button type="button" >
        Get ApI
      </button>

     
      <CChart
        type="polarArea"
        data={{
          labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
          datasets: [
            {
              data: [11, 16, 7, 3, 14],
              backgroundColor: [
                "#FF6384",
                "#4BC0C0",
                "#FFCE56",
                "#E7E9ED",
                "#36A2EB",
              ],
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: "blue",
              },
            },
          },
          scales: {
            r: {
              grid: {
                color: "blue",
              },
            },
          },
        }}
      />
    </div>
  );
}

export default Chart;
