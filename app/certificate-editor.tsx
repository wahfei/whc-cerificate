"use client";

import { useRef, useState, type FormEvent } from "react";

const initialDetails = {
  recipient: "",
  placement: "10",
  fatLoss: "1.4",
  weightLoss: "2",
  intake: "July Intake 2023",
  issueDate: "",
  coach: "Jennifer P. Jacobe",
};

type Details = typeof initialDetails;

function ordinal(value: string) {
  const number = Number(value);
  const ending = number % 100;
  const suffix = ending >= 11 && ending <= 13
    ? "th"
    : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[number % 10] ?? "th";
  return `${number}${suffix}`;
}

function formatDate(value: string) {
  if (!value) return "Issue date";
  return new Intl.DateTimeFormat("en-MY", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(value));
}

function PrintIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 14h12v7H6zM6 12h.01" />
    </svg>
  );
}

export default function CertificateEditor() {
  const [details, setDetails] = useState(initialDetails);
  const logo = useRef<HTMLImageElement>(null);

  function update(field: keyof Details, value: string) {
    setDetails((current) => ({ ...current, [field]: value }));
  }

  async function printCertificate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await logo.current?.decode();
    } catch {
      // The certificate can still print if the logo fails to load.
    }
    await document.fonts.ready;
    window.print();
  }

  const recipient = details.recipient.trim();
  const coach = details.coach.trim();
  const intake = details.intake.trim();
  const compact = recipient.length > 30 || intake.length > 27 || coach.length > 34;

  return (
    <div className="studio">
      <header className="topbar">
        <div className="brand">
          <img src="./club-logo.png" alt="" width="39" height="32" />
          <span>Wealthy Healthy Club</span>
        </div>
        <button type="submit" form="certificate-form" className="print-button">
          <PrintIcon /> Print / Save PDF
        </button>
      </header>

      <main className="workspace">
        <section className="editor" aria-labelledby="editor-title">
          <h1 id="editor-title">Certificate<br className="desktop-break" /> Studio</h1>
          <p className="intro">Fill in the details for your wellness programme certificate.</p>

          <form id="certificate-form" onSubmit={printCertificate}>
            <fieldset>
              <legend>Recipient</legend>
              <label>
                Full name
                <input required pattern={String.raw`.*\S.*`} maxLength={84} value={details.recipient} onChange={(event) => update("recipient", event.target.value)} placeholder="e.g. Avery Tan" autoComplete="off" />
              </label>
              <div className="field-row">
                <label>
                  Placement
                  <input type="number" required min="1" max="9999" step="1" value={details.placement} onChange={(event) => update("placement", event.target.value)} />
                </label>
                <label>
                  Issue date
                  <input type="date" required value={details.issueDate} onChange={(event) => update("issueDate", event.target.value)} />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Challenge results</legend>
              <div className="field-row">
                <label>
                  Body fat loss
                  <span className="with-unit">
                    <input type="number" required min="0" max="100" step="any" value={details.fatLoss} onChange={(event) => update("fatLoss", event.target.value)} aria-label="Body fat loss in percent" />
                    <span aria-hidden="true">%</span>
                  </span>
                </label>
                <label>
                  Weight loss
                  <span className="with-unit">
                    <input type="number" required min="0" step="any" value={details.weightLoss} onChange={(event) => update("weightLoss", event.target.value)} aria-label="Weight loss in kilograms" />
                    <span aria-hidden="true">kg</span>
                  </span>
                </label>
              </div>
              <label>
                Intake
                <input required pattern={String.raw`.*\S.*`} maxLength={64} value={details.intake} onChange={(event) => update("intake", event.target.value)} placeholder="e.g. July Intake 2023" />
              </label>
              <label>
                Head coach
                <input required pattern={String.raw`.*\S.*`} maxLength={72} value={details.coach} onChange={(event) => update("coach", event.target.value)} />
              </label>
            </fieldset>
          </form>
        </section>

        <section className="preview" aria-labelledby="preview-title">
          <div className="preview-header">
            <h2 id="preview-title">Live preview</h2>
            <p>A4 landscape</p>
          </div>
          <div className="preview-stage">
            <article className="certificate" data-compact={compact} aria-label="Certificate of Achievement">
              <div className="certificate-frame">
                <img className="certificate-logo" ref={logo} src="./club-logo.png" alt="Wealthy Healthy Club logo" width="127" height="104" />
                <p className="certificate-club">Wealthy Healthy Club</p>
                <p className="certificate-address">2nd Floor, Palm City, Lahad Datu</p>
                <h3>Certificate of Achievement</h3>
                <p className="presented-to">Presented to</p>
                <p className="recipient-name">{recipient || "Recipient Name"}</p>
                <div className="certificate-results">
                  <p>For placing {details.placement ? ordinal(details.placement) : "—"} with an average body fat loss of <strong>{details.fatLoss || "—"}%</strong><br className="result-break" /> and a total body weight loss of <strong>{details.weightLoss || "—"} kg</strong></p>
                  <p>in the 10-Day <b>“Saya Mahu Kurus”</b> Challenge <span className="intake-separator">·</span> <strong>{intake || "Intake"}</strong></p>
                </div>
                <p className="issue-date">Issued on {formatDate(details.issueDate)}</p>
                <div className="approval">
                  <div className="signature-line" />
                  <p>{coach || "Head Coach"}</p>
                  <span>Head Coach</span>
                </div>
              </div>
            </article>
          </div>
          <p className="print-note">Choose your printer or select <strong>Save as PDF</strong> in the print dialog.</p>
        </section>
      </main>
    </div>
  );
}
