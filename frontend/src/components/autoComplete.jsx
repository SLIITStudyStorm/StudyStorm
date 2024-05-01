import { Autocomplete, TextField } from "@mui/material";

const CustomAutoComplete = ({options, label, multiple = false, value, setValue}) => {
    return(
        <Autocomplete
            multiple={multiple}
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            options={options}
            renderInput={(params) => <TextField {...params} variant="outlined" size="small" label={label} placeholder={label} fullWidth />}
        />
    );
}

export default CustomAutoComplete;