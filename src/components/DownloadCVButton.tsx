"use client";

import { useState } from "react";
import { useDownloadCV } from "@/hooks/useDownloadCV";
import { DownloadCVButtonProps } from "@/types";

export default function DownloadCVButton({ 
  className = "",
  variant = "primary",
  children,
  disabled = false,
  onClick,
  ariaLabel = "Download CV"
}: DownloadCVButtonProps): React.ReactElement {
  const { downloadCV, status, error, progress } = useDownloadCV();
  const [useFallback, setUseFallback] = useState<boolean>(false);

  const baseStyles: string = "px-8 py-4 font-label-caps text-label-caps transition-all duration-300 inline-flex items-center justify-center gap-2";
  
  const variantStyles: Record<'primary' | 'secondary', string> = {
    primary: "bg-primary text-on-primary hover:bg-primary-fixed active:scale-95",
    secondary: "border border-outline-variant text-on-surface hover:border-primary hover:text-primary"
  };

  const getButtonText = (): string => {
    if (status === "downloading") return `DOWNLOADING... ${progress}%`;
    if (status === "success") return "✓ DOWNLOADED";
    if (status === "error") return "⚠ RETRY";
    if (useFallback) return "📄 VIEW CV";
    return children?.toString() || "DOWNLOAD CV";
  };

  const isDisabled: boolean = disabled || status === "downloading" || status === "success";

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    if (onClick) {
      onClick(e);
    }

    if (useFallback) {
      window.open('/cv/DevCore_CV.pdf', '_blank');
      return;
    }
    
    await downloadCV();
    
    if (status === "error" && error?.includes('not found')) {
      setUseFallback(true);
    }
  };

  const handleRetry = (): void => {
    setUseFallback(false);
    downloadCV();
  };

  return (
    <div className="flex flex-col items-start">
      <button
        type="button"
        onClick={status === "error" ? handleRetry : handleClick}
        disabled={isDisabled && !useFallback}
        className={`${baseStyles} ${variantStyles[variant]} ${className} ${
          isDisabled && !useFallback ? "opacity-70 cursor-not-allowed" : ""
        } ${status === "error" ? "border-red-500 text-red-500" : ""}`}
        aria-label={ariaLabel}
      >
        {status === "downloading" && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {getButtonText()}
      </button>
      {error && (
        <div className="mt-2">
          <span className="text-xs text-red-500">{error}</span>
          {error.includes('not found') && (
            <button
              type="button"
              onClick={() => setUseFallback(true)}
              className="text-xs text-primary hover:underline ml-2"
              aria-label="View CV in browser instead"
            >
              View CV in browser instead
            </button>
          )}
        </div>
      )}
    </div>
  );
}