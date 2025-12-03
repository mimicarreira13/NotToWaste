import jsPDF from "jspdf";

export function generateReportPDF(imageUrl: string, fileName: string = "report.pdf") {
    const pdf = new jsPDF();

    // Adiciona a imagem ao PDF
    pdf.addImage(imageUrl, "JPEG", 10, 10, 190, 277); // Ajuste as dimensões conforme necessário

    // Faz o download do PDF com o nome especificado
    pdf.save(fileName);
}