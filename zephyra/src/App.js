import FileGrid from "FileGrid/FileGrid";
import "./App.css";
import FileUpload from "./FileUpload/FileUpload";
import React, { useState } from "react";

function App() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (files) => {
    setFiles((prevFiles) => [...prevFiles, ...files]);
  };
  return (
    <div className="App"> 
      <FileUpload onFileUpload={handleFileUpload} /> <FileGrid files={files} />
    </div>
  );
}

export default App;
