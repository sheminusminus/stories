export const getParagraphs = (text) => {
  const startMatch = /<p>/g;
  const endMatch = /<\/p>/g;

  const paragraphs = text.split(endMatch);

  return paragraphs.map(p => p.replace(startMatch, '')).filter(p => !!p);
};

export const endsWith2xNewline = str => str.endsWith('\n\n');
