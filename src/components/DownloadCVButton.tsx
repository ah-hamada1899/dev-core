"use client";

import { useDownloadCV } from "@/hooks/useDownloadCV";

interface DownloadCVButtonProps {
  className?: string;
  variant?: "primary" | "secondary";
  children?: React.ReactNode;
}

export default function DownloadCVButton({ 
  className = "",
  variant = "primary",
  children
}: DownloadCVButtonProps) {
  const { downloadCV, status, error, progress } = useDownloadCV();

  const baseStyles = "px-8 py-4 font-label-caps text-label-caps transition-all duration-300 inline-flex items-center justify-center gap-2";
  
  const variantStyles = {
    primary: "bg-primary text-on-primary hover:bg-primary-fixed active:scale-95",
    secondary: "border border-outline-variant text-on-surface hover:border-primary hover:text-primary"
  };

  const getButtonText = () => {
    if (status === "downloading") return `DOWNLOADING... ${progress}%`;
    if (status === "success") return "✓ DOWNLOADED";
    if (status === "error") return "⚠ RETRY";
    return children || "DOWNLOAD CV";
  };

  const isDisabled = status === "downloading" || status === "success";

  return (
    <div className="flex flex-col items-start">
      <button
        type="button"
        onClick={downloadCV}
        disabled={isDisabled}
        className={`${baseStyles} ${variantStyles[variant]} ${className} ${
          isDisabled ? "opacity-70 cursor-not-allowed" : ""
        } ${status === "error" ? "border-red-500 text-red-500" : ""}`}
      >
        {status === "downloading" && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {getButtonText()}
      </button>
      {error && (
        <span className="text-xs text-red-500 mt-2">{error}</span>
      )}
    </div>
  );
}