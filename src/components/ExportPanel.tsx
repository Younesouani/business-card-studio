'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useCardStore } from '@/store/useCardStore';
import { FileDown, Printer, Info, CheckCircle2 } from 'lucide-react';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import DOMPurify from 'dompurify';

export const ExportPanel: React.FC = () => {
  const { cardData } = useCardStore();
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    if (qrCanvasRef.current) {
      QRCode.toCanvas(qrCanvasRef.current, cardData.qrUrl, { width: 180, margin: 1 }, (error) => {
        if (error) console.error(error);
      });
    }
  }, [cardData.qrUrl]);

  const handleExportZip = async () => {
    try {
      const zip = new JSZip();
      const cleanName = DOMPurify.sanitize(cardData.name);
      
      zip.file("card-metadata.json", JSON.stringify({
        name: cleanName,
        title: DOMPurify.sanitize(cardData.title),
        phone: DOMPurify.sanitize(cardData.phone),
        email: DOMPurify.sanitize(cardData.email),
        accent: cardData.accentTheme
      }, null, 2));
      
      if (qrCanvasRef.current) {
        const qrDataUrl = qrCanvasRef.current.toDataURL("image/png");
        zip.file("assets/qr-code.png", qrDataUrl.split(',')[1], { base64: true });
      }

      zip.file("PRINT-SPECIFICATIONS.txt", `Format: 3.5" x 2"\nPaper Stock: Matte Black Soft Touch (350+ GSM)\nFinish: Foil Stamping.`);
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${cleanName.toLowerCase().replace(/\s+/g, '-')}-print-pack.zip`);
      showToast("Print package successfully generated!");
    } catch (err) {
      showToast("Error bundling production files.");
    }
  };

  return (
    <div className="space-y-4 w-full">
      <canvas ref={qrCanvasRef} className="hidden" />
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-4">
        <h4 className="text-sm font-semibold text-zinc-200 font-montserrat">Production Export Center</h4>
        <div className="grid grid-cols-1 gap-3">
          <button onClick={handleExportZip} className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 font-montserrat">
            <FileDown className="w-4 h-4" /> Download Print Package (.ZIP)
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => window.print()} className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl border border-zinc-800 flex items-center justify-center gap-1.5 font-montserrat">
              <Printer className="w-3.5 h-3.5" /> Print Guide
            </button>
            <button onClick={() => setShowModal(true)} className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl border border-zinc-800 flex items-center justify-center gap-1.5 font-montserrat">
              <Info className="w-3.5 h-3.5" /> Design Tips
            </button>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-zinc-800 text-zinc-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-[#121212] border border-zinc-800 max-w-lg w-full rounded-2xl p-6 relative" onClick={e => e.stopPropagation()}>
            <h3 className="text-sm font-semibold text-zinc-100 font-montserrat uppercase tracking-wider mb-2">Printing Directives</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">Request your print house use Matte Black Premium Soft Touch Paper Stock (350+ GSM) with custom localized Foil Stamping.</p>
          </div>
        </div>
      )}
    </div>
  );
};

