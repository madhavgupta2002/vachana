import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import WordDisplay from '@/components/WordDisplay';
import ControlPanel from '@/components/ControlPanel';
import LanguageSelector from '@/components/LanguageSelector';
import { getLanguageData } from '@/data/languageLoader';
import { getLanguageByCode, supportedLanguages } from '@/data/languages';
import { Word, LanguageData } from '@/data/types';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState('te');
  const [languageData, setLanguageData] = useState<LanguageData>(getLanguageData('te'));
  const [currentWord, setCurrentWord] = useState<Word>(languageData.words[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSequentialMode, setIsSequentialMode] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    const newLanguageData = getLanguageData(languageCode);
    setCurrentLanguage(languageCode);
    setLanguageData(newLanguageData);

    const safeIndex = Math.min(currentIndex, newLanguageData.words.length - 1);
    setCurrentIndex(safeIndex);
    setCurrentWord(newLanguageData.words[safeIndex]);
  };

  const toggleLanguage = () => {
    const availableLanguages = supportedLanguages.map(lang => lang.code);
    const currentIndex = availableLanguages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % availableLanguages.length;
    handleLanguageChange(availableLanguages[nextIndex]);
  };

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * languageData.words.length);
    setCurrentWord(languageData.words[randomIndex]);
    setCurrentIndex(randomIndex);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentWord(languageData.words[newIndex]);
    }
  };

  const goToNext = () => {
    if (currentIndex < languageData.words.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentWord(languageData.words[newIndex]);
    }
  };

  const toggleMode = () => {
    setIsSequentialMode(!isSequentialMode);
    if (!isSequentialMode) {
      setCurrentIndex(0);
      setCurrentWord(languageData.words[0]);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isSequentialMode) {
        if (event.key === 'ArrowLeft') {
          goToPrevious();
        } else if (event.key === 'ArrowRight') {
          goToNext();
        }
      }

      if (event.key === 'k') {
        toggleLanguage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, isSequentialMode, languageData.words, currentLanguage]);

  useEffect(() => {
    if (languageData.words.length > 0) {
      const safeIndex = Math.min(currentIndex, languageData.words.length - 1);
      setCurrentIndex(safeIndex);
      setCurrentWord(languageData.words[safeIndex]);
    }
  }, [languageData]);

  const currentLanguageInfo = getLanguageByCode(currentLanguage);

  return (
    <div className={`min-h-screen ${isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      : 'bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100'
      }`}>
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-full overflow-hidden">
        <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-center mb-4 sm:mb-8`}>
          <div className={`text-center ${isMobile ? 'w-full mb-4' : 'flex-1'}`}>
            <h1 className={`indic-title text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Vachana
            </h1>
          </div>
          <div className={`flex items-center ${isMobile ? 'w-full justify-between' : ''}`}>
            <div className="mr-4">
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
                isDarkMode={isDarkMode}
              />
            </div>
            <Button
              onClick={toggleDarkMode}
              variant="outline"
              size="icon"
              className={`${isDarkMode
                ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'
                : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50'
                }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-8">
          <WordDisplay
            word={currentWord}
            characterMap={languageData.characterMap}
            isDarkMode={isDarkMode}
            isMobile={isMobile}
          />

          <ControlPanel
            currentIndex={currentIndex}
            totalWords={languageData.words.length}
            onRandomize={getRandomWord}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onSequentialMode={toggleMode}
            isSequentialMode={isSequentialMode}
            isDarkMode={isDarkMode}
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
