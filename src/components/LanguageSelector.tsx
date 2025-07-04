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
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
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
          className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm ${isDarkMode
            ? 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'
            : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50'
            }`}
        >
          <span>{currentLang?.nativeName || 'Select'}</span>
          <ChevronDown size={isMobile ? 14 : 16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={`${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''} max-h-60 overflow-y-auto`}>
        {filteredLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className={`flex flex-col items-start py-2 ${currentLanguage === language.code
              ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')
              : ''
              } ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
          >
            <div className="font-medium text-sm sm:text-base">{language.nativeName}</div>
            <div className="text-xs opacity-75">{language.name}</div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
