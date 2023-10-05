import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import "./PDFViewer.css"

// Set the worker source


function PDFViewer({ pdfUrl }) {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;   
  return (
    <div>
      <Document file={pdfUrl}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}

export default PDFViewer;
