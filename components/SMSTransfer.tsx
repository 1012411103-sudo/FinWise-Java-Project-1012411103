import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { MessageSquare, Send, Phone, Clock } from 'lucide-react';

interface SMSTransfer {
  id: string;
  phoneNumber: string;
  amount: number;
  message: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  timestamp: string;
}

export function SMSTransferComponent() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [transfers, setTransfers] = useState<SMSTransfer[]>([
    {
      id: '1',
      phoneNumber: '+91 98765 43210',
      amount: 12500,
      message: 'Payment for dinner last night',
      status: 'delivered',
      timestamp: '2024-01-15 14:30'
    },
    {
      id: '2',
      phoneNumber: '+91 87654 32109',
      amount: 6250,
      message: 'Split bill for movie tickets',
      status: 'sent',
      timestamp: '2024-01-15 12:15'
    },
    {
      id: '3',
      phoneNumber: '+91 76543 21098',
      amount: 16500,
      message: 'Rent contribution',
      status: 'pending',
      timestamp: '2024-01-15 10:00'
    }
  ]);

  const handleSendTransfer = async () => {
    if (!phoneNumber || !amount) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate SMS sending
    setTimeout(() => {
      const newTransfer: SMSTransfer = {
        id: Date.now().toString(),
        phoneNumber,
        amount: parseFloat(amount),
        message: message || `Transfer of ₹${amount}`,
        status: 'sent',
        timestamp: new Date().toLocaleString()
      };
      
      setTransfers(prev => [newTransfer, ...prev]);
      setPhoneNumber('');
      setAmount('');
      setMessage('');
      setIsLoading(false);
      
      alert(`SMS transfer request sent to ${phoneNumber} for ₹${amount}`);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'sent': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* SMS Transfer Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Send Money via SMS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transfer-amount">Amount (₹)</Label>
            <Input
              id="transfer-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sms-message">Message (Optional)</Label>
            <Textarea
              id="sms-message"
              placeholder="Add a note with your transfer..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>
          
          <Button 
            onClick={handleSendTransfer} 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Sending SMS...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Transfer Request
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* How it Works */}
      <Card>
        <CardHeader>
          <CardTitle>How SMS Transfer Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full p-1 text-xs">1</div>
              <p>Enter recipient's phone number and transfer amount</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full p-1 text-xs">2</div>
              <p>SMS is sent with secure transfer link and instructions</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full p-1 text-xs">3</div>
              <p>Recipient clicks link to complete the transfer process</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full p-1 text-xs">4</div>
              <p>Both parties receive confirmation when transfer is complete</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transfer History */}
      <Card>
        <CardHeader>
          <CardTitle>Transfer History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transfers.map((transfer) => (
              <div key={transfer.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{transfer.phoneNumber}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{transfer.message}</p>
                  <p className="text-xs text-muted-foreground">{transfer.timestamp}</p>
                </div>
                <div className="text-right space-y-2">
                  <p className="font-semibold">₹{transfer.amount.toLocaleString('en-IN')}</p>
                  <Badge className={getStatusColor(transfer.status)}>
                    {transfer.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}