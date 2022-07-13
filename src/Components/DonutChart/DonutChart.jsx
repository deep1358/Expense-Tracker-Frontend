import { memo, useEffect } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";

const DonutChart = ({ data = [], name }) => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  const [isDataAvailable, setIsDataAvailable] = useState(false);

  useEffect(() => {
    // For responsiveness
    // https://apexcharts.com/docs/options/responsive/

    setOptions({
      chart: {
        width: 380,
        type: "donut",
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                formatter: (val) => {
                  let totalAmount = val.globals.initialSeries.reduce(
                    (acc, curr) => acc + curr,
                    0
                  );
                  return `${totalAmount} Rs`;
                },
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
      },
      legend: {
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex] + " Rs";
        },
      },
      labels: data?.map((item) => item[name]) || [],
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return +val.toFixed(2) + "%";
        },
      },
      title: {
        text: `${name} Wise Expenses`.toUpperCase(),
        align: "center",
        style: {
          color: "#444",
        },
      },
      tooltip: {
        y: {
          formatter: function (value) {
            return value + " Rs";
          },
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    });
    setSeries(data?.map((item) => item.amount));

    data?.forEach(({ amount }) => {
      if (amount > 0) {
        setIsDataAvailable(true);
      }
    });
  }, [data]);

  if (!isDataAvailable) return <p>No Data Available</p>;
  return <Chart options={options} series={series} type="donut" height={350} />;
};

export default memo(DonutChart);
