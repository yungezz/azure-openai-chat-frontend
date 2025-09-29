import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  defaultPrompts: string[];
}

@customElement('subject-selector')
export class SubjectSelector extends LitElement {
  static override styles = css`
    .subject-selector {
      margin-bottom: 2rem;
    }

    .subject-selector h2 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: var(--text-color, #1f2937);
      font-size: 1.25rem;
      font-weight: 600;
    }

    .subjects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .subject-card {
      border: 2px solid var(--accent-light, #dbeafe);
      border-radius: var(--border-radius, 12px);
      padding: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      background-color: var(--form-background-color, #ffffff);
      text-align: center;
    }

    .subject-card:hover {
      border-color: var(--accent-high, #2563eb);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
    }

    .subject-card.selected {
      border-color: var(--accent-high, #2563eb);
      background-color: var(--accent-light, #dbeafe);
    }

    .subject-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      display: block;
    }

    .subject-name {
      font-weight: 600;
      color: var(--text-color, #1f2937);
      margin-bottom: 0.5rem;
    }

    .subject-description {
      font-size: 0.875rem;
      color: var(--text-color-secondary, #6b7280);
      line-height: 1.4;
    }

    .selected-subject-prompts {
      margin-top: 1rem;
    }

    .prompt-suggestions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 0.75rem;
    }

    .prompt-suggestion {
      background: var(--form-background-color, #ffffff);
      border: 1px solid var(--accent-light, #dbeafe);
      border-radius: var(--border-radius, 12px);
      padding: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: left;
      font-size: 0.875rem;
      color: var(--text-color, #1f2937);
    }

    .prompt-suggestion:hover {
      background-color: var(--accent-light, #dbeafe);
      border-color: var(--accent-high, #2563eb);
    }

    .prompt-suggestions-title {
      margin-bottom: 0.75rem;
      font-weight: 500;
      color: var(--text-color, #1f2937);
    }
  `;

  @property({ type: Array })
  subjects: Subject[] = [
    {
      id: 'math',
      name: 'Mathematics',
      icon: '🔢',
      description: 'Algebra, calculus, geometry, statistics and more',
      defaultPrompts: [
        'Explain quadratic equations with examples',
        'How do I calculate derivatives?',
        'What is the Pythagorean theorem?',
        'Teach me about probability'
      ]
    },
    {
      id: 'science',
      name: 'Science',
      icon: '🔬',
      description: 'Biology, chemistry, physics and earth science',
      defaultPrompts: [
        'Explain photosynthesis step by step',
        'What are the laws of thermodynamics?',
        'How does DNA replication work?',
        'Explain the periodic table'
      ]
    },
    {
      id: 'history',
      name: 'History',
      icon: '📚',
      description: 'World history, civilizations, and historical events',
      defaultPrompts: [
        'What caused World War I?',
        'Explain the Roman Empire',
        'How did the Renaissance change Europe?',
        'What was the Industrial Revolution?'
      ]
    },
    {
      id: 'programming',
      name: 'Programming',
      icon: '💻',
      description: 'Programming languages, algorithms, and software development',
      defaultPrompts: [
        'Teach me basic programming concepts',
        'How do I write a function in Python?',
        'What are data structures?',
        'Explain object-oriented programming'
      ]
    },
    {
      id: 'languages',
      name: 'Languages',
      icon: '🌍',
      description: 'Learn new languages and improve communication skills',
      defaultPrompts: [
        'Teach me basic Spanish phrases',
        'How do I improve my writing skills?',
        'What are English grammar rules?',
        'Help me learn French vocabulary'
      ]
    },
    {
      id: 'general',
      name: 'General Knowledge',
      icon: '🎓',
      description: 'Geography, current events, and general education',
      defaultPrompts: [
        'Tell me about climate change',
        'What are the continents and oceans?',
        'Explain how the economy works',
        'What is artificial intelligence?'
      ]
    }
  ];

  @state()
  selectedSubject: Subject | null = null;

  selectSubject(subject: Subject) {
    this.selectedSubject = this.selectedSubject?.id === subject.id ? null : subject;
    
    // Dispatch event with selected subject
    const selectEvent = new CustomEvent('subject-selected', {
      detail: {
        subject: this.selectedSubject
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(selectEvent);
  }

  handlePromptClick(prompt: string) {
    const promptEvent = new CustomEvent('prompt-selected', {
      detail: {
        prompt: prompt,
        subject: this.selectedSubject
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(promptEvent);
  }

  override render() {
    return html`
      <div class="subject-selector">
        <h2>Choose a subject to get started</h2>
        <div class="subjects-grid">
          ${this.subjects.map(subject => html`
            <div 
              class="subject-card ${this.selectedSubject?.id === subject.id ? 'selected' : ''}"
              @click="${() => this.selectSubject(subject)}"
            >
              <span class="subject-icon">${subject.icon}</span>
              <div class="subject-name">${subject.name}</div>
              <div class="subject-description">${subject.description}</div>
            </div>
          `)}
        </div>
        
        ${this.selectedSubject ? html`
          <div class="selected-subject-prompts">
            <div class="prompt-suggestions-title">
              Try these ${this.selectedSubject.name.toLowerCase()} questions:
            </div>
            <div class="prompt-suggestions">
              ${this.selectedSubject.defaultPrompts.map(prompt => html`
                <div class="prompt-suggestion" @click="${() => this.handlePromptClick(prompt)}">
                  ${prompt}
                </div>
              `)}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}