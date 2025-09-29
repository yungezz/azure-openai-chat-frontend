import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface LessonStep {
  id: string;
  title: string;
  content: string;
  type: 'explanation' | 'example' | 'practice' | 'summary';
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  description: string;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: LessonStep[];
}

@customElement('lessons-component')
export class LessonsComponent extends LitElement {
  static override styles = css`
    .lessons-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem;
    }

    .lesson-header {
      background: var(--form-background-color, #ffffff);
      border: 2px solid var(--accent-light, #dbeafe);
      border-radius: var(--border-radius, 12px);
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .lesson-title {
      color: var(--accent-high, #2563eb);
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .lesson-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }

    .lesson-meta-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      color: var(--text-color-secondary, #6b7280);
    }

    .difficulty-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 2rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .difficulty-beginner {
      background: #dcfce7;
      color: #166534;
    }

    .difficulty-intermediate {
      background: #fef3c7;
      color: #92400e;
    }

    .difficulty-advanced {
      background: #fecaca;
      color: #991b1b;
    }

    .lesson-description {
      color: var(--text-color, #1f2937);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .lesson-progress {
      background: var(--accent-light, #dbeafe);
      border-radius: 0.5rem;
      height: 0.5rem;
      overflow: hidden;
      margin-bottom: 1rem;
    }

    .lesson-progress-bar {
      height: 100%;
      background: var(--accent-high, #2563eb);
      transition: width 0.3s ease;
    }

    .lesson-steps {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .lesson-step {
      background: var(--form-background-color, #ffffff);
      border: 1px solid var(--accent-light, #dbeafe);
      border-radius: var(--border-radius, 12px);
      overflow: hidden;
      transition: all 0.2s ease;
    }

    .lesson-step.active {
      border-color: var(--accent-high, #2563eb);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
    }

    .lesson-step.completed {
      background: var(--accent-light, #dbeafe);
      border-color: var(--accent-high, #2563eb);
    }

    .step-header {
      padding: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 1rem;
      background: var(--form-background-color, #ffffff);
    }

    .step-number {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background: var(--accent-light, #dbeafe);
      color: var(--accent-high, #2563eb);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.875rem;
      flex-shrink: 0;
    }

    .step-number.completed {
      background: var(--accent-high, #2563eb);
      color: white;
    }

    .step-title {
      font-weight: 600;
      color: var(--text-color, #1f2937);
      flex-grow: 1;
    }

    .step-type {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .step-type-explanation {
      background: #e0f2fe;
      color: #0277bd;
    }

    .step-type-example {
      background: #f3e5f5;
      color: #7b1fa2;
    }

    .step-type-practice {
      background: #fff3e0;
      color: #f57c00;
    }

    .step-type-summary {
      background: #e8f5e8;
      color: #388e3c;
    }

    .step-content {
      padding: 1rem;
      border-top: 1px solid var(--accent-light, #dbeafe);
      color: var(--text-color, #1f2937);
      line-height: 1.6;
    }

    .step-content.hidden {
      display: none;
    }

    .lesson-navigation {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
      gap: 1rem;
    }

    .nav-button {
      padding: 0.75rem 1.5rem;
      border: 2px solid var(--accent-high, #2563eb);
      border-radius: var(--border-radius, 12px);
      background: transparent;
      color: var(--accent-high, #2563eb);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .nav-button:hover {
      background: var(--accent-high, #2563eb);
      color: white;
    }

    .nav-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .nav-button.primary {
      background: var(--accent-high, #2563eb);
      color: white;
    }

    .nav-button.primary:hover {
      background: var(--accent-dark, #1d4ed8);
    }

    .completion-message {
      text-align: center;
      padding: 2rem;
      background: var(--accent-light, #dbeafe);
      border-radius: var(--border-radius, 12px);
      margin-top: 1rem;
    }

    .completion-title {
      color: var(--accent-high, #2563eb);
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .completion-text {
      color: var(--text-color, #1f2937);
      margin-bottom: 1rem;
    }
  `;

  @property({ type: Object })
  lesson: Lesson | null = null;

  @state()
  currentStepIndex: number = 0;

  @state()
  completedSteps: Set<number> = new Set();

  @state()
  isLessonCompleted: boolean = false;

  get currentStep(): LessonStep | null {
    return this.lesson?.steps[this.currentStepIndex] || null;
  }

  get progress(): number {
    if (!this.lesson) return 0;
    return (this.completedSteps.size / this.lesson.steps.length) * 100;
  }

