import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Anchor({ open, toggleDrawer, formContent }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <Drawer
      open={open}
      onClose={() => toggleDrawer(false)}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': {
          mt: '65px',
          bgcolor: 'var(--sidebar-bg-color)',
        //   bgcolor: 'background.paper',
          backdropFilter: 'none',
          zIndex: 1,
          opacity: 1,
        },
      }}
    >
      <Box
        sx={{
          width: { xs: 250, sm: 400 },
          padding: 2,
          overflowY: 'auto', 
          height: '100%',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Details
        </Typography>
        <form onSubmit={handleSubmit}>
        {formContent}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Drawer>
  );
}
