import "./App.css";
import { useEffect, useState, useRef } from "react";
import ButtonAppBar from "./components/AppBar";
import {
  Drawer,
  Box,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import OverviewCard from "./components/OverviewCard";
import InitialInvestmentForm from "./components/InitialInvestmentForm";
import { FormData, MonthlySales } from "./interfaces/interfaces";
import { usePostData } from "./utils/api";
import {
  ArrowBack,
  Checklist,
  AssignmentReturn,
  LocalAtm,
} from "@mui/icons-material";
import formatRupiah from "./utils/helper";
import Main from "./components/Main";
import ListMenu from "./components/ListMenu";
import ProfitChart from "./components/ProfitChart";
import CumulativeProfitChart from "./components/CumulativeProfitChart";
import SimulationDetailsTable from "./components/SimulationDetailsTable";
import ExDocument from "./components/ExDocument";
// import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { pdf } from "@react-pdf/renderer";
// import { saveAs } from "file-saver";
// import { Document, Page } from "@react-pdf/renderer";
import { useReactToPrint } from "react-to-print";
const drawerWidth = 600;
function App() {
  const tableRef = useRef<HTMLDivElement>(null);
  const cumProfRef = useRef<HTMLDivElement>(null);
  const profRef = useRef<HTMLDivElement>(null);
  const newRef = useRef<HTMLDivElement>(null);
  // const [graphDataUrl, setGraphDataUrl] = useState<string | null>(null);

  const postDataMutation = usePostData();
  // State to store form data
  const [chartData, setChartData] = useState<MonthlySales[]>([]);
  const [total_investment, setTotalInvestment] = useState<number>(0);
  const [total_expenses, setTotalExpenses] = useState<number>(0);
  const [total_revenue, setTotalRevenue] = useState<number>(0);
  const [total_cumprofit, setTotalCumProfit] = useState<number>(0);
  const [isSimulationUpdated, setIsSimulationUpdated] = useState(false);
  const [printRequested, setPrintRequested] = useState(false);

  const [formData, setFormData] = useState<{
    ruko_rent: null | number;
    mep: null | number;
    off_facility: null | number;
    t_material: null | number;
    off_renov: null | number;
    teaching_cost: null | number;
    ck_cost: null | number;
    new_st: null | number;
    class_price: null | number;
    ckit_price: null | number;
    drop_rate: null | number;
    admin_cost: null | number;
    marketing_cost: null | number;
    mep_monthly: null | number;
    license_fee: null | number;
    investment_type: null | string;
    max_st: null | number;
    others_cost: null | number;
    // is_vp: undefined | boolean;
  }>({
    ruko_rent: null,
    mep: null,
    off_facility: null,
    t_material: null,
    off_renov: null,
    teaching_cost: null,
    ck_cost: null,
    new_st: null,
    class_price: null,
    ckit_price: null,
    drop_rate: 0.03,
    admin_cost: null,
    marketing_cost: null,
    mep_monthly: null,
    license_fee: 50000000,
    investment_type: "fc",
    max_st: null,
    others_cost: null,
    // is_vp: false,
  });

  const [drawer, setToggleDrawer] = useState({
    bottom: false,
  });
  // const handlePrint = useReactToPrint({
  //     contentRef:tableRef
  // });

  const generatePDFLink = async () =>  {
    if (cumProfRef.current) {
      console.log("printing v2");
      const canvas = await html2canvas(cumProfRef.current);
      const imgData = canvas.toDataURL("image/png");
      return imgData;
    }
    return ""
  };

  const generatePDFLinks = async () => {
    const imagesData = []; // Array to store the image data
  
    for (const ref of [cumProfRef,profRef]) { // Loop through each reference
      if (ref.current) {
        console.log("Generating image for element...");
        const canvas = await html2canvas(ref.current); // Capture the current element
        const imgData = canvas.toDataURL("image/png"); // Convert to image data
        imagesData.push(imgData); // Push each image data to the array
      }
    }
    return imagesData; // Return the array of image data
  };
  
  const downloadPDF = async (graphDataUrl:Array<String>) => {
    if (graphDataUrl) {
      // Create the PDF document
      const pdfBlob = await pdf(
        <ExDocument graphDataUrls={graphDataUrl} formData={formData} tableData={chartData} totalInvestment={total_investment}/>
      ).toBlob();
      console.log(pdfBlob)
      // Create a link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = "multi-page.pdf"; // Specify the file name
      link.click(); // Programmatically click the link to trigger the download
    }
  };

  const handlePrint = async () => {
    const graphDataUrls = await generatePDFLinks();
    await downloadPDF(graphDataUrls);
  };
  const requestPrint = () => {
    setPrintRequested(true); // Set print request to true
  };
  const toggleDrawer = (open: boolean) => () => {
    console.log("Tes 1");
    setToggleDrawer({ bottom: open });
  };
  const handleGenerateExampleClick = () => {
    setFormData((prevData) => ({
      admin_cost: 4000000,
      ck_cost: 100000,
      ckit_price: 300000,
      class_price: 525000,
      drop_rate: 0.03,
      marketing_cost: 7500000,
      mep: 3000000,
      new_st: 12,
      off_facility: 50000000,
      off_renov: 30000000,
      ruko_rent: 80000000,
      t_material: 70000000,
      teaching_cost: 75000,
      mep_monthly: 1200000,
      license_fee: formData.investment_type != "fc" ? 0 : 100000000,
      // is_vp: formData.is_vp,
      investment_type: prevData.investment_type,
      max_st: 250,
      others_cost: 1500000,
    }));
    // Add your logic here
  };
  // const convertToPdf = (ref : HTMLDivElement) => {
  // 	// const options = {
  // 	// 	filename: 'my-document.pdf',
  // 	// 	margin: 1,
  // 	// 	image: { type: 'jpeg', quality: 0.98 },
  // 	// 	html2canvas: { scale: 2 },
  // 	// 	jsPDF: {
  // 	// 		unit: 'in',
  // 	// 		format: 'letter',
  // 	// 		orientation: 'portrait',
  // 	// 	},
  // 	// };

  // 	// html2pdf().set(options).from(content).save();
  //   useReactToPrint({ ref });
  // };

  const handleExportClick = async () => {
    // try {
    // console.log(tableRef.current)
    setPrintRequested(true);
    // const fileName = "test.pdf";
    // const blob = await pdf(
    //   <Document>
    //     <Page size="A4">
    //       <Typography
    //         variant="h5"
    //         align="left"
    //         sx={{
    //           marginBottom: 2,
    //           fontWeight: "bold",
    //         }}
    //       >
    //         Profit/Loss Graph
    //       </Typography>
    //     </Page>
    //   </Document>
    // // ).toBlob();
    // console.log(blob);
    // saveAs(blob, fileName);
    // } catch (error) {
    //   console.error("Error exporting PDF:", error);
    // }
  };
  const menuItems = [
    {
      text: "Generate Example",
      icon: <Checklist />,
      onClick: handleGenerateExampleClick,
    },
    {
      text: "Export to PDF",
      icon: <AssignmentReturn />,
      onClick: handleExportClick,
    },
  ];

  // Function to handle form data changes
  const handleFormChange = (name: string, value: string) => {
    if (name == "is_vp") {
      if (value) {
        setFormData((prevData) => ({
          ...prevData,
          license_fee: 0,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          license_fee: 50000000,
        }));
      }
    }
    // console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleFormSubmit = (formData: FormData) => {
  //   // Trigger the mutation when the form is submitted
  //   postDataMutation.mutate(formData);
  //   if (postDataMutation.isSuccess) {
  //     console.log([postDataMutation.data]);
  //     setChartData(() => postDataMutation.data);
  //   }
  // };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      const result = await postDataMutation.mutateAsync(formData);
      // console.log(result.monthly_sales)
      setChartData(() => result.monthly_sales);
      setTotalExpenses(() => result.total_expenses);
      setTotalCumProfit(() => result.total_cum_profit);
      setTotalInvestment(() => result.total_investment);
      setTotalRevenue(() => result.total_revenue);
      // Assuming your API response structure has a 'data' property
      // if (postDataMutation.isSuccess) {
      //   console.log([postDataMutation.data]);
      // }
    } catch (error) {
      console.error("Mutation error:", error);
    }
  };

  useEffect(() => {
    const chart = ApexCharts.getChartByID("cumulativeProfitChart");
    const chart2 = ApexCharts.getChartByID("profitChart");
    if (chart) {
      chart.windowResizeHandler();
    }
    if (chart2) {
      chart2.windowResizeHandler();
    }
  }, [drawer.bottom]);

  useEffect(() => {
    if (chartData && printRequested) {
      console.log("pritn claled");
      handlePrint();
      console.log(tableRef.current);
      setPrintRequested(false); // Reset the print request after printing
    }
  }, [chartData, printRequested, handlePrint]);

  const [seriesVisibility, setSeriesVisibility] = useState<boolean[]>([
    true,
    true,
  ]); // Initial visibility state

  const toggleSeries = (seriesIndex: number) => {
    const newVisibility = [...seriesVisibility];
    newVisibility[seriesIndex] = !newVisibility[seriesIndex];
    setSeriesVisibility(newVisibility);
  };

  return (
    <>
      <ButtonAppBar onClickButton={toggleDrawer(true)}></ButtonAppBar>
      <Drawer
        anchor="left"
        variant="persistent"
        open={drawer.bottom}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: drawerWidth,
            "& .MuiContainer-root": {
              maxWidth: "none",
              py: 2,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 2,
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={toggleDrawer(false)}>
            <ArrowBack></ArrowBack>
          </IconButton>
          <ListMenu menuItems={menuItems}></ListMenu>
        </Box>
        <InitialInvestmentForm
          formData={formData}
          onFormChange={handleFormChange}
          onFormSubmit={handleFormSubmit}
        />
      </Drawer>
      <Main open={drawer.bottom} drawerWidth={drawerWidth}>
        <Grid
          container
          spacing={2}
          sx={{
            paddingX: 2,
            paddingY: 4,
            // overflow:"scroll"
          }}
        >
          {/* <Grid item xs={12} ref={newRef}>
            <Typography
              variant="h6"
              align="left"
              sx={{
                fontWeight: "bold",
              }}
            >
              Initial Investment
            </Typography>
          </Grid> */}
          <Grid item xs={12} ref={tableRef}>
            {postDataMutation.isLoading && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LinearProgress />
                </Grid>
              </Grid>
            )}
            {postDataMutation.isSuccess && (
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <OverviewCard
                    title={"Total Initial Investment"}
                    icon={<LocalAtm />}
                    sx={{ height: "100%" }}
                    value={formatRupiah(total_investment)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <OverviewCard
                    title={"Total Revenue in 5Y"}
                    icon={<LocalAtm />}
                    sx={{ height: "100%" }}
                    value={formatRupiah(total_revenue)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <OverviewCard
                    title={"Total Profit in 5Y"}
                    icon={<LocalAtm />}
                    sx={{ height: "100%" }}
                    value={formatRupiah(total_cumprofit)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ProfitChart
                    data={chartData}
                    investment_type={formData.investment_type}
                    ref={profRef}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CumulativeProfitChart
                    data={chartData}
                    investment_type={formData.investment_type}
                    ref={cumProfRef}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SimulationDetailsTable
                    data={chartData}
                    investment_type={formData.investment_type}
                    // ref={tableRef}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Main>
    </>
  );
}

export default App;
