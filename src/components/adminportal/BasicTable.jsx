import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const paginationModel = { page: 0, pageSize: 5 };

const BasicTable = ({ rows, columns, loading = false }) => {
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns.map((col) => ({
          ...col,
          resizable: false,
          flex: col.flex || 1,
          minWidth: col.minWidth || 100,
        }))}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        loading={loading}
        disableRowSelectionOnClick
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default BasicTable;
