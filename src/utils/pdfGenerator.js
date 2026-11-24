import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

/**
 * High-Quality PDF & Digital Invitation Image Generator
 * ======================================================
 * Renders HTML DOM with Telugu Unicode typography (Noto Serif Telugu)
 * into razor-sharp 300+ DPI PDF documents (A5, A4) or 1080x1920 Mobile Story image.
 */
export async function downloadCardAsPdf(element, options = {}) {
  const {
    format = 'a5', // 'a5' | 'a4' | 'mobile' | 'mobile-image'
    filename = 'Gruhapravesam_Invitation.pdf',
    scale = 2.5
  } = options;

  if (!element) {
    throw new Error('Target element for PDF generation was not found.');
  }

  // 1. Wait a moment to ensure fonts & images are fully rendered
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  // 2. Convert DOM element to crisp PNG data URL
  const dataUrl = await toPng(element, {
    quality: 0.98,
    pixelRatio: scale,
    cacheBust: true,
    style: {
      transform: 'none',
      margin: '0',
      boxShadow: 'none'
    },
    filter: (node) => {
      // Exclude interactive buttons or items marked with no-print
      if (node.classList && (node.classList.contains('no-print') || node.classList.contains('no-pdf'))) {
        return false;
      }
      return true;
    }
  });

  // 3. Mobile Image Download (PNG for WhatsApp status / story)
  if (format === 'mobile-image') {
    const link = document.createElement('a');
    link.download = filename.endsWith('.png') ? filename : `${filename.replace(/\.pdf$/i, '')}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // 4. PDF Generation with exact ISO physical page sizes (in mm)
  let pdfWidth, pdfHeight, orientation;
  if (format === 'a5') {
    pdfWidth = 148;
    pdfHeight = 210;
    orientation = 'portrait';
  } else if (format === 'a4') {
    pdfWidth = 210;
    pdfHeight = 297;
    orientation = 'portrait';
  } else if (format === 'mobile') {
    pdfWidth = 108;
    pdfHeight = 192; // 9:16 aspect ratio
    orientation = 'portrait';
  } else {
    pdfWidth = 148;
    pdfHeight = 210;
    orientation = 'portrait';
  }

  const pdf = new jsPDF({
    orientation,
    unit: 'mm',
    format: format === 'mobile' ? [pdfWidth, pdfHeight] : format,
    compress: true
  });

  pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
  pdf.save(filename);
}
