import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { type Lesson } from './lessons-component.js';

@customElement('lesson-library')
export class LessonLibrary extends LitElement {
  static override styles = css`
    .lesson-library {
      padding: 1rem;
    }

    .library-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .library-title {
      color: var(--text-color, #1f2937);
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .library-subtitle {
      color: var(--text-color-secondary, #6b7280);
      font-size: 1rem;
    }

    .subject-filter {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .filter-button {
      padding: 0.5rem 1rem;
      border: 2px solid var(--accent-light, #dbeafe);
      border-radius: 2rem;
      background: var(--form-background-color, #ffffff);
      color: var(--text-color, #1f2937);
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .filter-button:hover {
      border-color: var(--accent-high, #2563eb);
    }

    .filter-button.active {
      background: var(--accent-high, #2563eb);
      color: white;
      border-color: var(--accent-high, #2563eb);
    }

    .lessons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .lesson-card {
      background: var(--form-background-color, #ffffff);
      border: 2px solid var(--accent-light, #dbeafe);
      border-radius: var(--border-radius, 12px);
      padding: 1.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .lesson-card:hover {
      border-color: var(--accent-high, #2563eb);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
    }

    .lesson-card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .lesson-icon {
      font-size: 1.5rem;
    }

    .lesson-card-title {
      color: var(--accent-high, #2563eb);
      font-size: 1.125rem;
      font-weight: 700;
      flex-grow: 1;
    }

    .lesson-card-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      color: var(--text-color-secondary, #6b7280);
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .lesson-card-description {
      color: var(--text-color, #1f2937);
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    .lesson-card-stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .lesson-steps-count {
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

    .no-lessons {
      text-align: center;
      padding: 3rem;
      color: var(--text-color-secondary, #6b7280);
    }
  `;

