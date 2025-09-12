import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import QuizScreen from "../components/QuizScreen";
import questions from "../questions.json";

// Definimos o formato de um objeto de pergunta
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

const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  onPlayAgain,
}) => {
  return (
    <View style={styles.resultContainer}>
      <View style={styles.resultCard}>
        <Text style={styles.resultTitle}>Quiz Finalizado!</Text>
        <Text style={styles.resultText}>
          Sua pontuação é de{" "}
          <Text style={styles.resultHighlight}>{score}</Text> de{" "}
          <Text style={styles.resultHighlight}>{totalQuestions}</Text>.
        </Text>
        <TouchableOpacity style={styles.resultButton} onPress={onPlayAgain}>
          <Text style={styles.resultButtonText}>Jogar Novamente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Props para o componente StartScreen
interface StartScreenProps {
  onStartGame: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <View style={styles.startContainer}>
      <View style={styles.startCard}>
        <Text style={styles.startTitle}>Quiz</Text>
        <Text style={styles.startSubtitle}>Teste seus conhecimentos!</Text>
        <TouchableOpacity style={styles.startButton} onPress={onStartGame}>
          <Text style={styles.startButtonText}>Iniciar Jogo</Text>
        </TouchableOpacity>
      </View>
    </View>
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

  const currentQuestion: Question | null =
    questions.length > 0 ? questions[currentQuestionIndex] : null;

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
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Nenhuma pergunta encontrada. Verifique seu arquivo questions.json.
        </Text>
      </View>
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

const styles = StyleSheet.create({
  // Tela inicial
  startContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#4F46E5",
  },
  startCard: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  startTitle: {
    fontSize: 40,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 12,
  },
  startSubtitle: {
    fontSize: 18,
    color: "#f0f0f0",
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 32,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  startButtonText: {
    color: "#4F46E5",
    fontWeight: "bold",
    fontSize: 18,
  },

  // Tela de resultado
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#7C3AED",
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    maxWidth: 350,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  resultText: {
    fontSize: 20,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  resultHighlight: {
    fontWeight: "900",
    color: "#7C3AED",
  },
  resultButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
    alignItems: "center",
  },
  resultButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  // Tela de erro
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  errorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});
