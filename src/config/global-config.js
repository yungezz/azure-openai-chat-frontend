const globalConfig = {
  BOT_TYPING_EFFECT_INTERVAL: 50, // in ms

  // Is default prompts enabled?
  IS_DEFAULT_PROMPTS_ENABLED: true,
  // Default prompts to display in the chat
  DISPLAY_DEFAULT_PROMPTS_BUTTON: 'Not sure what to learn? Try our suggestions!',
  // This are the chat bubbles that will be displayed in the chat
  CHAT_MESSAGES: [],
  // This are the labels for the chat button and input
  CHAT_BUTTON_LABEL_TEXT: 'Ask Teacher',
  CHAT_CANCEL_BUTTON_LABEL_TEXT: 'Cancel Generation',
  CHAT_VOICE_BUTTON_LABEL_TEXT: 'Voice input',
  CHAT_VOICE_REC_BUTTON_LABEL_TEXT: 'Listening to voice input',
  CHAT_INPUT_PLACEHOLDER: 'Ask me anything you want to learn, eg. "Explain photosynthesis"',
  USER_IS_BOT: 'AI Teacher',
  RESET_BUTTON_LABEL_TEXT: 'X',
  RESET_BUTTON_TITLE_TEXT: 'Reset current question',
  RESET_CHAT_BUTTON_TITLE: 'Reset chat',
  // Copy response to clipboard
  COPY_RESPONSE_BUTTON_LABEL_TEXT: 'Copy Response',
  COPIED_SUCCESSFULLY_MESSAGE: 'Response copied!',
  // Follow up questions text
  FOLLOW_UP_QUESTIONS_LABEL_TEXT: 'You can also ask...',
  SHOW_THOUGH_PROCESS_BUTTON_LABEL_TEXT: 'Show thought process',
  HIDE_THOUGH_PROCESS_BUTTON_LABEL_TEXT: 'Hide thought process',
  LOADING_INDICATOR_TEXT: 'Please wait. I am preparing your learning materials...',
  LOADING_TEXT: 'Loading...',
  // API ERROR HANDLING IN UI
  API_ERROR_MESSAGE: 'Sorry, I am having some technical difficulties. Please try again later.',
  INVALID_REQUEST_ERROR: 'I cannot help with this query. Please ask me something educational and try again.',
  // Config pertaining the response format
  THOUGHT_PROCESS_LABEL: 'Teaching Process',
  SUPPORT_CONTEXT_LABEL: 'Learning Context',
  CITATIONS_LABEL: 'Learn More:',
  CITATIONS_TAB_LABEL: 'Citations',
  // Custom Branding
  IS_CUSTOM_BRANDING: true,
  // Custom Branding details
  // All these should come from persistence config
  BRANDING_URL: '#',
  BRANDING_LOGO_ALT: 'AI Teacher Logo',
  BRANDING_HEADLINE: 'Welcome to Your Personal AI Teacher',
  SHOW_CHAT_HISTORY_LABEL: 'Show Chat History',
  HIDE_CHAT_HISTORY_LABEL: 'Hide Chat History',
  CHAT_MAX_COUNT_TAG: '{MAX_CHAT_HISTORY}',
  CHAT_HISTORY_FOOTER_TEXT: 'Showing past {MAX_CHAT_HISTORY} conversations',
};

const teaserListTexts = {
  TEASER_CTA_LABEL: 'Learn now',
  HEADING_CHAT: 'What would you like to learn today?',
  HEADING_ASK: 'Ask your teacher',
  DEFAULT_PROMPTS: [
    {
      description: 'Explain photosynthesis in simple terms',
    },
    {
      description: 'How do I solve quadratic equations?',
    },
    {
      description: 'What caused World War I?',
    },
    {
      description: 'Teach me basic programming concepts',
    },
  ],
};

const NEXT_QUESTION_INDICATOR = 'Next Questions:';

const requestOptions = {
  approach: 'rrr',
  overrides: {
    retrieval_mode: 'hybrid',
    semantic_ranker: true,
    semantic_captions: false,
    suggest_followup_questions: true,
  },
};

const chatHttpOptions = {
  // API URL for development purposes
  url: 'http://localhost:3000',
  method: 'POST',
  stream: true,
};

const MAX_CHAT_HISTORY = 5;

const APPROACH_MODEL = ['rrr', 'rtr'];

export {
  globalConfig,
  requestOptions,
  chatHttpOptions,
  NEXT_QUESTION_INDICATOR,
  APPROACH_MODEL,
  teaserListTexts,
  MAX_CHAT_HISTORY,
};
