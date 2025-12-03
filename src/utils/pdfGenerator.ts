import jsPDF from "jspdf";

export function generateReportPDF(
    logoUrl: string,
    type: "ingredientes" | "sustentabilidade",
    year: number,
    month?: string
) {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();

    // ------------------------------------------
    // 1) LOGO (topo direito)
    // ------------------------------------------
    if (logoUrl) {
        try {
            pdf.addImage(logoUrl, "PNG", pageWidth - 35, 10, 25, 25);
        } catch (e) {
            console.warn("Erro ao carregar logo:", e);
        }
    }

    // ------------------------------------------
    // 2) TÍTULO
    // ------------------------------------------
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(20);

    const title =
        type === "ingredientes"
            ? `Relatório de Ingredientes Desperdiçados - ${month} ${year}`
            : `Relatório de Sustentabilidade - ${year}`;

    pdf.text(title, pageWidth / 2, 45, { align: "center" });

    // ------------------------------------------
    // 3) SUBTÍTULO
    // ------------------------------------------
    pdf.setFontSize(12);
    pdf.setFont("Helvetica", "normal");

    pdf.text(
        type === "ingredientes"
            ? "Análise mensal dos ingredientes não utilizados e desperdiçados."
            : "Avaliação anual dos indicadores de sustentabilidade.",
        14,
        60
    );

    // ------------------------------------------
    // 4) CONTEÚDO MOCKADO
    // ------------------------------------------
    let y = 80;
    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(11);

    if (type === "ingredientes") {
        const lines = [
            "Ingredientes desperdiçados este mês:",
            "- Alface romana: 2 kg",
            "- Tomate fresco: 1.2 kg",
            "- Cebola branca: 0.8 kg",
            "- Pão (vencido): 15 unidades",
            "- Queijo ralado: 500 g",
            "",
            "Principais causas de desperdício:",
            "• Excesso de stock não utilizado.",
            "• Ingredientes perecíveis com validade curta.",
            "• Preparações que não foram usadas no serviço.",
            "",
            "Notas adicionais:",
            "A equipa deverá rever as quantidades de compras e reforçar o controlo",
            "da rotação de stock (FIFO)."
        ];

        lines.forEach(line => {
            pdf.text(line, 14, y);
            y += 7;
        });
    } else {
        const lines = [
            "Indicadores de Sustentabilidade:",
            "- Redução do desperdício alimentar: 12%",
            "- Consumo energético otimizado: -8%",
            "- Aumento de reciclagem: +17%",
            "",
            "Resumo anual:",
            "Registaram-se melhorias no consumo energético e na gestão de resíduos.",
            "A implementação de práticas sustentáveis demonstra uma tendência positiva",
            "em direção a um modelo mais ecológico e eficiente."
        ];

        lines.forEach(line => {
            pdf.text(line, 14, y);
            y += 7;
        });
    }

    // ------------------------------------------
    // 5) ABRIR EM NOVA TAB
    // ------------------------------------------
    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);

    const newTab = window.open();
    if (newTab) {
        newTab.document.write(`
            <html>
                <head><title>${title}</title></head>
                <body style="margin:0;">
                    <iframe src="${url}" style="border:none;width:100%;height:100%;" frameborder="0"></iframe>
                </body>
            </html>
        `);
        newTab.document.close();
    }

    setTimeout(() => URL.revokeObjectURL(url), 10000);
}
