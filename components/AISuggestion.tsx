import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, TrendingUp, TrendingDown, Target, DollarSign } from 'lucide-react';

interface AISuggestionProps {
  type: 'savings' | 'expenditure' | 'budget' | 'investment' | 'general';
  title: string;
  description: string;
  impact?: string;
  amount?: number;
  className?: string;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'savings':
      return TrendingUp;
    case 'expenditure':
      return TrendingDown;
    case 'budget':
      return Target;
    case 'investment':
      return DollarSign;
    default:
      return Sparkles;
  }
};

const getImpactColor = (impact?: string) => {
  switch (impact) {
    case 'high':
      return 'text-green-600';
    case 'medium':
      return 'text-yellow-600';
    case 'low':
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
};

export function AISuggestion({ 
  type, 
  title, 
  description, 
  impact, 
  amount, 
  className = '' 
}: AISuggestionProps) {
  const Icon = getIcon(type);
  
  return (
    <Card className={`border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Animated Sparkle Icon */}
          <div className="relative">
            <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
            <div className="absolute -top-1 -right-1">
              <div className="h-2 w-2 bg-amber-400 rounded-full animate-ping"></div>
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            {/* Header with FinWise AI badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900 dark:text-amber-200">
                <Sparkles className="h-3 w-3 mr-1" />
                FinWise AI suggests
              </Badge>
              {impact && (
                <Badge variant="outline" className={`${getImpactColor(impact)} border-current`}>
                  {impact} impact
                </Badge>
              )}
            </div>
            
            {/* Suggestion Content */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-amber-600" />
                <h4 className="font-medium text-amber-900 dark:text-amber-100">{title}</h4>
                {amount && (
                  <span className="ml-auto font-semibold text-amber-700 dark:text-amber-300">
                    ₹{amount.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Predefined AI suggestions for different contexts
export const aiSuggestions = {
  dashboard: [
    {
      type: 'savings' as const,
      title: 'Optimize Your Monthly Savings',
      description: 'Based on your spending patterns, you can save an additional ₹8,500 by reducing dining out expenses and switching to a better investment plan.',
      impact: 'high' as const,
      amount: 8500
    },
    {
      type: 'budget' as const,
      title: 'Adjust Entertainment Budget',
      description: 'Your entertainment expenses are 23% above the recommended limit. Consider reducing by ₹3,200 monthly for better financial health.',
      impact: 'medium' as const,
      amount: 3200
    }
  ],
  
  budget: [
    {
      type: 'budget' as const,
      title: 'Rebalance Budget Categories',
      description: 'Shift ₹5,000 from miscellaneous to emergency fund. Your current emergency fund is below the 6-month recommended amount.',
      impact: 'high' as const,
      amount: 5000
    },
    {
      type: 'savings' as const,
      title: 'Automate Savings Transfer',
      description: 'Set up automatic transfer of ₹12,000 monthly to high-yield savings account on salary day for consistent wealth building.',
      impact: 'high' as const,
      amount: 12000
    }
  ],
  
  expenses: [
    {
      type: 'expenditure' as const,
      title: 'Reduce Subscription Costs',
      description: 'You have 8 active subscriptions costing ₹2,340 monthly. Cancel unused services to save ₹1,450 per month.',
      impact: 'medium' as const,
      amount: 1450
    },
    {
      type: 'expenditure' as const,
      title: 'Optimize Grocery Shopping',
      description: 'Shop during weekday evenings for 15-20% discounts. Bulk buying non-perishables can save ₹1,800 monthly.',
      impact: 'medium' as const,
      amount: 1800
    }
  ],
  
  investments: [
    {
      type: 'investment' as const,
      title: 'Diversify Investment Portfolio',
      description: 'Your portfolio is 70% equity-heavy. Consider allocating ₹25,000 to debt funds for better risk management.',
      impact: 'high' as const,
      amount: 25000
    },
    {
      type: 'investment' as const,
      title: 'Tax-Saving Investment Opportunity',
      description: 'Invest ₹46,000 more in ELSS funds before March to save ₹14,300 in taxes and maximize 80C deduction.',
      impact: 'high' as const,
      amount: 46000
    }
  ]
};