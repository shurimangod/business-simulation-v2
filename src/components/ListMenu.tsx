import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ListItemText, Typography, Button } from "@mui/material";
import { Build } from "@mui/icons-material";
interface MenuItemProps {
  text: string;
  icon: React.ReactElement;
  onClick: () => void;
}
interface MenuProps {
  menuItems: MenuItemProps[];
}

const ListMenu: React.FC<MenuProps> = ({ menuItems }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClick}
        startIcon={<Build></Build>}
        size="large"
      >
        <Typography sx={{ fontWeight: "bold" }}>Tools</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems.map((menuItem, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              menuItem.onClick();
              handleClose();
            }}
          >
            {menuItem.icon}
            <ListItemText sx={{marginLeft:1}}> {menuItem.text}</ListItemText>
          </MenuItem>
        ))}
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Generate Example</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
};
export default ListMenu;
