"use client";

import { Analytics } from "@vercel/analytics/next";

export default function AnalyticsProvider() {
  return (
    <Analytics
      beforeSend={(event) => {
        if (localStorage.getItem("owner") === "true") {
          return null;
        }
        return event;
      }}
    />
  );
}
