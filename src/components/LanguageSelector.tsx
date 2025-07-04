import React from 'react';
import { Button } from '@/components/ui/button';
import { supportedLanguages } from '@/data/languages';
import { getAvailableLanguages } from '@/data/languageLoader';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (languageCode: string) => void;
  isDarkMode?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  isDarkMode = false
}) => {
  const availableLanguages = getAvailableLanguages();
  const filteredLanguages = supportedLanguages.filter(lang =>
    availableLanguages.includes(lang.code)
  );

  const currentLang = supportedLanguages.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-1 ${isDarkMode
              ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'
              : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50'
            }`}
        >
          <span>{currentLang?.nativeName || 'Select'}</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''}>
        {filteredLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className={`flex flex-col items-start ${currentLanguage === language.code
                ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')
                : ''
              } ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
          >
            <div className="font-medium">{language.nativeName}</div>
            <div className="text-xs opacity-75">{language.name}</div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
