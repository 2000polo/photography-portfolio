"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type ProgressState = "idle" | "loading" | "complete";

/** Gives immediate feedback for internal App Router navigation. */
export function NavigationProgress() {
  const pathname = usePathname();
  const routeKey = pathname;
  const previousRoute = useRef(routeKey);
  const [state, setState] = useState<ProgressState>("idle");
  const [progress, setProgress] = useState(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const failSafeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function clearTimers() {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (failSafeTimer.current) clearTimeout(failSafeTimer.current);
      hideTimer.current = null;
      failSafeTimer.current = null;
    }

    function startProgress() {
      clearTimers();
      setProgress(12);
      setState("loading");
      // Keep the bar moving, but below completion, while the route is loading.
      requestAnimationFrame(() => setProgress((current) => Math.max(current, 68)));
      failSafeTimer.current = setTimeout(() => {
        setProgress(100);
        setState("complete");
        hideTimer.current = setTimeout(() => setState("idle"), 240);
      }, 15000);
    }

    function handleDocumentClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        anchor.getAttribute("aria-disabled") === "true"
      ) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (destination.pathname === window.location.pathname) return;

      startProgress();
    }

    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    if (previousRoute.current === routeKey) return;
    previousRoute.current = routeKey;

    if (state === "idle") return;
    if (failSafeTimer.current) clearTimeout(failSafeTimer.current);
    setProgress(100);
    setState("complete");
    hideTimer.current = setTimeout(() => {
      setState("idle");
      setProgress(0);
    }, 240);
  }, [routeKey, state]);

  if (state === "idle") return null;

  return (
    <>
      <div
        className={`navigation-progress ${state === "complete" ? "navigation-progress--complete" : ""}`}
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-label="Loading page"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      />
      <span className="sr-only" role="status" aria-live="polite">
        {state === "loading" ? "Loading page" : "Page loaded"}
      </span>
    </>
  );
}
