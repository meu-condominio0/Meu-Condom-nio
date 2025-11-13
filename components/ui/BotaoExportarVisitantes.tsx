import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { BotaoExportarCustom } from "@/components/ui/BotaoExportarCustom";

interface Visitante {
  nome: string;
  tipo: "visitante" | "entrega";
  cpf: string | null;
  telefone: string | null;
  apartamento: string;
  status: "aguardando" | "autorizado" | "negado" | "dentro" | "finalizado";
  entrada?: string;
  saida?: string;
  observacao?: string | null;
}

interface BotaoExportarVisitantesProps {
  data: Visitante[];
}

export function BotaoExportarVisitantes({ data }: BotaoExportarVisitantesProps) {
 const exportarPDF = () => {
  if (!data?.length) return toast.warning("Nenhum visitante para exportar.");

  // 📄 Cria o PDF em modo paisagem (horizontal)
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  // 🟩 Cabeçalho principal
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(34, 139, 34);
  doc.text("Relatório de Visitantes", 14, 15);

  // 📅 Data e hora
  doc.setFontSize(10);
  doc.setTextColor(100);
  const dataGeracao = new Date().toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
  });
  doc.text(`Gerado em: ${dataGeracao}`, 14, 22);

  // 📋 Tabela
 autoTable(doc, {
  startY: 28,
  head: [
    ["Nome", "Tipo", "CPF", "Apartamento", "Entrada", "Saída", "Status", "Observação"],
  ],
  body: data.map((v) => [
    v.nome,
    v.tipo,
    v.cpf || "-",
    v.apartamento,
    v.entrada ? new Date(v.entrada).toLocaleString("pt-BR") : "-",
    v.saida ? new Date(v.saida).toLocaleString("pt-BR") : "-",
    v.status,
    v.observacao || "-",
  ]),
  styles: {
    fontSize: 9,
    cellPadding: 3,
    valign: "middle", // 👈 centraliza verticalmente
    halign: "center", // 👈 centraliza horizontalmente
    overflow: "linebreak",
    lineColor: [230, 230, 230],
    lineWidth: 0.1,
  },
  headStyles: {
    fillColor: [34, 139, 34],
    textColor: 255,
    halign: "center",
    fontStyle: "bold",
  },
  alternateRowStyles: {
    fillColor: [245, 245, 245],
  },
  columnStyles: {
    0: { cellWidth: 30 },
    1: { cellWidth: 25 },
    2: { cellWidth: 35 },
    3: { cellWidth: 25 },
    4: { cellWidth: 40 },
    5: { cellWidth: 40 },
    6: { cellWidth: 25 },
    7: { cellWidth: 60, halign: "left" },

  },
  margin: { left: 10, right: 10 },
});


  doc.save("visitantes.pdf");
};


  // 📊 Excel — incluindo Observação
  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      data.map((v) => ({
        Nome: v.nome,
        Tipo: v.tipo,
        CPF: v.cpf || "-",
        Apartamento: v.apartamento,
        Entrada: v.entrada ? new Date(v.entrada).toLocaleString("pt-BR") : "-",
        Saída: v.saida ? new Date(v.saida).toLocaleString("pt-BR") : "-",
        Status: v.status,
        Observação: v.observacao || "-",
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Visitantes");
    XLSX.writeFile(wb, "visitantes.xlsx");
  };

  // 📄 CSV — incluindo Observação
  const exportarCSV = () => {
    const ws = XLSX.utils.json_to_sheet(
      data.map((v) => ({
        Nome: v.nome,
        Tipo: v.tipo,
        CPF: v.cpf || "-",
        Apartamento: v.apartamento,
        Entrada: v.entrada ? new Date(v.entrada).toLocaleString("pt-BR") : "-",
        Saída: v.saida ? new Date(v.saida).toLocaleString("pt-BR") : "-",
        Status: v.status,
        Observação: v.observacao || "-",
      }))
    );
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "visitantes.csv";
    link.click();
  };

  return (
    <BotaoExportarCustom
      label="Exportar"
      onExportCSV={exportarCSV}
      onExportExcel={exportarExcel}
      onExportPDF={exportarPDF}
    />
  );
}
