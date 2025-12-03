import jsPDF from "jspdf";

export function generateReportPDF(
    logoUrl: string,
    type: "ingredientes" | "sustentabilidade",
    year: number,
    month?: string
) {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();

    // ------------------------------------------------
    // LOGO NO CANTO SUPERIOR DIREITO (HEADER)
    // ------------------------------------------------
    if (logoUrl) {
        try {
            pdf.addImage(logoUrl, "PNG", pageWidth - 40, 12, 28, 28);
        } catch (err) {
            console.warn("Erro ao carregar logo:", err);
        }
    }

    // ------------------------------------------------
    // TÍTULO (abaixo do logo para não colidir)
    // ------------------------------------------------
    const title =
        type === "ingredientes"
            ? `Relatório de Ingredientes Desperdiçados • ${month} ${year}`
            : `Relatório de Sustentabilidade • ${year}`;

    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text(title, 14, 45);

    // Linha separadora
    pdf.setDrawColor(80);
    pdf.setLineWidth(0.7);
    pdf.line(14, 50, pageWidth - 14, 50);

    pdf.setFontSize(12);
    pdf.setFont("Helvetica", "normal");

    // ------------------------------------------------
    // SUBTÍTULO
    // ------------------------------------------------
    pdf.text(
        type === "ingredientes"
            ? "Resumo mensal dos ingredientes não utilizados:"
            : "Indicadores anuais de sustentabilidade:",
        14,
        65
    );

    // ------------------------------------------------
    // CAIXA DE DESTAQUE
    // ------------------------------------------------
    pdf.setFillColor(240, 240, 240);
    pdf.rect(14, 72, pageWidth - 28, 20, "F");

    pdf.setFont("Helvetica", "bold");
    pdf.text(
        type === "ingredientes"
            ? "Resumo de desperdício"
            : "Resumo ambiental anual",
        18,
        85
    );

    pdf.setFont("Helvetica", "normal");

    let y = 105;

    // ------------------------------------------------
    // INGREDIENTES – TABELA MANUAL
    // ------------------------------------------------
    if (type === "ingredientes") {
        const headers = ["Ingrediente", "Quantidade desperdiçada"];
        const rows = [
            ["Alface romana", "2 kg"],
            ["Tomate fresco", "1.2 kg"],
            ["Cebola branca", "0.8 kg"],
            ["Pão (vencido)", "15 unidades"],
            ["Queijo ralado", "500 g"]
        ];

        // Header
        pdf.setFont("Helvetica", "bold");
        pdf.setFillColor(230, 230, 230);
        pdf.rect(14, y, pageWidth - 28, 10, "F");
        pdf.text(headers[0], 18, y + 7);
        pdf.text(headers[1], pageWidth - 80, y + 7);

        y += 14;

        // Rows
        pdf.setFont("Helvetica", "normal");
        rows.forEach(row => {
            pdf.rect(14, y - 6, pageWidth - 28, 10);
            pdf.text(row[0], 18, y);
            pdf.text(row[1], pageWidth - 80, y);
            y += 12;
        });

        y += 10;

        pdf.text("Notas adicionais:", 14, y);
        y += 7;
        pdf.text("• Ajustar quantidades de compra.", 14, y);
        y += 7;
        pdf.text("• Melhorar controlo de validade (FIFO).", 14, y);
    }

        // ------------------------------------------------
        // SUSTENTABILIDADE – TEXTOS
    // ------------------------------------------------
    else {
        const lines = [
            "• Redução do desperdício alimentar: 12%",
            "• Otimização do consumo energético: 8%",
            "• Aumento da reciclagem: 17%",
            "",
            "Resumo geral:",
            "Este ano apresentou melhorias significativas nos indicadores ambientais.",
            "Foram adotadas práticas de eficiência energética e gestão de resíduos,",
            "refletindo uma evolução positiva na sustentabilidade global do projeto."
        ];

        lines.forEach(line => {
            pdf.text(line, 14, y);
            y += 7;
        });
    }

    // ------------------------------------------------
    // ABRIR PDF NA NOVA TAB
    // ------------------------------------------------
    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);

    const newTab = window.open();
    if (newTab) {
        newTab.document.write(`
            <html>
                <head><title>${title}</title></head>
                <body style="margin:0;">
                    <iframe src="${url}" style="border:none;width:100%;height:100%;"></iframe>
                </body>
            </html>
        `);
        newTab.document.close();
    }

    setTimeout(() => URL.revokeObjectURL(url), 8000);
}
