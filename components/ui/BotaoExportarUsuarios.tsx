import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { BotaoExportarCustom } from "@/components/ui/BotaoExportarCustom";

interface Usuario {
  nome: string;
  email: string;
  telefone?: string;
  cpf?: string;
  apartamento: string;
  bloco: string;
  tipo: string;
  status: string;
  observacoes?: string;
}

interface BotaoExportarUsuariosProps {
  data: Usuario[];
}

export function BotaoExportarUsuarios({ data }: BotaoExportarUsuariosProps) {
  const exportarPDF = () => {
    if (!data?.length) return toast.warning("Nenhum usuário para exportar.");

    // 🧾 Modo paisagem (horizontal)
    const doc = new jsPDF({ orientation: "landscape" });

    // 🟩 Cabeçalho principal
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(34, 139, 34); // Verde escuro
    doc.text("Relatório de Usuários", 14, 15);

    // 📅 Data e hora de geração
    doc.setFontSize(10);
    doc.setTextColor(100);
    const dataGeracao = new Date().toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium",
    });
    doc.text(`Gerado em: ${dataGeracao}`, 14, 22);

    // 📋 Tabela estilizada
    autoTable(doc, {
      startY: 28,
      head: [
        [
          "Nome",
          "E-mail",
          "Telefone",
          "CPF",
          "Apartamento",
          "Bloco",
          "Tipo",
          "Status",
          "Observações",
        ],
      ],
      body: data.map((u) => [
        u.nome,
        u.email,
        u.telefone || "-",
        u.cpf || "-",
        u.apartamento,
        u.bloco,
        u.tipo,
        u.status,
        u.observacoes || "-",
      ]),
      styles: {
        fontSize: 9,
        cellPadding: 3,
        valign: "middle",
      },
      headStyles: {
        fillColor: [34, 139, 34], // Verde
        textColor: 255,
        halign: "center",
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        0: { cellWidth: 35 }, // Nome
        1: { cellWidth: 40 }, // E-mail
        2: { cellWidth: 30 }, // Telefone
        3: { cellWidth: 30 }, // CPF
        4: { cellWidth: 20 }, // Apartamento
        5: { cellWidth: 20 }, // Bloco
        6: { cellWidth: 25 }, // Tipo
        7: { cellWidth: 25 }, // Status
        8: { cellWidth: 45 }, // Observações
      },
    });

    // 💾 Salvar PDF
    doc.save("usuarios.pdf");
  };

  // 📊 Exportar Excel
  const exportarExcel = () => {
    if (!data?.length) return toast.warning("Nenhum usuário para exportar.");

    const ws = XLSX.utils.json_to_sheet(
      data.map((u) => ({
        Nome: u.nome,
        Email: u.email,
        Telefone: u.telefone || "",
        CPF: u.cpf || "",
        Apartamento: u.apartamento,
        Bloco: u.bloco,
        Tipo: u.tipo,
        Status: u.status,
        Observações: u.observacoes || "",
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuários");
    XLSX.writeFile(wb, "usuarios.xlsx");
  };

  // 📜 Exportar CSV
  const exportarCSV = () => {
    if (!data?.length) return toast.warning("Nenhum usuário para exportar.");

    const ws = XLSX.utils.json_to_sheet(
      data.map((u) => ({
        Nome: u.nome,
        Email: u.email,
        Telefone: u.telefone || "",
        CPF: u.cpf || "",
        Apartamento: u.apartamento,
        Bloco: u.bloco,
        Tipo: u.tipo,
        Status: u.status,
        Observações: u.observacoes || "",
      }))
    );

    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "usuarios.csv";
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
