import React, { useContext, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { themeContext } from "../../Context";

const ChartModal = ({ seriesColor, seriesData }) => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  // Define colors for light and dark mode
  const colors = {
    light: {
      seriesColor: seriesColor,
      textColor: "#333",
      axisLineColor: "#888",
    },
    dark: {
      seriesColor: seriesColor, // Adjust color for dark mode
      textColor: "#ddd",
      axisLineColor: "#F5F5F5",
    },
  };

  const [chartData, setChartData] = useState({
    series: [
      {
        data: seriesData,
        color: darkMode ? colors.dark.seriesColor : colors.light.seriesColor,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 200,
        background: darkMode ? "#1B1C1E" : "#F5F5F5", // Adjust background color for dark mode
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["Positive", "Negative", "Comments"],
        labels: {
          style: {
            colors: darkMode ? colors.dark.textColor : colors.light.textColor,
          },
        },
        axisTicks: {
          show: true,
          color: darkMode
            ? colors.dark.axisLineColor
            : colors.light.axisLineColor,
        },
        axisBorder: {
          show: true,
          color: darkMode
            ? colors.dark.axisLineColor
            : colors.light.axisLineColor,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: darkMode ? colors.dark.textColor : colors.light.textColor,
          },
        },
      },
      theme: {
        mode: darkMode ? "dark" : "light",
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={200}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ChartModal;
