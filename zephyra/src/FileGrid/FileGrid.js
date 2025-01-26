// filepath: /Users/abhinavjain/dev/zephyra/zephyra/src/FileGrid.js
import React from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllEnterpriseModule,
  ModuleRegistry,
  themeAlpine,
} from "ag-grid-enterprise";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFiles } from "../features/files/filesSlice";

ModuleRegistry.registerModules([AllEnterpriseModule]);

const FileGrid = () => {
  const dispatch = useDispatch();
  const selectFiles = (state) => state.files;
  const files = useSelector(selectFiles).files;
  console.log(files);

  const columns = [
    // {
    //   headerCheckboxSelection: true,
    //   checkboxSelection: true,
    //   headerCheckboxSelectionFilteredOnly: true,
    //   width: 50,
    // },
    { headerName: "File Name", field: "name" },
    { headerName: "File Size (bytes)", field: "size" },
    { headerName: "Last Modified", field: "uploaded_at" },
  ];
  const onSelectionChanged = (event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    dispatch(setSelectedFiles(selectedData));
  };
  return (
    <div
      className="ag-theme-alpine"
      data-testid="file-grid"
      style={{ height: 400, width: "80%", margin: "auto" }}
    >
      <AgGridReact
        theme={themeAlpine}
        onSelectionChanged={onSelectionChanged}
        rowData={files}
        columnDefs={columns}
        defaultColDef={{ flex: 1, minWidth: 150 }}
        rowSelection="multiple"
      />
    </div>
  );
};

export default FileGrid;
