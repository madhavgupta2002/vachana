import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shuffle, ArrowLeft, ArrowRight } from 'lucide-react';

interface ControlPanelProps {
  currentIndex: number;
  totalWords: number;
  onRandomize: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSequentialMode: () => void;
  isSequentialMode: boolean;
  isDarkMode?: boolean;
  isMobile?: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  currentIndex,
  totalWords,
  onRandomize,
  onPrevious,
  onNext,
  onSequentialMode,
  isSequentialMode,
  isDarkMode = false,
  isMobile = false
}) => {
  return (
    <Card className={`p-4 sm:p-6 border-0 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex flex-col space-y-3 sm:space-y-4">
        {/* Mode Toggle */}
        <div className="flex justify-center">
          <Button
            onClick={onSequentialMode}
            variant={isSequentialMode ? "default" : "outline"}
            className={`px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm font-medium ${isDarkMode && !isSequentialMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''
              }`}
          >
            {isSequentialMode ? "Sequential Mode" : "Random Mode"}
          </Button>
        </div>

        {/* Navigation Controls */}
        <div className={`flex justify-center items-center ${isMobile ? 'space-x-2' : 'space-x-4'}`}>
          {isSequentialMode ? (
            <>
              <Button
                onClick={onPrevious}
                disabled={currentIndex === 0}
                variant="outline"
                size={isMobile ? "default" : "lg"}
                className={`flex items-center ${isMobile ? 'space-x-1 px-2 py-1 text-xs' : 'space-x-2'} ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700 disabled:text-gray-500' : ''
                  }`}
              >
                <ArrowLeft size={isMobile ? 16 : 20} />
                <span>{isMobile ? "Prev" : "Previous"}</span>
              </Button>

              <div className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {currentIndex + 1} of {totalWords}
                </span>
              </div>

              <Button
                onClick={onNext}
                disabled={currentIndex === totalWords - 1}
                variant="outline"
                size={isMobile ? "default" : "lg"}
                className={`flex items-center ${isMobile ? 'space-x-1 px-2 py-1 text-xs' : 'space-x-2'} ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700 disabled:text-gray-500' : ''
                  }`}
              >
                <span>{isMobile ? "Next" : "Next"}</span>
                <ArrowRight size={isMobile ? 16 : 20} />
              </Button>
            </>
          ) : (
            <Button
              onClick={onRandomize}
              size={isMobile ? "default" : "lg"}
              className={`flex items-center ${isMobile ? 'space-x-1 text-xs' : 'space-x-2'} bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700`}
            >
              <Shuffle size={isMobile ? 16 : 20} />
              <span>Random Word</span>
            </Button>
          )}
        </div>

        {/* Progress indicator for sequential mode */}
        {isSequentialMode && (
          <div className={`w-full rounded-full h-1.5 sm:h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 sm:h-2 rounded-full"
              style={{ width: `${((currentIndex + 1) / totalWords) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Random button at the bottom in sequential mode */}
        {isSequentialMode && (
          <div className="flex justify-center mt-1 sm:mt-2">
            <Button
              onClick={onRandomize}
              variant="outline"
              size={isMobile ? "sm" : "default"}
              className={`flex items-center ${isMobile ? 'space-x-1 text-xs' : 'space-x-2'} ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''
                }`}
            >
              <Shuffle size={isMobile ? 14 : 16} />
              <span>{isMobile ? "Random" : "Jump to Random Word"}</span>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ControlPanel;
