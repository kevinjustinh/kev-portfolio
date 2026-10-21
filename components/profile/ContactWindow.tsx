"use client";

import { useState, type CSSProperties } from "react";
import RetroWindow from "./RetroWindow";
import { winButton, type Look } from "@/lib/profile/look";
import { sendContactEmail } from "@/app/actions/contact";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

const field: CSSProperties = { font: "12px Verdana,sans-serif", padding: 4, border: "2px inset #fff", background: "#fff", color: "#000" };
const label: CSSProperties = { display: "flex", flexDirection: "column", gap: 3 };

export default function ContactWindow({ look, onClose, onSent }: { look: Look; onClose: () => void; onSent: () => void }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function submit(formData: FormData) {
    // Honeypot: real people never see or fill this field
    if (formData.get("website")) { setStatus({ kind: "sent" }); return; }
    setStatus({ kind: "sending" });
    try {
      const result = await sendContactEmail(formData);
      if (result.status === "success") { setStatus({ kind: "sent" }); onSent(); }
      else if (result.status === "error") setStatus({ kind: "error", message: result.message });
    } catch {
      setStatus({ kind: "error", message: "Couldn't send right now. Try again, or reach Kevin on LinkedIn." });
    }
  }

  return (
    <RetroWindow look={look} title="Send Kevin a Message" onClose={onClose} width={420}>
      {status.kind === "sent" ? (
        <div role="status" style={{ padding: "20px 12px", fontSize: 12, textAlign: "center" }}>
          Message sent! Kevin will get back to you soon. thx for the add!!
        </div>
      ) : (
        <form action={submit} style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8, fontSize: 11 }}>
          <label style={label}>Name<input name="name" required autoComplete="name" style={field} /></label>
          <label style={label}>Email<input name="email" type="email" required autoComplete="email" style={field} /></label>
          <label style={label}>Subject<input name="subject" required style={field} /></label>
          <label style={label}>Message<textarea name="message" rows={4} required style={{ ...field, resize: "vertical" }} /></label>
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden style={{ position: "absolute", left: -9999, width: 1, height: 1 }} />
          {status.kind === "error" && (
            <div role="alert" style={{ color: "#a00", fontWeight: "bold" }}>{status.message}</div>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" disabled={status.kind === "sending"} className="kjh-press" style={{ ...winButton, fontWeight: "bold", opacity: status.kind === "sending" ? 0.6 : 1 }}>
              {status.kind === "sending" ? "Sending..." : "Send message"}
            </button>
          </div>
        </form>
      )}
    </RetroWindow>
  );
}
