// MyDocument.tsx
import React from "react";
import imgWmSrc from "../assets/logo_td.png";
import OpenSansRegular from "../assets/OpenSans-Regular.ttf";
import OpenSansBold from "../assets/OpenSans-Bold.ttf";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  Line,
} from "@react-pdf/renderer";
import { MonthlySales, FormData } from "../interfaces/interfaces";
interface MyDocumentProps {
  graphDataUrls: Array<String>;
  tableData: MonthlySales[];
  formData: FormData;
  totalInvestment:number;
}
import formatRupiah from "../utils/helper";
import { fontStyle } from "html2canvas/dist/types/css/property-descriptors/font-style";
Font.registerHyphenationCallback((word) => ["", word, ""]);
Font.register({
  family: "OpenSans",
  fonts: [
    {
      src: OpenSansRegular,
      fontWeight: 400,
    },
    {
      src: OpenSansBold,
      fontWeight: 700,
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    position: "relative",
    width: "100%", // Ensure it takes full width
    height: "100%",
  },
  section: {
    marginBottom: 20,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "50%", // Each main column takes half of the container
  },
  subColumn: {
    width: "50%", // Each sub-column takes half of the main column
    padding: 5, // Optional: adds some spacing
  },
  summaryText: {
    fontSize: "16pt",
  },
  smallSummaryText: {
    fontSize: "12pt",
  },
  // tableContainer: {
  //   display: "flex",
  //   flexDirection: "column",
  //   transform: "rotate(90deg)", // Rotate the table 90 degrees
  //   transformOrigin: "top left",
  //   width: "100%", // Ensures the container fits the content
  //   overflow: "hidden", // Prevent overflow issues
  // },
  table: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
  },
  header: {
    fontSize: "8pt",
    padding: 5,
    border: "1px solid black", // Add a border for clarity
    width: "60px",
    textAlign: "left", // Align text to the left
    fontWeight: "bold", // Make header text bold
    wordBreak: "break-word" /* Wraps whole words to the next line */,
    overflowWrap: "break-word" /* Adds additional support for word wrapping */,
    backgroundColor: "#10AF13",
    fontStyle: "OpenSans",
    color: "white",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
    width: "100%",
  },
  cell: {
    padding: 5,
    border: "1px solid black", // Add a border for clarity
    // width: "auto",
    textAlign: "left", // Align text to the left
    fontSize: "7pt",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    color: "#10AF13",
  },
  watermark: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-200px, -50%)",
    opacity: 0.2, // Make it semi-transparent
    width: "400px", // Set desired width
    height: "auto",
    zIndex: 2,
  },
});
function extractNestedProperties(obj) {
  let result = {};
  for (let key in obj) {
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      let nestedProps = extractNestedProperties(obj[key]);
      for (let nestedKey in nestedProps) {
        result[nestedKey] = nestedProps[nestedKey];
      }
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}
function replaceStrings(arr, replacements) {
  // If item is an object, recursively replace its properties
  return arr.map((item) => {
    // if (item=='cog') {
    //   console.log(item)
    //   return replaceObjects(item, replacements);
    // }
    // Find the replacement object for the current item
    let replacement = replacements.find((obj) => obj.from === item);
    // If replacement exists, use 'to' property, otherwise use original item
    return { ...replacement };
  });
}
const chunkArray = (array, size) => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
};

