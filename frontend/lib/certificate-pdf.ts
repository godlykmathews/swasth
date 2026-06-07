type CertificatePdfOptions = {
  activationCode: string;
  appName?: string;
  issuedOn?: Date;
};

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;

function escapePdfText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/[\n\r\t]/g, " ");
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date);
}

function text(content: string, x: number, y: number, size: number, font = "F1") {
  return `BT /${font} ${size} Tf ${x} ${y} Td (${escapePdfText(content)}) Tj ET\n`;
}

function estimateTextWidth(content: string, size: number, font: string) {
  const widthFactor = font === "F4" ? 0.62 : font === "F2" ? 0.56 : 0.5;
  return content.length * size * widthFactor;
}

function centeredText(content: string, y: number, size: number, font = "F1") {
  const x = Math.max(48, (PAGE_WIDTH - estimateTextWidth(content, size, font)) / 2);
  return text(content, Math.round(x), y, size, font);
}

function line(x1: number, y1: number, x2: number, y2: number) {
  return `${x1} ${y1} m ${x2} ${y2} l S\n`;
}

function wrapWords(content: string, maxLineLength: number) {
  const lines: string[] = [];
  let current = "";

  for (const word of content.split(" ")) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLineLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function drawWrappedText(content: string, x: number, y: number, size: number, maxLineLength: number) {
  return wrapWords(content, maxLineLength)
    .map((lineText, index) => text(lineText, x, y - index * (size + 7), size))
    .join("");
}

function buildPdf(contents: string) {
  const encoder = new TextEncoder();
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R /F4 7 0 R >> >> /Contents 8 0 R >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold >>",
    `<< /Length ${encoder.encode(contents).length} >>\nstream\n${contents}endstream`
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets[index + 1] = encoder.encode(pdf).length;
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = encoder.encode(pdf).length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return encoder.encode(pdf);
}

export function createActivationCertificatePdf({
  activationCode,
  appName = "Swasth AI",
  issuedOn = new Date()
}: CertificatePdfOptions) {
  const code = activationCode.trim() || "NOT CREATED";
  const issuedDate = formatDate(issuedOn);
  const reference = code === "NOT CREATED" ? "Pending setup completion" : code;

  let content = "";
  content += "q\n1 1 1 rg 0 0 595 842 re f\nQ\n";
  content += "q\n0.96 0.98 0.96 rg 36 36 523 770 re f\nQ\n";
  content += "q\n0.08 0.35 0.31 RG 2 w 48 48 499 746 re S\nQ\n";
  content += "q\n0.61 0.76 0.70 RG 1 w 64 64 467 714 re S\nQ\n";
  content += "q\n0.87 0.94 0.91 rg 82 636 431 88 re f\nQ\n";
  content += "q\n0.08 0.35 0.31 RG 1.5 w 82 636 431 88 re S\nQ\n";
  content += "q\n0.08 0.35 0.31 rg\n";
  content += centeredText(appName.toUpperCase(), 736, 13, "F2");
  content += centeredText("EActivation Certificate", 690, 29, "F2");
  content += "Q\n";
  content += "q\n0.36 0.46 0.43 rg\n";
  content += centeredText("Certificate of Preparedness", 661, 15, "F3");
  content += "Q\n";
  content += "q\n0.08 0.35 0.31 RG 1 w\n";
  content += line(138, 623, 457, 623);
  content += "Q\n";

  content += "q\n0.09 0.13 0.12 rg\n";
  content += centeredText("FAMILY ACTIVATION CODE", 579, 12, "F2");
  content += "Q\n";
  content += "q\n0.98 1 0.99 rg 102 492 391 76 re f\nQ\n";
  content += "q\n0.08 0.35 0.31 RG 1.25 w 102 492 391 76 re S\nQ\n";
  content += "q\n0.08 0.35 0.31 rg\n";
  content += centeredText(code, 521, code.length > 18 ? 22 : 28, "F4");
  content += "Q\n";

  content += "q\n0.16 0.24 0.22 rg\n";
  content += text("Issued by", 96, 444, 10, "F2");
  content += text(appName, 96, 424, 15, "F1");
  content += text("Issue date", 380, 444, 10, "F2");
  content += text(issuedDate, 380, 424, 15, "F1");
  content += text("Certificate reference", 96, 384, 10, "F2");
  content += text(reference, 96, 364, 14, "F4");
  content += "Q\n";

  content += "q\n0.61 0.76 0.70 RG 1 w\n";
  content += line(96, 337, 499, 337);
  content += "Q\n";
  content += "q\n0.16 0.24 0.22 rg\n";
  content += drawWrappedText(
    "Keep this certificate with important family, insurance, medical, and identity documents. Share the activation code only with trusted contacts who are allowed to start the verification workflow.",
    96,
    306,
    12,
    72
  );
  content += drawWrappedText(
    "This document is a family access record. It is not a legal will, identity document, or medical directive.",
    96,
    237,
    11,
    78
  );
  content += "Q\n";

  content += "q\n0.08 0.35 0.31 RG 1 w\n";
  content += line(96, 154, 250, 154);
  content += line(345, 154, 499, 154);
  content += "Q\n";
  content += "q\n0.36 0.46 0.43 rg\n";
  content += text("Prepared by Swasth AI", 96, 132, 10, "F1");
  content += text("Trusted contact acknowledgement", 345, 132, 10, "F1");
  content += centeredText("Generated securely by Swasth AI", 82, 10, "F2");
  content += "Q\n";

  return buildPdf(content);
}

export function downloadActivationCertificatePdf(options: CertificatePdfOptions) {
  const pdf = createActivationCertificatePdf(options);
  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "swasth-ai-activation-certificate.pdf";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.URL.revokeObjectURL(url);
}
