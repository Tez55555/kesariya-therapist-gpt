export const addPauses = (text) => {
    return text.replace(/\\./g, '. [pause] ');
  };
  