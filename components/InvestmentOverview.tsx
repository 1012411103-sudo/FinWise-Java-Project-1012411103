import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target,
  PieChart as PieChartIcon,
  CreditCard,
  Calendar,
  AlertCircle,
  CheckCircle,
  Building,
  Banknote,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  ExternalLink
} from 'lucide-react';
import { AISuggestion, aiSuggestions } from './AISuggestion';

interface Investment {
  id: string;
  name: string;
  type: 'stocks' | 'mutual_funds' | 'sip' | 'bonds' | 'crypto' | 'fd' | 'ppf';
  currentValue: number;
  investedAmount: number;
  returns: number;
  returnPercentage: number;
  units?: number;
  nav?: number;
  platform: string;
  riskLevel: 'low' | 'medium' | 'high';
  maturityDate?: string;
  lastUpdated: string;
}

interface Loan {
  id: string;
  name: string;
  type: 'home' | 'personal' | 'car' | 'education' | 'credit_card';
  principalAmount: number;
  outstandingAmount: number;
  interestRate: number;
  emiAmount: number;
  nextEmiDate: string;
  tenure: number; // in months
  remainingTenure: number;
  lender: string;
  status: 'active' | 'closed' | 'defaulted';
}

interface SIP {
  id: string;
  fundName: string;
  monthlyAmount: number;
  startDate: string;
  totalInvested: number;
  currentValue: number;
  nextSipDate: string;
  platform: string;
  isActive: boolean;
}

