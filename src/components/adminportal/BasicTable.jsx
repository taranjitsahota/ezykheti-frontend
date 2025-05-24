import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const paginationModel = { page: 0, pageSize: 10 };

const BasicTable = ({ rows, columns, loading = false, onRowClick }) => {
  return (
    <Paper sx={{ height: 629, width: "100%" }}>
      <DataGrid
      onRowClick={(params) => onRowClick && onRowClick(params.row)}
        rows={rows}
        columns={columns.map((col) => ({
          ...col,
          resizable: false,
          flex: col.flex || 1,
          minWidth: col.minWidth || 100,
        }))}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20]}
        loading={loading}
        disableRowSelectionOnClick
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default BasicTable;
