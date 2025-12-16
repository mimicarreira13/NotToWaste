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


export async function fetchAvailableSustainabilityYears(): Promise<number[]> {
    try {
        const resp = await api.get("/api/Dashboard/anos-sustentabilidade");
        const data = resp.data;
        if (data && Array.isArray(data.objeto)) {
            return (data.objeto as number[]).slice().sort((a, b) => b - a);
        }
        return [];
    } catch (err) {
        console.error("Error fetching available sustainability years:", err);
        return [];
    }
}

export async function fetchAvailableIngredientYearsMonths(): Promise<Record<number, string[]>> {
    try {
        // If your real endpoint is different, update this path.
        const resp = await api.get("/api/Dashboard/anos-meses-ingredientes");
        const data = resp.data;
        const out: Record<number, string[]> = {};
        if (data && typeof data.objeto === "object" && data.objeto !== null) {
            Object.keys(data.objeto).forEach((k) => {
                const year = Number(k);
                const months = Array.isArray(data.objeto[k]) ? data.objeto[k].map(String) : [];
                out[year] = months;
            });
        }
        return out;
    } catch (err) {
        console.error("Error fetching ingredient years/months:", err);
        return {};
    }
}