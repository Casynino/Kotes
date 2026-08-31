import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

import { company } from "@/content/company";
import { escapeHtml, isHeaderSafe, truncate } from "./sanitize";
import type { Inquiry } from "@/content/types";

/**
 * SMTP delivery for contact-form notifications.
 *
 * All credentials come from environment variables and never leave the server.
 * If SMTP is not configured the module reports `configured: false` and the API
 * route degrades gracefully: the inquiry is still stored and the visitor still
 * sees a success message, while the failure is logged for administrators.
 */

export type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
  replyToVisitor: boolean;
};

let cachedTransporter: Transporter | null = null;

export function getMailConfig(): MailConfig | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL || company.email;

  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT || 587);

  return {
    host,
    port,
    // Implicit TLS on 465; STARTTLS elsewhere.
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    user,
    pass,
    from: process.env.CONTACT_FROM_EMAIL || user,
    to,
    replyToVisitor: process.env.CONTACT_REPLY_TO_VISITOR !== "false",
  };
}

export function isMailConfigured(): boolean {
  return getMailConfig() !== null;
}

function getTransporter(config: MailConfig): Transporter {
  if (cachedTransporter) return cachedTransporter;
  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
    // Fail fast rather than holding the request open.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return cachedTransporter;
}

export type SendResult = { sent: true } | { sent: false; reason: string };

export async function sendInquiryNotification(inquiry: Inquiry): Promise<SendResult> {
  const config = getMailConfig();
  if (!config) {
    return { sent: false, reason: "SMTP is not configured (SMTP_HOST / SMTP_USER / SMTP_PASSWORD missing)." };
  }

  const subject = truncate(`New enquiry: ${inquiry.subject}`, 150);
  if (!isHeaderSafe(subject) || !isHeaderSafe(inquiry.email)) {
    return { sent: false, reason: "Rejected: unsafe characters in email headers." };
  }

  try {
    const transporter = getTransporter(config);
    await transporter.sendMail({
      from: { name: `${company.shortName} Website`, address: config.from },
      to: config.to,
      subject,
      // Reply-To lets staff reply straight to the visitor from the inbox.
      replyTo: config.replyToVisitor ? inquiry.email : undefined,
      text: buildPlainText(inquiry),
      html: buildHtml(inquiry),
    });
    return { sent: true };
  } catch (error) {
    // The raw error is logged server-side only; the visitor never sees it.
    const reason = error instanceof Error ? error.message : "Unknown SMTP error";
    return { sent: false, reason };
  }
}

/** Optional acknowledgement to the visitor. Failure here is non-fatal. */
export async function sendVisitorAcknowledgement(inquiry: Inquiry): Promise<SendResult> {
  const config = getMailConfig();
  if (!config) return { sent: false, reason: "SMTP is not configured." };
  if (process.env.CONTACT_SEND_ACK === "false") return { sent: false, reason: "Acknowledgement disabled." };

  try {
    const transporter = getTransporter(config);
    await transporter.sendMail({
      from: { name: company.legalName, address: config.from },
      to: inquiry.email,
      subject: `We have received your enquiry — ${company.legalName}`,
      text: [
        `Dear ${inquiry.fullName},`,
        "",
        `Thank you for contacting ${company.legalName}. We have received your enquiry and a member of our team will respond within one business day.`,
        "",
        `Reference: ${inquiry.id}`,
        `Subject: ${inquiry.subject}`,
        `Service of interest: ${inquiry.serviceOfInterest}`,
        "",
        "If your matter is urgent, please call us:",
        company.phones.join(" | "),
        "",
        company.legalName,
        `${company.address.street}, ${company.address.poBox}, ${company.address.city}, ${company.address.country}`,
      ].join("\n"),
    });
    return { sent: true };
  } catch (error) {
    return { sent: false, reason: error instanceof Error ? error.message : "Unknown SMTP error" };
  }
}

function buildPlainText(i: Inquiry): string {
  return [
    "New website enquiry",
    "===================",
    `Reference:  ${i.id}`,
    `Received:   ${new Date(i.createdAt).toUTCString()}`,
    "",
    `Name:       ${i.fullName}`,
    `Company:    ${i.companyName || "-"}`,
    `Email:      ${i.email}`,
    `Phone:      ${i.phone}`,
    `Service:    ${i.serviceOfInterest}`,
    `Budget:     ${i.budgetRange || "-"}`,
    `Subject:    ${i.subject}`,
    "",
    "Message",
    "-------",
    i.message,
  ].join("\n");
}

function buildHtml(i: Inquiry): string {
  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:8px 16px 8px 0;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
      <td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:600">${escapeHtml(value)}</td>
    </tr>`;

  return `<!doctype html>
<html lang="en"><body style="margin:0;padding:24px;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
  <table role="presentation" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
    <tr><td style="background:#0b4a8f;padding:20px 24px">
      <div style="color:#ffffff;font-size:18px;font-weight:700">New website enquiry</div>
      <div style="color:#bfdbfe;font-size:13px;margin-top:4px">${escapeHtml(company.legalName)}</div>
    </td></tr>
    <tr><td style="padding:24px">
      <table role="presentation" style="width:100%;border-collapse:collapse">
        ${row("Reference", i.id)}
        ${row("Received", new Date(i.createdAt).toUTCString())}
        ${row("Name", i.fullName)}
        ${row("Company", i.companyName || "-")}
        ${row("Email", i.email)}
        ${row("Phone", i.phone)}
        ${row("Service", i.serviceOfInterest)}
        ${row("Budget", i.budgetRange || "-")}
        ${row("Subject", i.subject)}
      </table>
      <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e2e8f0">
        <div style="color:#64748b;font-size:13px;margin-bottom:8px">Message</div>
        <div style="color:#0f172a;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(i.message)}</div>
      </div>
      <div style="margin-top:24px">
        <a href="mailto:${escapeHtml(i.email)}" style="display:inline-block;background:#0b4a8f;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:14px;font-weight:600">Reply to ${escapeHtml(i.fullName)}</a>
      </div>
    </td></tr>
  </table>
</body></html>`;
}
