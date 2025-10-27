import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Edit,
  Bell,
  PieChart,
  Calendar
} from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AISuggestion, aiSuggestions } from './AISuggestion';
import { AIBudgetOverlay, generateAIOptimizedData } from './AIBudgetOverlay';

interface BudgetCategory {
  id: string;
  name: string;
  budgetAmount: number;
  spentAmount: number;
  color: string;
  icon: React.ReactNode;
  alertThreshold: number; // Percentage at which to alert
  isActive: boolean;
  description: string;
}

interface BudgetAlert {
  id: string;
  categoryId: string;
  message: string;
  type: 'warning' | 'danger' | 'info';
  timestamp: string;
  isRead: boolean;
}

export function BudgetPlannerComponent() {
  const [totalBudget, setTotalBudget] = useState(45000);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [tempBudget, setTempBudget] = useState(totalBudget.toString());
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryBudget, setNewCategoryBudget] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAIOverlay, setShowAIOverlay] = useState(false);

  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([
    {
      id: '1',
      name: 'Food & Dining',
      budgetAmount: 12000,
      spentAmount: 8750,
      color: '#ef4444',
      icon: '🍽️',
      alertThreshold: 80,
      isActive: true,
      description: 'Restaurants, groceries, food delivery'
    },
    {
      id: '2',
      name: 'Transportation',
      budgetAmount: 6000,
      spentAmount: 4200,
      color: '#3b82f6',
      icon: '🚗',
      alertThreshold: 85,
      isActive: true,
      description: 'Fuel, public transport, taxi'
    },
    {
      id: '3',
      name: 'Shopping',
      budgetAmount: 8000,
      spentAmount: 12500,
      color: '#8b5cf6',
      icon: '🛍️',
      alertThreshold: 75,
      isActive: true,
      description: 'Clothing, electronics, home items'
    },
    {
      id: '4',
      name: 'Entertainment',
      budgetAmount: 4000,
      spentAmount: 2400,
      color: '#22c55e',
      icon: '🎬',
      alertThreshold: 90,
      isActive: true,
      description: 'Movies, games, subscriptions'
    },
    {
      id: '5',
      name: 'Bills & Utilities',
      budgetAmount: 8000,
      spentAmount: 7200,
      color: '#f59e0b',
      icon: '💡',
      alertThreshold: 95,
      isActive: true,
      description: 'Electricity, water, internet, phone'
    },
    {
      id: '6',
      name: 'Healthcare',
      budgetAmount: 3000,
      spentAmount: 1200,
      color: '#06b6d4',
      icon: '🏥',
      alertThreshold: 70,
      isActive: true,
      description: 'Medical, pharmacy, fitness'
    },
    {
      id: '7',
      name: 'Savings',
      budgetAmount: 4000,
      spentAmount: 4000,
      color: '#84cc16',
      icon: '💰',
      alertThreshold: 100,
      isActive: true,
      description: 'Emergency fund, investments'
    }
  ]);

  const [budgetAlerts, setBudgetAlerts] = useState<BudgetAlert[]>([
    {
      id: '1',
      categoryId: '3',
      message: 'Shopping budget exceeded by ₹4,500',
      type: 'danger',
      timestamp: '2024-01-15 10:30',
      isRead: false
    },
    {
      id: '2',
      categoryId: '5',
      message: 'Bills & Utilities at 90% of budget',
      type: 'warning',
      timestamp: '2024-01-14 15:20',
      isRead: false
    },
    {
      id: '3',
      categoryId: '1',
      message: 'Food & Dining approaching 80% threshold',
      type: 'warning',
      timestamp: '2024-01-13 18:45',
      isRead: true
    }
  ]);

  const getTotalSpent = () => {
    return budgetCategories.reduce((total, category) => total + category.spentAmount, 0);
  };

  const getTotalAllocated = () => {
    return budgetCategories.reduce((total, category) => total + category.budgetAmount, 0);
  };

  const getRemainingBudget = () => {
    return totalBudget - getTotalAllocated();
  };

  const getOverBudgetCategories = () => {
    return budgetCategories.filter(category => category.spentAmount > category.budgetAmount);
  };

  const getWarningCategories = () => {
    return budgetCategories.filter(category => {
      const percentage = (category.spentAmount / category.budgetAmount) * 100;
      return percentage >= category.alertThreshold && percentage < 100;
    });
  };

  const updateCategoryBudget = (categoryId: string, newBudget: number) => {
    setBudgetCategories(prev => prev.map(category =>
      category.id === categoryId ? { ...category, budgetAmount: newBudget } : category
    ));
  };

  const updateCategoryAlertThreshold = (categoryId: string, threshold: number) => {
    setBudgetCategories(prev => prev.map(category =>
      category.id === categoryId ? { ...category, alertThreshold: threshold } : category
    ));
  };

  const addNewCategory = () => {
    if (newCategoryName && newCategoryBudget) {
      const newCategory: BudgetCategory = {
        id: Date.now().toString(),
        name: newCategoryName,
        budgetAmount: parseFloat(newCategoryBudget),
        spentAmount: 0,
        color: '#6b7280',
        icon: '📝',
        alertThreshold: 80,
        isActive: true,
        description: 'Custom category'
      };
      
      setBudgetCategories(prev => [...prev, newCategory]);
      setNewCategoryName('');
      setNewCategoryBudget('');
      setShowAddCategory(false);
    }
  };

  const getCategoryStatus = (category: BudgetCategory) => {
    const percentage = (category.spentAmount / category.budgetAmount) * 100;
    
    if (percentage > 100) return { status: 'over', color: 'text-red-600', bg: 'bg-red-100' };
    if (percentage >= category.alertThreshold) return { status: 'warning', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { status: 'good', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const unreadAlerts = budgetAlerts.filter(alert => !alert.isRead);

  // Generate pie chart data
  const budgetPieData = budgetCategories.map(category => ({
    name: category.name,
    value: category.budgetAmount,
    color: category.color
  }));

  const aiOptimizedBudgetData = generateAIOptimizedData(budgetPieData);
  
  // Create combined data for AI overlay display
  const chartDisplayData = showAIOverlay ? 
    [...budgetPieData.map(item => ({ ...item, opacity: 0.6 })), 
     ...aiOptimizedBudgetData.map(item => ({ 
       ...item, 
       name: `${item.name} (AI)`, 
       color: '#fbbf24', // AI suggestion color
       opacity: 1 
     }))] : budgetPieData;

  return (
    <div className="space-y-6 p-4">
      {/* AI Budget Suggestions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">AI Budget Insights</h3>
        <div className="grid gap-4">
          {aiSuggestions.budget.map((suggestion, index) => (
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

      {/* Header with Total Budget */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Budget Planner
            </CardTitle>
            <div className="flex items-center gap-4">
              {unreadAlerts.length > 0 && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <Bell className="h-3 w-3" />
                  {unreadAlerts.length} Alert{unreadAlerts.length > 1 ? 's' : ''}
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={() => setIsEditingBudget(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Budget
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isEditingBudget ? (
            <div className="flex gap-2">
              <Input
                type="number"
                value={tempBudget}
                onChange={(e) => setTempBudget(e.target.value)}
                placeholder="Enter total monthly budget"
              />
              <Button onClick={() => {
                setTotalBudget(parseFloat(tempBudget));
                setIsEditingBudget(false);
              }}>Save</Button>
              <Button variant="outline" onClick={() => {
                setTempBudget(totalBudget.toString());
                setIsEditingBudget(false);
              }}>Cancel</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                  <p className="text-2xl font-semibold">₹{totalBudget.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Allocated</p>
                  <p className="text-2xl font-semibold">₹{getTotalAllocated().toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Spent</p>
                  <p className="text-2xl font-semibold">₹{getTotalSpent().toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className={`text-2xl font-semibold ${getRemainingBudget() < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    ₹{Math.abs(getRemainingBudget()).toLocaleString('en-IN')}
                    {getRemainingBudget() < 0 && ' Over'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Budget Utilization</span>
                  <span>{((getTotalSpent() / totalBudget) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(getTotalSpent() / totalBudget) * 100} className="h-3" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Budget Alerts */}
      {unreadAlerts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              Budget Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unreadAlerts.slice(0, 3).map((alert) => {
                const category = budgetCategories.find(cat => cat.id === alert.categoryId);
                return (
                  <div key={alert.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        alert.type === 'danger' ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        {alert.type === 'danger' ? 
                          <AlertTriangle className="h-4 w-4 text-red-600" /> :
                          <Bell className="h-4 w-4 text-yellow-600" />
                        }
                      </div>
                      <div>
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-muted-foreground">{alert.timestamp}</p>
                      </div>
                    </div>
                    <Badge variant={alert.type === 'danger' ? 'destructive' : 'secondary'}>
                      {category?.name}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgetCategories.map((category) => {
          const percentage = (category.spentAmount / category.budgetAmount) * 100;
          const status = getCategoryStatus(category);
          
          return (
            <Card key={category.id} className="relative">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                  <Badge className={status.bg + ' ' + status.color}>
                    {status.status === 'over' ? 'Over Budget' : 
                     status.status === 'warning' ? 'Warning' : 'On Track'}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>₹{category.spentAmount.toLocaleString('en-IN')} spent</span>
                    <span>of ₹{category.budgetAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className="h-2"
                    style={{ 
                      backgroundColor: percentage > 100 ? '#fee2e2' : undefined 
                    }}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{percentage.toFixed(1)}% used</span>
                    <span>
                      {percentage > 100 
                        ? `₹${(category.spentAmount - category.budgetAmount).toLocaleString('en-IN')} over`
                        : `₹${(category.budgetAmount - category.spentAmount).toLocaleString('en-IN')} left`
                      }
                    </span>
                  </div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Edit className="h-3 w-3 mr-2" />
                      Adjust Budget
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adjust Budget - {category.name}</DialogTitle>
                      <DialogDescription>
                        Modify the budget amount and alert threshold for this category.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Budget Amount (₹)</Label>
                        <Input
                          type="number"
                          value={category.budgetAmount}
                          onChange={(e) => updateCategoryBudget(category.id, parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Alert Threshold ({category.alertThreshold}%)</Label>
                        <Slider
                          value={[category.alertThreshold]}
                          onValueChange={(value) => updateCategoryAlertThreshold(category.id, value[0])}
                          max={100}
                          min={50}
                          step={5}
                          className="w-full"
                        />
                        <p className="text-sm text-muted-foreground">
                          Get notified when spending reaches {category.alertThreshold}% of budget
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          );
        })}
        
        {/* Add New Category Card */}
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-4 flex items-center justify-center min-h-[200px]">
            <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="flex flex-col items-center gap-2">
                  <Plus className="h-8 w-8 text-gray-400" />
                  <span className="text-gray-600">Add Category</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                    Create a custom budget category to track your specific expenses.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Category Name</Label>
                    <Input
                      placeholder="e.g., Personal Care, Hobbies"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Budget Amount (₹)</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={newCategoryBudget}
                      onChange={(e) => setNewCategoryBudget(e.target.value)}
                    />
                  </div>
                  
                  <Button onClick={addNewCategory} className="w-full">
                    Add Category
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Budget Visualization and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Pie Chart with AI Overlay */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Budget Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* AI Budget Overlay Controls */}
            <AIBudgetOverlay
              isEnabled={showAIOverlay}
              onToggle={setShowAIOverlay}
              currentData={budgetPieData}
              aiSuggestedData={aiOptimizedBudgetData}
            />
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={chartDisplayData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, percent}) => showAIOverlay ? 
                      `${name.replace(' (AI)', '')} ${(percent * 100).toFixed(0)}%` : 
                      `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartDisplayData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        fillOpacity={entry.opacity || 1}
                        stroke={entry.name?.includes('(AI)') ? '#fbbf24' : 'none'}
                        strokeWidth={entry.name?.includes('(AI)') ? 2 : 0}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [
                      `₹${value.toLocaleString('en-IN')}`, 
                      name?.toString().replace(' (AI)', '') || ''
                    ]} 
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Budget Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Budget Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">On Track</p>
                <p className="text-lg font-semibold">{budgetCategories.filter(cat => getCategoryStatus(cat).status === 'good').length}</p>
              </div>
              
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Warning</p>
                <p className="text-lg font-semibold">{getWarningCategories().length}</p>
              </div>
              
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Over Budget</p>
                <p className="text-lg font-semibold">{getOverBudgetCategories().length}</p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Total Categories</p>
                <p className="text-lg font-semibold">{budgetCategories.length}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <h4 className="font-medium">Recommendations</h4>
              <div className="space-y-2 text-sm">
                {getOverBudgetCategories().length > 0 && (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Review overspent categories and adjust future spending</span>
                  </div>
                )}
                {getRemainingBudget() > 0 && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>You have ₹{getRemainingBudget().toLocaleString('en-IN')} unallocated budget</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-blue-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>Consider increasing savings allocation if possible</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Monthly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold">Day 15</p>
                <p className="text-sm text-muted-foreground">of 30 days this month</p>
                <Progress value={50} className="mt-2" />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-medium">Spending Pace</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Expected by now</p>
                    <p className="text-lg font-semibold">₹{(totalBudget * 0.5).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Actually spent</p>
                    <p className="text-lg font-semibold">₹{getTotalSpent().toLocaleString('en-IN')}</p>
                  </div>
                </div>
                
                {getTotalSpent() > (totalBudget * 0.5) ? (
                  <div className="flex items-center gap-2 text-orange-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Spending ahead of pace</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingDown className="h-4 w-4" />
                    <span className="text-sm">Spending below pace</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}