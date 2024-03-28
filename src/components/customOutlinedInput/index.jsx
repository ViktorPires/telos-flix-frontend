import { OutlinedInput } from "@mui/material";

export default function CustomOutlinedInput({
  startAdornment,
  endAdornment,
  placeholder,
  type,
  setValue,
  defaultValue = "",
}) {
  const onChangedValue = (event) => {
    setValue(event.target.value);
  };

  return (
    <OutlinedInput
      onChange={onChangedValue}
      sx={{
        background: "rgba(238, 238, 238, 0.05)",
        color: "#EEEEEE",
        border: "1px solid rgba(238, 238, 238, 0.05)",
        boxShadow: "0px 3px 2px rgba(0, 0, 0, 0.05)",
        borderRadius: "14px",
        height: "42px",
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "3px solid #e0c3fc",
          boxShadow: "0 0 10px rgba(224, 195, 252, 0.5)",
        },
      }}
      placeholder={placeholder}
      type={type}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      defaultValue={defaultValue}
    />
  );
}
