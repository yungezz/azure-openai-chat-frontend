import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

interface ProgressItem {
  id: string;
  type: 'lesson' | 'quiz';
  title: string;
  subject: string;
  completedAt: Date;
  score?: number;
}

@customElement('progress-tracker')
export class ProgressTracker extends LitElement {
  static override styles = css`
    .progress-container {
      background: var(--form-background-color, #ffffff);
      border: 2px solid var(--accent-light, #dbeafe);
      border-radius: var(--border-radius, 12px);
      padding: 1.5rem;
      margin: 1rem 0;
    }

    .progress-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
      color: var(--accent-high, #2563eb);
      font-weight: 700;
      font-size: 1.125rem;
    }

    .progress-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .stat-card {
      background: var(--accent-light, #dbeafe);
      border-radius: 8px;
      padding: 1rem;
      text-align: center;
    }

    .stat-number {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--accent-high, #2563eb);
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-color-secondary, #6b7280);
      margin-top: 0.25rem;
    }

    .progress-list {
      max-height: 300px;
      overflow-y: auto;
    }

    .progress-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      border-bottom: 1px solid var(--accent-light, #dbeafe);
    }

    .progress-item:last-child {
      border-bottom: none;
    }

    .item-icon {
      font-size: 1.25rem;
    }

    .item-details {
      flex-grow: 1;
    }

    .item-title {
      font-weight: 600;
      color: var(--text-color, #1f2937);
    }

    .item-meta {
      font-size: 0.875rem;
      color: var(--text-color-secondary, #6b7280);
    }

    .item-score {
      font-weight: 600;
      color: var(--accent-high, #2563eb);
    }

    .empty-state {
      text-align: center;
      padding: 2rem;
      color: var(--text-color-secondary, #6b7280);
    }
  `;

  @state()
  progressItems: ProgressItem[] = [];

  get totalLessons() {
    return this.progressItems.filter(item => item.type === 'lesson').length;
  }

  get totalQuizzes() {
    return this.progressItems.filter(item => item.type === 'quiz').length;
  }

  get averageScore() {
    const quizzes = this.progressItems.filter(item => item.type === 'quiz' && item.score);
    if (quizzes.length === 0) return 0;
    return Math.round(quizzes.reduce((sum, quiz) => sum + (quiz.score || 0), 0) / quizzes.length);
  }

  addProgress(item: Omit<ProgressItem, 'id' | 'completedAt'>) {
    const newItem: ProgressItem = {
      ...item,
      id: Date.now().toString(),
      completedAt: new Date()
    };
    this.progressItems = [newItem, ...this.progressItems];
    this.saveToLocalStorage();
  }

  loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('ai-teacher-progress');
      if (saved) {
        this.progressItems = JSON.parse(saved).map((item: any) => ({
          ...item,
          completedAt: new Date(item.completedAt)
        }));
      }
    } catch (error) {
      console.warn('Failed to load progress from localStorage:', error);
    }
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem('ai-teacher-progress', JSON.stringify(this.progressItems));
    } catch (error) {
      console.warn('Failed to save progress to localStorage:', error);
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    this.loadFromLocalStorage();
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString();
  }

  override render() {
    return html`
      <div class="progress-container">
        <div class="progress-header">
          <span>📊</span>
          <span>Your Learning Progress</span>
        </div>

        <div class="progress-stats">
          <div class="stat-card">
            <div class="stat-number">${this.totalLessons}</div>
            <div class="stat-label">Lessons Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${this.totalQuizzes}</div>
            <div class="stat-label">Quizzes Taken</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${this.averageScore}%</div>
            <div class="stat-label">Average Score</div>
          </div>
        </div>

        ${this.progressItems.length > 0 ? html`
          <div class="progress-list">
            ${this.progressItems.map(item => html`
              <div class="progress-item">
                <span class="item-icon">${item.type === 'lesson' ? '📚' : '🧠'}</span>
                <div class="item-details">
                  <div class="item-title">${item.title}</div>
                  <div class="item-meta">${item.subject} • ${this.formatDate(item.completedAt)}</div>
                </div>
                ${item.score !== undefined ? html`
                  <div class="item-score">${item.score}%</div>
                ` : ''}
              </div>
            `)}
          </div>
        ` : html`
          <div class="empty-state">
            <p>Start learning to track your progress!</p>
          </div>
        `}
      </div>
    `;
  }
}