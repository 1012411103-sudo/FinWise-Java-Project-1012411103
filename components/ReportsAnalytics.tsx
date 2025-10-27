import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
  Filter,
  Share2,
  Eye,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  CreditCard,
  Target,
  Wallet
} from 'lucide-react';

interface MonthlyReport {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  investments: number;
}

interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
  color: string;
  trend: 'up' | 'down' | 'stable';
  previousMonth: number;
}

interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  progress: number;
}

export function ReportsAnalyticsComponent() {
  const [selectedPeriod, setSelectedPeriod] = useState('last-6-months');
  const [selectedReportType, setSelectedReportType] = useState('overview');

  const monthlyData: MonthlyReport[] = [
    { month: 'Aug 2023', income: 82000, expenses: 45000, savings: 20000, investments: 17000 },
    { month: 'Sep 2023', income: 82000, expenses: 48000, savings: 18000, investments: 16000 },
    { month: 'Oct 2023', income: 85000, expenses: 52000, savings: 15000, investments: 18000 },
    { month: 'Nov 2023', income: 85000, expenses: 49000, savings: 19000, investments: 17000 },
    { month: 'Dec 2023', income: 90000, expenses: 55000, savings: 17000, investments: 18000 },
    { month: 'Jan 2024', income: 85000, expenses: 47000, savings: 21000, investments: 17000 }
  ];

  const categorySpending: CategorySpending[] = [
    { 
      category: 'Food & Dining', 
      amount: 12500, 
      percentage: 26.6, 
      color: '#ef4444', 
      trend: 'up',
      previousMonth: 11200 
    },
    { 
      category: 'Transportation', 
      amount: 8500, 
      percentage: 18.1, 
      color: '#3b82f6', 
      trend: 'down',
      previousMonth: 9200 
    },
    { 
      category: 'Shopping', 
      amount: 7800, 
      percentage: 16.6, 
      color: '#8b5cf6', 
      trend: 'up',
      previousMonth: 6500 
    },
    { 
      category: 'Bills & Utilities', 
      amount: 6200, 
      percentage: 13.2, 
      color: '#f59e0b', 
      trend: 'stable',
      previousMonth: 6100 
    },
    { 
      category: 'Entertainment', 
      amount: 4500, 
      percentage: 9.6, 
      color: '#22c55e', 
      trend: 'down',
      previousMonth: 5200 
    },
    { 
      category: 'Healthcare', 
      amount: 3800, 
      percentage: 8.1, 
      color: '#06b6d4', 
      trend: 'up',
      previousMonth: 2900 
    },
    { 
      category: 'Others', 
      amount: 3700, 
      percentage: 7.9, 
      color: '#84cc16', 
      trend: 'stable',
      previousMonth: 3600 
    }
  ];

  const savingsRate = [
    { month: 'Aug', rate: 24.4, target: 25 },
    { month: 'Sep', rate: 22.0, target: 25 },
    { month: 'Oct', rate: 17.6, target: 25 },
    { month: 'Nov', rate: 22.4, target: 25 },
    { month: 'Dec', rate: 18.9, target: 25 },
    { month: 'Jan', rate: 24.7, target: 25 }
  ];

  const investmentPerformance = [
    { month: 'Aug', stocks: 125000, mutualFunds: 85000, sip: 145000, total: 355000 },
    { month: 'Sep', stocks: 130000, mutualFunds: 88000, sip: 150000, total: 368000 },
    { month: 'Oct', stocks: 128000, mutualFunds: 91000, sip: 155000, total: 374000 },
    { month: 'Nov', stocks: 135000, mutualFunds: 89000, sip: 160000, total: 384000 },
    { month: 'Dec', stocks: 132000, mutualFunds: 95000, sip: 165000, total: 392000 },
    { month: 'Jan', stocks: 125000, mutualFunds: 85000, sip: 145000, total: 355000 }
  ];

  const financialGoals: FinancialGoal[] = [
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 300000,
      currentAmount: 185000,
      deadline: '2024-12-31',
      category: 'Safety',
      progress: 61.7
    },
    {
      id: '2',
      name: 'Vacation Fund',
      targetAmount: 150000,
      currentAmount: 85000,
      deadline: '2024-06-30',
      category: 'Travel',
      progress: 56.7
    },
    {
      id: '3',
      name: 'Car Down Payment',
      targetAmount: 200000,
      currentAmount: 125000,
      deadline: '2024-09-30',
      category: 'Vehicle',
      progress: 62.5
    },
    {
      id: '4',
      name: 'Home Renovation',
      targetAmount: 500000,
      currentAmount: 180000,
      deadline: '2025-03-31',
      category: 'Home',
      progress: 36.0
    }
  ];

  const getTotalIncome = () => {
    return monthlyData.reduce((sum, month) => sum + month.income, 0);
  };

  const getTotalExpenses = () => {
    return monthlyData.reduce((sum, month) => sum + month.expenses, 0);
  };

  const getTotalSavings = () => {
    return monthlyData.reduce((sum, month) => sum + month.savings, 0);
  };

  const getAverageSavingsRate = () => {
    const avgIncome = getTotalIncome() / monthlyData.length;
    const avgSavings = getTotalSavings() / monthlyData.length;
    return (avgSavings / avgIncome) * 100;
  };

  const downloadReport = (type: string) => {
    // Mock download functionality
    alert(`Downloading ${type} report...`);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-green-500" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Financial Reports & Analytics
            </CardTitle>
            <div className="flex items-center gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">Total Income</p>
            </div>
            <p className="text-2xl font-semibold">₹{getTotalIncome().toLocaleString('en-IN')}</p>
            <p className="text-xs text-green-600">+8% from previous period</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-red-500" />
              <p className="text-sm text-muted-foreground">Total Expenses</p>
            </div>
            <p className="text-2xl font-semibold">₹{getTotalExpenses().toLocaleString('en-IN')}</p>
            <p className="text-xs text-red-600">+3% from previous period</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-blue-500" />
              <p className="text-sm text-muted-foreground">Total Savings</p>
            </div>
            <p className="text-2xl font-semibold">₹{getTotalSavings().toLocaleString('en-IN')}</p>
            <p className="text-xs text-blue-600">{getAverageSavingsRate().toFixed(1)}% avg rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-500" />
              <p className="text-sm text-muted-foreground">Goals Progress</p>
            </div>
            <p className="text-2xl font-semibold">{Math.round(financialGoals.reduce((sum, goal) => sum + goal.progress, 0) / financialGoals.length)}%</p>
            <p className="text-xs text-muted-foreground">{financialGoals.length} active goals</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Income vs Expenses */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Income vs Expenses Overview</CardTitle>
                <Button variant="outline" size="sm" onClick={() => downloadReport('income-expenses')}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="income" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="savings" stackId="3" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Savings Rate Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Savings Rate Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={savingsRate}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} name="Actual Rate" />
                    <Line type="monotone" dataKey="target" stroke="#22c55e" strokeDasharray="5 5" name="Target Rate" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Expense by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categorySpending}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({category, percentage}) => `${category} ${percentage.toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {categorySpending.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Category Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Category Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categorySpending.map((category) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="font-medium">{category.category}</span>
                          {getTrendIcon(category.trend)}
                        </div>
                        <span className="font-semibold">₹{category.amount.toLocaleString('en-IN')}</span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{category.percentage.toFixed(1)}% of total</span>
                        <span>
                          {category.trend === 'up' && '+'}
                          {category.trend === 'down' && '-'}
                          ₹{Math.abs(category.amount - category.previousMonth).toLocaleString('en-IN')} vs last month
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Expense Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Expense Trend by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="expenses" fill="#ef4444" name="Total Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investments" className="space-y-6">
          {/* Investment Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={investmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="stocks" stroke="#ef4444" strokeWidth={2} name="Stocks" />
                    <Line type="monotone" dataKey="mutualFunds" stroke="#3b82f6" strokeWidth={2} name="Mutual Funds" />
                    <Line type="monotone" dataKey="sip" stroke="#22c55e" strokeWidth={2} name="SIP" />
                    <Line type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={3} name="Total Portfolio" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Asset Allocation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <p className="text-sm text-muted-foreground">Stocks</p>
                </div>
                <p className="text-2xl font-semibold">₹1,25,000</p>
                <p className="text-xs text-green-600">+25% returns</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <p className="text-sm text-muted-foreground">Mutual Funds</p>
                </div>
                <p className="text-2xl font-semibold">₹85,000</p>
                <p className="text-xs text-green-600">+13.3% returns</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <p className="text-sm text-muted-foreground">SIP</p>
                </div>
                <p className="text-2xl font-semibold">₹1,45,000</p>
                <p className="text-xs text-green-600">+20.8% returns</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid gap-4">
            {financialGoals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium">{goal.name}</h4>
                      <p className="text-sm text-muted-foreground">Target: {goal.deadline}</p>
                    </div>
                    <Badge variant="outline">{goal.category}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>₹{goal.currentAmount.toLocaleString('en-IN')} of ₹{goal.targetAmount.toLocaleString('en-IN')}</span>
                      <span>{goal.progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-3" />
                  </div>
                  
                  <div className="mt-3 text-xs text-muted-foreground">
                    Remaining: ₹{(goal.targetAmount - goal.currentAmount).toLocaleString('en-IN')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {/* AI Insights */}
          <div className="grid gap-4">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-800">Positive Insights</h4>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-green-700">
                  <li>• Your savings rate improved by 2.3% this month</li>
                  <li>• Investment portfolio shows consistent growth</li>
                  <li>• You're on track to meet 3 out of 4 financial goals</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <h4 className="font-medium text-yellow-800">Areas for Improvement</h4>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-yellow-700">
                  <li>• Food & Dining expenses increased by 11.6% this month</li>
                  <li>• Consider increasing emergency fund allocation</li>
                  <li>• Home renovation goal may need timeline adjustment</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-blue-800">Recommendations</h4>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-blue-700">
                  <li>• Set a monthly budget limit for Food & Dining: ₹10,000</li>
                  <li>• Consider starting a new SIP for tax saving</li>
                  <li>• Review and optimize subscription services</li>
                  <li>• Increase emergency fund by ₹5,000/month</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <p className="font-medium">Set Food Budget</p>
                    <p className="text-sm text-muted-foreground">Limit monthly food expenses</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <p className="font-medium">Start Emergency SIP</p>
                    <p className="text-sm text-muted-foreground">Automate emergency fund</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <p className="font-medium">Review Subscriptions</p>
                    <p className="text-sm text-muted-foreground">Cancel unused services</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <p className="font-medium">Export Full Report</p>
                    <p className="text-sm text-muted-foreground">Download detailed analysis</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}