import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./style.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useParams } from "react-router-dom";
// Configure PDF.js worker

/**
 * @typedef {Object} RootState
 * @property {Object} files
 * @property {File[]} files.selectedFiles
 */

const FileDownload = () => {
  const { token } = useParams();

  console.log("HERE");
  console.log(token);
  const selectedFiles = useSelector(
    /**
     * @param {RootState} state
     * @returns {File[]}
     */ (state) => state.files.selectedFiles
  );

  const [showModal, setShowModal] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");

  const fetchSelectedFiles = async () => {
    for (const file of selectedFiles) {
      try {
        // Fetch the file contents from the server or handle the file data as needed
        const response = await fetch(
          `http://127.0.0.1:8000/mynewapp/files/${file.name}/`
        );
        if (!response.ok) {
          console.log(response);
          console.error(`Failed to fetch file: ${file.name}`);
          continue;
        }
        const responseData = await response.json();
        const { encrypted_data, iv, key, name, tag, type } = responseData;
        console.log("Fetched file:", name, iv, key, type);
        const encryptedBufferArray = Uint8Array.from(
          atob(encrypted_data),
          (c) => c.charCodeAt(0)
        );
        const tagArray = Uint8Array.from(atob(tag), (c) => c.charCodeAt(0));

        const ivArray = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));
        const keyArray = Uint8Array.from(atob(key), (c) => c.charCodeAt(0));

        // Import the key
        const combinedBuffer = new Uint8Array(
          encryptedBufferArray.length + tagArray.length
        );
        combinedBuffer.set(encryptedBufferArray);
        combinedBuffer.set(tagArray, encryptedBufferArray.length);

        console.log("Decryption parameters:", {
          combinedBuffer,
          ivArray,
          keyArray,
          type,
        });

        // Import the key
        const cryptoKey = await window.crypto.subtle.importKey(
          "raw",
          keyArray,
          "AES-GCM",
          true,
          ["decrypt"]
        );

        // Decrypt the buffer
        const decryptedBuffer = await window.crypto.subtle.decrypt(
          {
            name: "AES-GCM",
            iv: ivArray,
          },
          cryptoKey,
          combinedBuffer
        );
        const blob = new Blob([decryptedBuffer], { type });
        const url = URL.createObjectURL(blob);

        setFileContent(url);
        setFileName(name);
        setFileType(type);
        setShowModal(true);
        // const blob = new Blob([decryptedBuffer], {
        //   type: "application/octet-stream",
        // });
        // const url = URL.createObjectURL(blob);
        // const a = document.createElement("a");
        // a.href = url;
        // a.download = name;
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);
        // URL.revokeObjectURL(url);
      } catch (error) {
        console.error(`Error processing file: ${file.name}`, error);
        console.log(error.message);
      }
    }
  };
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Button
        variant="primary"
        onClick={fetchSelectedFiles}
        disabled={selectedFiles.length === 0}
        style={{ margin: "10px" }}
      >
        Fetch Selected Files
      </Button>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{fileName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {fileType.startsWith("text/") ? (
            <pre>{fileContent}</pre>
          ) : (
            <DocViewer
              documents={[{ uri: fileContent }]}
              pluginRenderers={DocViewerRenderers}
              config={{ header: { disableHeader: true } }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={downloadFile}>
            Download
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FileDownload;
