import React, { ReactNode } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
interface AccordionMenuProps {
  title: ReactNode;
  children: ReactNode;
}

const AccordionMenu: React.FC<AccordionMenuProps> = ({ title, children }) => {
  return (
    <Accordion sx={{ boxShadow: 0 }} defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{ paddingX: 0, borderBottom:"1px solid black"}}
      >
        {title}
      </AccordionSummary>
      <AccordionDetails sx={{ paddingX: 0 }}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionMenu;