  @property({ type: Array })
  lessons: Lesson[] = [
    {
      id: 'quadratic-equations',
      title: 'Understanding Quadratic Equations',
      subject: 'Mathematics',
      description: 'Learn the fundamentals of quadratic equations, how to solve them, and their real-world applications.',
      estimatedTime: '45 minutes',
      difficulty: 'intermediate',
      steps: [
        {
          id: 'intro',
          title: 'What are Quadratic Equations?',
          type: 'explanation',
          content: `
            <p>A quadratic equation is a polynomial equation of degree 2. The general form is:</p>
            <p><strong>ax² + bx + c = 0</strong></p>
            <p>Where:</p>
            <ul>
              <li><strong>a</strong> ≠ 0 (coefficient of x²)</li>
              <li><strong>b</strong> = coefficient of x</li>
              <li><strong>c</strong> = constant term</li>
            </ul>
            <p>The graph of a quadratic equation is always a parabola.</p>
          `
        },
        {
          id: 'examples',
          title: 'Examples of Quadratic Equations',
          type: 'example',
          content: `
            <p>Here are some examples of quadratic equations:</p>
            <ul>
              <li>x² + 5x + 6 = 0</li>
              <li>2x² - 7x + 3 = 0</li>
              <li>x² - 4 = 0</li>
              <li>3x² + 2x = 0</li>
            </ul>
            <p>Notice how each equation has an x² term, making it quadratic.</p>
          `
        },
        {
          id: 'solving',
          title: 'Solving Quadratic Equations',
          type: 'explanation',
          content: `
            <p>There are several methods to solve quadratic equations:</p>
            <h4>1. Factoring</h4>
            <p>If the quadratic can be factored: (x + m)(x + n) = 0</p>
            <h4>2. Quadratic Formula</h4>
            <p>x = (-b ± √(b² - 4ac)) / 2a</p>
            <h4>3. Completing the Square</h4>
            <p>Rewrite the equation in the form (x + h)² = k</p>
          `
        },
        {
          id: 'practice',
          title: 'Practice Problem',
          type: 'practice',
          content: `
            <p><strong>Solve: x² + 5x + 6 = 0</strong></p>
            <p>Try factoring first:</p>
            <ol>
              <li>Look for two numbers that multiply to 6 and add to 5</li>
              <li>Those numbers are 2 and 3</li>
              <li>So: (x + 2)(x + 3) = 0</li>
              <li>Therefore: x = -2 or x = -3</li>
            </ol>
            <p><strong>Answer: x = -2, x = -3</strong></p>
          `
        }
      ]
    },
    {
      id: 'photosynthesis-basics',
      title: 'Photosynthesis: How Plants Make Food',
      subject: 'Science',
      description: 'Discover how plants convert sunlight, water, and carbon dioxide into glucose and oxygen.',
      estimatedTime: '30 minutes',
      difficulty: 'beginner',
      steps: [
        {
          id: 'what-is',
          title: 'What is Photosynthesis?',
          type: 'explanation',
          content: `
            <p>Photosynthesis is the process by which plants, algae, and some bacteria convert light energy (usually from the sun) into chemical energy stored in glucose.</p>
            <p><strong>The basic equation:</strong></p>
            <p>6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂</p>
            <p>In simple terms: Carbon dioxide + Water + Light → Glucose + Oxygen</p>
          `
        },
        {
          id: 'ingredients',
          title: 'What Plants Need',
          type: 'explanation',
          content: `
            <p>For photosynthesis to occur, plants need three main ingredients:</p>
            <ul>
              <li><strong>Carbon Dioxide (CO₂)</strong> - absorbed from the air through tiny pores called stomata</li>
              <li><strong>Water (H₂O)</strong> - absorbed by roots from the soil</li>
              <li><strong>Sunlight</strong> - captured by chlorophyll in the leaves</li>
            </ul>
            <p>The process takes place mainly in the leaves, specifically in structures called chloroplasts.</p>
          `
        },
        {
          id: 'process',
          title: 'The Two Stages',
          type: 'explanation',
          content: `
            <p>Photosynthesis happens in two main stages:</p>
            <h4>1. Light-Dependent Reactions (Photo)</h4>
            <ul>
              <li>Occur in the thylakoids of chloroplasts</li>
              <li>Chlorophyll captures light energy</li>
              <li>Water molecules are split, releasing oxygen</li>
              <li>Energy is stored in ATP and NADPH</li>
            </ul>
            <h4>2. Light-Independent Reactions (Synthesis/Calvin Cycle)</h4>
            <ul>
              <li>Occur in the stroma of chloroplasts</li>
              <li>CO₂ is fixed into organic molecules</li>
              <li>ATP and NADPH provide energy</li>
              <li>Glucose is produced</li>
            </ul>
          `
        },
        {
          id: 'importance',
          title: 'Why Photosynthesis Matters',
          type: 'summary',
          content: `
            <p>Photosynthesis is crucial for life on Earth because:</p>
            <ul>
              <li><strong>Produces Oxygen</strong> - Almost all the oxygen we breathe comes from photosynthesis</li>
              <li><strong>Food Source</strong> - Plants are the base of most food chains</li>
              <li><strong>Removes CO₂</strong> - Helps regulate Earth's carbon dioxide levels</li>
              <li><strong>Energy Storage</strong> - Converts solar energy into chemical energy that organisms can use</li>
            </ul>
            <p>Without photosynthesis, life as we know it couldn't exist!</p>
          `
        }
      ]
    },
    {
      id: 'python-functions',
      title: 'Python Functions Basics',
      subject: 'Programming',
      description: 'Learn how to create and use functions in Python to write more organized and reusable code.',
      estimatedTime: '40 minutes',
      difficulty: 'beginner',
      steps: [
        {
          id: 'what-are-functions',
          title: 'What are Functions?',
          type: 'explanation',
          content: `
            <p>A function is a block of reusable code that performs a specific task. Functions help you:</p>
            <ul>
              <li>Organize your code</li>
              <li>Avoid repetition</li>
              <li>Make code easier to test and debug</li>
              <li>Break complex problems into smaller parts</li>
            </ul>
            <p>Think of a function like a recipe - you give it ingredients (inputs) and it produces a dish (output).</p>
          `
        },
        {
          id: 'basic-syntax',
          title: 'Function Syntax',
          type: 'explanation',
          content: `
            <p>Here's the basic syntax for creating a function in Python:</p>
            <pre><code>def function_name(parameters):
    """Optional docstring"""
    # Function body
    return value  # Optional</code></pre>
            
            <p><strong>Key parts:</strong></p>
            <ul>
              <li><code>def</code> - keyword to define a function</li>
              <li><code>function_name</code> - descriptive name for your function</li>
              <li><code>parameters</code> - inputs the function accepts (optional)</li>
              <li><code>return</code> - sends a value back to the caller (optional)</li>
            </ul>
          `
        },
        {
          id: 'simple-example',
          title: 'Simple Function Example',
          type: 'example',
          content: `
            <p>Let's create a simple function that greets someone:</p>
            <pre><code>def greet(name):
    """This function greets someone by name"""
    return f"Hello, {name}!"

# Using the function
message = greet("Alice")
print(message)  # Output: Hello, Alice!</code></pre>
            
            <p>You can also call it directly:</p>
            <pre><code>print(greet("Bob"))  # Output: Hello, Bob!</code></pre>
          `
        },
        {
          id: 'practice-exercise',
          title: 'Practice: Create Your Own Function',
          type: 'practice',
          content: `
            <p><strong>Exercise:</strong> Create a function that calculates the area of a rectangle.</p>
            
            <p><strong>Requirements:</strong></p>
            <ul>
              <li>Function name: <code>calculate_area</code></li>
              <li>Parameters: <code>length</code> and <code>width</code></li>
              <li>Return: the area (length × width)</li>
            </ul>
            
            <p><strong>Solution:</strong></p>
            <pre><code>def calculate_area(length, width):
    """Calculate the area of a rectangle"""
    area = length * width
    return area

# Test the function
result = calculate_area(5, 3)
print(f"The area is: {result}")  # Output: The area is: 15</code></pre>
          `
        }
      ]
    }
  ];

