// typescript
import api from "./api";

export async function fetchSustainabilityReport(year: number): Promise<Blob> {
    try {
        const resp = await api.get("/api/Dashboard/download-relatorio-sustentabilidade", {
            params: { ano: year },
            responseType: "blob",
        });
        return resp.data as Blob;
    } catch (err) {
        console.error("Error fetching sustainability report:", err);
        throw err;
    }
}

export async function fetchTop10Desperdicios(year: number, month: number): Promise<Blob> {
    try {
        const resp = await api.get("/api/Dashboard/download-top10-desperdicios", {
            params: { ano: year, mes: month },
            responseType: "blob",
        });
        return resp.data as Blob;
    } catch (err) {
        console.error("Error fetching top10 desperdicios report:", err);
        throw err;
    }
}

export function openPdfBlobInNewTab(blob: Blob, title = "Relatório"): void {
    const url = URL.createObjectURL(blob);
    const newTab = window.open();
    if (!newTab) {
        console.warn("Unable to open new tab for PDF");
        URL.revokeObjectURL(url);
        return;
    }
    newTab.document.write(`
    <html>
      <head><title>${title}</title></head>
      <body style="margin:0;">
        <iframe src="${url}" style="border:none;width:100%;height:100%;"></iframe>
      </body>
    </html>
  `);
    newTab.document.close();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
}