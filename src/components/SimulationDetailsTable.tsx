import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import React from "react";
import Constant from "../utils/const_label";
import { MonthlySales } from "../interfaces/interfaces";
import formatRupiah from "../utils/helper";
interface TableProps {
  data: MonthlySales[];
  investment_type: string | null;
}


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

// function replaceObjects(obj, replacements) {
//   // If obj is not an object, return obj
//   if (typeof obj !== "object" || obj === null) {
//       return obj;
//   }

//   // If obj is an array, recursively replace each element
//   if (Array.isArray(obj)) {
//       return obj.map(item => replaceObjects(item, replacements));
//   }

//   // Otherwise, recursively replace properties in obj
//   let result = {};
//   for (let key in obj) {
//       // Find the replacement object for the current key
//       let replacement = replacements.find(repl => repl.from === key && repl.data_type === "object");
//       if (replacement) {
//           // If replacement exists, recursively replace properties in the object
//           result[key] = replaceObjects(obj[key], replacement.properties);
//       } else {
//           // Otherwise, keep the original key and recursively replace its value
//           result[key] = replaceObjects(obj[key], replacements);
//       }
//   }
//   return result;
// }

// function showObject(objectName){
//     if(objectName==='cog'){

//     }
// }
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



// gross_profit:float=0
// ord_income:float=0
// cum_profit:float=0
// partner_profit:float=0
// partner_cum_profit:float=0
// class MonthlyCOG(BaseModel):
//     class_sess_num:int = 0
//     total_reg_teach_cost:float = 0
//     total_trial_teach_cost:float=0
//     total_ck_cost:float = 0
//     mep_cost:float = 0
//     royalty_cost:float = 0
//     total_cog:float=0

// class MonthlySGA(BaseModel):
//     admin_cost:float = 0
//     bm_cost:float = 0
//     marketing_cost:float = 0
//     others_cost:float=0
//     fixed_asset_cost:float=0
//     total_sga:float=0
//     ruko_rent:float=0

// class VPSGA(BaseModel):
//     ruko_rent:float=0
//     additional_rennovation:float=0
//     total_vp_sga:float=0

const SimulationDetailsTable: React.FC<TableProps> = ({
  data,
  investment_type,
}) => {
  let columnExclude;
  if(investment_type=='vp'){
    columnExclude = ["month", "c_price", "ckit_price",'c_sales','ckit_sales','mep_cost','class_sess_num','total_trial_teach_cost','total_reg_teach_cost','total_ck_cost','admin_cost','bm_cost','marketing_cost','others_cost','ruko_rent','fixed_asset_cost','ruko_rent','additional_rennovation','gross_profit','total_vp_sga',];
  }else if(investment_type=='fc'){
    columnExclude = ["month", "c_price", "ckit_price",'c_sales','ckit_sales','mep_cost','class_sess_num','total_trial_teach_cost','total_reg_teach_cost','total_ck_cost','admin_cost','bm_cost','marketing_cost','others_cost','ruko_rent','fixed_asset_cost','ruko_rent','additional_rennovation','gross_profit','total_vp_sga','partner_profit','partner_cum_profit'];
  }
  const months = data.map((item: any) => `Month ${item.month}`);
  let newData = data.map((item, i) => extractNestedProperties(item));
  let columns = Object.keys(newData[0] || {});
  columns = columns.filter((item) => !columnExclude.includes(item));
  columns = replaceStrings(columns, replacements);
  console.log(newData);
  // newData.map((item, index) => {
  //   if(investment_type)
  // });
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell key={0}>-</TableCell>
            {months.map((month, index) => (
              <TableCell key={index + 1}>{month}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {columns.map((col, i) => (
            <TableRow>
              <TableCell key={0}>{col.to}</TableCell>
              {newData.map((item, index) => {
                if (col.data_type === "siswa") {
                  return (
                    <TableCell key={index}>
                      {`${String((item as any)[col.from])} siswa`}
                    </TableCell>
                  );
                } else if (col.data_type === "currency") {
                  return (
                    <TableCell key={index}>
                      {`${formatRupiah((item as any)[col.from])}`}
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimulationDetailsTable;