  @state()
  selectedSubject: string = 'All';

  @state()
  filteredLessons: Lesson[] = this.lessons;

  get subjects(): string[] {
    const subjects = ['All', ...new Set(this.lessons.map(lesson => lesson.subject))];
    return subjects;
  }

  filterLessons(subject: string) {
    this.selectedSubject = subject;
    this.filteredLessons = subject === 'All' 
      ? this.lessons 
      : this.lessons.filter(lesson => lesson.subject === subject);
  }

  selectLesson(lesson: Lesson) {
    const event = new CustomEvent('lesson-selected', {
      detail: { lesson },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  getSubjectIcon(subject: string): string {
    const icons: { [key: string]: string } = {
      'Mathematics': '🔢',
      'Science': '🔬',
      'History': '📚',
      'Programming': '💻',
      'Languages': '🌍',
      'General': '🎓'
    };
    return icons[subject] || '📖';
  }

  override render() {
    return html`
      <div class="lesson-library">
        <div class="library-header">
          <h2 class="library-title">Lesson Library</h2>
          <p class="library-subtitle">Choose a structured lesson to dive deep into a topic</p>
        </div>

        <div class="subject-filter">
          ${this.subjects.map(subject => html`
            <button 
              class="filter-button ${this.selectedSubject === subject ? 'active' : ''}"
              @click="${() => this.filterLessons(subject)}"
            >
              ${subject}
            </button>
          `)}
        </div>

        ${this.filteredLessons.length > 0 ? html`
          <div class="lessons-grid">
            ${this.filteredLessons.map(lesson => html`
              <div class="lesson-card" @click="${() => this.selectLesson(lesson)}">
                <div class="lesson-card-header">
                  <span class="lesson-icon">${this.getSubjectIcon(lesson.subject)}</span>
                  <h3 class="lesson-card-title">${lesson.title}</h3>
                </div>
                
                <div class="lesson-card-meta">
                  <div class="meta-item">
                    <span>⏱️</span>
                    <span>${lesson.estimatedTime}</span>
                  </div>
                  <div class="meta-item">
                    <span>📚</span>
                    <span>${lesson.subject}</span>
                  </div>
                </div>
                
                <p class="lesson-card-description">${lesson.description}</p>
                
                <div class="lesson-card-stats">
                  <span class="lesson-steps-count">${lesson.steps.length} steps</span>
                  <span class="difficulty-badge difficulty-${lesson.difficulty}">
                    ${lesson.difficulty}
                  </span>
                </div>
              </div>
            `)}
          </div>
        ` : html`
          <div class="no-lessons">
            <p>No lessons found for the selected subject.</p>
          </div>
        `}
      </div>
    `;
  }
}