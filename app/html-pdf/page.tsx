import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useRef } from "react";
import { Download } from "lucide-react";
import jsPDF, { HTMLOptions } from "jspdf";
import { PDF } from "@/components/molecule/html-pdf/pdf";

const PdfRender = () => {
  return (
    <div className="container p-20">
      <div className="m-auto">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          HTML to PDF by <code>jsPDF</code>
        </h1>

        <PDF />
      </div>
    </div>
  );
};

export default PdfRender;