export function InvestmentOverviewComponent() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: '1',
      name: 'Reliance Industries',
      type: 'stocks',
      currentValue: 125000,
      investedAmount: 100000,
      returns: 25000,
      returnPercentage: 25.0,
      units: 50,
      platform: 'Zerodha',
      riskLevel: 'medium',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      name: 'SBI Blue Chip Fund',
      type: 'mutual_funds',
      currentValue: 85000,
      investedAmount: 75000,
      returns: 10000,
      returnPercentage: 13.33,
      units: 1250.5,
      nav: 67.89,
      platform: 'Groww',
      riskLevel: 'medium',
      lastUpdated: '2024-01-15'
    },
    {
      id: '3',
      name: 'HDFC Top 100 Fund SIP',
      type: 'sip',
      currentValue: 145000,
      investedAmount: 120000,
      returns: 25000,
      returnPercentage: 20.83,
      platform: 'Kuvera',
      riskLevel: 'medium',
      lastUpdated: '2024-01-15'
    },
    {
      id: '4',
      name: 'PPF Account',
      type: 'ppf',
      currentValue: 185000,
      investedAmount: 150000,
      returns: 35000,
      returnPercentage: 23.33,
      platform: 'SBI',
      riskLevel: 'low',
      maturityDate: '2038-03-31',
      lastUpdated: '2024-01-15'
    },
    {
      id: '5',
      name: 'Bitcoin',
      type: 'crypto',
      currentValue: 75000,
      investedAmount: 85000,
      returns: -10000,
      returnPercentage: -11.76,
      units: 0.0025,
      platform: 'WazirX',
      riskLevel: 'high',
      lastUpdated: '2024-01-15'
    }
  ]);

  const [loans, setLoans] = useState<Loan[]>([
    {
      id: '1',
      name: 'Home Loan',
      type: 'home',
      principalAmount: 2500000,
      outstandingAmount: 1850000,
      interestRate: 8.5,
      emiAmount: 23500,
      nextEmiDate: '2024-02-01',
      tenure: 240,
      remainingTenure: 185,
      lender: 'HDFC Bank',
      status: 'active'
    },
    {
      id: '2',
      name: 'Car Loan',
      type: 'car',
      principalAmount: 800000,
      outstandingAmount: 450000,
      interestRate: 9.2,
      emiAmount: 18500,
      nextEmiDate: '2024-01-28',
      tenure: 60,
      remainingTenure: 28,
      lender: 'Axis Bank',
      status: 'active'
    },
    {
      id: '3',
      name: 'Personal Loan',
      type: 'personal',
      principalAmount: 300000,
      outstandingAmount: 125000,
      interestRate: 12.5,
      emiAmount: 8500,
      nextEmiDate: '2024-01-25',
      tenure: 36,
      remainingTenure: 15,
      lender: 'ICICI Bank',
      status: 'active'
    }
  ]);

  const [sips, setSips] = useState<SIP[]>([
    {
      id: '1',
      fundName: 'Axis Blue Chip Fund',
      monthlyAmount: 5000,
      startDate: '2022-01-01',
      totalInvested: 120000,
      currentValue: 145000,
      nextSipDate: '2024-02-01',
      platform: 'Groww',
      isActive: true
    },
    {
      id: '2',
      fundName: 'Mirae Asset Large Cap Fund',
      monthlyAmount: 3000,
      startDate: '2023-03-01',
      totalInvested: 33000,
      currentValue: 38500,
      nextSipDate: '2024-02-01',
      platform: 'Kuvera',
      isActive: true
    },
    {
      id: '3',
      fundName: 'SBI Small Cap Fund',
      monthlyAmount: 2000,
      startDate: '2023-06-01',
      totalInvested: 16000,
      currentValue: 19200,
      nextSipDate: '2024-02-01',
      platform: 'Paytm Money',
      isActive: false
    }
  ]);

  const getTotalInvestmentValue = () => {
    return investments.reduce((total, investment) => total + investment.currentValue, 0);
  };

  const getTotalInvestedAmount = () => {
    return investments.reduce((total, investment) => total + investment.investedAmount, 0);
  };

  const getTotalReturns = () => {
    return investments.reduce((total, investment) => total + investment.returns, 0);
  };

  const getTotalOutstandingLoans = () => {
    return loans.reduce((total, loan) => total + loan.outstandingAmount, 0);
  };

  const getTotalEmiAmount = () => {
    return loans.reduce((total, loan) => total + loan.emiAmount, 0);
  };

  const getOverallReturnPercentage = () => {
    const totalInvested = getTotalInvestedAmount();
    const totalReturns = getTotalReturns();
    return totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;
  };

  const portfolioAllocation = investments.map(inv => ({
    name: inv.name,
    value: inv.currentValue,
    color: getTypeColor(inv.type)
  }));

  const monthlyPerformance = [
    { month: 'Aug', value: 580000, invested: 560000 },
    { month: 'Sep', value: 595000, invested: 575000 },
    { month: 'Oct', value: 610000, invested: 590000 },
    { month: 'Nov', value: 605000, invested: 605000 },
    { month: 'Dec', value: 625000, invested: 620000 },
    { month: 'Jan', value: 615000, invested: 530000 }
  ];

  function getTypeColor(type: string) {
    const colors = {
      stocks: '#ef4444',
      mutual_funds: '#3b82f6',
      sip: '#22c55e',
      bonds: '#f59e0b',
      crypto: '#8b5cf6',
      fd: '#06b6d4',
      ppf: '#84cc16'
    };
    return colors[type as keyof typeof colors] || '#6b7280';
  }

  function getRiskColor(risk: string) {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  function getLoanTypeIcon(type: string) {
    switch (type) {
      case 'home': return <Building className="h-4 w-4" />;
      case 'car': return <ArrowUpRight className="h-4 w-4" />;
      case 'personal': return <CreditCard className="h-4 w-4" />;
      case 'education': return <Target className="h-4 w-4" />;
      default: return <Banknote className="h-4 w-4" />;
    }
  }

  return (
    <div className="space-y-6 p-4">
      {/* AI Investment Insights */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">AI Investment Insights</h3>
        <div className="grid gap-4">
          {aiSuggestions.investments.map((suggestion, index) => (
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

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">Total Portfolio</p>
            </div>
            <p className="text-2xl font-semibold">₹{getTotalInvestmentValue().toLocaleString('en-IN')}</p>
            <p className={`text-xs ${getTotalReturns() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {getTotalReturns() >= 0 ? '+' : ''}₹{getTotalReturns().toLocaleString('en-IN')} 
              ({getOverallReturnPercentage().toFixed(2)}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-500" />
              <p className="text-sm text-muted-foreground">Total Invested</p>
            </div>
            <p className="text-2xl font-semibold">₹{getTotalInvestedAmount().toLocaleString('en-IN')}</p>
            <p className="text-xs text-muted-foreground">{investments.length} investments</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-red-500" />
              <p className="text-sm text-muted-foreground">Outstanding Loans</p>
            </div>
            <p className="text-2xl font-semibold">₹{getTotalOutstandingLoans().toLocaleString('en-IN')}</p>
            <p className="text-xs text-muted-foreground">₹{getTotalEmiAmount().toLocaleString('en-IN')} monthly EMI</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-500" />
              <p className="text-sm text-muted-foreground">Net Worth</p>
            </div>
            <p className="text-2xl font-semibold">
              ₹{(getTotalInvestmentValue() - getTotalOutstandingLoans()).toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-muted-foreground">Assets minus liabilities</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="loans">Loans & EMIs</TabsTrigger>
          <TabsTrigger value="sips">SIPs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Portfolio Allocation */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioAllocation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({name, percent}) => `${name.substring(0, 10)} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {portfolioAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#22c55e" name="Current Value" strokeWidth={2} />
                      <Line type="monotone" dataKey="invested" stroke="#3b82f6" name="Invested Amount" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Best Performer</span>
                  <span className="font-medium text-green-600">Reliance Industries (+25%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Worst Performer</span>
                  <span className="font-medium text-red-600">Bitcoin (-11.76%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Asset Classes</span>
                  <span className="font-medium">5 different types</span>
                </div>
                <div className="flex justify-between">
                  <span>Platforms Used</span>
                  <span className="font-medium">4 platforms</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loan Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Active Loans</span>
                  <span className="font-medium">{loans.filter(l => l.status === 'active').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Next EMI Due</span>
                  <span className="font-medium">Jan 25, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Highest Interest Rate</span>
                  <span className="font-medium text-red-600">12.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Monthly EMI</span>
                  <span className="font-medium">₹{getTotalEmiAmount().toLocaleString('en-IN')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investments" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">All Investments</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Investment
            </Button>
          </div>

          <div className="grid gap-4">
            {investments.map((investment) => (
              <Card key={investment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: getTypeColor(investment.type) + '20' }}>
                        <TrendingUp className="h-5 w-5" style={{ color: getTypeColor(investment.type) }} />
                      </div>
                      <div>
                        <h4 className="font-medium">{investment.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{investment.type.replace('_', ' ').toUpperCase()}</span>
                          <span>•</span>
                          <span>{investment.platform}</span>
                          <Badge className={getRiskColor(investment.riskLevel)}>
                            {investment.riskLevel}
                          </Badge>
                        </div>
                        {investment.units && (
                          <p className="text-xs text-muted-foreground">
                            {investment.units} units {investment.nav && `@ ₹${investment.nav}`}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold">₹{investment.currentValue.toLocaleString('en-IN')}</p>
                      <p className={`text-sm flex items-center gap-1 ${
                        investment.returns >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {investment.returns >= 0 ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {investment.returns >= 0 ? '+' : ''}₹{investment.returns.toLocaleString('en-IN')} 
                        ({investment.returnPercentage.toFixed(2)}%)
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Invested: ₹{investment.investedAmount.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                  
                  {investment.maturityDate && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Maturity: {investment.maturityDate}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="loans" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Loans & EMIs</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Loan
            </Button>
          </div>

          <div className="grid gap-4">
            {loans.map((loan) => (
              <Card key={loan.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-red-100">
                        {getLoanTypeIcon(loan.type)}
                      </div>
                      <div>
                        <h4 className="font-medium">{loan.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{loan.lender}</span>
                          <span>•</span>
                          <span>{loan.interestRate}% interest</span>
                          <Badge className={loan.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                            {loan.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Next EMI: {loan.nextEmiDate}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-red-600">₹{loan.outstandingAmount.toLocaleString('en-IN')}</p>
                      <p className="text-sm text-muted-foreground">
                        EMI: ₹{loan.emiAmount.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {loan.remainingTenure} months left
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Repayment Progress</span>
                      <span>{(((loan.tenure - loan.remainingTenure) / loan.tenure) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={((loan.tenure - loan.remainingTenure) / loan.tenure) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sips" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Systematic Investment Plans</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Start New SIP
            </Button>
          </div>

          <div className="grid gap-4">
            {sips.map((sip) => (
              <Card key={sip.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-green-100">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{sip.fundName}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{sip.platform}</span>
                          <span>•</span>
                          <span>₹{sip.monthlyAmount.toLocaleString('en-IN')}/month</span>
                          <Badge className={sip.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                            {sip.isActive ? 'Active' : 'Paused'}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Started: {sip.startDate} • Next: {sip.nextSipDate}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold">₹{sip.currentValue.toLocaleString('en-IN')}</p>
                      <p className="text-sm text-green-600">
                        +₹{(sip.currentValue - sip.totalInvested).toLocaleString('en-IN')} 
                        ({(((sip.currentValue - sip.totalInvested) / sip.totalInvested) * 100).toFixed(2)}%)
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Invested: ₹{sip.totalInvested.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SIP Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>SIP Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sips.filter(s => s.isActive)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fundName" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="totalInvested" fill="#3b82f6" name="Invested" />
                    <Bar dataKey="currentValue" fill="#22c55e" name="Current Value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}