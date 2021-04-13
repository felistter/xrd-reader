import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const intensityOffset = 500;

const XRDchart = ({ dataXRD, onPlotClick }) => {
  const maxIntensity = dataXRD.reduce((prev, curr) =>
    prev.intensity > curr.intensity ? prev : curr
  );

  return (
    <div className="container my-10 w-11/12 h-144">
      <ResponsiveContainer className="block">
        <LineChart
          onClick={onPlotClick}
          data={dataXRD}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="theta"
            type="number"
            label={{
              value: "Theta, degree",
              offset: 0,
              position: "bottom",
            }}
            domain={[20, 60]}
            ticks={[20, 30, 40, 50, 60]}
          />

          <YAxis
            label={{
              value: "Intensity, a.m.",
              offset: -10,
              angle: -90,
              position: "insideLeft",
            }}
            domain={[0, maxIntensity.intensity + intensityOffset]}
          ></YAxis>

          <Tooltip />

          <Line
            type="monotone"
            dataKey="intensity"
            stroke="rgb(79, 70, 229)"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default XRDchart;
