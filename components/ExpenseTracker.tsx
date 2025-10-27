import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { 
  PieChart as PieChartIcon, 
  TrendingUp, 
  TrendingDown,
  Receipt,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { AISuggestion, aiSuggestions } from './AISuggestion';
import { AIBudgetOverlay, generateAIOptimizedData } from './AIBudgetOverlay';

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  subcategory: string;
  date: string;
  paymentMethod: string;
  location?: string;
  isRecurring: boolean;
  tags: string[];
}

interface CategoryBudget {
  category: string;
  budgetLimit: number;
  spent: number;
  color: string;
}

export function ExpenseTrackerComponent() {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAIOverlay, setShowAIOverlay] = useState(false);

  const categories = [
    { name: 'Food & Dining', subcategories: ['Restaurants', 'Groceries', 'Food Delivery', 'Coffee'] },
    { name: 'Transportation', subcategories: ['Fuel', 'Public Transport', 'Taxi/Uber', 'Parking'] },
    { name: 'Shopping', subcategories: ['Clothing', 'Electronics', 'Home & Garden', 'Books'] },
    { name: 'Entertainment', subcategories: ['Movies', 'Games', 'Sports', 'Subscriptions'] },
    { name: 'Bills & Utilities', subcategories: ['Electricity', 'Water', 'Internet', 'Phone'] },
    { name: 'Healthcare', subcategories: ['Medical', 'Pharmacy', 'Fitness', 'Insurance'] },
    { name: 'Education', subcategories: ['Courses', 'Books', 'Software', 'Certification'] },
    { name: 'Travel', subcategories: ['Flights', 'Hotels', 'Local Transport', 'Activities'] }
  ];

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      amount: 2500,
      description: 'Dinner at Restaurant',
      category: 'Food & Dining',
      subcategory: 'Restaurants',
      date: '2024-01-15',
      paymentMethod: 'Credit Card',
      location: 'Mumbai, Maharashtra',
      isRecurring: false,
      tags: ['dinner', 'weekend']
    },
    {
      id: '2',
      amount: 1200,
      description: 'Grocery Shopping',
      category: 'Food & Dining',
      subcategory: 'Groceries',
      date: '2024-01-14',
      paymentMethod: 'UPI',
      location: 'Local Store',
      isRecurring: true,
      tags: ['essentials', 'weekly']
    },
    {
      id: '3',
      amount: 850,
      description: 'Uber Ride',
      category: 'Transportation',
      subcategory: 'Taxi/Uber',
      date: '2024-01-14',
      paymentMethod: 'Wallet',
      location: 'Mumbai, Maharashtra',
      isRecurring: false,
      tags: ['work', 'commute']
    },
    {
      id: '4',
      amount: 3200,
      description: 'Online Shopping - Electronics',
      category: 'Shopping',
      subcategory: 'Electronics',
      date: '2024-01-13',
      paymentMethod: 'Credit Card',
      isRecurring: false,
      tags: ['gadgets', 'online']
    },
    {
      id: '5',
      amount: 599,
      description: 'Netflix Subscription',
      category: 'Entertainment',
      subcategory: 'Subscriptions',
      date: '2024-01-12',
      paymentMethod: 'Credit Card',
      isRecurring: true,
      tags: ['monthly', 'streaming']
    }
  ]);

  const [categoryBudgets, setCategoryBudgets] = useState<CategoryBudget[]>([
    { category: 'Food & Dining', budgetLimit: 15000, spent: 8750, color: '#1e40af' },
    { category: 'Transportation', budgetLimit: 8000, spent: 6200, color: '#0891b2' },
    { category: 'Shopping', budgetLimit: 10000, spent: 12500, color: '#7c3aed' },
    { category: 'Entertainment', budgetLimit: 5000, spent: 2400, color: '#059669' },
    { category: 'Bills & Utilities', budgetLimit: 6000, spent: 4800, color: '#dc2626' },
    { category: 'Healthcare', budgetLimit: 4000, spent: 1200, color: '#0d9488' },
    { category: 'Education', budgetLimit: 3000, spent: 800, color: '#65a30d' },
    { category: 'Travel', budgetLimit: 15000, spent: 0, color: '#ea580c' }
  ]);

  const getCategoryTotal = (category: string) => {
    return expenses
      .filter(expense => category === 'all' || expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const getFilteredExpenses = () => {
    return expenses.filter(expense => 
      selectedCategory === 'all' || expense.category === selectedCategory
    );
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getCategoryDescription = (category: string): string => {
    const descriptions: { [key: string]: string } = {
      'Food & Dining': 'Used for daily meals, groceries, restaurants, and food delivery',
      'Transportation': 'Used for fuel, public transit, ride-sharing, and parking fees',
      'Shopping': 'Used for clothing, electronics, home goods, and online purchases',
      'Entertainment': 'Used for movies, gaming, sports activities, and streaming subscriptions',
      'Bills & Utilities': 'Used for electricity, water, internet, phone, and utility payments',
      'Healthcare': 'Used for medical expenses, pharmacy, fitness, and health insurance',
      'Education': 'Used for courses, books, software licenses, and certification programs',
      'Travel': 'Used for flights, hotels, local transportation, and travel activities'
    };
    return descriptions[category] || 'General expenses';
  };

  const pieData = categoryBudgets.map(budget => ({
    name: budget.category,
    value: budget.spent,
    color: budget.color,
    budget: budget.budgetLimit
  }));

  // Generate AI optimized expense data
  const generateAIOptimizedExpenseData = (currentData: typeof pieData) => {
    return currentData.map(item => {
      let optimizedValue = item.value;
      
      // AI optimization rules for different expense categories
      switch (item.name) {
        case 'Food & Dining':
          optimizedValue = item.value * 0.85; // 15% reduction through meal planning
          break;
        case 'Transportation':
          optimizedValue = item.value * 0.88; // 12% reduction through carpooling/planning
          break;
        case 'Shopping':
          optimizedValue = item.value * 0.75; // 25% reduction through smart shopping
          break;
        case 'Entertainment':
          optimizedValue = item.value * 0.70; // 30% reduction through subscription optimization
          break;
        case 'Bills & Utilities':
          optimizedValue = item.value * 0.92; // 8% reduction through energy savings
          break;
        case 'Healthcare':
          optimizedValue = item.value * 0.95; // 5% reduction through preventive care
          break;
        case 'Education':
          optimizedValue = item.value * 0.90; // 10% reduction through smart learning
          break;
        case 'Travel':
          optimizedValue = item.value * 0.80; // 20% reduction through planning
          break;
        default:
          optimizedValue = item.value * 0.85;
      }
      
      return {
        ...item,
        value: Math.round(optimizedValue)
      };
    });
  };

  const aiOptimizedExpenseData = generateAIOptimizedExpenseData(pieData);
  
  // Create combined data for AI overlay display
  const expenseChartDisplayData = showAIOverlay ? 
    [...pieData.map(item => ({ ...item, opacity: 0.6 })), 
     ...aiOptimizedExpenseData.map(item => ({ 
       ...item, 
       name: `${item.name} (AI)`, 
       color: '#fbbf24', // AI suggestion color
       opacity: 1 
     }))] : pieData;

  const trendData = [
    { period: 'Week 1', amount: 8500 },
    { period: 'Week 2', amount: 12300 },
    { period: 'Week 3', amount: 9800 },
    { period: 'Week 4', amount: 11200 }
  ];

  const dailySpendingData = [
    { day: 'Mon', amount: 1500 },
    { day: 'Tue', amount: 2300 },
    { day: 'Wed', amount: 800 },
    { day: 'Thu', amount: 3200 },
    { day: 'Fri', amount: 2100 },
    { day: 'Sat', amount: 4500 },
    { day: 'Sun', amount: 1800 }
  ];

  // Generate AI optimized daily spending data
  const dailyChartData = showAIOverlay ? 
    dailySpendingData.map(day => ({
      ...day,
      currentAmount: day.amount,
      aiAmount: Math.round(day.amount * 0.85) // 15% average reduction
    })) : dailySpendingData;

  const getOverBudgetCategories = () => {
    return categoryBudgets.filter(budget => budget.spent > budget.budgetLimit);
  };

  const getExpenseColor = (amount: number) => {
    // Define thresholds for low, medium, and high expenses
    if (amount <= 1500) return '#22c55e'; // Green for low
    if (amount <= 3000) return '#eab308'; // Yellow for medium
    return '#ef4444'; // Red for high
  };

  return (
    <div className="space-y-6 p-4">
      {/* AI Expense Insights */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">AI Expense Insights</h3>
        <div className="grid gap-4">
          {aiSuggestions.expenses.map((suggestion, index) => (
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
      {/* Header Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              Smart Expense Tracker
            </CardTitle>
            <div className="flex items-center gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-blue-500" />
              <p className="text-sm text-muted-foreground">Total Expenses</p>
            </div>
            <p className="text-2xl font-semibold">₹{getTotalExpenses().toLocaleString('en-IN')}</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">Daily Average</p>
            </div>
            <p className="text-2xl font-semibold">₹{Math.round(getTotalExpenses() / 30).toLocaleString('en-IN')}</p>
            <p className="text-xs text-green-600">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4 text-purple-500" />
              <p className="text-sm text-muted-foreground">Top Category</p>
            </div>
            <p className="text-2xl font-semibold">Food & Dining</p>
            <p className="text-xs text-muted-foreground">₹8,750 spent</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <p className="text-sm text-muted-foreground">Over Budget</p>
            </div>
            <p className="text-2xl font-semibold">{getOverBudgetCategories().length}</p>
            <p className="text-xs text-orange-600">Categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Over Budget Alert */}
      {getOverBudgetCategories().length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <h3 className="font-medium text-orange-800">Budget Alert</h3>
            </div>
            <p className="text-sm text-orange-700 mt-1">
              You've exceeded your budget in {getOverBudgetCategories().length} categories:
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {getOverBudgetCategories().map(category => (
                <Badge key={category.category} variant="outline" className="border-orange-300 text-orange-700">
                  {category.category}: ₹{(category.spent - category.budgetLimit).toLocaleString('en-IN')} over
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Professional Pie Chart for Presentations with AI Overlay */}
      <div className="grid grid-cols-1 gap-8">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold tracking-tight">
                Expense Distribution by Category
              </CardTitle>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {showAIOverlay ? 'Optimized' : 'Current'} Monthly Expenses
                </p>
                <p className="text-xl font-bold text-foreground">
                  ₹{(showAIOverlay ? 
                    aiOptimizedExpenseData.reduce((sum, item) => sum + item.value, 0) :
                    pieData.reduce((sum, item) => sum + item.value, 0)
                  ).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2 space-y-4">
            {/* AI Expense Overlay Controls */}
            <AIBudgetOverlay
              isEnabled={showAIOverlay}
              onToggle={setShowAIOverlay}
              currentData={pieData}
              aiSuggestedData={aiOptimizedExpenseData}
            />
            
            <div className="relative flex items-center justify-center">
              <div className="h-96 w-full max-w-md">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseChartDisplayData.filter(item => item.value > 0)}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={140}
                      paddingAngle={1}
                      dataKey="value"
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth={2}
                    >
                      {expenseChartDisplayData.filter(item => item.value > 0).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          fillOpacity={entry.opacity || 1}
                          stroke={entry.name?.includes('(AI)') ? '#fbbf24' : 'rgba(255,255,255,0.6)'}
                          strokeWidth={entry.name?.includes('(AI)') ? 3 : 2}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        `₹${value.toLocaleString('en-IN')}`,
                        'Amount'
                      ]}
                      labelFormatter={(label) => `${label?.toString().replace(' (AI)', '') || ''}`}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        fontSize: '14px',
                        padding: '12px 16px'
                      }}
                      cursor={false}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Center Label */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground font-medium tracking-wide">
                    {showAIOverlay ? 'AI OPTIMIZED' : 'TOTAL'}
                  </p>
                  <p className="text-lg font-bold tabular-nums">
                    ₹{(showAIOverlay ? 
                      aiOptimizedExpenseData.reduce((sum, item) => sum + item.value, 0) :
                      pieData.reduce((sum, item) => sum + item.value, 0)
                    ).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>

            {/* Category Descriptions with Percentages */}
            <div className="mt-6 space-y-3">
              {(showAIOverlay ? aiOptimizedExpenseData : pieData)
                .filter(item => item.value > 0)
                .sort((a, b) => b.value - a.value)
                .map((item) => {
                  const totalExpenses = (showAIOverlay ? aiOptimizedExpenseData : pieData)
                    .reduce((sum, i) => sum + i.value, 0);
                  const percentage = ((item.value / totalExpenses) * 100);
                  
                  // Find corresponding original data for comparison
                  const originalItem = pieData.find(original => original.name === item.name);
                  const savings = originalItem ? originalItem.value - item.value : 0;
                  const savingsPercentage = originalItem ? ((savings / originalItem.value) * 100) : 0;
                  
                  return (
                    <div key={item.name} className="p-3 bg-muted/30 rounded-lg border border-border/50">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                          style={{ backgroundColor: showAIOverlay ? '#fbbf24' : item.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{item.name}</span>
                            <div className="text-right">
                              <span className="font-semibold text-sm tabular-nums">
                                ₹{item.value.toLocaleString('en-IN')}
                              </span>
                              {showAIOverlay && savings > 0 && (
                                <div className="text-xs text-green-600 font-medium">
                                  Save ₹{savings.toLocaleString('en-IN')} ({savingsPercentage.toFixed(1)}%)
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                            {getCategoryDescription(item.name)}
                            {showAIOverlay && savings > 0 && (
                              <span className="block mt-1 text-amber-700 dark:text-amber-300 font-medium">
                                💡 AI suggests reducing this category through smart optimization
                              </span>
                            )}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all"
                                style={{ 
                                  backgroundColor: showAIOverlay ? '#fbbf24' : item.color,
                                  width: `${Math.min(percentage, 100)}%`
                                }}
                              />
                            </div>
                            <span className="text-xs font-semibold tabular-nums min-w-[45px] text-right">
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Spending Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      {/* Daily Spending Pattern with AI Overlay */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Spending Pattern</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {!showAIOverlay ? (
              <>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#22c55e]"></span>
                  <span className="text-xs">Low (≤₹1,500)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 ml-4">
                  <span className="w-3 h-3 rounded bg-[#eab308]"></span>
                  <span className="text-xs">Medium (₹1,500-3,000)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 ml-4">
                  <span className="w-3 h-3 rounded bg-[#ef4444]"></span>
                  <span className="text-xs">High (&gt;₹3,000)</span>
                </span>
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-gray-400"></span>
                  <span className="text-xs">Current Spending</span>
                </span>
                <span className="inline-flex items-center gap-1.5 ml-4">
                  <span className="w-3 h-3 rounded bg-[#fbbf24]"></span>
                  <span className="text-xs">AI Optimized</span>
                </span>
              </>
            )}
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    `₹${value.toLocaleString('en-IN')}`, 
                    showAIOverlay ? (name === 'currentAmount' ? 'Current' : 'AI Optimized') : 'Amount'
                  ]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                {showAIOverlay ? (
                  <>
                    <Bar dataKey="currentAmount" fill="#9ca3af" fillOpacity={0.6} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="aiAmount" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                  </>
                ) : (
                  <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                    {dailySpendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getExpenseColor(entry.amount)} />
                    ))}
                  </Bar>
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      </div>

      {/* Recent Expenses */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Expenses</CardTitle>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Expense
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getFilteredExpenses().slice(0, 10).map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    categoryBudgets.find(b => b.category === expense.category)?.color ? 
                    'bg-opacity-20' : 'bg-gray-100'
                  }`} style={{
                    backgroundColor: categoryBudgets.find(b => b.category === expense.category)?.color + '20'
                  }}>
                    <Receipt className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{expense.category}</span>
                      {expense.subcategory && (
                        <>
                          <span>•</span>
                          <span>{expense.subcategory}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{expense.paymentMethod}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{expense.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600">-₹{expense.amount.toLocaleString('en-IN')}</p>
                  {expense.isRecurring && (
                    <Badge variant="outline" className="text-xs">Recurring</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}