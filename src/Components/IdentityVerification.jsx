import React, { useState, useRef, useEffect } from "react";
import {
  CreditCard, BookOpen, Car, Zap,
  Upload, X, FileText, AlertCircle, CheckCircle2,
} from "lucide-react";
import { trackEvent } from "../utils/analytics";

const ADDRESS_PROOF_TYPES = [
  {
    value: "utility_bill",
    label: "Utility Bill",
    icon: <Zap size={18} />,
  },
  {
    value: "bank_statement",
    label: "Bank Statement",
    icon: <CreditCard size={18} />,
  },
];

const IDENTITY_PROOF_TYPES = [
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
    label: "Driving Licence",
    icon: <Car size={18} />,
    hasDocNumber: true,
    hasTwoSides: true,
    docNumberLabel: "Driving Licence Number",
    docNumberPlaceholder: "Enter your driving licence number",
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
      trackEvent("document_upload_rejected", {
        component: "identity_verification",
        slot: label,
        reason: "invalid_type",
      });
      return;
    }
    if (f.size > MAX_SIZE_BYTES) {
      onFileChange(null, `File must be under ${MAX_SIZE_MB}MB.`);
      trackEvent("document_upload_rejected", {
        component: "identity_verification",
        slot: label,
        reason: "file_too_large",
      });
      return;
    }
    onFileChange(f, null);
    trackEvent("document_uploaded", {
      component: "identity_verification",
      slot: label,
    });
  };

  const [previewUrl, setPreviewUrl] = useState(null);
  const isPdf = file?.type === "application/pdf";

  useEffect(() => {
    if (!file || isPdf) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, isPdf]);

  return (
    <div className="w-full max-w-full min-w-0">
      <p className="mb-2 text-sm text-white/70">{label}</p>
      {file ? (
        <div className="relative flex items-center w-full min-w-0 gap-3 p-3 overflow-hidden border rounded-xl border-cyan-400/30 bg-cyan-400/5">
          {isPdf ? (
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-white/10">
              <FileText size={22} className="text-cyan-400" />
            </div>
          ) : previewUrl ? (
            <img
              src={previewUrl}
              alt="Document preview"
              className="flex-shrink-0 object-cover w-12 h-12 rounded-lg"
            />
          ) : (
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-white/10">
              <FileText size={22} className="text-cyan-400" />
            </div>
          )}
          <div className="flex-1 min-w-0 overflow-hidden">
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
          className={`flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors w-full min-w-0 ${
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
  // Group 1 — Address Proof
  const [addressType, setAddressType] = useState(null);
  const [addressFile, setAddressFile] = useState(null);

  // Group 2 — Identity Proof
  const [identityType, setIdentityType] = useState(null);
  const [identityDocNumber, setIdentityDocNumber] = useState("");
  const [identityFrontFile, setIdentityFrontFile] = useState(null);
  const [identityBackFile, setIdentityBackFile] = useState(null);

  const [errors, setErrors] = useState({});
  const [verified, setVerified] = useState(false);

  const addressConfig = ADDRESS_PROOF_TYPES.find((d) => d.value === addressType);
  const identityConfig = IDENTITY_PROOF_TYPES.find((d) => d.value === identityType);

  const handleAddressTypeSelect = (val) => {
    setAddressType(val);
    setAddressFile(null);
    setErrors((p) => ({ ...p, addressType: undefined, addressFile: undefined }));
    setVerified(false);

    trackEvent("identity_doc_type_select", {
      component: "identity_verification",
      group: "address_proof",
      doc_type: val,
    });
  };

  const handleIdentityTypeSelect = (val) => {
    setIdentityType(val);
    setIdentityDocNumber("");
    setIdentityFrontFile(null);
    setIdentityBackFile(null);
    setErrors((p) => ({
      ...p,
      identityType: undefined,
      identityDocNumber: undefined,
      identityFront: undefined,
      identityBack: undefined,
    }));
    setVerified(false);

    trackEvent("identity_doc_type_select", {
      component: "identity_verification",
      group: "identity_proof",
      doc_type: val,
    });
  };

  const validate = () => {
    const errs = {};
    if (!addressType) {
      errs.addressType = "Please select an address proof document.";
    } else if (!addressFile) {
      errs.addressFile = "Address proof upload is required.";
    }

    if (!identityType) {
      errs.identityType = "Please select an identity proof document.";
    } else {
      if (identityConfig?.hasDocNumber && !identityDocNumber.trim()) {
        errs.identityDocNumber = "Document number is required.";
      }
      if (identityConfig?.hasTwoSides) {
        if (!identityFrontFile) errs.identityFront = "Front side is required.";
        if (!identityBackFile) errs.identityBack = "Back side is required.";
      } else if (!identityFrontFile) {
        errs.identityFront = "Document upload is required.";
      }
    }

    return errs;
  };

  const handleConfirm = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      trackEvent("identity_confirm_validation_error", {
        component: "identity_verification",
        fields: Object.keys(errs),
      });
      return;
    }
    setVerified(true);

    trackEvent("identity_documents_confirmed", {
      component: "identity_verification",
      address_proof_type: addressType,
      identity_proof_type: identityType,
    });

    onVerified({
      addressProofType: addressType,
      addressProofFile: addressFile,
      identityProofType: identityType,
      identityProofNumber: identityDocNumber || null,
      identityFrontFile,
      identityBackFile: identityConfig?.hasTwoSides ? identityBackFile : null,
    });
  };

  const inputClass =
    "w-full px-4 py-3 text-white border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none placeholder:text-white/30 transition-colors";

  if (verified) {
    return (
      <div className="flex items-center gap-3 p-4 border rounded-xl border-green-500/30 bg-green-500/10">
        <CheckCircle2 size={18} className="text-green-400 shrink-0" />
        <div>
          <p className="text-sm font-medium text-white">Identity documents verified</p>
          <p className="text-xs text-white/40 mt-0.5">
            {ADDRESS_PROOF_TYPES.find((d) => d.value === addressType)?.label}
            {" · "}
            {IDENTITY_PROOF_TYPES.find((d) => d.value === identityType)?.label}
            {identityDocNumber ? ` · ${identityDocNumber}` : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setVerified(false);

            trackEvent("identity_documents_change_clicked", {
              component: "identity_verification",
            });

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
    <div className="w-full max-w-full min-w-0 space-y-6 overflow-x-hidden">
      {/* Group 1: Address Proof */}
      <div>
        <p className="mb-3 text-sm text-white/70">
          Address Proof — upload one of the following
        </p>
        <div className="grid grid-cols-2 gap-2">
          {ADDRESS_PROOF_TYPES.map((dt) => (
            <button
              key={dt.value}
              type="button"
              onClick={() => handleAddressTypeSelect(dt.value)}
              className={`flex items-center gap-2.5 px-4 py-3 border rounded-xl text-left transition-all text-sm ${
                addressType === dt.value
                  ? "border-cyan-400/60 bg-cyan-400/10 text-white"
                  : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70"
              }`}
            >
              <span className={addressType === dt.value ? "text-cyan-400" : "text-white/30"}>
                {dt.icon}
              </span>
              {dt.label}
            </button>
          ))}
        </div>
        {errors.addressType && (
          <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
            <AlertCircle size={12} /> {errors.addressType}
          </p>
        )}

        {addressConfig && (
          <div className="mt-4">
            <FileUploadSlot
              label={`Upload ${addressConfig.label}`}
              file={addressFile}
              error={errors.addressFile}
              onFileChange={(f, err) => {
                setAddressFile(f);
                setErrors((p) => ({ ...p, addressFile: err }));
              }}
              onRemove={() => setAddressFile(null)}
            />
          </div>
        )}
      </div>

      {/* Group 2: Identity Proof */}
      <div>
        <p className="mb-3 text-sm text-white/70">
          Identity Proof — upload one of the following
        </p>
        <div className="grid grid-cols-2 gap-2">
          {IDENTITY_PROOF_TYPES.map((dt) => (
            <button
              key={dt.value}
              type="button"
              onClick={() => handleIdentityTypeSelect(dt.value)}
              className={`flex items-center gap-2.5 px-4 py-3 border rounded-xl text-left transition-all text-sm ${
                identityType === dt.value
                  ? "border-cyan-400/60 bg-cyan-400/10 text-white"
                  : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70"
              }`}
            >
              <span className={identityType === dt.value ? "text-cyan-400" : "text-white/30"}>
                {dt.icon}
              </span>
              {dt.label}
            </button>
          ))}
        </div>
        {errors.identityType && (
          <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
            <AlertCircle size={12} /> {errors.identityType}
          </p>
        )}

        {identityConfig && (
          <div className="mt-4 space-y-4">
            {identityConfig.hasDocNumber && (
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  {identityConfig.docNumberLabel}
                </label>
                <input
                  type="text"
                  value={identityDocNumber}
                  onChange={(e) => {
                    setIdentityDocNumber(e.target.value);
                    setErrors((p) => ({ ...p, identityDocNumber: undefined }));
                  }}
                  placeholder={identityConfig.docNumberPlaceholder}
                  maxLength={50}
                  className={`${inputClass} ${
                    errors.identityDocNumber ? "border-red-500/50" : ""
                  }`}
                />
                {errors.identityDocNumber && (
                  <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400">
                    <AlertCircle size={12} /> {errors.identityDocNumber}
                  </p>
                )}
              </div>
            )}

            {identityConfig.hasTwoSides ? (
              <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <FileUploadSlot
                    label="Front side"
                    file={identityFrontFile}
                    error={errors.identityFront}
                    onFileChange={(f, err) => {
                      setIdentityFrontFile(f);
                      setErrors((p) => ({ ...p, identityFront: err }));
                    }}
                    onRemove={() => setIdentityFrontFile(null)}
                  />
                </div>
                <div className="min-w-0">
                  <FileUploadSlot
                    label="Back side"
                    file={identityBackFile}
                    error={errors.identityBack}
                    onFileChange={(f, err) => {
                      setIdentityBackFile(f);
                      setErrors((p) => ({ ...p, identityBack: err }));
                    }}
                    onRemove={() => setIdentityBackFile(null)}
                  />
                </div>
              </div>
            ) : (
              <FileUploadSlot
                label={`Upload ${identityConfig.label}`}
                file={identityFrontFile}
                error={errors.identityFront}
                onFileChange={(f, err) => {
                  setIdentityFrontFile(f);
                  setErrors((p) => ({ ...p, identityFront: err }));
                }}
                onRemove={() => setIdentityFrontFile(null)}
              />
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleConfirm}
        className="w-full py-3 text-sm font-medium text-black transition-colors rounded-xl bg-cyan-400 hover:bg-cyan-300"
      >
        Confirm Documents
      </button>
    </div>
  );
};

export default IdentityVerification;