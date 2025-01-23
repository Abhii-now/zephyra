import { Button } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { encryptFile, generateKey } from "cryptoUtils";

const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  // const [key, setKey] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (event) => {
    const files = event.target.files;
    // let encryptionKey = key;

    // if (!key) {
    //   encryptionKey = await generateKey();
    //   console.log("Generated key: ", encryptionKey);
    //   setKey(encryptionKey);
    // }

    // const files = Array.from(event.target.files);
    // const encryptedFiles = await Promise.all(
    //   files.map(async (file) => {
    //     console.log("Encrypting file: ", file);
    //     console.log(" key: ", encryptionKey);

    //     const { encryptedBuffer, iv } = await encryptFile(file, encryptionKey);
    //     return { name: file.name, encryptedBuffer, iv };
    //   })
    // );

    onFileUpload(files);
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
