import jsPDF from "jspdf";

export function generateReportPDF(
    imageUrl: string,
    type: "ingredientes" | "sustentabilidade",
    year: number,
    month?: string
) {
    const pdf = new jsPDF();

    // Add the image to the PDF
    pdf.addImage(imageUrl, "JPEG", 10, 10, 190, 277);

    // Define the filename
    let fileName = `Relatorio_${type === "ingredientes" ? "Ingredientes" : "Sustentabilidade"}`;
    if (type === "ingredientes" && month) {
        fileName += `_${year}_${month}.pdf`;
    } else if (type === "sustentabilidade") {
        fileName += `_${year}.pdf`;
    }

    // Generate the PDF as a Blob
    const pdfBlob = pdf.output("blob");

    // Create a temporary URL for the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open a new tab and embed the PDF in an iframe
    const newTab = window.open();
    if (newTab) {
        newTab.document.write(`
            <html>
                <head><title>${fileName}</title></head>
                <body style="margin:0;">
                    <iframe src="${pdfUrl}" style="border:none;width:100%;height:100%;" frameborder="0"></iframe>
                </body>
            </html>
        `);
        newTab.document.close();
    }

    // Revoke the temporary URL after some time
    setTimeout(() => URL.revokeObjectURL(pdfUrl), 10000);
}