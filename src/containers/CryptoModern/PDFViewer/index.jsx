import React, { useState, useCallback, useEffect } from 'react';

// import default react-pdf entry
import { Document, Page, pdfjs } from 'react-pdf';
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from '../../../../pdf-worker';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PDFViewer() {
  const [file, setFile] = useState('../../../../assets/docs/Utopia_Whitepaper.pdf');
  const [pageWidth, setPageWidth] = useState(1000);
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  const setPDFWidth = useCallback(() => {
    let windowWidth = window.innerWidth;
    if (windowWidth > 1000) {
      windowWidth = 750;
    } else {
      windowWidth *= 0.9;
    }
    setPageWidth(windowWidth);
  });

  useEffect(() => {
    setPDFWidth();
    window.addEventListener('resize', setPDFWidth);
    return () => {
      window.removeEventListener('resize', setPDFWidth);
    };
  }, []);

  return (
    <>
      <div className="greyedBackground" />
      <div className="whitePaperContainer">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              width={pageWidth}
            />
          ))}
        </Document>
      </div>
    </>
  );
}
