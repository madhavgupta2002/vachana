
export interface Word {
  id: number;
  native: string;
  romanized: string;
  translation: string;
}

export interface Character {
  native_char: string;
  romanized_sound: string;
  type: string;
  description: string;
}

export interface CharacterMap {
  vowels: Character[];
  consonants: Character[];
  vowel_diacritics_matras: Character[];
  halant_and_vattulu: Character[];
}

export interface LanguageData {
  words: Word[];
  characterMap: CharacterMap;
}
