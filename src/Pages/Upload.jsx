import { useState } from "react";
import axios from "axios";

export default function UploadContract() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const toBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
    });

  const handleUpload = async () => {
    const pdfBase64 = await toBase64(file);

    await axios.post("http://localhost:5000/contracts", {
      title,
      pdfBase64,
    });

    alert("Contract uploaded");
  };

  return (
    <div>
      <h2>Upload Contract</h2>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}