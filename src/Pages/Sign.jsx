import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";

export default function SignContract() {
  const sigRef = useRef();
  const [contracts, setContracts] = useState([]);

 useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/contracts`)
    .then((res) => setContracts(res.data));
}, []);

  const sign = async (id) => {
    const signatureBase64 = sigRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    await axios.post(`${import.meta.env.VITE_API_URL}/contracts/sign`, {
  contractId: id,
  signatureBase64,
});

    alert("Signed!");
  };

  return (
    <div>
      <h2>Sign Contracts</h2>

      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{
          width: 400,
          height: 150,
          style: { border: "1px solid #ccc" },
        }}
      />

      {contracts.map((c) => (
        <div key={c._id}>
          <h4>{c.title}</h4>
          <button onClick={() => sign(c._id)}>Sign</button>
        </div>
      ))}
    </div>
  );
}