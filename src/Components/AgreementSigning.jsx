import React, { useRef, useState, useEffect } from "react";
import { CheckCircle2, RotateCcw, PenLine } from "lucide-react";
import { Link } from "react-router-dom";

const AGREEMENT_TEXT = (
  <>
    SUBSCRIPTION AGREEMENT
    <br />
    Faces On Faces Academy
    <br />
    <br />

    Please read subscription agreement after payment
    <br />
    <br />

    <Link to="/subscription-agreement" className="underline text-cyan-400">
      Subscription Agreement
    </Link>
  </>
);

const SignaturePad = ({ onSigned }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [lastPos, setLastPos] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const pos = getPos(e, canvas);
    setIsDrawing(true);
    setLastPos(pos);
    setHasSignature(true);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setLastPos(pos);
  };

  const stopDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(false);
    setLastPos(null);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const confirm = () => {
    const canvas = canvasRef.current;
    const signatureDataUrl = canvas.toDataURL("image/png");
    onSigned(signatureDataUrl);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/70">Draw your signature below</p>
        <button
          type="button"
          onClick={clear}
          className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          <RotateCcw size={12} /> Clear
        </button>
      </div>
      <div className="relative overflow-hidden border-2 border-dashed border-white/20 rounded-xl bg-white/5">
        <canvas
          ref={canvasRef}
          width={600}
          height={160}
          className="w-full h-32 cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!hasSignature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 text-white/20">
              <PenLine size={16} />
              <span className="text-sm">Sign here</span>
            </div>
          </div>
        )}
      </div>
      <div className="pt-1 border-t border-white/10" />
      <button
        type="button"
        onClick={confirm}
        disabled={!hasSignature}
        className="w-full py-3 text-sm font-medium text-black transition-colors rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Confirm Signature & Continue
      </button>
    </div>
  );
};

const AgreementSigning = ({ studentName, onSigned }) => {
  const [signed, setSigned] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const textRef = useRef(null);

  const handleScroll = (e) => {
    const el = e.target;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    if (atBottom) setScrolledToBottom(true);
  };

  const handleSigned = (signatureDataUrl) => {
    setSigned(true);
    onSigned(signatureDataUrl);
  };

  if (signed) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex items-center justify-center rounded-full w-14 h-14 bg-green-500/10">
          <CheckCircle2 size={28} className="text-green-400" />
        </div>
        <div>
          <p className="font-semibold text-white">Agreement signed!</p>
          <p className="mt-1 text-sm text-white/40">Proceeding to payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-1 text-lg font-semibold text-white">
          Subscription Agreement
        </h3>
        <p className="text-sm text-white/40">
          Please read the full agreement before signing.
        </p>
      </div>

      {/* Agreement text */}
      <div
        ref={textRef}
        onScroll={handleScroll}
        className="h-48 p-4 overflow-y-auto font-mono text-xs leading-relaxed whitespace-pre-line border border-white/10 rounded-xl bg-white/5 text-white/50"
      >
       <div className="text-xs leading-relaxed text-white/50">
  {AGREEMENT_TEXT}
</div>
        <div className="pt-4 mt-4 border-t border-white/10">
          <p className="text-white/70">
            Student Name: <span className="font-medium text-white">{studentName}</span>
          </p>
          <p className="mt-1 text-white/50">
            Date: {new Date().toLocaleDateString("en-GB", {
              day: "numeric", month: "long", year: "numeric"
            })}
          </p>
        </div>
      </div>

      {!scrolledToBottom && (
        <p className="text-xs text-center text-amber-400/70">
          ↓ Scroll to the bottom to unlock signing
        </p>
      )}

      {/* Signature pad */}
      <div className={`transition-opacity duration-300 ${scrolledToBottom ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
        <SignaturePad onSigned={handleSigned} />
      </div>
    </div>
  );
};

export default AgreementSigning;