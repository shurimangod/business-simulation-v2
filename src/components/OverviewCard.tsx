import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import SvgIcon from '@mui/material/SvgIcon';


interface OverviewCardProps {
  sx?: React.CSSProperties;
  value: string | number;
  title: string;
  icon: React.ReactElement;
  // difference?: string | number;
  // positive?: boolean;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ sx, value, title, icon }) => {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.jet"
              variant="overline"
            >
              {title}
            </Typography>
            <Typography variant="h5">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'accent.vividNavy',
              height: 48,
              width: 48
            }}
          >
            <SvgIcon>
              {/* <UsersIcon /> */}
              {icon}
            </SvgIcon>
          </Avatar>
        </Stack>
        {/* {difference && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >
              <SvgIcon
                color={positive ? 'success' : 'error'}
                fontSize="small"
              >
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                color={positive ? 'success.main' : 'error.main'}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography
              color="text.primary"
              variant="caption"
            >
              Since last month
            </Typography>
          </Stack>
        )} */}
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
