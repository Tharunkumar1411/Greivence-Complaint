

import React, {useState,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Axios from "axios";

const columns = [
    {
        field: "id",
        headerName: "ID"
    },
 
  {
    field: 'comp',
    headerName: 'COMPLAINTS',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, params.complaint) || ''}`,
  },
];

const rows = [
  {id:"1", firstName: 'Jon' },

];

export default function DataGridDemo() {


 
  return (
    <div style={{ height: 400, width: '100%' }}>
      
    </div>
  );
}
