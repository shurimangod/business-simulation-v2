// InitialInvestmentForm component
import React from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  Box,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import IconWithTooltip from "./IconWithTooltip";
import { FormData } from "../interfaces/interfaces";
import AccordionMenu from "./AccordionMenu";
import { Memory } from "@mui/icons-material";
import { useState } from "react";

interface Props {
  formData: FormData;
  onFormChange: (name: string, value: any) => void;
  onFormSubmit: (formData: FormData) => void;
}

const InitialInvestmentForm: React.FC<Props> = ({
  formData,
  onFormChange,
  onFormSubmit,
}) => {
  // const [isVp,setisVp]=useState<boolean>(false);
  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // You can perform actions with the form data here
    console.log("Form submitted with data:", formData);
    onFormSubmit(formData);
  };

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(event.target.name, event.target.value);
    if (name == "is_vp") {
      onFormChange(name, event.target.checked);
    } else {
      onFormChange(name, value);
    }
  };
  // const handleChangeVpFc = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   onToggleChange(event.target.checked);
  // };

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AccordionMenu
              title={
                <Typography
                  variant="h6"
                  align="left"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Initial Investment
                </Typography>
              }
            >
              <Grid container spacing={2} sx={{ paddingTop: 1 }}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        checked={formData.is_vp}
                        onChange={(event) =>
                          onFormChange(event.target.name, event.target.checked)
                        }
                        inputProps={{ "aria-label": "controlled" }}
                        name="is_vp"
                      />
                    }
                    label={formData.is_vp ? "Venue Partner" : "Franchise"}
                    labelPlacement="start"
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    prefix="Rp."
                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <>Ruko or Venue Rent</>
                        <IconWithTooltip
                          sx={{
                            marginLeft: 1,
                          }}
                          description="Harga sewa ruko per tahun"
                        />
                      </Box>
                    }
                    name="ruko_rent"
                    customInput={TextField}
                    thousandSeparator="."
                    decimalScale={0}
                    allowLeadingZeros={false}
                    decimalSeparator=","
                    onValueChange={(values, sourceInfo) =>
                      onFormChange(sourceInfo.event?.target.name, values.value)
                    }
                    value={formData.ruko_rent}
                    // you can define additional custom props that are all forwarded to the customInput e. g.
                    variant="outlined"
                    renderText={(value) => `Rp. ${value}`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    prefix="Rp."
                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <>Office Facility</>
                        <IconWithTooltip
                          sx={{
                            marginLeft: 1,
                          }}
                          description="Meja, kursi, AC, interior"
                        />
                      </Box>
                    }
                    name="off_facility"
                    customInput={TextField}
                    thousandSeparator="."
                    decimalScale={0}
                    allowLeadingZeros={false}
                    decimalSeparator=","
                    onValueChange={(values, sourceInfo) =>
                      onFormChange(sourceInfo.event?.target.name, values.value)
                    }
                    value={formData.off_facility}
                    // you can define additional custom props that are all forwarded to the customInput e. g.
                    variant="outlined"
                    renderText={(value) => `Rp. ${value}`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    prefix="Rp."
                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <>Office Rennovation</>
                        <IconWithTooltip
                          sx={{
                            marginLeft: 1,
                          }}
                          description="Instalasi partisi, cat, renovasi ruko"
                        />
                      </Box>
                    }
                    name="off_renov"
                    customInput={TextField}
                    thousandSeparator="."
                    decimalScale={0}
                    allowLeadingZeros={false}
                    decimalSeparator=","
                    onValueChange={(values, sourceInfo) =>
                      onFormChange(sourceInfo.event?.target.name, values.value)
                    }
                    value={formData.off_renov}
                    // you can define additional custom props that are all forwarded to the customInput e. g.
                    variant="outlined"
                    renderText={(value) => `Rp. ${value}`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    prefix="Rp."
                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <>Electrical, Water and Internet</>
                        <IconWithTooltip
                          sx={{
                            marginLeft: 1,
                          }}
                          description="Biaya instalasi listrik, internet"
                        />
                      </Box>
                    }
                    name="mep"
                    customInput={TextField}
                    thousandSeparator="."
                    decimalScale={0}
                    allowLeadingZeros={false}
                    decimalSeparator=","
                    onValueChange={(values, sourceInfo) =>
                      onFormChange(sourceInfo.event?.target.name, values.value)
                    }
                    value={formData.mep}
                    // you can define additional custom props that are all forwarded to the customInput e. g.
                    variant="outlined"
                    renderText={(value) => `Rp. ${value}`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    prefix="Rp."
                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <>Teaching Materials</>
                        <IconWithTooltip
                          sx={{
                            marginLeft: 1,
                          }}
                          description="Alat dan media belajar seperti laptop, robot, VR Box, etc"
                        />
                      </Box>
                    }
                    name="t_material"
                    // disabled={formData.is_vp}
                    customInput={TextField}
                    thousandSeparator="."
                    decimalScale={0}
                    allowLeadingZeros={false}
                    decimalSeparator=","
                    onValueChange={(values, sourceInfo) =>
                      onFormChange(sourceInfo.event?.target.name, values.value)
                    }
                    value={formData.t_material}
                    // you can define additional custom props that are all forwarded to the customInput e. g.
                    variant="outlined"
                    renderText={(value) => `Rp. ${value}`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    prefix="Rp."
                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <>License Fee</>
                        <IconWithTooltip
                          sx={{
                            marginLeft: 1,
                          }}
                          description="Harga lisensi Timedoor Academy"
                        />
                      </Box>
                    }
                    name="license_fee"
                    disabled={formData.is_vp}
                    customInput={TextField}
                    thousandSeparator="."
                    decimalScale={0}
                    allowLeadingZeros={false}
                    decimalSeparator=","
                    onValueChange={(values, sourceInfo) =>
                      onFormChange(sourceInfo.event?.target.name, values.value)
                    }
                    value={formData.license_fee}
                    // you can define additional custom props that are all forwarded to the customInput e. g.
                    variant="outlined"
                    renderText={(value) => `Rp. ${value}`}
                  />
                </Grid>
              </Grid>
            </AccordionMenu>
          </Grid>
          <Grid item xs={12}>
            <AccordionMenu
              title={
                <Typography
                  variant="h6"
                  align="left"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Cost of Goods
                </Typography>
              }
            >
              <Grid container spacing={2} sx={{ paddingTop: 1 }}>
                <Grid item xs={6}>
                  <NumericFormat
                    prefix="Rp."
                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <>Teaching Cost</>
                        <IconWithTooltip
                          sx={{
                            marginLeft: 1,
                          }}
                          description="Biaya yang dikeluarkan untuk 1 sesi belajar (gaji teacher)"
                        />
                      </Box>
                    }
                    name="teaching_cost"
                    customInput={TextField}
                    thousandSeparator="."
                    decimalScale={0}
                    allowLeadingZeros={false}
                    decimalSeparator=","
                    onValueChange={(values, sourceInfo) =>
                      onFormChange(sourceInfo.event?.target.name, values.value)
                    }
                    value={formData.teaching_cost}
                    // you can define additional custom props that are all forwarded to the customInput e. g.
                    variant="outlined"
                    renderText={(value) => `Rp. ${value}`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    prefix="Rp."
                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <>Class Kit Cost</>
                        <IconWithTooltip
                          sx={{
                            marginLeft: 1,
                          }}
                          description="Biaya Class Kit / Registrasi setiap level"
                        />
                      </Box>
                    }
                    name="ck_cost"
                    customInput={TextField}
                    thousandSeparator="."
                    decimalScale={0}
                    allowLeadingZeros={false}
                    decimalSeparator=","
                    onValueChange={(values, sourceInfo) =>
                      onFormChange(sourceInfo.event?.target.name, values.value)
                    }
                    value={formData.ck_cost}
                    // you can define additional custom props that are all forwarded to the customInput e. g.
                    variant="outlined"
                    renderText={(value) => `Rp. ${value}`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    prefix="Rp."
                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <>Monthly Electrical, Water and Internet</>
                        <IconWithTooltip
                          sx={{
                            marginLeft: 1,
                          }}
                          description="Biaya bulanan listrik dan internet"
                        />
                      </Box>
                    }
                    name="mep_monthly"
                    customInput={TextField}
                    thousandSeparator="."
                    decimalScale={0}
                    allowLeadingZeros={false}
                    decimalSeparator=","
                    onValueChange={(values, sourceInfo) =>
                      onFormChange(sourceInfo.event?.target.name, values.value)
                    }
                    value={formData.mep_monthly}
                    // you can define additional custom props that are all forwarded to the customInput e. g.
                    variant="outlined"
                    renderText={(value) => `Rp. ${value}`}
                  />
                </Grid>
              </Grid>
            </AccordionMenu>
          </Grid>
          <Grid item xs={12}>
            <AccordionMenu
              title={
                <Typography
                  variant="h6"
                  align="left"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Selling, General & Administrative Expenses
                </Typography>
              }
            >
              <Grid container spacing={2} sx={{ paddingTop: 1 }}>
                <Grid item xs={6}>
                  <NumericFormat
                    prefix="Rp."
                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <>Admin Marketing Salary</>
                        <IconWithTooltip
                          sx={{
                            marginLeft: 1,
                          }}
                          description="Gaji staff admin marketing"
                        />
                      </Box>
                    }
                    name="admin_cost"
                    customInput={TextField}
                    thousandSeparator="."
                    decimalScale={0}
                    allowLeadingZeros={false}
                    decimalSeparator=","
                    onValueChange={(values, sourceInfo) =>
                      onFormChange(sourceInfo.event?.target.name, values.value)
                    }
                    value={formData.admin_cost}
                    // you can define additional custom props that are all forwarded to the customInput e. g.
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    prefix="Rp."
                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <>Marketing Cost</>
                        <IconWithTooltip
                          sx={{
                            marginLeft: 1,
                          }}
                          description="Biaya marketing per bulan"
                        />
                      </Box>
                    }
                    name="marketing_cost"
                    customInput={TextField}
                    thousandSeparator="."
                    decimalScale={0}
                    allowLeadingZeros={false}
                    decimalSeparator=","
                    onValueChange={(values, sourceInfo) =>
                      onFormChange(sourceInfo.event?.target.name, values.value)
                    }
                    value={formData.marketing_cost}
                    // you can define additional custom props that are all forwarded to the customInput e. g.
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </AccordionMenu>
          </Grid>
          <Grid item xs={12}>
            <AccordionMenu
              title={
                <Typography
                  variant="h6"
                  align="left"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Sales and Pricing
                </Typography>
              }
            >
              <Grid container spacing={2} sx={{ paddingTop: 1 }}>
                <Grid item xs={6}>
                  <NumericFormat
                    suffix=" siswa"
                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <>New Student</>
                        <IconWithTooltip
                          sx={{
                            marginLeft: 1,
                          }}
                          description="Siswa baru per bulannya"
                        />
                      </Box>
                    }
                    name="new_st"
                    customInput={TextField}
                    thousandSeparator="."
                    decimalScale={0}
                    allowLeadingZeros={false}
                    decimalSeparator=","
                    onValueChange={(values, sourceInfo) =>
                      onFormChange(sourceInfo.event?.target.name, values.value)
                    }
                    value={formData.new_st}
                    // you can define additional custom props that are all forwarded to the customInput e. g.
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    prefix="Rp."
                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <>Class Price</>
                        <IconWithTooltip
                          sx={{
                            marginLeft: 1,
                          }}
                          description="Harga kelas 4x pertemuan/bulan"
                        />
                      </Box>
                    }
                    name="class_price"
                    customInput={TextField}
                    thousandSeparator="."
                    decimalScale={0}
                    allowLeadingZeros={false}
                    decimalSeparator=","
                    onValueChange={(values, sourceInfo) =>
                      onFormChange(sourceInfo.event?.target.name, values.value)
                    }
                    value={formData.class_price}
                    // you can define additional custom props that are all forwarded to the customInput e. g.
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumericFormat
                    prefix="Rp."
                    InputLabelProps={{ style: { pointerEvents: "auto" } }}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <>Class Kit Price</>
                        <IconWithTooltip
                          sx={{
                            marginLeft: 1,
                          }}
                          description="Harga Class Kit / Registrasi awal level"
                        />
                      </Box>
                    }
                    name="ckit_price"
                    customInput={TextField}
                    thousandSeparator="."
                    decimalScale={0}
                    allowLeadingZeros={false}
                    decimalSeparator=","
                    onValueChange={(values, sourceInfo) =>
                      onFormChange(sourceInfo.event?.target.name, values.value)
                    }
                    value={formData.ckit_price}
                    // you can define additional custom props that are all forwarded to the customInput e. g.
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </AccordionMenu>
          </Grid>
          <Grid item xs={12}>
            {/* <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button> */}
            <Button
              type="submit"
              startIcon={<Memory sx={{ color: "primary.white" }}></Memory>}
              size="large"
              variant="contained"
              color="primary"
              fullWidth
            >
              <Typography sx={{ fontWeight: "bold", color: "primary.white" }}>
                GENERATE SIMULATION
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
export default InitialInvestmentForm;