  toggleStep(index: number) {
    if (this.currentStepIndex === index) {
      // If clicking the current step, just toggle its visibility
      return;
    }
    
    // Mark previous step as completed if moving forward
    if (index > this.currentStepIndex) {
      this.completedSteps.add(this.currentStepIndex);
    }
    
    this.currentStepIndex = index;
    this.requestUpdate();
  }

  nextStep() {
    if (!this.lesson || this.currentStepIndex >= this.lesson.steps.length - 1) return;
    
    this.completedSteps.add(this.currentStepIndex);
    this.currentStepIndex++;
    
    // Check if lesson is completed
    if (this.currentStepIndex >= this.lesson.steps.length - 1) {
      this.completedSteps.add(this.currentStepIndex);
    }
    
    this.checkLessonCompletion();
    this.requestUpdate();
  }

  previousStep() {
    if (this.currentStepIndex <= 0) return;
    this.currentStepIndex--;
    this.requestUpdate();
  }

  checkLessonCompletion() {
    if (!this.lesson) return;
    
    if (this.completedSteps.size >= this.lesson.steps.length) {
      this.isLessonCompleted = true;
      this.dispatchLessonCompletedEvent();
    }
  }

  dispatchLessonCompletedEvent() {
    const event = new CustomEvent('lesson-completed', {
      detail: {
        lesson: this.lesson,
        completedSteps: Array.from(this.completedSteps)
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  renderLessonHeader() {
    if (!this.lesson) return '';

    return html`
      <div class="lesson-header">
        <h1 class="lesson-title">${this.lesson.title}</h1>
        <div class="lesson-meta">
          <div class="lesson-meta-item">
            <span>📚</span>
            <span>${this.lesson.subject}</span>
          </div>
          <div class="lesson-meta-item">
            <span>⏱️</span>
            <span>${this.lesson.estimatedTime}</span>
          </div>
          <span class="difficulty-badge difficulty-${this.lesson.difficulty}">
            ${this.lesson.difficulty}
          </span>
        </div>
        <p class="lesson-description">${this.lesson.description}</p>
        <div class="lesson-progress">
          <div class="lesson-progress-bar" style="width: ${this.progress}%"></div>
        </div>
      </div>
    `;
  }

  renderLessonSteps() {
    if (!this.lesson) return '';

    return html`
      <div class="lesson-steps">
        ${this.lesson.steps.map((step, index) => html`
          <div class="lesson-step ${index === this.currentStepIndex ? 'active' : ''} ${this.completedSteps.has(index) ? 'completed' : ''}">
            <div class="step-header" @click="${() => this.toggleStep(index)}">
              <div class="step-number ${this.completedSteps.has(index) ? 'completed' : ''}">
                ${this.completedSteps.has(index) ? '✓' : index + 1}
              </div>
              <div class="step-title">${step.title}</div>
              <div class="step-type step-type-${step.type}">${step.type}</div>
            </div>
            <div class="step-content ${index === this.currentStepIndex ? '' : 'hidden'}">
              ${unsafeHTML(step.content)}
            </div>
          </div>
        `)}
      </div>
    `;
  }

  renderNavigation() {
    if (!this.lesson) return '';

    return html`
      <div class="lesson-navigation">
        <button 
          class="nav-button" 
          ?disabled=${this.currentStepIndex === 0}
          @click="${this.previousStep}"
        >
          ← Previous
        </button>
        <button 
          class="nav-button primary" 
          ?disabled=${this.currentStepIndex >= this.lesson.steps.length - 1}
          @click="${this.nextStep}"
        >
          Next →
        </button>
      </div>
    `;
  }

  renderCompletionMessage() {
    if (!this.isLessonCompleted) return '';

    return html`
      <div class="completion-message">
        <div class="completion-title">🎉 Congratulations!</div>
        <div class="completion-text">
          You have successfully completed the lesson: "${this.lesson?.title}"
        </div>
        <button class="nav-button primary" @click="${this.dispatchLessonCompletedEvent}">
          Continue Learning
        </button>
      </div>
    `;
  }

  override render() {
    if (!this.lesson) {
      return html`
        <div class="lessons-container">
          <p>No lesson selected. Please choose a lesson to begin learning.</p>
        </div>
      `;
    }

    return html`
      <div class="lessons-container">
        ${this.renderLessonHeader()}
        ${this.renderLessonSteps()}
        ${this.renderNavigation()}
        ${this.renderCompletionMessage()}
      </div>
    `;
  }
}