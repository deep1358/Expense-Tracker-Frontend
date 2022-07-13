import { memo, useEffect } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";

const BarOrAreaChart = ({ data = [], name, chartType = "bar" }) => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    // For responsiveness
    // https://apexcharts.com/docs/options/responsive/

    setOptions({
      plotOptions: {
        chart: {
          zoom: {
            enabled: false,
          },
        },
        bar: {
          borderRadius: 10,
          columnWidth: "70%",
          dataLabels: {
            position: "top", // top, center, bottom
          },
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + " Rs";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: data?.map((item) => item[name]) || [],
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
      stroke: {
        width: 2,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [20, 60, 80, 100],
        },
      },
      title: {
        text: `${name} Wise Expenses`.toUpperCase(),
        align: "center",
        style: {
          color: "#444",
        },
      },
      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },
      theme: {
        palette: "palette1",
      },
      tooltip: {
        y: {
          formatter: function (value) {
            return value + " Rs";
          },
        },
      },
    });
    setSeries([
      {
        name: "Expense",
        data: data?.map((item) => item.amount),
      },
    ]);
  }, [data]);

  return (
    <Chart options={options} series={series} type={chartType} height={350} />
  );
};

export default memo(BarOrAreaChart);
