export const chunkText = (text, chunkSize = 500) => {
  const words = text.split(" ");
  const chunks = [];

  let current = [];

  for (const word of words) {
    current.push(word);
    if (current.length >= chunkSize) {
      chunks.push(current.join(" "));
      current = [];
    }
  }

  if (current.length) {
    chunks.push(current.join(" "));
  }

  return chunks;
};
