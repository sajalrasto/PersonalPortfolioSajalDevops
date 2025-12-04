/**
 * WhatsApp utility functions
 */

const WHATSAPP_NUMBER = '919097490427'; // Without + sign for wa.me link

/**
 * Opens WhatsApp chat with the specified phone number
 * @param message - Optional pre-filled message
 */
export const openWhatsApp = (message?: string) => {
  const encodedMessage = message ? encodeURIComponent(message) : '';
  const url = `https://wa.me/${WHATSAPP_NUMBER}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
  window.open(url, '_blank');
};

/**
 * Returns WhatsApp URL string
 * @param message - Optional pre-filled message
 */
export const getWhatsAppUrl = (message?: string): string => {
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${WHATSAPP_NUMBER}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
};

