
import { LanguageData } from './types';
import { teluguData } from './languages/telugu';
import { hindiData } from './languages/hindi';
import { tamilData } from './languages/tamil';
import { kannadaData } from './languages/kannada';

const languageDataMap: Record<string, LanguageData> = {
  'te': teluguData,
  'hi': hindiData,
  'ta': tamilData,
  'kn': kannadaData,
};

export const getLanguageData = (languageCode: string): LanguageData => {
  return languageDataMap[languageCode] || teluguData;
};

export const getAvailableLanguages = (): string[] => {
  return Object.keys(languageDataMap);
};
