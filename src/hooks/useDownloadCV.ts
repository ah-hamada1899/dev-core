"use client";

import { useState, useCallback } from "react";

type DownloadStatus = "idle" | "downloading" | "success" | "error";

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

  const downloadCV = useCallback(async () => {
    try {
      setStatus("downloading");
      setError(null);
      setProgress(0);

      // CV file path
      const filePath = "/cv/Ah_Hamada_CV.pdf";
      
      // Fetch the file
      const response = await fetch(filePath);
      
      if (!response.ok) {
        throw new Error(`Failed to download CV: ${response.status} ${response.statusText}`);
      }

      // Get file size for progress tracking
      const contentLength = response.headers.get("content-length");
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      
      // Create readable stream for progress tracking
      const reader = response.body?.getReader();
      const chunks: Uint8Array[] = [];
      let loaded = 0;

      if (reader) {
        // Read the stream
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          chunks.push(value);
          loaded += value.length;
          
          if (total > 0) {
            const percentComplete = Math.round((loaded / total) * 100);
            setProgress(percentComplete);
          }
        }
      }

      // Combine chunks into a single blob
      const blob = new Blob(chunks, { type: "application/pdf" });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Ah_Hamada_CV.pdf";
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

      setStatus("success");
      setProgress(100);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus("idle");
        setProgress(0);
      }, 3000);

    } catch (err) {
      console.error("Download error:", err);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to download CV");
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus("idle");
        setError(null);
      }, 3000);
    }
  }, []);

  return { downloadCV, status, error, progress };
}