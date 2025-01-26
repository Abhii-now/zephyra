import { Button } from "react-bootstrap";
import React, { useRef } from "react";
import { arrayBufferToHex, encryptFiles } from "utils/cryptoUtils";
import { addFiles } from "features/files/filesSlice";
import { useDispatch } from "react-redux";

const FileUpload = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const encryptedFiles = await encryptFiles(files);
    const uploadedFiles = await uploadEncryptedFiles(encryptedFiles);
    console.log(uploadedFiles);
    dispatch(addFiles(uploadedFiles));
  };
  const uploadEncryptedFiles = async (encryptedFiles) => {
    const uploadedFiles = [];

    await Promise.all(
      encryptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", new Blob([file.encryptedBuffer]), file.name);
        formData.append("iv", arrayBufferToHex(file.iv));
        formData.append("dateModified", file.dateModified);
        const keyBuffer = await window.crypto.subtle.exportKey("raw", file.key);
        formData.append("key", arrayBufferToHex(keyBuffer)); // Convert key to hex string

        const response = await fetch("http://127.0.0.1:8000/mynewapp/upload/", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          console.log("Uploaded file:", file.name);
          uploadedFiles.push(file);
        } else {
          console.error("Failed to upload file:", file.name);
        }
      })
    );
    return uploadedFiles;
  };

  return (
    <div className="file-upload" data-testid="file-upload-input">
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <Button
        variant="primary"
        onClick={handleButtonClick}
        style={{ margin: "20px" }}
      >
        Upload Files
      </Button>
    </div>
  );
};

export default FileUpload;
