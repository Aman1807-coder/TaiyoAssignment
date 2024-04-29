import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const Chart = () => {
  const { data } = useQuery({
    queryFn: async () =>
      await (
        await fetch(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
        )
      ).json(),
    queryKey: ["covidData"],
  });

  interface dataInterface {
    day: string;
    cases: number;
    deaths: number;
    recovered: number;
  }

  console.log(data)

  const filteredData: dataInterface[] = [];

  if (data) {
    const objCases = data.cases;
    const objRecovered = data.recovered;
    const objDeaths = data.deaths;

    for (const day in objCases) {
      const cases = objCases[day]/1000000;
      const recovered = objRecovered[day]/1000000;
      const deaths = objDeaths[day]/1000000;

      filteredData.push({
        day: day,
        cases: cases,
        recovered: recovered,
        deaths: deaths
      });
    }
  }

  return (
    <div style={{left: "48vh", position: "absolute", top: "80vh"}}
    className="bg-stone-300">
      <p className="m-5">Y-axis represents Cases in Millions</p>
      <LineChart width={1000} height={500} data={filteredData}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="cases" stroke="#ff7300" />
        <Line type="monotone" dataKey="recovered" stroke="#387908" />
        <Line type="monotone" dataKey="deaths" stroke="#3b82f6" />
      </LineChart>
    </div>
  );
};

export default Chart;
