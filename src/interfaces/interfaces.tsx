export interface COGResponses {
  class_sess_num: number;
  total_teach_cost: number;
  total_ck_cost: number;
  mep_cost: number;
  royalty_cost: number;
  total_cog: number;
}
export interface SGAResponses {
  admin_cost: number;
  bm_cost: number;
  marketing_cost: number;
  others_cost: number;
  total_sga: number;
}
export interface InitInvestResponses {
  ruko_rent: number;
  mep: number;
  off_facility: number;
  t_material: number;
  off_renov: number;
}
export interface ProfitResponses {
  gross_profit: number;
  ord_income: number;
  cum_profit:number;
  partner_profit:number;
  partner_cum_profit:number;
}
export interface FormData {
  ruko_rent: number | null;
  mep: number | null;
  off_facility: number | null;
  t_material: number | null;
  off_renov: number | null;
  teaching_cost: number | null;
  ck_cost: number | null;
  new_st: number | null;
  drop_rate: number | null;
  class_price: number | null;
  ckit_price: number | null;
  admin_cost: number | null;
  marketing_cost: number | null;
  mep_monthly: number | null;
  license_fee:number | null;
  is_vp:boolean|undefined;
}
export interface MonthlySales {
  month: number;
  new_st: number;
  active_st: number;
  drop_st: number;
  c_price: number;
  ckit_price: number;
  c_sales: number;
  ckit_sales: number;
  total_sales: number;
  cog: COGResponses;
  sga: SGAResponses;
  profit: ProfitResponses;
}
