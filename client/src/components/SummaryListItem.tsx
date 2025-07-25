import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { formatCurrency } from "../utils/currencyUtils";
import Dot from "./Dot";

export interface SummaryListItemProps {
  title: string;
  amount: number;
  textColor?: string;
  dotColor?: string;
}

function SummaryListItem({
  title,
  amount,
  textColor = "secondary",
  dotColor,
}: SummaryListItemProps) {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        {dotColor && <Dot color={dotColor} />}
        <Typography
          color={textColor}
          sx={{ fontWeight: 500, fontSize: "18px" }}
        >
          {title}
        </Typography>
      </Stack>

      <Typography sx={{ fontSize: "18px" }}>
        {formatCurrency(amount)}
      </Typography>
    </Stack>
  );
}

export default SummaryListItem;
