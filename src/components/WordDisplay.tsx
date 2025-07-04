import React from 'react';
import { Card } from '@/components/ui/card';
import { Word, CharacterMap } from '@/data/types';

interface WordDisplayProps {
  word: Word;
  characterMap: CharacterMap;
  isDarkMode?: boolean;
  isMobile?: boolean;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, characterMap, isDarkMode = false, isMobile = false }) => {
  const getCharacterBreakdown = (nativeWord: string) => {
    const characters = Array.from(nativeWord);
    const breakdown: Array<{ char: string; sound: string; description: string }> = [];

    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      let found = false;

      // Check all character categories
      const allCharacters = [
        ...characterMap.vowels,
        ...characterMap.consonants,
        ...characterMap.vowel_diacritics_matras,
        ...characterMap.halant_and_vattulu
      ];

      for (const mappedChar of allCharacters) {
        if (mappedChar.native_char === char) {
          breakdown.push({
            char: char,
            sound: mappedChar.romanized_sound,
            description: mappedChar.description
          });
          found = true;
          break;
        }
      }

      if (!found) {
        breakdown.push({
          char: char,
          sound: char,
          description: "-"
        });
      }
    }

    return breakdown;
  };

  const breakdown = getCharacterBreakdown(word.native);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 sm:space-y-6">
      {/* Main Word Display */}
      <Card className={`p-4 sm:p-8 text-center border-0 shadow-lg ${isDarkMode
        ? 'bg-gradient-to-br from-gray-800 to-gray-700'
        : 'bg-gradient-to-br from-blue-50 to-indigo-50'
        }`}>
        <div className="space-y-2 sm:space-y-4">
          <div className={`text-4xl sm:text-6xl md:text-8xl font-bold mb-2 sm:mb-4 tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
            {word.native}
          </div>
          <div className={`text-xl sm:text-2xl md:text-3xl font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
            {word.romanized}
          </div>
          <div className={`text-lg sm:text-xl md:text-2xl font-light ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
            {word.translation}
          </div>
        </div>
      </Card>

      {/* Character Breakdown */}
      <Card className={`p-4 sm:p-6 border-0 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
        <h3 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
          Character Breakdown
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
          {breakdown.map((item, index) => (
            <div
              key={index}
              className={`p-2 sm:p-4 rounded-lg border hover:shadow-md ${isDarkMode
                ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-gray-600'
                : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100'
                }`}
            >
              <div className="text-center space-y-1 sm:space-y-2">
                <div className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                  {item.char}
                </div>
                <div className={`text-base sm:text-lg font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                  {item.sound || '(silent)'}
                </div>
                <div className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pronunciation Guide - Simplified */}
      <Card className={`p-3 sm:p-4 border overflow-hidden ${isDarkMode
        ? 'bg-green-900 border-green-700'
        : 'bg-green-50 border-green-200'
        }`}>
        <div className="text-center overflow-x-auto">
          <span className={`text-base sm:text-xl font-bold whitespace-nowrap ${isDarkMode ? 'text-green-400' : 'text-green-600'
            }`}>
            {breakdown.map(item => item.sound).join(' + ')}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default WordDisplay;
