const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
  zh: () => import('@/dictionaries/zh.json').then((module) => module.default), 
};

export const getDictionary = async (lang: string) => {
  const locale = (dictionaries.hasOwnProperty(lang) ? lang : 'en') as keyof typeof dictionaries;
  
  return dictionaries[locale]();
};