"use client";
// Runs once per page load and stashes gclid, keyword and UTMs in sessionStorage.
import { useEffect } from "react";
import { captureSource } from "@/lib/source";

export function SourceCapture() {
  useEffect(() => { captureSource(); }, []);
  return null;
}
