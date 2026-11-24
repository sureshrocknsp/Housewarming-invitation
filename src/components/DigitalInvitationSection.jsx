import React, { useState, useRef } from 'react';
import { gruhapravesamConfig } from '../config/gruhapravesamConfig';
import { useLanguage } from '../context/LanguageContext';
import PrintableInvitationCard from './PrintableInvitationCard';
import { downloadCardAsPdf } from '../utils/pdfGenerator';
import { DecorativeDivider } from './TraditionalMotifs';
import {
  Download,
  Share2,
  Copy,
  Check,
  Printer,
  Smartphone,
  FileText,
  Sparkles,
  MessageCircle,
  Eye,
  RefreshCw,
  Maximize2
} from 'lucide-react';

export default function DigitalInvitationSection() {
  const { translations, familyDetails, home, event, venue, slokas, teluguInvitation } = gruhapravesamConfig;
  const { tr, language } = useLanguage();
  const isTeluguDefault = language === 'TE';

  // Preview options
  const [selectedLanguage, setSelectedLanguage] = useState(isTeluguDefault ? 'TE' : 'EN');
  const [selectedFormat, setSelectedFormat] = useState('A5'); // 'A5' | 'A4' | 'MOBILE'
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [generationStatus, setGenerationStatus] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Hidden references for high-res PDF generation
  const teluguCardRef = useRef(null);
  const englishCardRef = useRef(null);
  const previewCardRef = useRef(null);

  // Download Handler for Telugu PDF
  const handleDownloadTeluguPdf = async () => {
    setIsGeneratingPdf(true);
    setGenerationStatus('Generating High-Resolution Telugu PDF (తెలుగు ఆహ్వాన పత్రిక)...');
    try {
      const targetElement = teluguCardRef.current || previewCardRef.current;
      await downloadCardAsPdf(targetElement, {
        format: selectedFormat.toLowerCase(),
        filename: `Gruhapravesam_Invitation_Telugu_${selectedFormat}.pdf`,
        scale: 2.5
      });
      setGenerationStatus('Download Complete!');
      setTimeout(() => setGenerationStatus(''), 3000);
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Could not generate PDF. Please use the Print Direct option.');
      setGenerationStatus('');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Download Handler for English PDF
  const handleDownloadEnglishPdf = async () => {
    setIsGeneratingPdf(true);
    setGenerationStatus('Generating High-Resolution English PDF...');
    try {
      const targetElement = englishCardRef.current || previewCardRef.current;
      await downloadCardAsPdf(targetElement, {
        format: selectedFormat.toLowerCase(),
        filename: `Gruhapravesam_Invitation_English_${selectedFormat}.pdf`,
        scale: 2.5
      });
      setGenerationStatus('Download Complete!');
      setTimeout(() => setGenerationStatus(''), 3000);
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Could not generate PDF. Please use the Print Direct option.');
      setGenerationStatus('');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Download Mobile Story Image (1080x1920 PNG)
  const handleDownloadMobileImage = async () => {
    setIsGeneratingPdf(true);
    setGenerationStatus('Generating 1080×1920 Mobile Story Image...');
    try {
      const targetElement =
        selectedLanguage === 'TE' ? teluguCardRef.current : englishCardRef.current;
      await downloadCardAsPdf(targetElement || previewCardRef.current, {
        format: 'mobile-image',
        filename: `Gruhapravesam_Invitation_${selectedLanguage}_1080x1920.png`,
        scale: 2.5
      });
      setGenerationStatus('Mobile Image Downloaded!');
      setTimeout(() => setGenerationStatus(''), 3000);
    } catch (err) {
      console.error('Image generation error:', err);
      alert('Could not export image. Please try again.');
      setGenerationStatus('');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Share on WhatsApp
  const handleWhatsAppShare = () => {
    const currentUrl = window.location.href.split('#')[0];
    const message = `With immense happiness, we invite you and your family to celebrate the auspicious occasion of our Gruhapravesam.\n\nPlease join us and bless our new home.\n\nWe look forward to welcoming you!\n\nInvitation: ${currentUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Copy Link
  const handleCopyLink = () => {
    const currentUrl = window.location.href.split('#')[0];
    navigator.clipboard.writeText(currentUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <section id="digital-invitation" className="relative py-20 px-4 bg-cream bg-muggu-pattern border-t-2 border-turmeric/40">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-turmeric/20 border border-turmeric text-maroon text-xs font-cinzel font-bold tracking-wider uppercase mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-turmeric-dark" />
            <span>DIGITAL INVITATION & PRINTABLE PDF</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-telugu font-bold text-maroon mb-2">
            డిజిటల్ ఆహ్వాన పత్రిక
          </h2>
          <p className="text-xs sm:text-sm md:text-base font-cinzel font-bold text-antiqueGold tracking-widest uppercase">
            Downloadable High-Quality Telugu & English Invitation Cards
          </p>

          <DecorativeDivider className="my-4 max-w-xs" />
        </div>

        {/* Controls Container */}
        <div className="bg-white/90 border-2 border-turmeric/60 rounded-3xl p-6 sm:p-8 shadow-royal backdrop-blur-sm mb-10 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-turmeric/30">
            {/* 1. Language Toggle */}
            <div className="w-full md:w-auto">
              <label className="block text-xs font-cinzel font-bold uppercase tracking-wider text-maroon mb-2 text-center md:text-left">
                Select Invitation Language:
              </label>
              <div className="flex items-center justify-center md:justify-start gap-2 bg-cream-light p-1 rounded-xl border border-turmeric/40">
                <button
                  type="button"
                  onClick={() => setSelectedLanguage('TE')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold font-telugu transition-all cursor-pointer ${
                    selectedLanguage === 'TE'
                      ? 'bg-maroon text-cream shadow-xs'
                      : 'hover:bg-cream text-maroon-dark'
                  }`}
                >
                  తెలుగు ఆహ్వానం (Telugu)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLanguage('EN')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold font-cinzel tracking-wider transition-all cursor-pointer ${
                    selectedLanguage === 'EN'
                      ? 'bg-maroon text-cream shadow-xs'
                      : 'hover:bg-cream text-maroon-dark'
                  }`}
                >
                  English Invitation
                </button>
              </div>
            </div>

            {/* 2. Format Selector */}
            <div className="w-full md:w-auto">
              <label className="block text-xs font-cinzel font-bold uppercase tracking-wider text-maroon mb-2 text-center md:text-left">
                Print Format:
              </label>
              <div className="flex items-center justify-center md:justify-start gap-2 bg-cream-light p-1 rounded-xl border border-turmeric/40">
                {[
                  { id: 'A5', label: 'A5 Portrait', desc: 'Main Card' },
                  { id: 'A4', label: 'A4 Portrait', desc: 'Printable Sheet' },
                  { id: 'MOBILE', label: '1080×1920', desc: 'Mobile Story' }
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setSelectedFormat(fmt.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-cinzel tracking-wider transition-all cursor-pointer text-center ${
                      selectedFormat === fmt.id
                        ? 'bg-turmeric text-maroon-deep shadow-xs'
                        : 'hover:bg-cream text-maroon-dark'
                    }`}
                  >
                    <span>{fmt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
            {/* Download Telugu PDF */}
            <button
              type="button"
              onClick={handleDownloadTeluguPdf}
              disabled={isGeneratingPdf}
              className="flex-1 min-w-[200px] py-3.5 px-4 rounded-xl bg-gradient-to-r from-maroon to-templeRed hover:from-maroon-dark hover:to-maroon text-cream font-cinzel text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02] border border-turmeric/50 cursor-pointer disabled:opacity-60"
            >
              <Download className="w-4 h-4 text-turmeric" />
              <span>Download Telugu PDF</span>
            </button>

            {/* Download English PDF */}
            <button
              type="button"
              onClick={handleDownloadEnglishPdf}
              disabled={isGeneratingPdf}
              className="flex-1 min-w-[200px] py-3.5 px-4 rounded-xl bg-gradient-to-r from-maroon to-templeRed hover:from-maroon-dark hover:to-maroon text-cream font-cinzel text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02] border border-turmeric/50 cursor-pointer disabled:opacity-60"
            >
              <Download className="w-4 h-4 text-turmeric" />
              <span>Download English PDF</span>
            </button>

            {/* Download Mobile Story Image */}
            <button
              type="button"
              onClick={handleDownloadMobileImage}
              disabled={isGeneratingPdf}
              className="py-3.5 px-4 rounded-xl bg-leafGreen hover:bg-leafGreen-dark text-white font-cinzel text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-60"
              title="Download 1080x1920 PNG for WhatsApp Status or Story"
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile Image (1080×1920)</span>
            </button>

            {/* WhatsApp Share */}
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-cinzel text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Share on WhatsApp</span>
            </button>

            {/* Copy Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="py-3.5 px-4 rounded-xl bg-white border border-turmeric/70 text-maroon font-cinzel text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-xs transition-all hover:bg-cream cursor-pointer"
            >
              {isCopied ? <Check className="w-4 h-4 text-leafGreen" /> : <Copy className="w-4 h-4 text-antiqueGold" />}
              <span>{isCopied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>

            {/* Print Direct */}
            <button
              type="button"
              onClick={() => window.print()}
              className="py-3.5 px-4 rounded-xl bg-white border border-turmeric/70 text-maroon font-cinzel text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-xs transition-all hover:bg-cream cursor-pointer"
              title="Print directly from browser dialog"
            >
              <Printer className="w-4 h-4 text-maroon" />
              <span>Print Direct</span>
            </button>
          </div>

          {/* Progress / Status Notice */}
          {generationStatus && (
            <div className="mt-4 p-3 rounded-xl bg-turmeric/20 border border-turmeric text-maroon text-xs font-poppins text-center flex items-center justify-center gap-2 animate-in fade-in">
              <RefreshCw className="w-4 h-4 animate-spin text-maroon" />
              <span className="font-semibold">{generationStatus}</span>
            </div>
          )}
        </div>

        {/* Live Invitation Card Preview */}
        <div className="mt-8 flex flex-col items-center max-w-full overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-turmeric/20 border border-turmeric text-maroon text-[11px] font-cinzel font-bold uppercase mb-4">
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Preview ({selectedLanguage === 'TE' ? 'Telugu' : 'English'} • {selectedFormat})</span>
          </div>

          <div className="w-full max-w-full overflow-hidden flex justify-center pb-2">
            <div className="transform scale-[0.52] min-[360px]:scale-[0.58] min-[390px]:scale-[0.64] min-[430px]:scale-[0.70] sm:scale-[0.85] md:scale-100 transition-transform origin-top my-1">
              <PrintableInvitationCard
                ref={previewCardRef}
                language={selectedLanguage}
                format={selectedFormat}
              />
            </div>
          </div>
        </div>

        {/* Hidden Elements used for high-res PDF generation */}
        <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none opacity-0">
          <div ref={teluguCardRef}>
            <PrintableInvitationCard language="TE" format={selectedFormat} />
          </div>
          <div ref={englishCardRef}>
            <PrintableInvitationCard language="EN" format={selectedFormat} />
          </div>
        </div>
      </div>
    </section>
  );
}
