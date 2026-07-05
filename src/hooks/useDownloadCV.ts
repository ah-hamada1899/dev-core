"use client";

import { useState, useCallback } from "react";

type DownloadStatus = 'idle' | 'downloading' | 'success' | 'error';

interface UseDownloadCVReturn {
  downloadCV: () => Promise<void>;
  status: DownloadStatus;
  error: string | null;
  progress: number;
}

export function useDownloadCV(): UseDownloadCVReturn {
  const [status, setStatus] = useState<DownloadStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const downloadCV = useCallback(async (): Promise<void> => {
    try {
      setStatus("downloading");
      setError(null);
      setProgress(0);

      // Fetch the file
      const response: Response = await fetch('/cv/Ah_Hamada_CV.pdf');
      
      if (!response.ok) {
        throw new Error(`CV file not found (${response.status}). Please add your CV to /public/cv/Ah_Hamada_CV.pdf`);
      }

      // Get the file as a blob directly
      const blob: Blob = await response.blob();
      
      // Create download link
      const url: string = window.URL.createObjectURL(blob);
      const link: HTMLAnchorElement = document.createElement("a");
      link.href = url;
      link.download = "Ah_Hamada_CV.pdf";
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout((): void => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

      setStatus("success");
      setProgress(100);
      
      // Reset status after 3 seconds
      setTimeout((): void => {
        setStatus("idle");
        setProgress(0);
      }, 3000);

    } catch (err: unknown) {
      console.error("Download error:", err);
      setStatus("error");
      setError(
        err instanceof Error 
          ? err.message 
          : "Failed to download CV. Please try again."
      );
      
      setTimeout((): void => {
        setStatus("idle");
        setError(null);
      }, 5000);
    }
  }, []);

  return { downloadCV, status, error, progress };
}