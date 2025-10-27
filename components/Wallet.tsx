import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Wallet, CreditCard, ArrowUpRight, ArrowDownLeft, Eye, EyeOff, QrCode, Camera } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'receive' | 'send';
  amount: number;
  description: string;
  date: string;
}

export function WalletComponent() {
  const [balance, setBalance] = useState(205430);
  const [showBalance, setShowBalance] = useState(true);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  
  const [transactions] = useState<Transaction[]>([
    { id: '1', type: 'receive', amount: 98000, description: 'Salary Payment', date: '2024-01-15' },
    { id: '2', type: 'send', amount: 2250, description: 'Grocery Shopping', date: '2024-01-14' },
    { id: '3', type: 'send', amount: 7500, description: 'Fuel Station', date: '2024-01-13' },
    { id: '4', type: 'receive', amount: 4200, description: 'Cashback Reward', date: '2024-01-12' },
  ]);

  const handlePayment = () => {
    if (paymentAmount && recipient) {
      const amount = parseFloat(paymentAmount);
      if (amount > 0 && amount <= balance) {
        setBalance(prev => prev - amount);
        setPaymentAmount('');
        setRecipient('');
        alert(`Payment of ₹${amount} sent to ${recipient} successfully!`);
      } else {
        alert('Invalid amount or insufficient balance');
      }
    }
  };

  const handleScanQR = async () => {
    setIsScanning(true);
    
    try {
      // Check if camera is available
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } // Use back camera if available
        });
        
        // For demo purposes, simulate QR scan after 3 seconds
        setTimeout(() => {
          // Stop the camera stream
          stream.getTracks().forEach(track => track.stop());
          
          // Simulate QR code detection result
          const mockPhoneNumber = '+91 98765 43210';
          setRecipient(mockPhoneNumber);
          setIsScanning(false);
          alert(`QR Code scanned! Phone number: ${mockPhoneNumber}`);
        }, 3000);
        
      } else {
        // Fallback for browsers without camera access
        const mockPhoneNumber = '+91 98765 43210';
        setRecipient(mockPhoneNumber);
        setIsScanning(false);
        alert(`QR Code scanner not available. Using demo number: ${mockPhoneNumber}`);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setIsScanning(false);
      alert('Camera access denied or not available');
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Offline Wallet
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:bg-white/20"
            >
              {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm opacity-90">Available Balance</p>
            <p className="text-3xl font-semibold">
              {showBalance ? `₹${balance.toLocaleString('en-IN')}` : '••••••'}
            </p>
            <Badge variant="secondary" className="bg-white/20 text-white">
              Offline Mode
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Payment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Quick Payment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <div className="flex gap-2">
              <Input
                id="recipient"
                placeholder="Enter number"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleScanQR}
                disabled={isScanning}
                className="shrink-0"
              >
                {isScanning ? (
                  <Camera className="h-4 w-4 animate-pulse" />
                ) : (
                  <QrCode className="h-4 w-4" />
                )}
              </Button>
            </div>
            {isScanning && (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Camera className="h-4 w-4 animate-pulse" />
                Scanning QR code... Point camera at QR code
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
          </div>
          <Button onClick={handlePayment} className="w-full">
            Send Payment
          </Button>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'receive' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'receive' ? (
                      <ArrowDownLeft className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <p className={`font-semibold ${
                  transaction.type === 'receive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'receive' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}