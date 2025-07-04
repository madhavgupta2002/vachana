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
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  currentIndex,
  totalWords,
  onRandomize,
  onPrevious,
  onNext,
  onSequentialMode,
  isSequentialMode,
  isDarkMode = false
}) => {
  return (
    <Card className={`p-6 border-0 shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex flex-col space-y-4">
        {/* Mode Toggle */}
        <div className="flex justify-center">
          <Button
            onClick={onSequentialMode}
            variant={isSequentialMode ? "default" : "outline"}
            className={`px-6 py-2 text-sm font-medium ${isDarkMode && !isSequentialMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''
              }`}
          >
            {isSequentialMode ? "Sequential Mode" : "Random Mode"}
          </Button>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center space-x-4">
          {isSequentialMode ? (
            <>
              <Button
                onClick={onPrevious}
                disabled={currentIndex === 0}
                variant="outline"
                size="lg"
                className={`flex items-center space-x-2 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700 disabled:text-gray-500' : ''
                  }`}
              >
                <ArrowLeft size={20} />
                <span>Previous</span>
              </Button>

              <div className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {currentIndex + 1} of {totalWords}
                </span>
              </div>

              <Button
                onClick={onNext}
                disabled={currentIndex === totalWords - 1}
                variant="outline"
                size="lg"
                className={`flex items-center space-x-2 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700 disabled:text-gray-500' : ''
                  }`}
              >
                <span>Next</span>
                <ArrowRight size={20} />
              </Button>
            </>
          ) : (
            <Button
              onClick={onRandomize}
              size="lg"
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Shuffle size={20} />
              <span>Random Word</span>
            </Button>
          )}
        </div>

        {/* Progress indicator for sequential mode */}
        {isSequentialMode && (
          <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              style={{ width: `${((currentIndex + 1) / totalWords) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Random button at the bottom in sequential mode */}
        {isSequentialMode && (
          <div className="flex justify-center mt-2">
            <Button
              onClick={onRandomize}
              variant="outline"
              className={`flex items-center space-x-2 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''
                }`}
            >
              <Shuffle size={16} />
              <span>Jump to Random Word</span>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ControlPanel;
