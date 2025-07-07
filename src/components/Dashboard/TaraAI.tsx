import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockTaraSessions } from '../../data/mockData';
import { Send, Bot, User, Mic, MicOff } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'tara';
  timestamp: Date;
}

const TaraAI: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (sessionStarted && messages.length === 0) {
      // Start session with welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: `Hello ${user?.name}! I'm Tara, your AI wellness companion. I'm here to listen, support, and help you navigate your mental health journey. How are you feeling today?`,
        sender: 'tara',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);

      // Record session start
      if (user) {
        mockTaraSessions.push({
          id: Date.now().toString(),
          userId: user.id,
          startedAt: new Date().toISOString(),
          completed: false
        });
      }
    }
  }, [sessionStarted, user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateTaraResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Anxiety-related responses
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) {
      return "I understand that anxiety can feel overwhelming. It's completely normal to feel this way sometimes. Let's try a simple breathing exercise together: breathe in for 4 counts, hold for 4, then breathe out for 6. Would you like to talk about what's making you feel anxious?";
    }
    
    // Depression-related responses
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      return "I hear that you're going through a difficult time. Your feelings are valid, and it's okay to not be okay sometimes. Remember that you're not alone in this. What's one small thing that usually brings you a bit of comfort or joy?";
    }
    
    // Stress-related responses
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) {
      return "Stress can really take a toll on both our minds and bodies. It sounds like you're dealing with a lot right now. Let's break things down - what feels like the most pressing concern for you today? Sometimes tackling one thing at a time can make everything feel more manageable.";
    }
    
    // Sleep-related responses
    if (lowerMessage.includes('sleep') || lowerMessage.includes('tired') || lowerMessage.includes('insomnia')) {
      return "Sleep issues can really affect how we feel during the day. Good sleep hygiene can make a big difference. Have you tried establishing a regular bedtime routine? I can share some techniques that might help you relax before bed.";
    }
    
    // Positive responses
    if (lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('happy') || lowerMessage.includes('better')) {
      return "That's wonderful to hear! I'm so glad you're feeling positive today. It's important to acknowledge and celebrate these good moments. What's contributing to you feeling this way? Sometimes identifying what helps us feel good can be useful for future reference.";
    }
    
    // School/academic stress
    if (lowerMessage.includes('school') || lowerMessage.includes('exam') || lowerMessage.includes('study') || lowerMessage.includes('grade')) {
      return "Academic pressure is something many students face, and it's completely understandable to feel stressed about school. Remember that your worth isn't defined by your grades. What specific aspect of school is causing you the most concern right now?";
    }
    
    // Social/relationship issues
    if (lowerMessage.includes('friend') || lowerMessage.includes('social') || lowerMessage.includes('lonely') || lowerMessage.includes('relationship')) {
      return "Relationships and social connections are so important for our wellbeing, and it can be really hard when we're struggling in these areas. You're not alone in feeling this way. Would you like to talk about what's happening with your relationships or social life?";
    }
    
    // Default supportive responses
    const defaultResponses = [
      "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about how you're feeling?",
      "I appreciate you opening up to me. Your feelings and experiences are important. What would be most helpful for you to talk about right now?",
      "It sounds like you have a lot on your mind. I'm here to help you work through whatever you're experiencing. What feels most significant to you today?",
      "I'm glad you're taking the time to check in with yourself and reach out. That takes courage. How can I best support you in this moment?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate Tara thinking/typing
    setTimeout(() => {
      const taraResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateTaraResponse(inputMessage),
        sender: 'tara',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, taraResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startSession = () => {
    setSessionStarted(true);
  };

  if (!sessionStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bot className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meet Tara</h1>
          <p className="text-lg text-gray-600 mb-6">Your AI-powered wellness companion</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How Tara Can Help</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>24/7 emotional support and active listening</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Coping strategies for anxiety and stress</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Mindfulness and relaxation techniques</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Personalized wellness recommendations</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Privacy & Safety</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Your conversations are confidential</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>No judgment, just support</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Crisis resources available when needed</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Complements professional mental health care</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={startSession}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Conversation with Tara
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Remember: Tara is here to support you, but in case of emergency, please contact emergency services or a crisis hotline.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-t-xl shadow-sm border border-gray-200 border-b-0 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Tara AI</h2>
            <p className="text-sm text-gray-500">Your wellness companion</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-white border-l border-r border-gray-200 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-emerald-100' 
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}>
                {message.sender === 'user' ? (
                  <User className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Bot className="h-4 w-4 text-white" />
                )}
              </div>
              <div className={`px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-emerald-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 border-t-0 p-4">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message to Tara..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default TaraAI;