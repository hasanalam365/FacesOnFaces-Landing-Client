import React, { useState, useRef } from "react";
import {
  CreditCard, BookOpen, Car, Zap,
  Upload, X, FileText, AlertCircle, CheckCircle2,
} from "lucide-react";

const DOC_TYPES = [
  {
    value: "nid",
    label: "National ID (NID)",
    icon: <CreditCard size={18} />,
    hasDocNumber: true,
    hasTwoSides: true,
    docNumberLabel: "NID Number",
    docNumberPlaceholder: "Enter your NID number",
  },
  {
    value: "passport",
    label: "Passport",
    icon: <BookOpen size={18} />,
    hasDocNumber: true,
    hasTwoSides: false,
    docNumberLabel: "Passport Number",
    docNumberPlaceholder: "Enter your passport number",
  },
  {
    value: "driving_license",
    label: "Driving License",
    icon: <Car size={18} />,
    hasDocNumber: true,
    hasTwoSides: true,
    docNumberLabel: "License Number",
    docNumberPlaceholder: "Enter your license number",
  },
  {
    value: "electricity_bill",
    label: "Electricity Bill",
    icon: <Zap size={18} />,
    hasDocNumber: false,
    hasTwoSides: false,
    docNumberLabel: null,
    docNumberPlaceholder: null,
  },
];

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const FileUploadSlot = ({ label, file, onFileChange, onRemove, error }) => {
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) validateAndSet(dropped);
  };

  const validateAndSet = (f) => {
    if (!ALLOWED_TYPES.includes(f.type)) {
      onFileChange(null, "Only JPG, PNG, or PDF files are allowed.");
      return;
    }
    if (f.size > MAX_SIZE_BYTES) {
      onFileChange(null, `File must be under ${MAX_SIZE_MB}MB.`);
      return;
    }
    onFileChange(f, null);
  };

  const previewUrl = file ? URL.createObjectURL(file) : null;
  const isPdf = file?.type === "application/pdf";

  return (
    <div>
      <p className="mb-2 text-sm text-white/70">{label}</p>
      {file ? (
        <div className="relative flex items-center gap-3 p-3 border rounded-xl border-cyan-400/30 bg-cyan-400/5">
          {isPdf ? (
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-white/10">
              <FileText size={22} className="text-cyan-400" />
            </div>
          ) : (
            <img
              src={previewUrl}
              alt="Document preview"
              className="flex-shrink-0 object-cover w-12 h-12 rounded-lg"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{file.name}</p>
            <p className="text-xs text-white/40">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-red-400 transition-colors"
            aria-label="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={`flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
            error
              ? "border-red-500/50 bg-red-500/5"
              : "border-white/10 hover:border-cyan-400/40 hover:bg-cyan-400/5"
          }`}
        >
          <Upload size={20} className="text-white/30" />
          <p className="text-sm text-white/40">Click or drag to upload</p>
          <p className="text-xs text-white/20">JPG, PNG, PDF · max {MAX_SIZE_MB}MB</p>
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files[0];
              if (f) validateAndSet(f);
              e.target.value = "";
            }}
          />
        </div>
      )}
      {error && (
        <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
};

const IdentityVerification = ({ onVerified }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [docNumber, setDocNumber] = useState("");
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [singleFile, setSingleFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [verified, setVerified] = useState(false);

  const docConfig = DOC_TYPES.find((d) => d.value === selectedType);

  const handleTypeSelect = (val) => {
    setSelectedType(val);
    setDocNumber("");
    setFrontFile(null);
    setBackFile(null);
    setSingleFile(null);
    setErrors({});
    setVerified(false);
  };

  const validate = () => {
    const errs = {};
    if (!selectedType) {
      errs.type = "Please select a document type.";
    }
    if (docConfig?.hasDocNumber && !docNumber.trim()) {
      errs.docNumber = "Document number is required.";
    }
    if (docConfig?.hasTwoSides) {
      if (!frontFile) errs.front = "Front side is required.";
      if (!backFile) errs.back = "Back side is required.";
    } else {
      if (!singleFile) errs.single = "Document upload is required.";
    }
    return errs;
  };

  const handleConfirm = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setVerified(true);
    onVerified({
      documentType: selectedType,
      documentNumber: docNumber || null,
      frontFile: docConfig?.hasTwoSides ? frontFile : singleFile,
      backFile: docConfig?.hasTwoSides ? backFile : null,
    });
  };

  const inputClass =
    "w-full px-4 py-3 text-white border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none placeholder:text-white/30 transition-colors";

  if (verified) {
    return (
      <div className="flex items-center gap-3 p-4 border rounded-xl border-green-500/30 bg-green-500/10">
        <CheckCircle2 size={18} className="text-green-400 shrink-0" />
        <div>
          <p className="text-sm font-medium text-white">Identity document verified</p>
          <p className="text-xs text-white/40 mt-0.5">
            {DOC_TYPES.find((d) => d.value === selectedType)?.label}
            {docNumber ? ` · ${docNumber}` : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setVerified(false);
            onVerified(null);
          }}
          className="ml-auto text-xs transition-colors text-white/40 hover:text-white"
        >
          Change
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Document type selector */}
      <div>
        <p className="mb-3 text-sm text-white/70">Select document type</p>
        <div className="grid grid-cols-2 gap-2">
          {DOC_TYPES.map((dt) => (
            <button
              key={dt.value}
              type="button"
              onClick={() => handleTypeSelect(dt.value)}
              className={`flex items-center gap-2.5 px-4 py-3 border rounded-xl text-left transition-all text-sm ${
                selectedType === dt.value
                  ? "border-cyan-400/60 bg-cyan-400/10 text-white"
                  : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70"
              }`}
            >
              <span
                className={
                  selectedType === dt.value ? "text-cyan-400" : "text-white/30"
                }
              >
                {dt.icon}
              </span>
              {dt.label}
            </button>
          ))}
        </div>
        {errors.type && (
          <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
            <AlertCircle size={12} /> {errors.type}
          </p>
        )}
      </div>

      {/* Document fields */}
      {docConfig && (
        <>
          {docConfig.hasDocNumber && (
            <div>
              <label className="block mb-2 text-sm text-white/70">
                {docConfig.docNumberLabel}
              </label>
              <input
                type="text"
                value={docNumber}
                onChange={(e) => {
                  setDocNumber(e.target.value);
                  setErrors((p) => ({ ...p, docNumber: undefined }));
                }}
                placeholder={docConfig.docNumberPlaceholder}
                maxLength={50}
                className={`${inputClass} ${
                  errors.docNumber ? "border-red-500/50" : ""
                }`}
              />
              {errors.docNumber && (
                <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
                  <AlertCircle size={12} /> {errors.docNumber}
                </p>
              )}
            </div>
          )}

          {docConfig.hasTwoSides ? (
            <div className="grid grid-cols-2 gap-4">
              <FileUploadSlot
                label="Front side"
                file={frontFile}
                error={errors.front}
                onFileChange={(f, err) => {
                  setFrontFile(f);
                  setErrors((p) => ({ ...p, front: err }));
                }}
                onRemove={() => setFrontFile(null)}
              />
              <FileUploadSlot
                label="Back side"
                file={backFile}
                error={errors.back}
                onFileChange={(f, err) => {
                  setBackFile(f);
                  setErrors((p) => ({ ...p, back: err }));
                }}
                onRemove={() => setBackFile(null)}
              />
            </div>
          ) : (
            <FileUploadSlot
              label={`Upload ${docConfig.label}`}
              file={singleFile}
              error={errors.single}
              onFileChange={(f, err) => {
                setSingleFile(f);
                setErrors((p) => ({ ...p, single: err }));
              }}
              onRemove={() => setSingleFile(null)}
            />
          )}

          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-3 text-sm font-medium text-black transition-colors rounded-xl bg-cyan-400 hover:bg-cyan-300"
          >
            Confirm Document
          </button>
        </>
      )}
    </div>
  );
};

export default IdentityVerification;