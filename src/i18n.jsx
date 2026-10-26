import { createContext, useContext, useMemo } from 'react';
import * as en from './data.js';
import * as ar from './data.ar.js';

// Two languages, one site. English lives at `/…`, Arabic at `/ar/…`, and the
// page under each is the same component reading the same keys from the copy
// of its language. The direction of the page follows the language.

export const LOCALES = {
  en: { code: 'en', dir: 'ltr', prefix: '', copy: en, title: 'Marhab AI. Every customer who reaches out, answered.', description: en.hero.sub },
  ar: { code: 'ar', dir: 'rtl', prefix: '/ar', copy: ar, title: 'Marhab AI. كل عميل يتواصل معك، يجد رداً.', description: ar.hero.sub },
};

const Ctx = createContext(LOCALES.en);

export function LocaleProvider({ locale, children }) {
  const value = useMemo(() => LOCALES[locale] ?? LOCALES.en, [locale]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** The current locale record: { code, dir, prefix, copy }. */
export function useLocale() {
  return useContext(Ctx);
}

/** The copy of the current language, same keys as data.js. */
export function useCopy() {
  return useContext(Ctx).copy;
}

const EXTERNAL = /^(https?:|mailto:|tel:|#)/;

/** An internal path, prefixed for the locale. External links and anchors pass through. */
export function localize(path, code) {
  if (!path || EXTERNAL.test(path)) return path;
  const prefix = LOCALES[code]?.prefix ?? '';
  if (!prefix) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  return p === '/' ? prefix : `${prefix}${p}`;
}

export function useLocalize() {
  const { code } = useLocale();
  return (path) => localize(path, code);
}

/** Strip a locale prefix from a pathname: '/ar/work' → '/work', '/ar' → '/'. */
export function stripLocale(pathname) {
  if (pathname === '/ar') return '/';
  if (pathname.startsWith('/ar/')) return pathname.slice(3);
  return pathname;
}

/** The same page in the other language. */
export function counterpart(pathname, code) {
  const bare = stripLocale(pathname);
  return localize(bare, code === 'ar' ? 'en' : 'ar');
}
