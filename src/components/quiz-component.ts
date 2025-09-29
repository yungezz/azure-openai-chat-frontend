import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  description: string;
  questions: QuizQuestion[];
}

@customElement('quiz-component')
export class QuizComponent extends LitElement {
  static override styles = css`
    .quiz-container {
      max-width: 700px;
      margin: 0 auto;
      padding: 1rem;
    }

    .quiz-header {
      background: var(--form-background-color, #ffffff);
      border: 2px solid var(--accent-light, #dbeafe);
      border-radius: var(--border-radius, 12px);
      padding: 1.5rem;
      margin-bottom: 2rem;
      text-align: center;
    }

    .quiz-title {
      color: var(--accent-high, #2563eb);
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .quiz-progress {
      margin: 1rem 0;
      font-weight: 600;
      color: var(--text-color, #1f2937);
    }

    .question-card {
      background: var(--form-background-color, #ffffff);
      border: 2px solid var(--accent-light, #dbeafe);
      border-radius: var(--border-radius, 12px);
      padding: 2rem;
      margin-bottom: 1rem;
    }

    .question-text {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-color, #1f2937);
      margin-bottom: 1.5rem;
    }

    .options-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .option-button {
      padding: 1rem;
      border: 2px solid var(--accent-light, #dbeafe);
      border-radius: var(--border-radius, 12px);
      background: var(--form-background-color, #ffffff);
      color: var(--text-color, #1f2937);
      cursor: pointer;
      text-align: left;
      transition: all 0.2s ease;
    }

    .option-button:hover {
      border-color: var(--accent-high, #2563eb);
    }

    .option-button.selected {
      border-color: var(--accent-high, #2563eb);
      background: var(--accent-light, #dbeafe);
    }

    .option-button.correct {
      border-color: #10b981;
      background: #d1fae5;
      color: #065f46;
    }

    .option-button.incorrect {
      border-color: #ef4444;
      background: #fee2e2;
      color: #991b1b;
    }

    .explanation {
      background: var(--accent-light, #dbeafe);
      border-radius: var(--border-radius, 12px);
      padding: 1rem;
      margin-top: 1rem;
      color: var(--text-color, #1f2937);
    }

    .quiz-actions {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      margin-top: 2rem;
    }

    .quiz-button {
      padding: 0.75rem 1.5rem;
      border: 2px solid var(--accent-high, #2563eb);
      border-radius: var(--border-radius, 12px);
      background: var(--accent-high, #2563eb);
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .quiz-button:hover {
      background: var(--accent-dark, #1d4ed8);
    }

    .quiz-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .quiz-results {
      text-align: center;
      background: var(--form-background-color, #ffffff);
      border: 2px solid var(--accent-light, #dbeafe);
      border-radius: var(--border-radius, 12px);
      padding: 2rem;
    }

    .score-display {
      font-size: 2rem;
      font-weight: 700;
      color: var(--accent-high, #2563eb);
      margin-bottom: 1rem;
    }
  `;

  @property({ type: Object })
  quiz: Quiz | null = null;

  @state()
  currentQuestionIndex: number = 0;

  @state()
  selectedAnswer: number | null = null;

  @state()
  showExplanation: boolean = false;

  @state()
  userAnswers: number[] = [];

  @state()
  quizCompleted: boolean = false;

  get currentQuestion(): QuizQuestion | null {
    return this.quiz?.questions[this.currentQuestionIndex] || null;
  }

  get score(): number {
    if (!this.quiz) return 0;
    const correct = this.userAnswers.filter((answer, index) => 
      answer === this.quiz!.questions[index].correctAnswer
    ).length;
    return Math.round((correct / this.quiz.questions.length) * 100);
  }

  selectAnswer(optionIndex: number) {
    if (this.showExplanation) return;
    this.selectedAnswer = optionIndex;
  }

  submitAnswer() {
    if (this.selectedAnswer === null) return;
    
    this.userAnswers[this.currentQuestionIndex] = this.selectedAnswer;
    this.showExplanation = true;
    this.requestUpdate();
  }

  nextQuestion() {
    if (this.currentQuestionIndex < (this.quiz?.questions.length || 0) - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
      this.showExplanation = false;
    } else {
      this.quizCompleted = true;
      this.dispatchQuizCompletedEvent();
    }
    this.requestUpdate();
  }

  dispatchQuizCompletedEvent() {
    const event = new CustomEvent('quiz-completed', {
      detail: {
        quiz: this.quiz,
        score: this.score,
        userAnswers: this.userAnswers
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  override render() {
    if (!this.quiz) {
      return html`<div class="quiz-container"><p>No quiz available.</p></div>`;
    }

    if (this.quizCompleted) {
      return html`
        <div class="quiz-container">
          <div class="quiz-results">
            <h2>Quiz Complete! 🎉</h2>
            <div class="score-display">${this.score}%</div>
            <p>You got ${this.userAnswers.filter((answer, index) => 
              answer === this.quiz!.questions[index].correctAnswer
            ).length} out of ${this.quiz.questions.length} questions correct!</p>
            <button class="quiz-button" @click="${() => location.reload()}">
              Take Another Quiz
            </button>
          </div>
        </div>
      `;
    }

    const question = this.currentQuestion!;
    const isCorrect = this.selectedAnswer === question.correctAnswer;

    return html`
      <div class="quiz-container">
        <div class="quiz-header">
          <h1 class="quiz-title">${this.quiz.title}</h1>
          <div class="quiz-progress">
            Question ${this.currentQuestionIndex + 1} of ${this.quiz.questions.length}
          </div>
        </div>

        <div class="question-card">
          <div class="question-text">${question.question}</div>
          
          <div class="options-list">
            ${question.options.map((option, index) => html`
              <button 
                class="option-button ${this.selectedAnswer === index ? 'selected' : ''} ${this.showExplanation ? (index === question.correctAnswer ? 'correct' : (this.selectedAnswer === index && !isCorrect ? 'incorrect' : '')) : ''}"
                @click="${() => this.selectAnswer(index)}"
                ?disabled="${this.showExplanation}"
              >
                ${String.fromCharCode(65 + index)}. ${option}
              </button>
            `)}
          </div>

          ${this.showExplanation ? html`
            <div class="explanation">
              <strong>${isCorrect ? '✅ Correct!' : '❌ Incorrect.'}</strong>
              ${question.explanation}
            </div>
          ` : ''}
        </div>

        <div class="quiz-actions">
          <button 
            class="quiz-button" 
            @click="${this.submitAnswer}"
            ?disabled="${this.selectedAnswer === null || this.showExplanation}"
          >
            Submit Answer
          </button>
          
          ${this.showExplanation ? html`
            <button class="quiz-button" @click="${this.nextQuestion}">
              ${this.currentQuestionIndex < this.quiz.questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }
}