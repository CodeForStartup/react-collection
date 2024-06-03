"use client";
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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const PDF = () => {
  const pdfRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    const cloneHTML = pdfRef?.current?.cloneNode(true) as HTMLDivElement;
    // cloneHTML.style.fontFamily = CONTAINER_STYLE.fontFamily;
    cloneHTML.style.letterSpacing = "0.01px";

    const doc = new jsPDF();

    const { default: fontRegular } = await import(
      "./NotoSansJP-Regular-normal"
    );
    const { default: fontBold } = await import("./NotoSansJP-Bold-bold");

    doc.addFileToVFS("NotoSansJP-Regular-normal.ttf", fontRegular);
    doc.addFileToVFS("NotoSansJP-Bold-bold.ttf", fontBold);
    doc.addFont("NotoSansJP-Regular-normal.ttf", "NotoSansJP", "normal");
    doc.addFont("NotoSansJP-Bold-bold.ttf", "NotoSansJP", "bold");
    doc.setFont("NotoSansJP");

    await doc.html(cloneHTML, {
      width: 170,
      margin: [9, 20, 11.5, 20],
      autoPaging: "text",
      windowWidth: 1024,
      html2canvas: {
        windowWidth: 1024,
        allowTaint: true,
        useCORS: true,
        ignoreElements: (e) => {
          // https://github.com/niklasvh/html2canvas/issues/3053
          // set Image loading from lazy to eager
          if (
            e.tagName === "a" ||
            e.getAttribute("loading") === "lazy" ||
            e.id === "ignore"
          ) {
            return true;
          } else {
            return false;
          }
        },
      },
      callback: (pdf) => {
        console.log(pdf);
      },
    });

    const pdfBlob = doc.output("blob");

    const numberOfPages = doc.internal.pages.length || 1;
    for (let i = 1; i < numberOfPages; i++) {
      doc.setPage(i);
      doc.setFontSize(16);
      doc.setLineHeightFactor(1.2);

      doc.text(
        `${i} / ${numberOfPages - 1}`,
        doc.internal.pageSize.width - 11,
        doc.internal.pageSize.height - 5,
        {
          charSpace: -0.4,
        }
      );
    }

    const blob = new Blob([pdfBlob], {
      type: "application/octet-stream",
    });

    const reader = new FileReader();
    reader.onload = function () {
      const aTag = document.createElement("a");
      document.body.appendChild(aTag);
      aTag.style.cssText = "display: none";
      aTag.href = String(reader?.result);
      aTag.download = "pdf.pdf";
      aTag.click();
      aTag.id = "id-pdf";
    };
    reader.readAsDataURL(blob);
  };

  const downloadPdf = () => {
    generatePDF();
  };

  const zipAndDownloadPdf = () => {
    //
  };

  return (
    <div>
      <div className="gap-4 flex mt-20">
        <Button onClick={downloadPdf}>
          <Download className="mr-2" size="16" />
          Generate PDF
        </Button>
        <Button onClick={zipAndDownloadPdf}>
          <Download className="mr-2" size="16" />
          Zip PDF
        </Button>
      </div>
      <div className="mt-5 border p-20" ref={pdfRef}>
        <p className="scroll-m-20 text-lg">
          This is a simple example of how to convert HTML to PDF using jsPDF and
          html2canvas.
        </p>
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export { PDF };
