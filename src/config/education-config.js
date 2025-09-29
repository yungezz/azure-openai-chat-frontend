// Education-specific configuration for AI Teacher application
const educationConfig = {
  BOT_TYPING_EFFECT_INTERVAL: 50, // in ms

  // Is default prompts enabled?
  IS_DEFAULT_PROMPTS_ENABLED: true,
  // Default prompts to display in the chat
  DISPLAY_DEFAULT_PROMPTS_BUTTON: 'Not sure what to learn? Try our topic suggestions!',
  // This are the chat bubbles that will be displayed in the chat
  CHAT_MESSAGES: [],
  // This are the labels for the chat button and input
  CHAT_BUTTON_LABEL_TEXT: 'Ask Teacher',
  CHAT_CANCEL_BUTTON_LABEL_TEXT: 'Stop Learning',
  CHAT_VOICE_BUTTON_LABEL_TEXT: 'Voice input',
  CHAT_VOICE_REC_BUTTON_LABEL_TEXT: 'Listening to your question',
  CHAT_INPUT_PLACEHOLDER: 'Ask me anything about your chosen topic, e.g. "Explain photosynthesis"',
  USER_IS_BOT: 'AI Teacher',
  RESET_BUTTON_LABEL_TEXT: 'X',
  RESET_BUTTON_TITLE_TEXT: 'Reset current question',
  RESET_CHAT_BUTTON_TITLE: 'Start new lesson',
  // Copy response to clipboard
  COPY_RESPONSE_BUTTON_LABEL_TEXT: 'Copy Explanation',
  COPIED_SUCCESSFULLY_MESSAGE: 'Explanation copied!',
  // Follow up questions text
  FOLLOW_UP_QUESTIONS_LABEL_TEXT: 'Continue learning with...',
  SHOW_THOUGH_PROCESS_BUTTON_LABEL_TEXT: 'Show teaching process',
  HIDE_THOUGH_PROCESS_BUTTON_LABEL_TEXT: 'Hide teaching process',
  LOADING_INDICATOR_TEXT: 'Let me think about the best way to explain this...',
  LOADING_TEXT: 'Preparing lesson...',
  // API ERROR HANDLING IN UI
  API_ERROR_MESSAGE: 'Sorry, I\'m having trouble right now. Please try asking again.',
  INVALID_REQUEST_ERROR: 'I couldn\'t understand that question. Could you try rephrasing it?',
  // Config pertaining the response format
  THOUGHT_PROCESS_LABEL: 'Teaching Process',
  SUPPORT_CONTEXT_LABEL: 'Learning Context',
  CITATIONS_LABEL: 'Further Reading:',
  CITATIONS_TAB_LABEL: 'Resources',
  // Custom Branding
  IS_CUSTOM_BRANDING: true,
  // Custom Branding details
  BRANDING_URL: '#',
  BRANDING_LOGO_ALT: 'AI Teacher Logo',
  BRANDING_HEADLINE: 'Welcome to your Personal AI Teacher',
  SHOW_CHAT_HISTORY_LABEL: 'Show Learning History',
  HIDE_CHAT_HISTORY_LABEL: 'Hide Learning History',
  CHAT_MAX_COUNT_TAG: '{MAX_CHAT_HISTORY}',
  CHAT_HISTORY_FOOTER_TEXT: 'Showing past {MAX_CHAT_HISTORY} learning sessions',
};

const educationTeaserListTexts = {
  TEASER_CTA_LABEL: 'Learn now',
  HEADING_CHAT: 'Start learning with your AI Teacher',
  HEADING_ASK: 'What would you like to learn?',
  DEFAULT_PROMPTS: [
    {
      description: 'Explain photosynthesis in simple terms',
      topic: 'Biology',
      level: 'Beginner'
    },
    {
      description: 'How do neural networks work?',
      topic: 'Computer Science',
      level: 'Intermediate'
    },
    {
      description: 'What causes climate change?',
      topic: 'Environmental Science',
      level: 'Beginner'
    },
  ],
};

// Available topics for learning
const LEARNING_TOPICS = [
  { id: 'mathematics', name: 'Mathematics', icon: '🔢' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'biology', name: 'Biology', icon: '🧬' },
  { id: 'chemistry', name: 'Chemistry', icon: '⚗️' },
  { id: 'physics', name: 'Physics', icon: '⚛️' },
  { id: 'computer_science', name: 'Computer Science', icon: '💻' },
  { id: 'history', name: 'History', icon: '📚' },
  { id: 'literature', name: 'Literature', icon: '📖' },
  { id: 'languages', name: 'Languages', icon: '🗣️' },
  { id: 'art', name: 'Art', icon: '🎨' },
];

// Available skill levels
const SKILL_LEVELS = [
  { id: 'beginner', name: 'Beginner', description: 'Just starting out' },
  { id: 'intermediate', name: 'Intermediate', description: 'Some experience' },
  { id: 'advanced', name: 'Advanced', description: 'Deep knowledge' },
];

const NEXT_QUESTION_INDICATOR = 'Continue Learning:';

const educationRequestOptions = {
  approach: 'rrr',
  overrides: {
    retrieval_mode: 'hybrid',
    semantic_ranker: true,
    semantic_captions: false,
    suggest_followup_questions: true,
    // Education-specific overrides
    prompt_template_prefix: 'You are a helpful AI teacher. Explain concepts clearly and adapt your language to the student\'s level.',
    prompt_template_suffix: 'Always encourage further learning and ask if the student has follow-up questions.',
  },
};

const educationChatHttpOptions = {
  // API URL for development purposes
  url: 'http://localhost:3000',
  method: 'POST',
  stream: true,
};

const MAX_CHAT_HISTORY = 5;

const APPROACH_MODEL = ['rrr', 'rtr'];

export {
  educationConfig as globalConfig,
  educationRequestOptions as requestOptions,
  educationChatHttpOptions as chatHttpOptions,
  NEXT_QUESTION_INDICATOR,
  APPROACH_MODEL,
  educationTeaserListTexts as teaserListTexts,
  MAX_CHAT_HISTORY,
  LEARNING_TOPICS,
  SKILL_LEVELS,
};