let replacements = [
  { from: "new_st", to: "New Student", data_type: "siswa" },
  { from: "active_st", to: "Active Student", data_type: "siswa" },
  { from: "drop_st", to: "Drop Student", data_type: "siswa" },
  { from: "c_sales", to: "Class Sales", data_type: "currency" },
  { from: "ckit_sales", to: "Class Kit Sales", data_type: "currency" },
  { from: "total_sales", to: "Total Revenue", data_type: "currency" },
  { from: "royalty_cost", to: "Royalty Fee", data_type: "currency" },
  { from: "total_ck_cost", to: "Total Class Kit Cost", data_type: "currency" },
  { from: "total_cog", to: "Total COGS", data_type: "currency" },
  {
    from: "mep_cost",
    to: "Electrical, Water, Internet",
    data_type: "currency",
  },
  {
    from: "total_reg_teach_cost",
    to: "Total Teaching Cost",
    data_type: "currency",
  },
  {
    from: "total_trial_teach_cost",
    to: "Total Trial Teaching Cost",
    data_type: "currency",
  },
  {
    from: "total_trial_teach_cost",
    to: "Total Trial Teaching Cost",
    data_type: "currency",
  },
  {
    from: "total_sga",
    to: "Total SGA",
    data_type: "currency",
  },
  {
    from: "cum_profit",
    to: "Cumulative Profit",
    data_type: "currency",
  },
  {
    from: "partner_profit",
    to: "Partner's Monthly Profit",
    data_type: "currency",
  },
  {
    from: "partner_cum_profit",
    to: "Partner's Cumulative Profit",
    data_type: "currency",
  },
  {
    from: "ord_income",
    to: "Profit",
    data_type: "currency",
  },
  {
    from: "total_vp_sga",
    to: "Venue / Ruko Rent Expenses",
    data_type: "currency",
  },

  // { from: "cog", data_type: "object" }
  // {
  //   from: "cog",
  //   data_type: "object",
  //   items: [
  //       { from: "total_reg_teach_cost", to: "AL Class Teaching Cost", data_type: "currency" },
  //       { from: "total_trial_teach_cost", to: "Trial Teaching Cost", data_type: "currency" },
  //       { from: "total_cog", to: "Total COGS", data_type: "currency" }
  //   ]
  // }
];
const ExDocument: React.FC<MyDocumentProps> = ({
  graphDataUrls,
  tableData,
  formData,
  totalInvestment
}) => {
  let columnExclude: string[] = [];
  if (formData.investment_type == "vp") {
    columnExclude = [
      "month",
      "c_price",
      "ckit_price",
      "c_sales",
      "ckit_sales",
      "mep_cost",
      "class_sess_num",
      "total_trial_teach_cost",
      "total_reg_teach_cost",
      "total_ck_cost",
      "admin_cost",
      "bm_cost",
      "marketing_cost",
      "others_cost",
      "ruko_rent",
      "fixed_asset_cost",
      "ruko_rent",
      "additional_rennovation",
      "gross_profit",
      "cum_profit",
      "royalty_cost",
    ];
  } else if (formData.investment_type == "fc") {
    columnExclude = [
      "month",
      "c_price",
      "ckit_price",
      "c_sales",
      "ckit_sales",
      "mep_cost",
      "class_sess_num",
      "total_trial_teach_cost",
      "total_reg_teach_cost",
      "total_ck_cost",
      "admin_cost",
      "bm_cost",
      "marketing_cost",
      "others_cost",
      "ruko_rent",
      "fixed_asset_cost",
      "ruko_rent",
      "additional_rennovation",
      "gross_profit",
      "total_vp_sga",
      "partner_profit",
      "partner_cum_profit",
    ];
  }
  // console.log(tableData);
  const months = tableData.map((item: any) => `Month ${item.month}`);
  let newData = tableData.map((item, i) => extractNestedProperties(item));
  let columns = Object.keys(newData[0] || {});
  columns = columns.filter((item) => !columnExclude.includes(item));
  columns = replaceStrings(columns, replacements);
  const pages = chunkArray(newData, 12);
  const chunkMonths = chunkArray(months, 12);
  console.log(pages);
  return (
    <Document>
      {/* Page 1 with the chart */}
      <Page size="A4" style={styles.page}>
        <Image style={styles.watermark} src={imgWmSrc} />
        <Text style={styles.sectionTitle}>5 Year Simulation Summary</Text>
        <View style={styles.section}>
          <Text style={{...styles.summaryText, textDecoration:"underline",marginBottom:5}}>Initial Investment</Text>
          <View
            style={{
              ...styles.flexCol,
              ...styles.smallSummaryText,
              width: "50%",
            }}
          >
            <View style={styles.flexRow}>
              <Text>Venue / Ruko Rent</Text>
              <Text>{formatRupiah(formData.ruko_rent)}</Text>
            </View>
            <View style={styles.flexRow}>
              <Text>Ruko Rennovation</Text>
              <Text>{formatRupiah(formData.off_renov)}</Text>
            </View>
            <View style={styles.flexRow}>
              <Text>Office Facility</Text>
              <Text>{formatRupiah(formData.off_facility)}</Text>
            </View>
            <View style={styles.flexRow}>
              <Text>Electrical, Water, Internet</Text>
              <Text>{formatRupiah(formData.mep)}</Text>
            </View>
            <Line></Line>
            <View style={styles.flexRow}>
              <Text>Total Investment</Text>
              <Text>{formatRupiah(totalInvestment)}</Text>
            </View>
          </View>

          {/* <View style={styles.smallSummaryText}>
            <Text>{formatRupiah(formData.ruko_rent)}</Text>
          </View>
          <View style={{ ...styles.column, ...styles.smallSummaryText }}>
            <Text>Office Rennovation</Text>
          </View> */}
          {/* <View style={{ ...styles.column, ...styles.smallSummaryText }}>
            <Text>{formatRupiah(formData.off_renov)}</Text>
          </View>
          <View style={styles.container}>
            <View style={{ ...styles.column, ...styles.smallSummaryText }}>
              <Text>Office Facility</Text>
            </View>
            <View style={{ ...styles.column, ...styles.smallSummaryText }}>
              <Text>{formatRupiah(formData.off_facility)}</Text>
            </View>
            <View style={{ ...styles.column, ...styles.smallSummaryText }}>
              <Text>Electrical, Water, Internet</Text>
            </View>
            <View style={{ ...styles.column, ...styles.smallSummaryText }}>
              <Text>{formatRupiah(formData.mep)}</Text>
            </View>
          </View> */}
        </View>
        <View style={styles.section}>
          <Image
            src={graphDataUrls[1]}
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              zIndex: 1,
            }}
          />
          <Image
            src={graphDataUrls[0]}
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              zIndex: 1,
            }}
          />
        </View>
      </Page>
      {pages.map((pageData, index) => (
        <Page key={index} style={styles.page} orientation="landscape">
          <Image style={styles.watermark} src={imgWmSrc} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Year-{index + 1} Simulation</Text>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.header}>-</Text>
                {chunkMonths[index].map((month: String, i: number) => (
                  <Text key={i + 1} style={[styles.cell, styles.header]}>
                    {month}
                  </Text>
                ))}
              </View>
              {columns.map((col, i) => (
                <View style={styles.row}>
                  <Text style={styles.header} key={0}>
                    {col.to}
                  </Text>
                  {pageData.map((item, index) => {
                    if (col.data_type === "siswa") {
                      return (
                        <Text key={index} style={styles.cell}>
                          {`${String((item as any)[col.from])} siswa`}
                        </Text>
                      );
                    } else if (col.data_type === "currency") {
                      return (
                        <Text key={index} style={styles.cell}>
                          {`${formatRupiah(item[col.from])}`}
                        </Text>
                      );
                    }
                  })}
                </View>
              ))}
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.container}>
              <View style={styles.column}>
                <View style={{ ...styles.subColumn, ...styles.summaryText }}>
                  <Text style={styles.summaryText}>Average Monthly Profit</Text>
                </View>
                <View style={{ ...styles.subColumn, ...styles.summaryText }}>
                  <Text>
                    {formatRupiah(
                      pageData
                        .map((item: any) => item["partner_profit"])
                        .reduce((acc: number, curr: number) => acc + curr, 0) /
                        pageData.length
                    )}
                  </Text>
                </View>
                <View style={{ ...styles.subColumn, ...styles.summaryText }}>
                  <Text style={styles.summaryText}>
                    Total Profit in Year-{index + 1}
                  </Text>
                </View>
                <View style={{ ...styles.subColumn, ...styles.summaryText }}>
                  <Text>
                    {formatRupiah(
                      pageData
                        .map((item: any) => item["partner_profit"])
                        .reduce((acc: number, curr: number) => acc + curr, 0)
                    )}
                  </Text>
                </View>
                <View style={{ ...styles.subColumn, ...styles.summaryText }}>
                  <Text style={styles.summaryText}>Ongoing Students</Text>
                </View>
                <View style={{ ...styles.subColumn, ...styles.summaryText }}>
                  <Text>{`${String(
                    (pageData[pageData.length - 1] as any)["active_st"]
                  )} siswa`}</Text>
                </View>
                <View style={{ ...styles.subColumn, ...styles.summaryText }}>
                  <Text style={styles.summaryText}>Cumulative Profit/Loss</Text>
                </View>
                <View style={{ ...styles.subColumn, ...styles.summaryText }}>
                  <Text>
                    {formatRupiah(
                      (pageData[pageData.length - 1] as any)[
                        "partner_cum_profit"
                      ]
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      ))}

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize: 24 }}>Additional Information</Text>
          <Text>
            Here you can add additional information or elements you want to
            include in your PDF.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ExDocument;
