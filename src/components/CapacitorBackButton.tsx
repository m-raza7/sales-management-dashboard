"use client";

import { useEffect } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import type { PluginListenerHandle } from "@capacitor/core";
import { useRouter } from "next/navigation";

export default function CapacitorBackButton() {
  const router = useRouter();

  useEffect(() => {
    let listener: PluginListenerHandle | undefined;
    let active = true;

    const setupBackButton = async () => {
      try {
        const handle = await CapacitorApp.addListener(
          "backButton",
          ({ canGoBack }) => {
            if (canGoBack && window.history.length > 1) {
              router.back();
            }
          },
        );

        if (active) {
          listener = handle;
        } else {
          await handle.remove();
        }
      } catch (error) {
        console.error("Back button setup failed:", error);
      }
    };

    void setupBackButton();

    return () => {
      active = false;
      void listener?.remove();
    };
  }, [router]);

  return null;
}
