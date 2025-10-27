import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Calendar as CalendarIcon, 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Plus,
  CreditCard,
  Zap,
  Wifi,
  Smartphone,
  Car,
  Building,
  GraduationCap,
  Shield,
  DollarSign,
  Settings
} from 'lucide-react';

interface Bill {
  id: string;
  name: string;
  type: 'utility' | 'subscription' | 'insurance' | 'loan' | 'credit_card' | 'other';
  amount: number;
  dueDate: string;
  frequency: 'monthly' | 'quarterly' | 'half_yearly' | 'yearly';
  isRecurring: boolean;
  isAutoPay: boolean;
  provider: string;
  status: 'pending' | 'paid' | 'overdue' | 'upcoming';
  reminderDays: number;
  lastPaid?: string;
  nextDue: string;
  icon: React.ReactNode;
}

interface Reminder {
  id: string;
  billId: string;
  message: string;
  type: 'upcoming' | 'due_today' | 'overdue';
  timestamp: string;
  isRead: boolean;
}

export function BillRemindersComponent() {
  const [showAddBill, setShowAddBill] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [newBill, setNewBill] = useState({
    name: '',
    type: '',
    amount: '',
    dueDate: '',
    frequency: '',
    provider: '',
    reminderDays: '3'
  });

  const [bills, setBills] = useState<Bill[]>([
    {
      id: '1',
      name: 'Electricity Bill',
      type: 'utility',
      amount: 3500,
      dueDate: '2024-01-25',
      frequency: 'monthly',
      isRecurring: true,
      isAutoPay: false,
      provider: 'MSEB',
      status: 'upcoming',
      reminderDays: 3,
      lastPaid: '2023-12-25',
      nextDue: '2024-01-25',
      icon: <Zap className="h-4 w-4" />
    },
    {
      id: '2',
      name: 'Home Loan EMI',
      type: 'loan',
      amount: 23500,
      dueDate: '2024-02-01',
      frequency: 'monthly',
      isRecurring: true,
      isAutoPay: true,
      provider: 'HDFC Bank',
      status: 'upcoming',
      reminderDays: 2,
      lastPaid: '2024-01-01',
      nextDue: '2024-02-01',
      icon: <Building className="h-4 w-4" />
    },
    {
      id: '3',
      name: 'Netflix Subscription',
      type: 'subscription',
      amount: 649,
      dueDate: '2024-01-20',
      frequency: 'monthly',
      isRecurring: true,
      isAutoPay: true,
      provider: 'Netflix',
      status: 'paid',
      reminderDays: 1,
      lastPaid: '2024-01-20',
      nextDue: '2024-02-20',
      icon: <Smartphone className="h-4 w-4" />
    },
    {
      id: '4',
      name: 'Internet Bill',
      type: 'utility',
      amount: 1299,
      dueDate: '2024-01-30',
      frequency: 'monthly',
      isRecurring: true,
      isAutoPay: false,
      provider: 'Airtel',
      status: 'upcoming',
      reminderDays: 5,
      lastPaid: '2023-12-30',
      nextDue: '2024-01-30',
      icon: <Wifi className="h-4 w-4" />
    },
    {
      id: '5',
      name: 'Car Insurance',
      type: 'insurance',
      amount: 18500,
      dueDate: '2024-03-15',
      frequency: 'yearly',
      isRecurring: true,
      isAutoPay: false,
      provider: 'ICICI Lombard',
      status: 'upcoming',
      reminderDays: 30,
      lastPaid: '2023-03-15',
      nextDue: '2024-03-15',
      icon: <Car className="h-4 w-4" />
    },
    {
      id: '6',
      name: 'Credit Card Payment',
      type: 'credit_card',
      amount: 15750,
      dueDate: '2024-01-18',
      frequency: 'monthly',
      isRecurring: true,
      isAutoPay: false,
      provider: 'HDFC Bank',
      status: 'overdue',
      reminderDays: 2,
      lastPaid: '2023-12-18',
      nextDue: '2024-01-18',
      icon: <CreditCard className="h-4 w-4" />
    }
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      billId: '6',
      message: 'Credit Card Payment is overdue by 2 days',
      type: 'overdue',
      timestamp: '2024-01-15 10:00',
      isRead: false
    },
    {
      id: '2',
      billId: '1',
      message: 'Electricity Bill due in 3 days',
      type: 'upcoming',
      timestamp: '2024-01-15 09:00',
      isRead: false
    },
    {
      id: '3',
      billId: '2',
      message: 'Home Loan EMI due tomorrow',
      type: 'due_today',
      timestamp: '2024-01-15 08:00',
      isRead: true
    }
  ]);

  const getTotalMonthlyBills = () => {
    return bills.filter(bill => bill.frequency === 'monthly').reduce((total, bill) => total + bill.amount, 0);
  };

  const getUpcomingBills = () => {
    return bills.filter(bill => bill.status === 'upcoming').length;
  };

  const getOverdueBills = () => {
    return bills.filter(bill => bill.status === 'overdue');
  };

  const getAutoPaidBills = () => {
    return bills.filter(bill => bill.isAutoPay).length;
  };

  const getBillsByStatus = (status: string) => {
    return bills.filter(bill => bill.status === status);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'utility': return <Zap className="h-4 w-4" />;
      case 'subscription': return <Smartphone className="h-4 w-4" />;
      case 'insurance': return <Shield className="h-4 w-4" />;
      case 'loan': return <Building className="h-4 w-4" />;
      case 'credit_card': return <CreditCard className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const markAsPaid = (billId: string) => {
    setBills(prev => prev.map(bill => 
      bill.id === billId 
        ? { 
            ...bill, 
            status: 'paid' as const, 
            lastPaid: new Date().toISOString().split('T')[0],
            nextDue: getNextDueDate(bill.dueDate, bill.frequency)
          }
        : bill
    ));
  };

  const getNextDueDate = (currentDue: string, frequency: string) => {
    const date = new Date(currentDue);
    switch (frequency) {
      case 'monthly':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'quarterly':
        date.setMonth(date.getMonth() + 3);
        break;
      case 'half_yearly':
        date.setMonth(date.getMonth() + 6);
        break;
      case 'yearly':
        date.setFullYear(date.getFullYear() + 1);
        break;
    }
    return date.toISOString().split('T')[0];
  };

  const addNewBill = () => {
    if (newBill.name && newBill.type && newBill.amount && newBill.dueDate) {
      const bill: Bill = {
        id: Date.now().toString(),
        name: newBill.name,
        type: newBill.type as any,
        amount: parseFloat(newBill.amount),
        dueDate: newBill.dueDate,
        frequency: newBill.frequency as any,
        isRecurring: true,
        isAutoPay: false,
        provider: newBill.provider,
        status: 'upcoming',
        reminderDays: parseInt(newBill.reminderDays),
        nextDue: newBill.dueDate,
        icon: getTypeIcon(newBill.type)
      };
      
      setBills(prev => [...prev, bill]);
      setNewBill({
        name: '',
        type: '',
        amount: '',
        dueDate: '',
        frequency: '',
        provider: '',
        reminderDays: '3'
      });
      setShowAddBill(false);
    }
  };

  const unreadReminders = reminders.filter(r => !r.isRead);

  return (
    <div className="space-y-6 p-4">
      {/* Add New Expense Button */}
      <div className="flex items-center justify-between">
        <h3>Bills & EMI Overview</h3>
        <Dialog open={showAddBill} onOpenChange={setShowAddBill}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Bill/EMI</DialogTitle>
              <DialogDescription>
                Set up a new bill or EMI reminder to never miss a payment.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bill Name</Label>
                  <Input
                    placeholder="e.g., Electricity Bill"
                    value={newBill.name}
                    onChange={(e) => setNewBill(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Provider</Label>
                  <Input
                    placeholder="e.g., MSEB, HDFC Bank"
                    value={newBill.provider}
                    onChange={(e) => setNewBill(prev => ({ ...prev, provider: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={newBill.type} onValueChange={(value) => setNewBill(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utility">Utility Bill</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="loan">Loan/EMI</SelectItem>
                      <SelectItem value="credit_card">Credit Card</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Frequency</Label>
                  <Select value={newBill.frequency} onValueChange={(value) => setNewBill(prev => ({ ...prev, frequency: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="half_yearly">Half Yearly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Amount (₹)</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={newBill.amount}
                    onChange={(e) => setNewBill(prev => ({ ...prev, amount: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={newBill.dueDate}
                    onChange={(e) => setNewBill(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Reminder Days Before</Label>
                <Select value={newBill.reminderDays} onValueChange={(value) => setNewBill(prev => ({ ...prev, reminderDays: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day</SelectItem>
                    <SelectItem value="2">2 days</SelectItem>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="5">5 days</SelectItem>
                    <SelectItem value="7">1 week</SelectItem>
                    <SelectItem value="30">1 month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={addNewBill} className="w-full">
                Add Bill/EMI
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-500" />
              <p className="text-sm text-muted-foreground">Monthly Bills</p>
            </div>
            <p className="text-2xl font-semibold">₹{getTotalMonthlyBills().toLocaleString('en-IN')}</p>
            <p className="text-xs text-muted-foreground">{bills.filter(b => b.frequency === 'monthly').length} bills</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <p className="text-sm text-muted-foreground">Upcoming</p>
            </div>
            <p className="text-2xl font-semibold">{getUpcomingBills()}</p>
            <p className="text-xs text-muted-foreground">bills due soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <p className="text-sm text-muted-foreground">Overdue</p>
            </div>
            <p className="text-2xl font-semibold">{getOverdueBills().length}</p>
            <p className="text-xs text-red-600">needs attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">Auto-Pay</p>
            </div>
            <p className="text-2xl font-semibold">{getAutoPaidBills()}</p>
            <p className="text-xs text-muted-foreground">automated bills</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      {unreadReminders.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Bell className="h-5 w-5" />
              Bill Reminders ({unreadReminders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unreadReminders.slice(0, 3).map((reminder) => {
                const bill = bills.find(b => b.id === reminder.billId);
                return (
                  <div key={reminder.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        reminder.type === 'overdue' ? 'bg-red-100' : 
                        reminder.type === 'due_today' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        {reminder.type === 'overdue' ? 
                          <AlertTriangle className="h-4 w-4 text-red-600" /> :
                          <Bell className="h-4 w-4 text-blue-600" />
                        }
                      </div>
                      <div>
                        <p className="font-medium">{reminder.message}</p>
                        <p className="text-sm text-muted-foreground">{bill?.name} - ₹{bill?.amount.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    {bill && (
                      <Button 
                        size="sm" 
                        onClick={() => markAsPaid(bill.id)}
                        className={bill.status === 'overdue' ? 'bg-red-600 hover:bg-red-700' : ''}
                      >
                        Mark Paid
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bills Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Bill Management
            </CardTitle>
            <Dialog open={showAddBill} onOpenChange={setShowAddBill}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Bill
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Bill</DialogTitle>
                  <DialogDescription>
                    Set up a new bill or EMI reminder to never miss a payment.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Bill Name</Label>
                      <Input
                        placeholder="e.g., Electricity Bill"
                        value={newBill.name}
                        onChange={(e) => setNewBill(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Provider</Label>
                      <Input
                        placeholder="e.g., MSEB, HDFC Bank"
                        value={newBill.provider}
                        onChange={(e) => setNewBill(prev => ({ ...prev, provider: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select value={newBill.type} onValueChange={(value) => setNewBill(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utility">Utility Bill</SelectItem>
                          <SelectItem value="subscription">Subscription</SelectItem>
                          <SelectItem value="insurance">Insurance</SelectItem>
                          <SelectItem value="loan">Loan/EMI</SelectItem>
                          <SelectItem value="credit_card">Credit Card</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Frequency</Label>
                      <Select value={newBill.frequency} onValueChange={(value) => setNewBill(prev => ({ ...prev, frequency: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="half_yearly">Half Yearly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Amount (₹)</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={newBill.amount}
                        onChange={(e) => setNewBill(prev => ({ ...prev, amount: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <Input
                        type="date"
                        value={newBill.dueDate}
                        onChange={(e) => setNewBill(prev => ({ ...prev, dueDate: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Reminder Days Before</Label>
                    <Select value={newBill.reminderDays} onValueChange={(value) => setNewBill(prev => ({ ...prev, reminderDays: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="2">2 days</SelectItem>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="5">5 days</SelectItem>
                        <SelectItem value="7">1 week</SelectItem>
                        <SelectItem value="30">1 month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={addNewBill} className="w-full">
                    Add Bill
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bills.map((bill) => (
              <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-blue-100`}>
                    {bill.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{bill.name}</h4>
                      <Badge className={getStatusColor(bill.status)}>
                        {bill.status}
                      </Badge>
                      {bill.isAutoPay && (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Auto-Pay
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{bill.provider}</span>
                      <span>•</span>
                      <span>{bill.frequency}</span>
                      <span>•</span>
                      <span>Due: {bill.nextDue}</span>
                    </div>
                    {bill.lastPaid && (
                      <p className="text-xs text-muted-foreground">Last paid: {bill.lastPaid}</p>
                    )}
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <p className="font-semibold">₹{bill.amount.toLocaleString('en-IN')}</p>
                  <div className="flex items-center gap-2">
                    {bill.status !== 'paid' && (
                      <Button 
                        size="sm" 
                        onClick={() => markAsPaid(bill.id)}
                        className={bill.status === 'overdue' ? 'bg-red-600 hover:bg-red-700' : ''}
                      >
                        Mark Paid
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">This Month's Bills</h4>
              <div className="space-y-3">
                {bills.filter(bill => bill.status !== 'paid').slice(0, 6).map((bill) => (
                  <div key={bill.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        {bill.icon}
                      </div>
                      <div>
                        <p className="font-medium">{bill.name}</p>
                        <p className="text-sm text-muted-foreground">Due: {bill.nextDue}</p>
                      </div>
                    </div>
                    <p className="font-semibold">₹{bill.amount.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}