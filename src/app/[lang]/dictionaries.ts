const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
};

export const getDictionary = async (lang: string) => {
  const locale = lang === 'es' ? 'es' : 'en';
  
  return dictionaries[locale]();
};