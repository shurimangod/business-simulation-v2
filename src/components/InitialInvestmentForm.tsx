// InitialInvestmentForm component
import React from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import IconWithTooltip from "./IconWithTooltip";
import { FormData } from "../interfaces/interfaces";
import AccordionMenu from "./AccordionMenu";
import { Memory } from "@mui/icons-material";

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
    onFormChange(name, value);
  };

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
                          description="Harga sewa ruko per tahun"
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
                          description="Harga sewa ruko per tahun"
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
                        <>Electrical, Water and Internet (MEP)</>
                        <IconWithTooltip
                          sx={{
                            marginLeft: 1,
                          }}
                          description="Harga sewa ruko per tahun"
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
                          description="Harga sewa ruko per tahun"
                        />
                      </Box>
                    }
                    name="t_material"
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
                          description="Harga sewa ruko per tahun"
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
                          description="Harga sewa ruko per tahun"
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
                          description="Harga sewa ruko per tahun"
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
                        <>Admin Salary</>
                        <IconWithTooltip
                          sx={{
                            marginLeft: 1,
                          }}
                          description="Harga sewa ruko per tahun"
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
                          description="Harga sewa ruko per tahun"
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
                          description="Harga sewa ruko per tahun"
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
                          description="Harga sewa ruko per tahun"
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
                          description="Harga sewa ruko per tahun"
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
