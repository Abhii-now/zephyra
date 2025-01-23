import FileGrid from "FileGrid/FileGrid";
import "./App.css";
import FileUpload from "./FileUpload/FileUpload";
import React from "react";

function App() {
  return (
    <div className="App">
      <FileUpload /> <FileGrid />
    </div>
  );
}

export default App;
