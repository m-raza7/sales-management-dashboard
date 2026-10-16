"use client";

import { useEffect } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import type { PluginListenerHandle } from "@capacitor/core";
import { useRouter } from "next/navigation";

export default function CapacitorBackButton() {
  const router = useRouter();

  useEffect(() => {
    let listener: PluginListenerHandle | undefined;
    let disposed = false;

    async function setupBackButton() {
      try {
        const handle = await CapacitorApp.addListener(
          "backButton",
          ({ canGoBack }) => {
            if (canGoBack) {
              // Navigate to the previous page.
              router.back();
            }

            // If there is no previous page, do not exit the app.
          },
        );

        if (disposed) {
          await handle.remove();
        } else {
          listener = handle;
        }
      } catch (error) {
        console.error("Failed to set up Android back button:", error);
      }
    }

    void setupBackButton();

    return () => {
      disposed = true;
      void listener?.remove();
    };
  }, [router]);

  return null;
}
