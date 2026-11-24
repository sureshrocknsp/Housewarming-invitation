import QRCode from 'qrcode';

/**
 * Generate a high-resolution QR code data URL (PNG)
 * for the digital Gruhapravesam invitation website.
 *
 * @param {string} url - Target URL (e.g. website address or Google Maps location)
 * @param {Object} options - QR options
 * @returns {Promise<string>} Data URL string
 */
export async function generateQrCode(url, options = {}) {
  const targetUrl = url || (typeof window !== 'undefined' ? window.location.href.split('#')[0] : 'https://gruhapravesam.local');

  try {
    const dataUrl = await QRCode.toDataURL(targetUrl, {
      width: options.width || 360,
      margin: options.margin ?? 1,
      color: {
        dark: options.darkColor || '#641E16', // Deep Maroon
        light: options.lightColor || '#FFFDF7' // Parchment cream
      },
      errorCorrectionLevel: 'H'
    });
    return dataUrl;
  } catch (err) {
    console.error('Failed to generate QR Code:', err);
    return null;
  }
}
