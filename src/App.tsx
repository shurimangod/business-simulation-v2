import "./App.css";
import { useEffect, useState } from "react";
import ButtonAppBar from "./components/AppBar";
import { Drawer, Box, Grid, IconButton, LinearProgress } from "@mui/material";
import OverviewCard from "./components/OverviewCard";
import InitialInvestmentForm from "./components/InitialInvestmentForm";
import PrettyDesignChart from "./components/PrettyDesignChart";
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

const drawerWidth = 480;
function App() {
  const postDataMutation = usePostData();
  // State to store form data
  const [chartData, setChartData] = useState<MonthlySales[]>([]);
  const [total_investment, setTotalInvestment] = useState<number>(0);
  const [total_expenses, setTotalExpenses] = useState<number>(0);
  const [total_revenue, setTotalRevenue] = useState<number>(0);
  const [total_cumprofit, setTotalCumProfit] = useState<number>(0);
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
    is_vp: undefined | boolean;
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
    drop_rate: 0.04,
    admin_cost: null,
    marketing_cost: null,
    mep_monthly: null,
    license_fee: 50000000,
    is_vp: false,
  });

  const [drawer, setToggleDrawer] = useState({
    bottom: false,
  });
  const handleGenerateExampleClick = () => {
    setFormData({
      admin_cost: 4000000,
      ck_cost: 120000,
      ckit_price: 300000,
      class_price: 500000,
      drop_rate: 0.04,
      marketing_cost: 7500000,
      mep: 3000000,
      new_st: 10,
      off_facility: 50000000,
      off_renov: 20000000,
      ruko_rent: 80000000,
      t_material: 50000000,
      teaching_cost: 100000,
      mep_monthly: 1200000,
      license_fee: formData.is_vp ? 0 : 100000000,
      is_vp: formData.is_vp,
    });
    // Add your logic here
  };

  const handleExportClick = () => {
    console.log("Settings Clicked");
    // Add your logic here
  };
  const menuItems = [
    {
      text: "Generate Example",
      icon: <Checklist />,
      onClick: handleGenerateExampleClick,
    },
    {
      text: "Export to Doc",
      icon: <AssignmentReturn />,
      onClick: handleExportClick,
    },
  ];

  const toggleDrawer = (open: boolean) => () => {
    console.log("Tes 1");
    setToggleDrawer({ bottom: open });
    console.log("Tes 2");
  };

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
    console.log(name, value);
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
      setTotalCumProfit(() => result.monthly_sales[59].profit.cum_profit);
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
    const chart = ApexCharts.getChartByID("cumulativeChart");
    if (chart) {
      chart.windowResizeHandler();
    }
  }, [drawer.bottom]);

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
          }}
        >
          <Grid item xs={12}>
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
                {!formData.is_vp ? (
                  <Grid item xs={4}>
                    <OverviewCard
                      title={"Total Profit in 5Y"}
                      icon={<LocalAtm />}
                      sx={{ height: "100%" }}
                      value={formatRupiah(total_cumprofit)}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={4}>
                    <OverviewCard
                      title={"Total Profit in 5Y"}
                      icon={<LocalAtm />}
                      sx={{ height: "100%" }}
                      value={formatRupiah(chartData[59].profit.partner_cum_profit)}
                    />
                  </Grid>
                )}

                <Grid item xs={12}>
                  <PrettyDesignChart data={chartData} />
                  <Box></Box>
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
