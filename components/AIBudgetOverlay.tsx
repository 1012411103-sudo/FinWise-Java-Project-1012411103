import React from 'react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Sparkles, TrendingUp, TrendingDown, Target } from 'lucide-react';

interface AIBudgetOverlayProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  currentData: Array<{ name: string; value: number; color: string }>;
  aiSuggestedData: Array<{ name: string; value: number; color: string }>;
  className?: string;
}

export function AIBudgetOverlay({ 
  isEnabled, 
  onToggle, 
  currentData, 
  aiSuggestedData, 
  className = '' 
}: AIBudgetOverlayProps) {
  const calculateSavings = () => {
    const currentExpenses = currentData.find(item => item.name === 'Expenses')?.value || 0;
    const suggestedExpenses = aiSuggestedData.find(item => item.name === 'Expenses')?.value || 0;
    return currentExpenses - suggestedExpenses;
  };

  const calculateEfficiencyGain = () => {
    const currentSavings = currentData.find(item => item.name === 'Savings')?.value || 0;
    const suggestedSavings = aiSuggestedData.find(item => item.name === 'Savings')?.value || 0;
    const currentInvestments = currentData.find(item => item.name === 'Investments')?.value || 0;
    const suggestedInvestments = aiSuggestedData.find(item => item.name === 'Investments')?.value || 0;
    
    return (suggestedSavings + suggestedInvestments) - (currentSavings + currentInvestments);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* AI Toggle Control */}
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
              <div>
                <Label htmlFor="ai-overlay" className="text-amber-900 dark:text-amber-100 font-medium">
                  AI Budget Optimization
                </Label>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Compare current allocation with AI-optimized budget
                </p>
              </div>
            </div>
            <Switch
              id="ai-overlay"
              checked={isEnabled}
              onCheckedChange={onToggle}
              className="data-[state=checked]:bg-amber-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* AI Insights when enabled */}
      {isEnabled && (
        <div className="space-y-3">
          {/* Comparison Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <p className="text-sm text-green-800 dark:text-green-200">Expense Reduction</p>
                </div>
                <p className="text-lg font-semibold text-green-700 dark:text-green-300">
                  ₹{Math.abs(calculateSavings()).toLocaleString('en-IN')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <p className="text-sm text-blue-800 dark:text-blue-200">Wealth Growth</p>
                </div>
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  +₹{Math.abs(calculateEfficiencyGain()).toLocaleString('en-IN')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-600" />
                  <p className="text-sm text-purple-800 dark:text-purple-200">Efficiency Gain</p>
                </div>
                <p className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                  {((calculateEfficiencyGain() / (currentData.reduce((sum, item) => sum + item.value, 0))) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Legend for comparison */}
          <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 flex-wrap">
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-300">
                  <Sparkles className="h-3 w-3 mr-1" />
                  FinWise AI Optimized
                </Badge>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span>Current Budget</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <span>AI Suggested</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed comparison */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Budget Allocation Comparison</h4>
              <div className="space-y-3">
                {currentData.map((current, index) => {
                  const suggested = aiSuggestedData[index];
                  const difference = suggested.value - current.value;
                  const percentageChange = ((difference / current.value) * 100);
                  
                  return (
                    <div key={current.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: current.color }}
                        ></div>
                        <span className="font-medium">{current.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span>₹{current.value.toLocaleString('en-IN')}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-medium">₹{suggested.value.toLocaleString('en-IN')}</span>
                        <Badge 
                          variant={difference > 0 ? "secondary" : "outline"}
                          className={difference > 0 ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}
                        >
                          {difference > 0 ? '+' : ''}{percentageChange.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Generate AI-optimized budget data based on current data
export function generateAIOptimizedData(currentData: Array<{ name: string; value: number; color: string }>) {
  const total = currentData.reduce((sum, item) => sum + item.value, 0);
  
  // AI optimization rules:
  // 1. Reduce expenses by 10-15%
  // 2. Increase savings by 20-25%
  // 3. Increase investments by 15-20%
  // 4. Adjust remaining accordingly
  
  return currentData.map(item => {
    let optimizedValue = item.value;
    
    switch (item.name) {
      case 'Expenses':
        optimizedValue = item.value * 0.87; // 13% reduction
        break;
      case 'Savings':
        optimizedValue = item.value * 1.22; // 22% increase
        break;
      case 'Investments':
        optimizedValue = item.value * 1.18; // 18% increase
        break;
      case 'Remaining':
        // Calculate remaining after other optimizations
        const optimizedExpenses = currentData.find(d => d.name === 'Expenses')?.value * 0.87 || 0;
        const optimizedSavings = currentData.find(d => d.name === 'Savings')?.value * 1.22 || 0;
        const optimizedInvestments = currentData.find(d => d.name === 'Investments')?.value * 1.18 || 0;
        optimizedValue = Math.max(0, total - optimizedExpenses - optimizedSavings - optimizedInvestments);
        break;
    }
    
    return {
      ...item,
      value: Math.round(optimizedValue),
      color: item.color // Keep original colors for now, we'll add AI overlay colors in the chart
    };
  });
}