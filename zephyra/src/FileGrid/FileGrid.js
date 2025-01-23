// filepath: /Users/abhinavjain/dev/zephyra/zephyra/src/FileGrid.js
import React from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllEnterpriseModule,
  ModuleRegistry,
  themeAlpine,
} from "ag-grid-enterprise";
import { useSelector } from "react-redux";
ModuleRegistry.registerModules([AllEnterpriseModule]);

const FileGrid = () => {
  const selectFiles = (state) => state.files;
  const files = useSelector(selectFiles);

  const columns = [
    { headerName: "File Name", field: "name" },
    { headerName: "File Size (bytes)", field: "size" },
    { headerName: "Last Modified", field: "lastModifiedDate" },
  ];

  return (
    <div
      className="ag-theme-alpine"
      data-testid="file-grid"
      style={{ height: 400, width: "80%", margin: "auto" }}
    >
      <AgGridReact
        theme={themeAlpine}
        rowData={files}
        columnDefs={columns}
        defaultColDef={{ flex: 1, minWidth: 150 }}
      />
    </div>
  );
};

export default FileGrid;
