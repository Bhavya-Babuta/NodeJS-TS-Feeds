export function getDoubleQuotedString(str: string) {
  const result = /".*?"/g.exec(str);
  return result ? result[0].substring(1, result[0].length - 1) : '';
}
