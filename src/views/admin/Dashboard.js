import React from "react";

// components

import LineChartA from "components/Cards/LineChartA.js";
import BarChartA from "components/Cards/BarChartA.js";
import BarChartB from "components/Cards/BarChartB.js";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-6/12 px-4">
          <BarChartA />
        </div>
        <div className="w-full xl:w-6/12 px-4">
          <BarChartB />
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <LineChartA />
        </div>
      </div>
    </>
  );
}
