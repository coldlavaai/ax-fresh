/* ═══════════════════════════════════════════════════════════
   V4.5 Premium Chat Widget JavaScript
   Awesome Experiences - Travel Support
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    companyName: 'Awesome Experiences',
    companyPhone: '07932 619108',
    companyEmail: 'invest@awesomeexperiences.com',
    agentName: 'AX Support',
    agentAvatar: '✈️',
    welcomeMessage: 'Welcome to Awesome Experiences! Ready to plan your next adventure? 🌍',
    offlineMessage: 'We typically respond within a few hours.',
    businessHours: '24/7 Support Available',
  };

  // Initialize widget when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }

  function initWidget() {
    injectCSS();
    createWidget();
    attachEventListeners();
    showWelcomeMessage();
  }

  function injectCSS() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/chat-widget-v4.css';
    document.head.appendChild(link);
  }

  function createWidget() {
    const widgetHTML = `
      <!-- Chat Button -->
      <button id="chat-widget-button" aria-label="Open chat">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span id="chat-widget-badge" style="display: none;">1</span>
      </button>

      <!-- Chat Window -->
      <div id="chat-widget-window">
        <div id="chat-widget-header">
          <div id="chat-widget-avatar">${CONFIG.agentAvatar}</div>
          <div id="chat-widget-header-info">
            <div id="chat-widget-header-title">${CONFIG.companyName}</div>
            <div id="chat-widget-header-status">
              <span class="status-dot"></span>
              ${CONFIG.businessHours}
            </div>
          </div>
          <button id="chat-widget-close" aria-label="Close chat">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div id="chat-widget-messages"></div>

        <div id="chat-widget-input-area">
          <textarea
            id="chat-widget-input"
            placeholder="Type your message..."
            rows="1"
            aria-label="Chat message input"
          ></textarea>
          <button id="chat-widget-send" disabled aria-label="Send message">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = widgetHTML;
    document.body.appendChild(container);
  }

  function attachEventListeners() {
    const button = document.getElementById('chat-widget-button');
    const closeBtn = document.getElementById('chat-widget-close');
    const sendBtn = document.getElementById('chat-widget-send');
    const input = document.getElementById('chat-widget-input');

    button.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', closeChat);
    sendBtn.addEventListener('click', sendMessage);

    input.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 120) + 'px';
      sendBtn.disabled = !this.value.trim();
    });

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (this.value.trim()) {
          sendMessage();
        }
      }
    });
  }

  function toggleChat() {
    const window = document.getElementById('chat-widget-window');
    const badge = document.getElementById('chat-widget-badge');

    if (window.classList.contains('open')) {
      closeChat();
    } else {
      window.classList.add('open');
      badge.style.display = 'none';
      document.getElementById('chat-widget-input').focus();
    }
  }

  function closeChat() {
    const window = document.getElementById('chat-widget-window');
    window.classList.remove('open');
  }

  function showWelcomeMessage() {
    setTimeout(() => {
      addMessage({
        text: CONFIG.welcomeMessage,
        sender: 'agent',
        time: getCurrentTime()
      });

      setTimeout(() => {
        showQuickActions();
      }, 800);

      // Show badge if chat is closed
      const window = document.getElementById('chat-widget-window');
      if (!window.classList.contains('open')) {
        const badge = document.getElementById('chat-widget-badge');
        badge.style.display = 'flex';
        badge.textContent = '1';
      }
    }, 2000);
  }

  function showQuickActions() {
    const quickActions = [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>`,
        text: 'Call us: ' + CONFIG.companyPhone,
        action: () => window.location.href = 'tel:' + CONFIG.companyPhone.replace(/\s/g, '')
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
        text: 'Email: ' + CONFIG.companyEmail,
        action: () => window.location.href = 'mailto:' + CONFIG.companyEmail
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`,
        text: 'Start planning my trip',
        action: () => {
          addUserMessage('I want to start planning my trip');
          setTimeout(() => {
            addMessage({
              text: "Fantastic! I'd love to help you plan your perfect trip. Let me connect you with our team. You can reach us at " + CONFIG.companyPhone + " or " + CONFIG.companyEmail + " and we'll get started right away! 🎉",
              sender: 'agent',
              time: getCurrentTime()
            });
          }, 800);
        }
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        text: 'Investment opportunities',
        action: () => {
          addUserMessage('Tell me about investment opportunities');
          setTimeout(() => {
            addMessage({
              text: "We're raising £200k under the Enterprise Investment Scheme for our Summer 2026 launch. Email invest@awesomeexperiences.com or call 07932 619108 to learn more about joining our journey! 🚀",
              sender: 'agent',
              time: getCurrentTime()
            });
          }, 800);
        }
      }
    ];

    const actionsHTML = `
      <div class="chat-quick-actions">
        ${quickActions.map((action, i) => `
          <button class="chat-quick-action" data-action-index="${i}">
            ${action.icon}
            ${action.text}
          </button>
        `).join('')}
      </div>
    `;

    const messagesContainer = document.getElementById('chat-widget-messages');
    const actionsWrapper = document.createElement('div');
    actionsWrapper.className = 'chat-message agent';
    actionsWrapper.innerHTML = actionsHTML;
    messagesContainer.appendChild(actionsWrapper);
    scrollToBottom();

    // Attach click handlers
    actionsWrapper.querySelectorAll('.chat-quick-action').forEach((btn, i) => {
      btn.addEventListener('click', quickActions[i].action);
    });
  }

  function sendMessage() {
    const input = document.getElementById('chat-widget-input');
    const text = input.value.trim();

    if (!text) return;

    addUserMessage(text);
    input.value = '';
    input.style.height = 'auto';
    document.getElementById('chat-widget-send').disabled = true;

    // Simulate agent typing
    setTimeout(() => {
      showTypingIndicator();
      setTimeout(() => {
        hideTypingIndicator();
        handleUserMessage(text);
      }, 1500);
    }, 300);
  }

  function addUserMessage(text) {
    addMessage({
      text: text,
      sender: 'user',
      time: getCurrentTime()
    });
  }

  function addMessage({ text, sender, time }) {
    const messagesContainer = document.getElementById('chat-widget-messages');
    const messageHTML = `
      <div class="chat-message ${sender}">
        <div class="chat-message-avatar">${sender === 'agent' ? CONFIG.agentAvatar : 'Y'}</div>
        <div>
          <div class="chat-message-bubble">${text}</div>
          <div class="chat-message-time">${time}</div>
        </div>
      </div>
    `;

    const messageEl = document.createElement('div');
    messageEl.innerHTML = messageHTML;
    messagesContainer.appendChild(messageEl.firstElementChild);
    scrollToBottom();
  }

  function handleUserMessage(text) {
    const lowerText = text.toLowerCase();
    let response = '';

    if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('expensive')) {
      response = "Our trips are 10-15% below traditional operators because our AI technology minimizes admin costs. For specific pricing, call us at " + CONFIG.companyPhone + " and we'll create a personalized quote! 💰";
    } else if (lowerText.includes('book') || lowerText.includes('start') || lowerText.includes('plan')) {
      response = "Exciting! To start planning your perfect trip, reach out at " + CONFIG.companyEmail + " or call " + CONFIG.companyPhone + ". We'll build your personalized itinerary with our AI Trip Builder! ✈️";
    } else if (lowerText.includes('invest') || lowerText.includes('funding') || lowerText.includes('eis')) {
      response = "We're raising £200k under EIS for our Summer 2026 launch. Contact invest@awesomeexperiences.com or call 07932 619108 to learn about this exciting opportunity! 📈";
    } else if (lowerText.includes('atol') || lowerText.includes('protected') || lowerText.includes('safe')) {
      response = "Yes! All our trips are ATOL protected with 24/7 overseas support, externally approved health & safety standards, and ethical/environmental compliance. Your peace of mind matters! 🛡️";
    } else if (lowerText.includes('destination') || lowerText.includes('where') || lowerText.includes('travel')) {
      response = "We offer worldwide destinations! From Santorini to the Maldives, Swiss Alps to Amalfi Coast. Our AI builds custom itineraries for any destination you dream of! 🌍";
    } else {
      response = "Great question! For detailed information, please reach out to our team at " + CONFIG.companyEmail + " or call " + CONFIG.companyPhone + ". We'd love to help you personally! 😊";
    }

    addMessage({
      text: response,
      sender: 'agent',
      time: getCurrentTime()
    });
  }

  function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-widget-messages');
    const indicatorHTML = `
      <div class="chat-message agent" id="typing-indicator">
        <div class="chat-message-avatar">${CONFIG.agentAvatar}</div>
        <div class="chat-message-bubble">
          <div class="typing-indicator">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>
      </div>
    `;

    const indicatorEl = document.createElement('div');
    indicatorEl.innerHTML = indicatorHTML;
    messagesContainer.appendChild(indicatorEl.firstElementChild);
    scrollToBottom();
  }

  function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  function scrollToBottom() {
    const messagesContainer = document.getElementById('chat-widget-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
})();
