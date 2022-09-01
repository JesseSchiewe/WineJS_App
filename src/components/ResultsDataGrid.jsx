import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        field: 'Producer',
        headerName: 'Producer',
        // width: 60
        hide: true,
    },
    {
        field: 'WineName',
        label: 'Wine Name',
        flex: 1,
        minWidth: 100,
        maxWidth: 300,
    },
    {
        field: 'Total',
        headerName: 'Total',
        type: 'number',
        minWidth: 50,
    },
    {
        field: 'Vintage',
        headerName: 'Vintage',
        type: 'number',
        minWidth: 70,
    },
    {
        field: 'NoseIntensity',
        headerName: 'Nose Intensity',
        type: 'number',
        width: 60,
        hide: true,
    },
    {
        field: 'FlavorIntensity',
        headerName: 'Flavor Intensity',
        type: 'number',
        // width: 60,
        hide: true,
    },
    {
        field: 'FlavorCharacteristics',
        headerName: 'Flavor Characteristics',
        type: 'number',
        // width: 60,
        hide: true,
    },
    {
        field: 'Balance',
        headerName: 'Balance',
        type: 'number',
        // width: 60,
        hide: true,
    },
    {
        field: 'Length',
        headerName: 'Flavor Characteristics',
        type: 'number',
        // width: 60,
        hide: true,
    },
    {
        field: 'ActualPrice',
        headerName: 'Actual Price',
        type: 'number',
        // width: 60,
        hide: true,
    },
    {
        field: 'WineValue',
        headerName: 'Wine Value',
        type: 'number',
        // width: 60,
        hide: true,
    },
    {
        field: 'ReviewDate',
        headerName: 'Review Date',
        // width: 70,
        hide: true,
    },
];

export default function DataTable(props) {
  const rows = props.data

  return (
    <div className='DataGrid' style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[5, 10, 20, 50]}
        // checkboxSelection
        getRowId={(row)=> row.wine}
        initialState={{
            sorting: { sortModel: [{ field: "Total", sort:"desc"}] }
        }}
      />
    </div>
  );
}
