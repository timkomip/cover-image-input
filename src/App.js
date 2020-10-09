import React, { useState } from "react";
import CoverImageInput from "./CoverImageInput";

export default function App() {
  const [file, setFile] = useState(null);
  return (
    <div>
      <CoverImageInput file={file} onChange={(f) => setFile(f)} />
    </div>
  );
}
