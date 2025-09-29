import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LEARNING_TOPICS, SKILL_LEVELS } from '../config/education-config.js';

export interface TopicSelection {
  topic: typeof LEARNING_TOPICS[0] | null;
  skillLevel: typeof SKILL_LEVELS[0] | null;
}

@customElement('topic-selector')
export class TopicSelectorComponent extends LitElement {
  static override styles = css`
    :host {
      display: block;
      padding: 1rem;
      margin-bottom: 1rem;
    }

    .topic-selector {
      background: var(--form-background-color, #f8f9fa);
      border-radius: var(--border-radius, 8px);
      padding: 1.5rem;
      border: 1px solid var(--border-color, #e9ecef);
    }

    .selector-section {
      margin-bottom: 1.5rem;
    }

    .selector-section:last-child {
      margin-bottom: 0;
    }

    .section-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: var(--text-color, #333);
    }

    .topics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0.75rem;
    }

    .topic-card {
      background: white;
      border: 2px solid var(--border-color, #e9ecef);
      border-radius: var(--border-radius, 8px);
      padding: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: center;
    }

    .topic-card:hover {
      border-color: var(--accent-color, #007bff);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .topic-card.selected {
      border-color: var(--accent-color, #007bff);
      background-color: var(--accent-light, #e3f2fd);
    }

    .topic-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      display: block;
    }

    .topic-name {
      font-weight: 500;
      color: var(--text-color, #333);
    }

    .skill-levels {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .skill-level {
      flex: 1;
      min-width: 150px;
      background: white;
      border: 2px solid var(--border-color, #e9ecef);
      border-radius: var(--border-radius, 8px);
      padding: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: center;
    }

    .skill-level:hover {
      border-color: var(--accent-color, #007bff);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .skill-level.selected {
      border-color: var(--accent-color, #007bff);
      background-color: var(--accent-light, #e3f2fd);
    }

    .skill-name {
      font-weight: 500;
      margin-bottom: 0.25rem;
      color: var(--text-color, #333);
    }

    .skill-description {
      font-size: 0.9rem;
      color: var(--text-color-secondary, #666);
    }

    .start-button {
      background: var(--accent-color, #007bff);
      color: white;
      border: none;
      border-radius: var(--border-radius, 8px);
      padding: 0.75rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-top: 1.5rem;
      width: 100%;
    }

    .start-button:hover:not(:disabled) {
      background: var(--accent-dark, #0056b3);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .start-button:disabled {
      background: var(--border-color, #e9ecef);
      color: var(--text-color-secondary, #666);
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .topics-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }
      
      .skill-levels {
        flex-direction: column;
      }
    }
  `;

  @state()
  selectedTopic: typeof LEARNING_TOPICS[0] | null = null;

  @state()
  selectedSkillLevel: typeof SKILL_LEVELS[0] | null = null;

  @property({ type: Boolean })
  visible = true;

  selectTopic(topic: typeof LEARNING_TOPICS[0]) {
    this.selectedTopic = topic;
    this.dispatchSelectionChange();
  }

  selectSkillLevel(level: typeof SKILL_LEVELS[0]) {
    this.selectedSkillLevel = level;
    this.dispatchSelectionChange();
  }

  dispatchSelectionChange() {
    const selection: TopicSelection = {
      topic: this.selectedTopic,
      skillLevel: this.selectedSkillLevel
    };
    
    this.dispatchEvent(new CustomEvent('selection-change', {
      detail: selection,
      bubbles: true
    }));
  }

  startLearning() {
    if (this.selectedTopic && this.selectedSkillLevel) {
      this.dispatchEvent(new CustomEvent('start-learning', {
        detail: {
          topic: this.selectedTopic,
          skillLevel: this.selectedSkillLevel
        },
        bubbles: true
      }));
    }
  }

  override render() {
    if (!this.visible) return html``;

    return html`
      <div class="topic-selector">
        <div class="selector-section">
          <div class="section-title">📚 Choose a topic to learn</div>
          <div class="topics-grid">
            ${LEARNING_TOPICS.map(topic => html`
              <div 
                class="topic-card ${this.selectedTopic?.id === topic.id ? 'selected' : ''}"
                @click="${() => this.selectTopic(topic)}"
              >
                <span class="topic-icon">${topic.icon}</span>
                <div class="topic-name">${topic.name}</div>
              </div>
            `)}
          </div>
        </div>

        <div class="selector-section">
          <div class="section-title">🎯 Select your skill level</div>
          <div class="skill-levels">
            ${SKILL_LEVELS.map(level => html`
              <div 
                class="skill-level ${this.selectedSkillLevel?.id === level.id ? 'selected' : ''}"
                @click="${() => this.selectSkillLevel(level)}"
              >
                <div class="skill-name">${level.name}</div>
                <div class="skill-description">${level.description}</div>
              </div>
            `)}
          </div>
        </div>

        <button 
          class="start-button"
          ?disabled="${!this.selectedTopic || !this.selectedSkillLevel}"
          @click="${this.startLearning}"
        >
          🚀 Start Learning ${this.selectedTopic ? this.selectedTopic.name : ''}
        </button>
      </div>
    `;
  }
}