import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, FileSpreadsheet, FileDown, Download } from "lucide-react";

interface BotaoExportarCustomProps {
  label?: string;
  onExportCSV: () => void;
  onExportExcel: () => void;
  onExportPDF: () => void;
}

export function BotaoExportarCustom({
  label = "Exportar",
  onExportCSV,
  onExportExcel,
  onExportPDF,
}: BotaoExportarCustomProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-2 h-10 sm:h-10 px-4 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors">
  <Download className="h-4 w-4" />
  {label}
</Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-44 bg-[#0B0F19] border border-border shadow-lg"
      >
        <DropdownMenuLabel className="text-foreground text-sm">
          Exportar como
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onExportCSV}
          className="cursor-pointer text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
          CSV
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onExportExcel}
          className="cursor-pointer text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <FileSpreadsheet className="h-4 w-4 mr-2 text-muted-foreground" />
          Excel
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onExportPDF}
          className="cursor-pointer text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <FileDown className="h-4 w-4 mr-2 text-muted-foreground" />
          PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
