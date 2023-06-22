// when true, all strings are replaced by '----'
// which means only this string is supposed to be displayed in the UI,
// helping to find strings forgotten from the i18n mecanism
const debugI18n = false;
export const i18n = <T extends object>(r: T): T => {
  if (debugI18n) {
    const n = {} as any;
    Object.keys(r).forEach(k => {
      n[k] = () => '----';
    });
    return n as unknown as T;
  }
  return r;
};
