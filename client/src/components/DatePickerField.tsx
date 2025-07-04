import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";

interface DatePickerFieldProps {
  value: Date;
  onChange: (newValue: Date) => void;
}

function DatePickerField({ value, onChange }: DatePickerFieldProps) {
  return (
    <Stack sx={{ marginBottom: 2 }}>
      <InputLabel
        sx={{ fontSize: 15, textTransform: "uppercase", fontWeight: 600 }}
      >
        Date
      </InputLabel>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          value={value}
          onChange={(newValue) => {
            if (newValue !== null) onChange(newValue);
          }}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true,
              variant: "outlined",
            },
          }}
        />
      </LocalizationProvider>
    </Stack>
  );
}

export default DatePickerField;
