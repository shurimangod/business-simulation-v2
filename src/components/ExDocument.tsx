// MyDocument.tsx
import React from "react";
import imgWmSrc from "../assets/logo_td.png";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { MonthlySales } from "../interfaces/interfaces";
interface MyDocumentProps {
  graphDataUrl: string;
  tableData: MonthlySales[];
  investment_type: string | null;
}
import formatRupiah from "../utils/helper";
Font.registerHyphenationCallback((word) => ["", word, ""]);
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    position: "relative",
    width: '100%', // Ensure it takes full width
    height: '100%'
  },
  section: {
    marginBottom: 20,
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
  },
  watermark: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-200px, -50%)",
    opacity: 0.2, // Make it semi-transparent
    width: "400px", // Set desired width
    height: "auto",
    zIndex: 2
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
    to: "SGA Expenses for Venue Partner",
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
  graphDataUrl,
  tableData,
  investment_type,
}) => {
  let columnExclude: string[] = [];
  if (investment_type == "vp") {
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
  } else if (investment_type == "fc") {
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sales Chart</Text>
          <Image src={graphDataUrl} style={{ width: "100%", height: "auto", position:"relative",zIndex:1 }} />
        </View>
      </Page>
      {pages.map((pageData, index) => (
        <Page key={index} style={styles.page} orientation="landscape">
          <Image style={styles.watermark} src={imgWmSrc} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Year {index + 1}</Text>
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
          <View style={styles.section}></View>
        </Page>
      ))}

      {/* Page 2 with another element */}
      <Page size="A4">
        <View style={styles.section}>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.row}>
              <Text style={[styles.cell, styles.header]}>-</Text>
              {months.map((month, index) => (
                <Text key={index + 1} style={[styles.cell, styles.header]}>
                  {month}
                </Text>
              ))}
            </View>

            {/* Table Data Rows */}
            <View style={styles.row}>
              <Text style={styles.cell}>Row 1, Cell 1</Text>
              <Text style={styles.cell}>Row 1, Cell 2</Text>
              <Text style={styles.cell}>Row 1, Cell 3</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>Row 2, Cell 1</Text>
              <Text style={styles.cell}>Row 2, Cell 2</Text>
              <Text style={styles.cell}>Row 2, Cell 3</Text>
            </View>
          </View>
        </View>
      </Page>
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
