export const removeHtml = (html: string, maxLength: number = 100) => {
  const plainText = html.replace(/<[^>]+>/g, ''); // Remove HTML tags and decode entities
  return plainText.length > maxLength ? plainText.slice(0, maxLength) + '...' : plainText;
};

