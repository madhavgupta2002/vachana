import { LanguageData } from './types';
import { teluguData } from './languages/telugu';
import { hindiData } from './languages/hindi';
import { tamilData } from './languages/tamil';
import { kannadaData } from './languages/kannada';
import { marathiData } from './languages/marathi';
import { malayalamData } from './languages/malayalam';
import { gujaratiData } from './languages/gujarati';
import { bengaliData } from './languages/bengali';
import { punjabiData } from './languages/punjabi';

const languageDataMap: Record<string, LanguageData> = {
  'te': teluguData,
  'hi': hindiData,
  'ta': tamilData,
  'kn': kannadaData,
  'mr': marathiData,
  'gu': gujaratiData,
  'bn': bengaliData,
  'pa': punjabiData,
  'ml': malayalamData,
};

export const getLanguageData = (languageCode: string): LanguageData => {
  return languageDataMap[languageCode] || teluguData;
};

export const getAvailableLanguages = (): string[] => {
  return Object.keys(languageDataMap);
};
