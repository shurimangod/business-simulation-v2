import { Tooltip } from "@mui/material";
import { HelpOutline } from "@mui/icons-material";

interface Props {
  sx: object;
  description:string;
}
const IconWithTooltip: React.FC<Props> = ({ sx,description }) => (
  <Tooltip
    title={description}
    sx={sx}
  >
    <HelpOutline />
  </Tooltip>
);
export default IconWithTooltip;
