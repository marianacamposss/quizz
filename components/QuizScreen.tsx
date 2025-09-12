import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

// Definimos o formato de um objeto de pergunta para reutilizar o tipo
type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

// Definimos o formato exato das props que o componente espera
type QuizScreenProps = {
  currentQuestion: Question;
  selectedOption: string | null;
  isOptionsDisabled: boolean;
  onOptionPress: (option: string) => void;
  onNextQuestion: () => void;
};


// Aplicamos a tipagem aqui na assinatura da função
export default function QuizScreen({
  currentQuestion,
  selectedOption,
  isOptionsDisabled,
  onOptionPress,
  onNextQuestion,
}: QuizScreenProps) {
  // Criamos o valor animado para o feedback de acerto/erro (o X ou o checkmark)
  const feedbackAnim = useRef(new Animated.Value(0)).current;

  // Lógica para tocar os sons
  const playSound = async (isCorrect: boolean) => {
    const soundObject = new Audio.Sound();
    try {
      if (isCorrect) {
        // Carregue e toque o som de acerto
        await soundObject.loadAsync(require('../assets/sounds/som_acerto.mp3'));
      } else {
        // Carregue e toque o som de erro
        await soundObject.loadAsync(require('../assets/sounds/som_erro.wav'));
      }
      await soundObject.playAsync();
    } catch (error) {
      console.log('Erro ao tentar tocar o som:', error);
    }
  };

  // Usa useEffect para animar o feedback quando uma opção é selecionada
  useEffect(() => {
    if (selectedOption) {
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      // Inicia a animação do feedback
      Animated.sequence([
        // Aparece com um "pop"
        Animated.timing(feedbackAnim, {
          toValue: 1, // Escala de 0 a 1
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.5)),
        }),
        // Aguarda um pouco
        Animated.delay(500),
        // Desaparece
        Animated.timing(feedbackAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Toca o som correspondente
      playSound(isCorrect);
    }
  }, [selectedOption, currentQuestion.correctAnswer]);

  const feedbackAnimatedStyle = {
    transform: [{ scale: feedbackAnim }],
    opacity: feedbackAnim,
  };

  const getOptionStyle = (option: string) => {
    if (selectedOption) {
      const isCorrect = option === currentQuestion.correctAnswer;
      if (isCorrect) {
        return styles.correctOption;
      }
      if (option === selectedOption && !isCorrect) {
        return styles.incorrectOption;
      }
    }
    return {};
  };

  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  return (
    <View style={styles.container}>
      {/* Contêiner da animação de feedback, posicionado no centro da tela */}
      <Animated.View style={[styles.feedbackContainer, feedbackAnimatedStyle]}>
        <Text style={isCorrect ? styles.correctIcon : styles.incorrectIcon}>
          {isCorrect ? '✓' : '✗'}
        </Text>
      </Animated.View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, getOptionStyle(option)]}
            onPress={() => onOptionPress(option)}
            disabled={isOptionsDisabled}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedOption && (
        <TouchableOpacity style={styles.nextButton} onPress={onNextQuestion}>
          <Text style={styles.nextButtonText}>Próxima Pergunta</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Container principal da tela de quiz
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#4F46E5",
  },

  // Feedback de resposta (certo ou errado)
  feedbackContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  correctIcon: {
    fontSize: 150,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  incorrectIcon: {
    fontSize: 150,
    fontWeight: "bold",
    color: "#F44336",
  },

  // Container da pergunta
  questionContainer: {
    width: "95%",         // ocupando quase toda a largura
    maxWidth: 400,        // limite máximo
    minHeight: 150,       // altura mínima maior
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },

  // Container das opções de resposta
  optionsContainer: {
    width: "95%",        // opções mais largas
    maxWidth: 400,
    justifyContent: "space-around",
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    color: "#4F46E5",
    fontWeight: "bold",
  },
  correctOption: {
    borderColor: "#4CAF50",
    backgroundColor: "#D4EDDA",
    borderWidth: 2,
  },
  incorrectOption: {
    borderColor: "#F44336",
    backgroundColor: "#F8D7DA",
    borderWidth: 2,
  },

  // Botão de próxima pergunta
  nextButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
