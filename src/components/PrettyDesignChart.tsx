import { Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import Constant from "../utils/const_label";
import { MonthlySales } from "../interfaces/interfaces";
import formatRupiah from "../utils/helper";
interface ChartProps {
  data: MonthlySales[];
  investment_type: string | null;
}

const PrettyDesignChart: React.FC<ChartProps> = ({ data, investment_type }) => {
  console.log(data);
  const options: ApexCharts.ApexOptions = {
    chart: {
      id: "cumulativeChart",
      toolbar: {
        show: false,
      },
      stacked: true,
    },
    // colors: ["#92cad1", "#e9724d"],
    // colors: ["#5A67D8"],
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
    series: [
      {
        name: "Total Sales",
        data: data.map((item) => item.profit.cum_profit),
        // color:"#e9724d"
      },
      {
        name: "Total Profit",
        data: data.map((item) => item.profit.ord_income),
        // color:"#92cad1"
        // colors: [
        //   function ({ value, seriesIndex, w }) {
        //     if (value < 0) {
        //       return "#FF0000";
        //     } else {
        //       return "#10AF13";
        //     }
        //   },
        // ],
      },
    ],
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
        if (investment_type != "vp") {
          return `<div class="custom-tooltip">
          <div>
          <span class="title">${Constant.ACTIVE_STUDENTS}:</span>
          <span>${data[dataPointIndex].active_st} siswa</span>
        </div>
            <div>
              <span class="title">${Constant.TOTAL_SALES}:</span>
              <span>${formatRupiah(data[dataPointIndex].total_sales)}</span>
            </div>
            <div>
            <span class="title">${Constant.TOTAL_EXPENSES}:</span>
            <span>${formatRupiah(
              data[dataPointIndex].cog.total_cog +
                data[dataPointIndex].sga.total_sga
            )}</span>
            </div>
            <div>
            <span class="title">${Constant.TOTAL_PROFIT}:</span>
            <span>${formatRupiah(data[dataPointIndex].profit.ord_income)}</span>
            </div>
            <div>
            <span class="title">${Constant.TOTAL_CUMPROFIT}:</span>
            <span>${formatRupiah(data[dataPointIndex].profit.cum_profit)}</span>
            </div>
            </div>`;
        } else {
          return `<div class="custom-tooltip">
          <div>
          <span class="title">${Constant.ACTIVE_STUDENTS}:</span>
          <span>${data[dataPointIndex].active_st} siswa</span>
        </div>
            <div>
              <span class="title">${Constant.TOTAL_SALES}:</span>
              <span>${formatRupiah(data[dataPointIndex].total_sales)}</span>
            </div>
            <div>
            <span class="title">${Constant.TOTAL_EXPENSES}:</span>
            <span>${formatRupiah(
              data[dataPointIndex].cog.total_cog +
                data[dataPointIndex].sga.total_sga
            )}</span>
            </div>
            <div>
            <span class="title">${Constant.TOTAL_PARTNER_PROFIT}:</span>
            <span>${formatRupiah(
              data[dataPointIndex].profit.partner_profit
            )}</span>
            </div>
            <div>
            <span class="title">${Constant.TOTAL_PARTNER_CUMPROFIT}:</span>
            <span>${formatRupiah(
              data[dataPointIndex].profit.partner_cum_profit
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
  const [seriesToggle, setSeriesToggle] = useState<string[]>([]); // Initial visibility state

  const [seriesVisibility, setSeriesVisibility] = useState<boolean[]>([
    false,
    false,
  ]); // Initial visibility state

  const toggleSeries = (seriesIndex: number, visibility: boolean) => {
    const newVisibility = [...seriesVisibility];
    newVisibility[seriesIndex] = visibility;
    setSeriesVisibility(newVisibility);
  };
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newSelectedOptions: string[]
  ) => {
    setSeriesToggle(newSelectedOptions);
    if (newSelectedOptions.includes("profit")) {
      toggleSeries(1, true);
    } else {
      toggleSeries(1, false);
    }
    if (newSelectedOptions.includes("cum_profit")) {
      toggleSeries(0, true);
    } else {
      toggleSeries(0, false);
    }
  };
  return (
    <div className="rounded-chart">
      <ToggleButtonGroup
        color="primary"
        value={seriesToggle}
        onChange={handleChange}
        aria-label="platform"
      >
        <ToggleButton name="investment_type" value="cum_profit">
          Cumulative Profit (ROI)
        </ToggleButton>
        <ToggleButton name="investment_type" value="profit">
          Profit (BEP)
        </ToggleButton>
      </ToggleButtonGroup>
      <Typography
        variant="h5"
        align="left"
        sx={{
          marginBottom: 2,
          fontWeight: "bold",
        }}
      >
        Cumulative Profit Graph
      </Typography>
      <Chart
        options={options}
        series={options.series.filter((_, index) => seriesVisibility[index])}
        type="bar"
        height={350}
        className="apex-chart"
        width={"100%"}
      />
    </div>
  );
};

export default PrettyDesignChart;
