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
    month: string;
    2020: number;
    2021: number;
    2022: number;
    2023: number;
  }

  const filteredData: dataInterface[] = [];

  let year20 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let year21 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let year22 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let year23 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  if (data) {
    const obj = data.cases;

    for (const key in obj) {
      const separatedArray = key.split("/");
      const month = Number(separatedArray[0]);
      const year = separatedArray[2];
      const cases = obj[key];

      if (year === "20") year20[month - 1] += cases;
      else if (year === "21") year21[month - 1] += cases;
      else if (year === "22") year22[month - 1] += cases;
      else if (year === "23") year23[month - 1] += cases;
    }

    for (let i = 0; i < 12; ++i) {
      let monthName = "";
      switch (i) {
        case 0:
          monthName = "Jan";
          break;

        case 1:
          monthName = "Feb";
          break;

        case 2:
          monthName = "Mar";
          break;

        case 3:
          monthName = "Apr";
          break;

        case 4:
          monthName = "May";
          break;

        case 5:
          monthName = "Jun";
          break;

        case 6:
          monthName = "Jul";
          break;

        case 7:
          monthName = "Aug";
          break;

        case 8:
          monthName = "Sept";
          break;

        case 9:
          monthName = "Oct";
          break;

        case 10:
          monthName = "Nov";
          break;

        case 11:
          monthName = "Dec";
          break;
      }

      let d = 31;
      if (i === 1) d = 28;
      else if (i === 3 || i === 5 || i === 8 || i === 10) d = 30;

      year20[i] = year20[i] / d;
      year21[i] = year21[i] / d;
      year22[i] = year22[i] / d;
      year23[i] = year23[i] / d;

      filteredData.push({
        month: monthName,
        2020: year20[i]/1000000,
        2021: year21[i]/1000000,
        2022: year22[i]/1000000,
        2023: year23[i]/1000000,
      });
    }
  }

  return (
    <div style={{left: "48vh", position: "absolute", top: "80vh"}} 
    className="bg-stone-300">
      <p className="m-5">Y-axis represents Cases in Millions</p>
      <LineChart width={1000} height={500} data={filteredData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="2020" stroke="#ff7300" />
        <Line type="monotone" dataKey="2021" stroke="#387908" />
        <Line type="monotone" dataKey="2022" stroke="#3b82f6" />
        <Line type="monotone" dataKey="2023" stroke="#8b5cf6" />
      </LineChart>
    </div>
  );
};

export default Chart;
