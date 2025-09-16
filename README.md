# 🧠 Quiz App
Um aplicativo de quiz interativo e divertido, construído com React Native e TypeScript, que permite aos usuários testar seus conhecimentos através de perguntas dinâmicas e uma interface intuitiva.


## 🌟 Recursos Principais
### Fluxo de Jogo Completo: 
A tela inicial dá as boas-vindas ao usuário, a tela do quiz exibe as perguntas e, ao final, uma tela de resultados mostra a pontuação.
<img width="1800" height="789" alt="image" src="https://github.com/user-attachments/assets/4affa483-5f9f-41e2-b11f-8f90490db417" />
### Feedback Visual e Sonoro:
A cada resposta, o app exibe um feedback visual (✓ para acerto, ✗ para erro) e toca um som correspondente, tornando a experiência mais envolvente.

<img width="400" height="750" alt="image" src="https://github.com/user-attachments/assets/e3890feb-0c63-4c42-9c7c-c1e864f160f5" /> <img width="420" height="750" alt="image" src="https://github.com/user-attachments/assets/e1ae93cb-df38-48d2-90c4-5dbe8af62667" />

### Design Responsivo:
A interface é simples, limpa e se adapta a diferentes tamanhos de tela.

<img width="1000" height="750" alt="image" src="https://github.com/user-attachments/assets/c658e595-5b5d-4791-aa3e-a2c4c7093fdc" />

### Tipagem com TypeScript:
O uso de TypeScript garante um código mais robusto e fácil de manter, identificando erros de tipo durante o desenvolvimento

### Perguntas Dinâmicas:
As perguntas são carregadas de um arquivo questions.json, permitindo a fácil adição ou edição de novas perguntas sem alterar a lógica do código.

<p align="center">
  <img src="https://github.com/user-attachments/assets/7f28c399-46dd-4518-9a4d-e00554ada769" alt="image" width="500" height="780" />
</p>

## 🛠️ Tecnologias Utilizadas
### React Native:
O framework para desenvolvimento do aplicativo.

### Expo: 
Facilitando o desenvolvimento, teste e build do app.

### TypeScript:
Garantindo um código mais seguro e escalável.

expo-av: Para reproduzir os sons de acerto e erro.

## 📂 Estrutura do Projeto
O projeto é organizado de forma modular, separando a lógica de exibição em diferentes componentes:

### App.tsx: 
O componente principal que gerencia o estado do jogo (tela inicial, quiz e resultados) e a navegação entre as telas.

### components/QuizScreen.tsx:
O componente responsável por renderizar a pergunta atual e as opções de resposta, incluindo a lógica de feedback visual e sonoro.

### components/ResultScreen.tsx:
Exibe a pontuação final do jogador e um botão para jogar novamente.

### questions.json:
Onde as perguntas, opções e respostas corretas são armazenadas.

## 🚀 Como Executar o Projeto
Siga os passos abaixo para rodar o aplicativo no seu ambiente local.

### Pré-requisitos
Certifique-se de ter o Node.js e o npm (ou yarn) instalados.

Clone o repositório:

Bash

git clone [https://github.com/marianacamposss/quizz.git]

cd [pasta-do-projeto]

Instale as dependências:

Bash

npm install
ou
yarn install
Adicione os arquivos de som:
Coloque os arquivos de som (som_acerto.mp3 e som_erro.wav) na pasta assets/sounds.

Inicie o projeto:

Bash

npx expo start
Acesse o aplicativo:

Leia o QR code com o aplicativo Expo Go no seu celular.

Ou pressione a para rodar em um emulador Android ou i para um emulador iOS.

### Feito por Mariana Meirelles de Campos
