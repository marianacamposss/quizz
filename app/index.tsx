import React, { useState } from 'react';
import QuizScreen from '../components/QuizScreen';
import questions from '../questions.json';

// Definimos o formato de um objeto de pergunta para reutilizar o tipo
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

// Props para o componente ResultScreen
interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
}

// O componente ResultScreen foi adaptado para a web.
const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, onPlayAgain }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Finalizado!</h2>
        <p className="text-xl text-gray-600 mb-6">
          Sua pontuação é de <span className="font-extrabold text-purple-600">{score}</span> de <span className="font-extrabold text-purple-600">{totalQuestions}</span>.
        </p>
        <button
          onClick={onPlayAgain}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          Jogar Novamente
        </button>
      </div>
    </div>
  );
};

// Props para o componente StartScreen
interface StartScreenProps {
  onStartGame: () => void;
}

// Componente para a tela inicial
const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-4">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-5xl font-extrabold mb-4">Quiz</h1>
        <p className="text-xl mb-8">Teste seus conhecimentos!</p>
        <button
          onClick={onStartGame}
          className="bg-white text-indigo-600 font-bold py-4 px-10 rounded-full shadow-lg transition transform hover:scale-105 duration-300"
        >
          Iniciar Jogo
        </button>
      </div>
    </div>
  );
};

// Componente principal App
export default function App() {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  const currentQuestion: Question | null = questions.length > 0 ? questions[currentQuestionIndex] : null;

  const handleOptionPress = (option: string) => {
    if (currentQuestion && option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(option);
    setIsOptionsDisabled(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsOptionsDisabled(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handlePlayAgain = () => {
    setIsQuizFinished(false);
    setIsGameStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setScore(0);
  };

  if (!isGameStarted) {
      return <StartScreen onStartGame={() => setIsGameStarted(true)} />;
  }

  if (isQuizFinished) {
    return (
      <ResultScreen
        score={score}
        totalQuestions={questions.length}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800">Nenhuma pergunta encontrada. Verifique seu arquivo questions.json.</h1>
      </div>
    );
  }

  return (
    <QuizScreen
      currentQuestion={currentQuestion}
      selectedOption={selectedOption}
      isOptionsDisabled={isOptionsDisabled}
      onOptionPress={handleOptionPress}
      onNextQuestion={handleNextQuestion}
    />
  );
}
