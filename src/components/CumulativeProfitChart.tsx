import { Typography } from "@mui/material";
import React from "react";
import { forwardRef } from "react";
import Chart from "react-apexcharts";
import Constant from "../utils/const_label";
import { MonthlySales } from "../interfaces/interfaces";
import formatRupiah from "../utils/helper";
interface ChartProps {
  data: MonthlySales[];
  investment_type: string | null;
}

const CumulativeProfitChart= forwardRef<HTMLDivElement, ChartProps>(({data,investment_type}, ref) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      id: "cumulativeProfitChart",
      toolbar: {
        show: false,
      },
      events: {
        // Custom event handling for plot clicks
        xAxisLabelClick: function (event, chartContext, config) {
        //   const seriesIndex = config.seriesIndex;
        //   const dataPointIndex = config.dataPointIndex;
        //   const category = options.xaxis.categories[dataPointIndex];

          // Do something with the clicked data point
          console.log(data[config.labelIndex]);
        },
      },
    },
    // colors: ["#5A67D8"],
    colors: [
      function ({ value, seriesIndex, w }) {
        // console.log("tes bar")
        // console.log(value)
        if (value < 0) {
          return "#FF0000";
        } else {
          return "#10AF13";
        }
      },
    ],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
        // borderRadius: 50, // Set the border-radius for the top corners
        borderRadiusApplication: "end",
      },
    },
    xaxis: {
      categories: data.map((item) => `Month ${item.month}`),
      labels: {
        style: {
          fontSize: "14px",
          rotate: -90,
        },
        rotate: -90,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
        },
        formatter: (value) => formatRupiah(value),
      },
    },
    grid: {
      borderColor: "#F1F3F4",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        console.log(w);
        // <span>
        // ${w.config.xaxis.categories[dataPointIndex]}
        // </span>
        if (investment_type == "fc") {
          return `<div class="custom-tooltip">
          <div>
          <span class="title">${Constant.TOTAL_CUMPROFIT}:</span>
          <span>${formatRupiah(data[dataPointIndex].profit.cum_profit)}</span>
        </div>
          <div>
          <span class="title">${Constant.ACTIVE_STUDENTS}:</span>
          <span>${data[dataPointIndex].active_st} siswa</span>
        </div>
            <div>
              <span class="title">${Constant.TOTAL_SALES}:</span>
              <span>${formatRupiah(data[dataPointIndex].total_sales)}</span>
            </div>
            <div>
            <span class="title">${Constant.TOTAL_PROFIT}:</span>
            <span>${formatRupiah(data[dataPointIndex].profit.ord_income)}</span>
            </div>
            <div>
            <span class="title">${Constant.TOTAL_PARTNER_PROFIT} (Timedoor Academy):</span>
            <span>${formatRupiah(
              data[dataPointIndex].profit.partner_profit
            )}</span>
            </div>
            </div>`;
        } else {
          return `<div class="custom-tooltip">
          <div>
          <span class="title">${Constant.TOTAL_CUMPROFIT}:</span>
          <span>${formatRupiah(data[dataPointIndex].profit.partner_cum_profit)}</span>
        </div>
          <div>
          <span class="title">${Constant.ACTIVE_STUDENTS}:</span>
          <span>${data[dataPointIndex].active_st} siswa</span>
        </div>
            <div>
              <span class="title">${Constant.TOTAL_SALES}:</span>
              <span>${formatRupiah(data[dataPointIndex].total_sales)}</span>
            </div>
            <div>
            <span class="title">${Constant.TOTAL_PROFIT}:</span>
            <span>${formatRupiah(data[dataPointIndex].profit.ord_income)}</span>
            </div>
            <div>
            <span class="title">${Constant.TOTAL_PARTNER_PROFIT}:</span>
            <span>${formatRupiah(
              data[dataPointIndex].profit.partner_profit
            )}</span>
            </div>
            </div>`;
        }
      },
    },
    legend: {
      show: false, // Set show to false to hide the legend
    },
  };
  let series;
  if(investment_type=='fc'){
    series = [
      {
        name: "Total Cumulative Profit",
        data: data.map((item) => item.profit.cum_profit),
      },
    ];
  }else{
    series = [
      {
        name: "Total Cumulative Profit",
        data: data.map((item) => item.profit.partner_cum_profit),
      },
    ];
  }
  // const series = [
  //   {
  //     name: "Total Cumulative Profit",
  //     data: data.map((item) => item.profit.cum_profit),
  //   },
  // ];

  return (
    <div className="rounded-chart" ref={ref}>
      <Typography
        variant="h5"
        align="left"
        sx={{
          marginBottom: 2,
          fontWeight: "bold",
        }}
      >
        Cumulative Profit (ROI)
      </Typography>
      <Chart
        options={options}
        series={series}
        type="bar"
        height={350}
        className="apex-chart"
        width={"100%"}
      />
    </div>
  );
});

export default CumulativeProfitChart;
