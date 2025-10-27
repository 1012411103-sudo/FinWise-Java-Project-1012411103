import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { 
  CreditCard, 
  Building2, 
  Smartphone, 
  TrendingUp, 
  Eye, 
  EyeOff,
  Plus,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface Account {
  id: string;
  name: string;
  type: 'bank' | 'wallet' | 'investment';
  provider: string;
  balance: number;
  accountNumber: string;
  status: 'connected' | 'disconnected' | 'syncing';
  lastSync: string;
  icon: React.ReactNode;
}

interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  description: string;
  type: 'credit' | 'debit';
  date: string;
  category: string;
}

export function MultiAccountComponent() {
  const [showBalances, setShowBalances] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      name: 'HDFC Savings',
      type: 'bank',
      provider: 'HDFC Bank',
      balance: 285430,
      accountNumber: '****2847',
      status: 'connected',
      lastSync: '2 mins ago',
      icon: <Building2 className="h-5 w-5" />
    },
    {
      id: '2',
      name: 'Paytm Wallet',
      type: 'wallet',
      provider: 'Paytm',
      balance: 8250,
      accountNumber: '9876543210',
      status: 'connected',
      lastSync: '5 mins ago',
      icon: <Smartphone className="h-5 w-5" />
    },
    {
      id: '3',
      name: 'Google Pay',
      type: 'wallet',
      provider: 'Google Pay',
      balance: 1750,
      accountNumber: '9876543210',
      status: 'connected',
      lastSync: '1 hour ago',
      icon: <Smartphone className="h-5 w-5" />
    },
    {
      id: '4',
      name: 'PhonePe',
      type: 'wallet',
      provider: 'PhonePe',
      balance: 3420,
      accountNumber: '9876543210',
      status: 'disconnected',
      lastSync: '2 days ago',
      icon: <Smartphone className="h-5 w-5" />
    },
    {
      id: '5',
      name: 'Zerodha',
      type: 'investment',
      provider: 'Zerodha',
      balance: 125650,
      accountNumber: 'ZD****789',
      status: 'connected',
      lastSync: '30 mins ago',
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      id: '6',
      name: 'Groww',
      type: 'investment',
      provider: 'Groww',
      balance: 89340,
      accountNumber: 'GR****456',
      status: 'syncing',
      lastSync: 'Syncing...',
      icon: <TrendingUp className="h-5 w-5" />
    }
  ]);

  const [recentTransactions] = useState<Transaction[]>([
    {
      id: '1',
      accountId: '1',
      amount: 2500,
      description: 'UPI Payment to Swiggy',
      type: 'debit',
      date: '2024-01-15',
      category: 'Food & Dining'
    },
    {
      id: '2',
      accountId: '2',
      amount: 1000,
      description: 'Cashback Received',
      type: 'credit',
      date: '2024-01-15',
      category: 'Rewards'
    },
    {
      id: '3',
      accountId: '5',
      amount: 15000,
      description: 'Stock Purchase - TCS',
      type: 'debit',
      date: '2024-01-14',
      category: 'Investment'
    }
  ]);

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  const getAccountsByType = (type: string) => {
    return accounts.filter(account => account.type === type);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'disconnected':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'syncing':
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-700';
      case 'disconnected':
        return 'bg-red-100 text-red-700';
      case 'syncing':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const syncAccount = (accountId: string) => {
    setAccounts(prev => prev.map(account => 
      account.id === accountId 
        ? { ...account, status: 'syncing' as const, lastSync: 'Syncing...' }
        : account
    ));

    // Simulate sync completion
    setTimeout(() => {
      setAccounts(prev => prev.map(account => 
        account.id === accountId 
          ? { ...account, status: 'connected' as const, lastSync: 'Just now' }
          : account
      ));
    }, 2000);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Balance</p>
                <p className="text-2xl font-semibold">
                  {showBalances ? `₹${getTotalBalance().toLocaleString('en-IN')}` : '••••••'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalances(!showBalances)}
              >
                {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-blue-500" />
              <p className="text-sm text-muted-foreground">Bank Accounts</p>
            </div>
            <p className="text-2xl font-semibold">{getAccountsByType('bank').length}</p>
            <p className="text-xs text-muted-foreground">
              ₹{getAccountsByType('bank').reduce((sum, acc) => sum + acc.balance, 0).toLocaleString('en-IN')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">Digital Wallets</p>
            </div>
            <p className="text-2xl font-semibold">{getAccountsByType('wallet').length}</p>
            <p className="text-xs text-muted-foreground">
              ₹{getAccountsByType('wallet').reduce((sum, acc) => sum + acc.balance, 0).toLocaleString('en-IN')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <p className="text-sm text-muted-foreground">Investment Accounts</p>
            </div>
            <p className="text-2xl font-semibold">{getAccountsByType('investment').length}</p>
            <p className="text-xs text-muted-foreground">
              ₹{getAccountsByType('investment').reduce((sum, acc) => sum + acc.balance, 0).toLocaleString('en-IN')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Account Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Connected Accounts
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Auto Sync</span>
                <Switch checked={autoSync} onCheckedChange={setAutoSync} />
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    account.type === 'bank' ? 'bg-blue-100' :
                    account.type === 'wallet' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    {account.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{account.name}</h4>
                      {getStatusIcon(account.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{account.provider}</p>
                    <p className="text-xs text-muted-foreground">{account.accountNumber}</p>
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <p className="font-semibold">
                    {showBalances ? `₹${account.balance.toLocaleString('en-IN')}` : '••••••'}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(account.status)}>
                      {account.status}
                    </Badge>
                    {account.status !== 'syncing' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => syncAccount(account.id)}
                      >
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last sync: {account.lastSync}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions Across All Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions (All Accounts)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => {
              const account = accounts.find(acc => acc.id === transaction.accountId);
              return (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'credit' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {account?.icon}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {account?.name} • {transaction.category}
                      </p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <p className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Account Health Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Connected Accounts</span>
                <span>{accounts.filter(acc => acc.status === 'connected').length}/{accounts.length}</span>
              </div>
              <Progress 
                value={(accounts.filter(acc => acc.status === 'connected').length / accounts.length) * 100} 
                className="h-2"
              />
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <h4 className="font-medium">Account Status</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Connected</span>
                  </div>
                  <span className="text-sm">{accounts.filter(acc => acc.status === 'connected').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Disconnected</span>
                  </div>
                  <span className="text-sm">{accounts.filter(acc => acc.status === 'disconnected').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Syncing</span>
                  </div>
                  <span className="text-sm">{accounts.filter(acc => acc.status === 'syncing').length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sync Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto Sync</span>
                <Switch checked={autoSync} onCheckedChange={setAutoSync} />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-medium">Last Sync Times</h4>
                {accounts.slice(0, 3).map((account) => (
                  <div key={account.id} className="flex items-center justify-between">
                    <span className="text-sm">{account.name}</span>
                    <span className="text-xs text-muted-foreground">{account.lastSync}</span>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync All Accounts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}