import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Custom date picker component
const CustomDatePicker = ({label = 'Date Picker', value, setValue, disablePast = false, disableFuture = false}) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disablePast = {disablePast}
        disableFuture = {disableFuture}
        closeOnSelect
        sx={{width:'100%'}}
        label={label}
        value={value}
        slotProps={{ textField: { size: 'small' } }}
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
}

export default CustomDatePicker;