import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Anchor({
  open,
  toggleDrawer,
  formContent,
  add,
  handleSubmit,
  loading,
}) {
  const internalHandleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData.entries());
    if (handleSubmit) handleSubmit(data);
  };

  const enhanceInputs = (elements) => {
    return React.Children.map(elements, (child) => {
      if (!React.isValidElement(child)) return child;

      if (child.type === TextField) {
        return (
          <div className="admin-wrapper" style={{ marginBottom: "1rem" }}>
            {React.cloneElement(child, {
              variant: "standard",
              InputProps: {
                ...child.props.InputProps,
                disableUnderline: true,
                className: `${
                  child.props.InputProps?.className || ""
                } admin-textfield`,
              },
              InputLabelProps: {
                ...child.props.InputLabelProps,
                className: "admin-label",
                shrink: true,
              },
            })}
          </div>
        );
      }

      if (child.props?.children) {
        return React.cloneElement(child, {
          children: enhanceInputs(child.props.children),
        });
      }

      return child;
    });
  };

  return (
    <Drawer
      open={open}
      onClose={() => toggleDrawer(false)}
      anchor="right"
      // disableScrollLock={true}
      sx={{
        "& .MuiDrawer-paper": {
          mt: "65px",
          bgcolor: "var(--sidebar-bg-color)",
          //   bgcolor: 'background.paper',
          backdropFilter: "none",
          width: { xs: "100%", sm: 500 },
          zIndex: 1300,
          opacity: 1,
        },
      }}
    >
      <Box
        className="admin-wrapper"
        sx={{
          width: { xs: 250, sm: 500 },
          padding: 4,
          overflowY: "auto",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", mb: 2 }}>
          <IconButton
            onClick={() => toggleDrawer(false)}
            sx={{
              border: "2px solid var(--warning-color)",
              color: "var(--warning-color)",
              borderRadius: "50%",
              width: 32,
              height: 32,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
          {add}
        </Typography>
        <form onSubmit={internalHandleSubmit}>
          {enhanceInputs(formContent)}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, padding: "12px" }}
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Box>
    </Drawer>
  );
}
