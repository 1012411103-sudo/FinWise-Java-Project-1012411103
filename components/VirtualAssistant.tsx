import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  TrendingUp, 
  PieChart, 
  CreditCard,
  Target,
  Lightbulb,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Mic,
  MicOff,
  Volume2,
  Copy,
  Sparkles
} from 'lucide-react';
import { AISuggestion, aiSuggestions } from './AISuggestion';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
  actionButtons?: Array<{
    label: string;
    action: string;
    variant?: 'default' | 'outline';
  }>;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  query: string;
  category: 'budget' | 'investment' | 'expense' | 'goal';
}

export function VirtualAssistantComponent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your FinWise AI Assistant. I can help you with budgeting, investment advice, expense analysis, and financial planning. What would you like to know today?",
      timestamp: new Date().toLocaleTimeString(),
      suggestions: [
        "Analyze my spending patterns",
        "Investment recommendations",
        "Budget optimization tips",
        "Financial goal planning"
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    {
      id: '1',
      label: 'Expense Analysis',
      icon: <PieChart className="h-4 w-4" />,
      query: 'Analyze my spending patterns for this month',
      category: 'expense'
    },
    {
      id: '2',
      label: 'Investment Tips',
      icon: <TrendingUp className="h-4 w-4" />,
      query: 'Give me investment recommendations based on my profile',
      category: 'investment'
    },
    {
      id: '3',
      label: 'Budget Review',
      icon: <Target className="h-4 w-4" />,
      query: 'Review my current budget and suggest improvements',
      category: 'budget'
    },
    {
      id: '4',
      label: 'Goal Planning',
      icon: <Target className="h-4 w-4" />,
      query: 'Help me plan my financial goals',
      category: 'goal'
    },
    {
      id: '5',
      label: 'Tax Optimization',
      icon: <DollarSign className="h-4 w-4" />,
      query: 'How can I optimize my taxes this year?',
      category: 'budget'
    },
    {
      id: '6',
      label: 'Emergency Fund',
      icon: <AlertTriangle className="h-4 w-4" />,
      query: 'How much should I keep in my emergency fund?',
      category: 'goal'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userQuery: string): Message => {
    const responses: { [key: string]: any } = {
      'spending': {
        content: "Based on your recent transactions, I've analyzed your spending patterns:\n\n📊 **Key Insights:**\n• Food & Dining: ₹12,500 (26.6% of expenses) - 15% increase from last month\n• Transportation: ₹8,500 (18.1%) - Well within budget\n• Shopping: ₹7,800 (16.6%) - Consider setting a monthly limit\n\n💡 **Recommendations:**\n• Try to reduce food delivery expenses by ₹2,000\n• Your transportation costs are optimized\n• Set a ₹6,000 monthly shopping budget",
        actionButtons: [
          { label: 'Set Food Budget', action: 'set_budget', variant: 'default' },
          { label: 'View Detailed Report', action: 'view_report', variant: 'outline' }
        ]
      },
      'investment': {
        content: "Based on your risk profile (Medium) and annual income (₹12L), here are my recommendations:\n\n🎯 **Investment Strategy:**\n• **Emergency Fund:** ₹3L (3-6 months expenses) - Priority 1\n• **Equity Mutual Funds:** 60% allocation via SIP\n• **Debt Funds:** 30% for stability\n• **Direct Stocks:** 10% for growth (blue-chip companies)\n\n📈 **Suggested SIPs:**\n• Axis Blue Chip Fund: ₹5,000/month\n• HDFC Tax Saver: ₹3,000/month\n• Mirae Asset Large Cap: ₹2,000/month\n\n⚠️ **Note:** Start with small amounts and increase gradually.",
        actionButtons: [
          { label: 'Start SIP', action: 'start_sip', variant: 'default' },
          { label: 'View Fund Details', action: 'view_funds', variant: 'outline' }
        ]
      },
      'budget': {
        content: "Let me review your current budget allocation:\n\n💰 **Budget Health Score: 78/100**\n\n✅ **Strengths:**\n• Savings rate: 24.7% (Excellent!)\n• Bills & utilities well managed\n• Investment discipline maintained\n\n⚠️ **Areas to Improve:**\n• Food expenses over budget by ₹2,500\n• Shopping budget exceeded by ₹1,800\n• No entertainment budget set\n\n🎯 **Optimization Tips:**\n• Reduce food delivery by cooking 2-3 more meals at home\n• Set a ₹6,000 monthly shopping limit\n• Allocate ₹3,000 for entertainment",
        actionButtons: [
          { label: 'Apply Suggestions', action: 'apply_budget', variant: 'default' },
          { label: 'Custom Budget', action: 'custom_budget', variant: 'outline' }
        ]
      },
      'goal': {
        content: "Let's plan your financial goals systematically:\n\n🎯 **Goal Planning Framework:**\n\n**Short-term (1-2 years):**\n• Emergency Fund: ₹3,00,000 (82% complete)\n• Vacation Fund: ₹1,50,000 (56% complete)\n\n**Medium-term (3-5 years):**\n• Car Down Payment: ₹2,00,000 (62% complete)\n• Home Renovation: ₹5,00,000 (36% complete)\n\n**Long-term (5+ years):**\n• Retirement Corpus: ₹2 Crore (Start early!)\n• Child Education: ₹25 Lakh\n\n📊 **Monthly Allocation Needed:**\n• Emergency Fund: ₹8,000/month\n• Retirement: ₹15,000/month SIP",
        actionButtons: [
          { label: 'Set New Goal', action: 'set_goal', variant: 'default' },
          { label: 'Adjust Timeline', action: 'adjust_goal', variant: 'outline' }
        ]
      },
      'tax': {
        content: "Here's your tax optimization strategy for FY 2024-25:\n\n💸 **Current Tax Liability:** ~₹1,20,000\n\n🏆 **Tax Saving Opportunities:**\n• Section 80C: ₹1.5L (ELSS, PPF, Home Loan Principal)\n• Section 80D: ₹25,000 (Health Insurance)\n• NPS (80CCD): ₹50,000 additional deduction\n• HRA Exemption: ₹60,000 annually\n\n💡 **Recommendations:**\n• Invest ₹12,500/month in ELSS funds\n• Increase health insurance to ₹10L family floater\n• Consider NPS for additional tax benefits\n\n💰 **Potential Savings:** ₹65,000 in taxes!",
        actionButtons: [
          { label: 'Start Tax Saving', action: 'start_tax_saving', variant: 'default' },
          { label: 'View Tax Calculator', action: 'tax_calculator', variant: 'outline' }
        ]
      },
      'emergency': {
        content: "Emergency Fund Planning:\n\n🛡️ **Recommended Emergency Fund:** ₹3,00,000\n\n📊 **Calculation Basis:**\n• Monthly expenses: ₹50,000\n• Recommended coverage: 6 months\n• Current progress: ₹1,85,000 (61.7%)\n\n💪 **How to Build:**\n• Increase monthly allocation to ₹10,000\n• Use high-yield savings account or liquid funds\n• Target completion: 11 months\n\n🎯 **Fund Allocation:**\n• 50% in high-yield savings (instant access)\n• 30% in liquid mutual funds (1-day access)\n• 20% in short-term FDs (7-day access)\n\n⚡ **Auto-transfer:** Set up automatic transfer of ₹10,000 monthly",
        actionButtons: [
          { label: 'Set Auto-Transfer', action: 'auto_transfer', variant: 'default' },
          { label: 'View Fund Options', action: 'emergency_funds', variant: 'outline' }
        ]
      }
    };

    // Simple keyword matching to determine response
    const query = userQuery.toLowerCase();
    let responseKey = 'default';
    
    if (query.includes('spending') || query.includes('expense') || query.includes('pattern')) {
      responseKey = 'spending';
    } else if (query.includes('investment') || query.includes('invest') || query.includes('sip') || query.includes('mutual fund')) {
      responseKey = 'investment';
    } else if (query.includes('budget') || query.includes('improve') || query.includes('review')) {
      responseKey = 'budget';
    } else if (query.includes('goal') || query.includes('plan') || query.includes('target')) {
      responseKey = 'goal';
    } else if (query.includes('tax') || query.includes('save') || query.includes('deduction')) {
      responseKey = 'tax';
    } else if (query.includes('emergency') || query.includes('fund')) {
      responseKey = 'emergency';
    }

    const response = responses[responseKey] || {
      content: "I understand you're asking about financial planning. Could you be more specific? I can help you with:\n\n• Expense analysis and budgeting\n• Investment recommendations\n• Goal planning and tracking\n• Tax optimization strategies\n• Emergency fund planning\n• Debt management\n\nWhat specific area would you like me to focus on?",
      suggestions: [
        "Analyze my expenses",
        "Investment advice",
        "Budget planning",
        "Tax saving tips"
      ]
    };

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: response.content,
      timestamp: new Date().toLocaleTimeString(),
      suggestions: response.suggestions,
      actionButtons: response.actionButtons
    };
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleQuickAction = (action: QuickAction) => {
    sendMessage(action.query);
  };

  const handleActionButton = (action: string) => {
    // Mock action handling
    const actionMessages: { [key: string]: string } = {
      'set_budget': 'Great! I\'ll help you set up a food budget. Redirecting to Budget Planner...',
      'view_report': 'Opening detailed expense report...',
      'start_sip': 'Perfect! Let\'s start your SIP journey. Redirecting to Investment section...',
      'view_funds': 'Here are the top-rated mutual funds for your profile...',
      'apply_budget': 'Applying budget optimizations... Budget updated successfully!',
      'custom_budget': 'Opening custom budget builder...',
      'set_goal': 'Let\'s create a new financial goal. Redirecting to Goal Planner...',
      'adjust_goal': 'Opening goal adjustment panel...',
      'start_tax_saving': 'Starting tax saving investment plan...',
      'tax_calculator': 'Opening tax calculator...',
      'auto_transfer': 'Setting up automatic transfer for emergency fund...',
      'emergency_funds': 'Showing emergency fund investment options...'
    };

    const actionMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: actionMessages[action] || 'Action completed successfully!',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, actionMessage]);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Mock voice input
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputValue("Analyze my spending patterns");
      }, 3000);
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Enhanced AI Banner */}
      <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-amber-500 animate-pulse" />
              <div className="absolute -top-1 -right-1">
                <div className="h-3 w-3 bg-amber-400 rounded-full animate-ping"></div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-100">
                FinWise AI Assistant
              </h2>
              <p className="text-amber-800 dark:text-amber-200">
                Your intelligent financial companion providing personalized insights and recommendations
              </p>
            </div>
            <Badge className="bg-amber-100 text-amber-800 border-amber-300 px-3 py-1">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick AI Suggestions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Quick AI Insights</h3>
        <div className="grid gap-4">
          {aiSuggestions.dashboard.slice(0, 1).map((suggestion, index) => (
            <AISuggestion
              key={index}
              type={suggestion.type}
              title={suggestion.title}
              description={suggestion.description}
              impact={suggestion.impact}
              amount={suggestion.amount}
            />
          ))}
        </div>
      </div>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            Virtual Financial Assistant
            <Badge variant="outline" className="bg-green-50 text-green-700">
              AI Powered
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto p-4 justify-start"
                onClick={() => handleQuickAction(action)}
              >
                <div className="flex items-center gap-3">
                  {action.icon}
                  <span className="text-sm">{action.label}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Chat with FinWise AI
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.type === 'assistant' && (
                        <Bot className="h-5 w-5 mt-0.5 text-blue-500" />
                      )}
                      {message.type === 'user' && (
                        <User className="h-5 w-5 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="whitespace-pre-line">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-70">
                            {message.timestamp}
                          </span>
                          {message.type === 'assistant' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyMessage(message.content)}
                              className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {message.actionButtons && (
                      <div className="flex gap-2 mt-3">
                        {message.actionButtons.map((button, index) => (
                          <Button
                            key={index}
                            variant={button.variant || 'default'}
                            size="sm"
                            onClick={() => handleActionButton(button.action)}
                            className={message.type === 'user' ? 'bg-white text-blue-500 hover:bg-gray-100' : ''}
                          >
                            {button.label}
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs bg-white text-gray-700 hover:bg-gray-50"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-blue-500" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                      <span className="text-sm text-gray-500">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about your finances..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                  className="pr-12"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleVoiceInput}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${
                    isListening ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              <Button onClick={() => sendMessage(inputValue)} disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {isListening && (
              <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Listening... Speak now
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Today's AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Portfolio Performance</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Your investment portfolio has grown by 2.3% this month. Consider increasing your SIP amount by ₹2,000.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">Goal Progress</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                You're on track to complete your emergency fund goal 2 months ahead of schedule!
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-800">Spending Alert</span>
              </div>
              <p className="text-sm text-orange-700 mt-1">
                Your food expenses are 23% higher than usual. Consider meal planning to optimize costs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}