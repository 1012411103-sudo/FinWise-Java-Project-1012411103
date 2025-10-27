import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Target, PiggyBank, Calendar, Plus, Gift } from 'lucide-react';
import { AISuggestion, aiSuggestions } from './AISuggestion';
import { AIBudgetOverlay, generateAIOptimizedData } from './AIBudgetOverlay';

interface FinancialData {
  expenses: number;
  savings: number;
  investments: number;
  remaining: number;
}

interface ExtraIncome {
  id: string;
  amount: number;
  description: string;
  date: string;
  period: string;
}

export function DashboardComponent() {
  const [planningMode, setPlanningMode] = useState<'annual' | 'monthly' | null>(null);
  const [annualSalary, setAnnualSalary] = useState(6200000);
  const [monthlySalary, setMonthlySalary] = useState(52000);
  const [tempSalary, setTempSalary] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [viewType, setViewType] = useState<'year' | 'month'>('year');
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [extraAmount, setExtraAmount] = useState('');
  const [extraDescription, setExtraDescription] = useState('');
  const [showExtraIncomeDialog, setShowExtraIncomeDialog] = useState(false);
  const [showAIOverlay, setShowAIOverlay] = useState(false);
  
  const [annualFinancialData, setAnnualFinancialData] = useState<FinancialData>({
    expenses: 3720000,
    savings: 1240000,
    investments: 830000,
    remaining: 410000
  });

  const [monthlyFinancialData, setMonthlyFinancialData] = useState<FinancialData>({
    expenses: 31000,
    savings: 10500,
    investments: 7000,
    remaining: 3500
  });

  const [extraIncomes, setExtraIncomes] = useState<ExtraIncome[]>([
    {
      id: '1',
      amount: 125000,
      description: 'Diwali Bonus',
      date: '2024-10-20',
      period: '2024'
    },
    {
      id: '2',
      amount: 50000,
      description: 'Birthday Gift',
      date: '2024-06-15',
      period: '2024'
    }
  ]);

  const handleSalaryUpdate = () => {
    const newSalary = parseFloat(tempSalary);
    if (newSalary > 0) {
      if (planningMode === 'annual') {
        setAnnualSalary(newSalary);
        // Recalculate remaining amount
        const total = annualFinancialData.expenses + annualFinancialData.savings + annualFinancialData.investments;
        setAnnualFinancialData(prev => ({
          ...prev,
          remaining: newSalary - total
        }));
      } else {
        setMonthlySalary(newSalary);
        // Recalculate remaining amount
        const total = monthlyFinancialData.expenses + monthlyFinancialData.savings + monthlyFinancialData.investments;
        setMonthlyFinancialData(prev => ({
          ...prev,
          remaining: newSalary - total
        }));
      }
    }
    setIsEditing(false);
  };

  const handleAddExtraIncome = () => {
    if (extraAmount && extraDescription) {
      const newExtraIncome: ExtraIncome = {
        id: Date.now().toString(),
        amount: parseFloat(extraAmount),
        description: extraDescription,
        date: new Date().toISOString().split('T')[0],
        period: selectedPeriod
      };
      
      setExtraIncomes(prev => [...prev, newExtraIncome]);
      setExtraAmount('');
      setExtraDescription('');
      setShowExtraIncomeDialog(false);
    }
  };

  const getTotalExtraIncome = () => {
    return extraIncomes
      .filter(income => income.period === selectedPeriod)
      .reduce((total, income) => total + income.amount, 0);
  };

  const getCurrentSalary = () => {
    return planningMode === 'annual' ? annualSalary : monthlySalary;
  };

  const getAdjustedSalary = () => {
    return getCurrentSalary() + getTotalExtraIncome();
  };

  const getCurrentFinancialData = () => {
    return planningMode === 'annual' ? annualFinancialData : monthlyFinancialData;
  };

  const updateFinancialCategory = (category: keyof FinancialData, value: number) => {
    const setterFunction = planningMode === 'annual' ? setAnnualFinancialData : setMonthlyFinancialData;
    setterFunction(prev => {
      const newData = { ...prev, [category]: value };
      const total = newData.expenses + newData.savings + newData.investments;
      newData.remaining = getAdjustedSalary() - total;
      return newData;
    });
  };

  const financialData = getCurrentFinancialData();
  
  const pieData = [
    { name: 'Expenses', value: financialData.expenses, color: '#ef4444' },
    { name: 'Savings', value: financialData.savings, color: '#22c55e' },
    { name: 'Investments', value: financialData.investments, color: '#3b82f6' },
    { name: 'Remaining', value: Math.max(0, financialData.remaining), color: '#f59e0b' }
  ];

  const aiOptimizedData = generateAIOptimizedData(pieData);
  
  // Create combined data for AI overlay display
  const chartDisplayData = showAIOverlay ? 
    [...pieData.map(item => ({ ...item, opacity: 0.6 })), 
     ...aiOptimizedData.map(item => ({ 
       ...item, 
       name: `${item.name} (AI)`, 
       color: item.name === 'Expenses' ? '#fbbf24' : 
              item.name === 'Savings' ? '#10b981' : 
              item.name === 'Investments' ? '#3b82f6' : '#f59e0b',
       opacity: 1 
     }))] : pieData;

  const getChartData = () => {
    if (planningMode === 'annual') {
      return [
        { month: 'Jan', expenses: 310000, savings: 103000, investments: 69000 },
        { month: 'Feb', expenses: 304000, savings: 107000, investments: 70000 },
        { month: 'Mar', expenses: 315000, savings: 99000, investments: 66000 },
        { month: 'Apr', expenses: 310000, savings: 103000, investments: 69000 },
        { month: 'May', expenses: 322000, savings: 95000, investments: 74000 },
        { month: 'Jun', expenses: 301000, savings: 111000, investments: 62000 }
      ];
    } else {
      return [
        { month: 'Week 1', expenses: 7800, savings: 2500, investments: 1800 },
        { month: 'Week 2', expenses: 7600, savings: 2700, investments: 1750 },
        { month: 'Week 3', expenses: 7900, savings: 2300, investments: 1650 },
        { month: 'Week 4', expenses: 7700, savings: 2800, investments: 1800 }
      ];
    }
  };

  const adjustedSalary = getAdjustedSalary();
  const savingsRate = (financialData.savings / adjustedSalary) * 100;
  const investmentRate = (financialData.investments / adjustedSalary) * 100;

  const yearOptions = ['2024', '2023', '2022', '2021', '2020'];
  const monthOptions = [
    'January 2024', 'February 2024', 'March 2024', 'April 2024', 
    'May 2024', 'June 2024', 'July 2024', 'August 2024', 
    'September 2024', 'October 2024', 'November 2024', 'December 2024'
  ];

  // Show planning mode selection if no mode is selected
  if (!planningMode) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-4">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <Target className="h-16 w-16 mx-auto text-blue-600" />
            <h2 className="text-2xl font-semibold">Choose Your Planning Mode</h2>
            <p className="text-muted-foreground">Select the planning approach that suits your financial goals</p>
          </div>
          
          <div className="grid gap-4">
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-200"
              onClick={() => {
                setPlanningMode('annual');
                setTempSalary(annualSalary.toString());
              }}
            >
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-semibold">Annual Planning</h3>
                      <p className="text-sm text-muted-foreground">Plan your yearly finances</p>
                    </div>
                  </div>
                  <div className="pl-11">
                    <p className="text-sm">Perfect for:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• High earners (₹10+ lakhs annually)</li>
                      <li>• Long-term financial goals</li>
                      <li>• Tax planning and investments</li>
                      <li>• Yearly budget allocation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-green-200"
              onClick={() => {
                setPlanningMode('monthly');
                setTempSalary(monthlySalary.toString());
              }}
            >
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="text-lg font-semibold">Monthly Planning</h3>
                      <p className="text-sm text-muted-foreground">Plan your monthly finances</p>
                    </div>
                  </div>
                  <div className="pl-11">
                    <p className="text-sm">Perfect for:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Monthly salary earners</li>
                      <li>• Day-to-day expense tracking</li>
                      <li>• Short-term financial goals</li>
                      <li>• Smaller budget management</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header with Planning Mode and Period Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CardTitle className="flex items-center gap-2">
                {planningMode === 'annual' ? (
                  <>
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Annual Planning
                  </>
                ) : (
                  <>
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Monthly Planning
                  </>
                )}
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPlanningMode(null)}
              >
                Switch Mode
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <Select value={viewType} onValueChange={(value: 'year' | 'month') => setViewType(value)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year">Year</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(viewType === 'year' ? yearOptions : monthOptions).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Salary Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {planningMode === 'annual' ? 'Annual Salary' : 'Monthly Salary'}
            </CardTitle>
            <Dialog open={showExtraIncomeDialog} onOpenChange={setShowExtraIncomeDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Extra Income
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Extra Income</DialogTitle>
                  <DialogDescription>
                    Add any additional income like bonuses, gifts, or freelance work for the selected period.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="extra-description">Description</Label>
                    <Input
                      id="extra-description"
                      placeholder="e.g., Bonus, Gift, Freelance work"
                      value={extraDescription}
                      onChange={(e) => setExtraDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="extra-amount">Amount (₹)</Label>
                    <Input
                      id="extra-amount"
                      type="number"
                      placeholder="0.00"
                      value={extraAmount}
                      onChange={(e) => setExtraAmount(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddExtraIncome} className="flex-1">
                      Add Income
                    </Button>
                    <Button variant="outline" onClick={() => setShowExtraIncomeDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="flex gap-2">
              <Input
                type="number"
                value={tempSalary}
                onChange={(e) => setTempSalary(e.target.value)}
                placeholder="Enter annual salary"
              />
              <Button onClick={handleSalaryUpdate}>Save</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Base Salary</p>
                  <p className="text-2xl font-semibold">₹{getCurrentSalary().toLocaleString('en-IN')}</p>
                </div>
                <Button variant="outline" onClick={() => {
                  setTempSalary(getCurrentSalary().toString());
                  setIsEditing(true);
                }}>Edit</Button>
              </div>
              
              {getTotalExtraIncome() > 0 && (
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Extra Income ({selectedPeriod})</p>
                      <p className="text-lg font-medium text-green-600">+₹{getTotalExtraIncome().toLocaleString('en-IN')}</p>
                    </div>
                    <Gift className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Total Adjusted Income</p>
                    <p className="text-xl font-semibold">₹{adjustedSalary.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Extra Income List */}
      {extraIncomes.filter(income => income.period === selectedPeriod).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Extra Income for {selectedPeriod}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {extraIncomes
                .filter(income => income.period === selectedPeriod)
                .map((income) => (
                  <div key={income.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{income.description}</p>
                      <p className="text-sm text-muted-foreground">{income.date}</p>
                    </div>
                    <p className="font-semibold text-green-600">+₹{income.amount.toLocaleString('en-IN')}</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Suggestions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          AI Financial Insights
        </h3>
        <div className="grid gap-4">
          {aiSuggestions.dashboard.map((suggestion, index) => (
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

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-500" />
              <p className="text-sm text-muted-foreground">Expenses</p>
            </div>
            <p className="text-2xl font-semibold">₹{financialData.expenses.toLocaleString('en-IN')}</p>
            <p className="text-xs text-muted-foreground">
              {((financialData.expenses / adjustedSalary) * 100).toFixed(1)}% of income
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <PiggyBank className="h-4 w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">Savings</p>
            </div>
            <p className="text-2xl font-semibold">₹{financialData.savings.toLocaleString('en-IN')}</p>
            <p className="text-xs text-muted-foreground">{savingsRate.toFixed(1)}% savings rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <p className="text-sm text-muted-foreground">Investments</p>
            </div>
            <p className="text-2xl font-semibold">₹{financialData.investments.toLocaleString('en-IN')}</p>
            <p className="text-xs text-muted-foreground">{investmentRate.toFixed(1)}% of income</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-orange-500" />
              <p className="text-sm text-muted-foreground">Remaining</p>
            </div>
            <p className="text-2xl font-semibold">₹{Math.max(0, financialData.remaining).toLocaleString('en-IN')}</p>
            <p className="text-xs text-muted-foreground">
              {((Math.max(0, financialData.remaining) / adjustedSalary) * 100).toFixed(1)}% unallocated
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Allocation Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget Allocation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* AI Budget Overlay Controls */}
            <AIBudgetOverlay
              isEnabled={showAIOverlay}
              onToggle={setShowAIOverlay}
              currentData={pieData}
              aiSuggestedData={aiOptimizedData}
            />
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
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
                    fillOpacity={(entry: any) => entry.opacity || 1}
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
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{planningMode === 'annual' ? 'Monthly Breakdown' : 'Weekly Breakdown'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                  <Bar dataKey="savings" fill="#22c55e" name="Savings" />
                  <Bar dataKey="investments" fill="#3b82f6" name="Investments" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Management Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Your Finances</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{planningMode === 'annual' ? 'Annual' : 'Monthly'} Expenses (₹)</Label>
              <Input
                type="number"
                value={financialData.expenses}
                onChange={(e) => updateFinancialCategory('expenses', parseFloat(e.target.value) || 0)}
              />
              <Progress 
                value={(financialData.expenses / getCurrentSalary()) * 100} 
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <Label>{planningMode === 'annual' ? 'Annual' : 'Monthly'} Savings (₹)</Label>
              <Input
                type="number"
                value={financialData.savings}
                onChange={(e) => updateFinancialCategory('savings', parseFloat(e.target.value) || 0)}
              />
              <Progress 
                value={savingsRate} 
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <Label>{planningMode === 'annual' ? 'Annual' : 'Monthly'} Investments (₹)</Label>
              <Input
                type="number"
                value={financialData.investments}
                onChange={(e) => updateFinancialCategory('investments', parseFloat(e.target.value) || 0)}
              />
              <Progress 
                value={investmentRate} 
                className="h-2"
              />
            </div>
          </div>

          {financialData.remaining < 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">
                ⚠️ Warning: Your allocations exceed your total income by ₹{Math.abs(financialData.remaining).toLocaleString('en-IN')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Financial Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Financial Goals Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Emergency Fund ({planningMode === 'annual' ? '6 months' : '3 months'} expenses)</Label>
              <span className="text-sm text-muted-foreground">
                ₹{(planningMode === 'annual' ? financialData.expenses / 2 : financialData.expenses * 3).toLocaleString('en-IN')} / ₹{(planningMode === 'annual' ? financialData.expenses / 2 : financialData.expenses * 3).toLocaleString('en-IN')}
              </span>
            </div>
            <Progress value={100} className="h-3" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Investment Target (15% of income)</Label>
              <span className="text-sm text-muted-foreground">
                ₹{financialData.investments.toLocaleString('en-IN')} / ₹{(adjustedSalary * 0.15).toLocaleString('en-IN')}
              </span>
            </div>
            <Progress value={(financialData.investments / (adjustedSalary * 0.15)) * 100} className="h-3" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Savings Rate Target ({planningMode === 'annual' ? '20%' : '25%'})</Label>
              <span className="text-sm text-muted-foreground">
                {savingsRate.toFixed(1)}% / {planningMode === 'annual' ? '20%' : '25%'}
              </span>
            </div>
            <Progress value={(savingsRate / (planningMode === 'annual' ? 20 : 25)) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}