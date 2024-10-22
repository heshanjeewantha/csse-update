import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(uploadUrl || "http://localhost:8070/upload", formData);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Upload File</h3>
      <div className="mb-3">
        <label className="form-label">Custom Upload URL:</label>
        <input
          type="text"
          className="form-control"
          value={uploadUrl}
          onChange={(e) => setUploadUrl(e.target.value)}
          placeholder="http://localhost:8070/upload"
        />
      </div>
      <div className="mb-3">
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;