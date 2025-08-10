import React, { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function CollapsibleRow({ row, index }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{row.user_name}</TableCell>
        <TableCell>{row.address}</TableCell>
        <TableCell>{row.equipment_name}</TableCell>
        <TableCell>{row.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ m: 1, backgroundColor: "#ffffff" }}>
              <Typography variant="subtitle1" gutterBottom>
                Booking Details
              </Typography>
              <Table size="small" sx={{ backgroundColor: "#ffffff" }}>
                <TableBody>
                  <TableRow><TableCell>Crop</TableCell><TableCell>{row.crop_name}</TableCell></TableRow>
                  <TableRow><TableCell>Start Time</TableCell><TableCell>{row.start_time}</TableCell></TableRow>
                  <TableRow><TableCell>End Time</TableCell><TableCell>{row.end_time}</TableCell></TableRow>
                  <TableRow><TableCell>Duration</TableCell><TableCell>{row.duration}</TableCell></TableRow>
                  <TableRow><TableCell>Amount</TableCell><TableCell>{row.amount}</TableCell></TableRow>
                  <TableRow><TableCell>Payment Status</TableCell><TableCell>{row.payment_status}</TableCell></TableRow>
                  <TableRow><TableCell>Booking Status</TableCell><TableCell>{row.booking_status}</TableCell></TableRow>
                  <TableRow><TableCell>Requested Date</TableCell><TableCell>{row.created_at}</TableCell></TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const CollapsibleBookingTable = ({ rows }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#ffffff !important", // force white background
        width: "100%",
        padding: 0,
        margin: 0,
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Table sx={{ backgroundColor: "#ffffff !important" }}>
        <TableHead sx={{ backgroundColor: "#ffffff !important" }}>
          <TableRow>
            <TableCell />
            <TableCell>S.No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Equipment</TableCell>
            <TableCell>Booking Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <CollapsibleRow key={index} row={row} index={index} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No bookings found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleBookingTable;
