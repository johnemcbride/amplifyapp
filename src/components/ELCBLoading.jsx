import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function ELCBLoading() {
  return (
    <Box
      display="flex"
      width={"100%"}
      minHeight={"100vh"}
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={120} />
    </Box>
  );
}
