function getDoubleQuotes(str: string) {
  const result = /".*?"/g.exec(str);
  console.log(result);
  if (result) {
    return result[0].substring(1, result[0].length - 1);
  }
  return '';
}

export { getDoubleQuotes };
