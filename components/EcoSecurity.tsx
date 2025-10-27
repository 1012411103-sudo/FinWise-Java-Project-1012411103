import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Smartphone,
  Key,
  Fingerprint,
  ShieldCheck,
  ShieldAlert,
  Settings,
  Clock,
  Globe,
  MapPin,
  CreditCard,
  Bell,
  Trash2,
  Download,
  RefreshCw,
  Camera,
  Wifi,
  Database
} from 'lucide-react';

interface SecurityAlert {
  id: string;
  type: 'fraud_detection' | 'unusual_activity' | 'login_attempt' | 'data_breach' | 'suspicious_transaction';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
}

interface LoginSession {
  id: string;
  device: string;
  location: string;
  ipAddress: string;
  timestamp: string;
  isActive: boolean;
  isSuspicious: boolean;
}

interface BackupRecord {
  id: string;
  type: 'auto' | 'manual';
  timestamp: string;
  size: string;
  status: 'completed' | 'failed' | 'in_progress';
  location: string;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  biometricAuth: boolean;
  transactionAlerts: boolean;
  loginNotifications: boolean;
  autoLock: boolean;
  autoLockTimeout: number;
  fraudDetection: boolean;
  dataEncryption: boolean;
  autoBackup: boolean;
  backupFrequency: string;
}

export function EcoSecurityComponent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: true,
    biometricAuth: true,
    transactionAlerts: true,
    loginNotifications: true,
    autoLock: true,
    autoLockTimeout: 5,
    fraudDetection: true,
    dataEncryption: true,
    autoBackup: true,
    backupFrequency: 'daily'
  });

  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([
    {
      id: '1',
      type: 'fraud_detection',
      title: 'Suspicious Transaction Detected',
      description: 'Large withdrawal of ₹50,000 from unusual location detected',
      severity: 'high',
      timestamp: '2024-01-15 14:30',
      isRead: false,
      actionRequired: true
    },
    {
      id: '2',
      type: 'unusual_activity',
      title: 'Multiple Login Attempts',
      description: '5 failed login attempts from unknown device',
      severity: 'medium',
      timestamp: '2024-01-15 10:15',
      isRead: false,
      actionRequired: true
    },
    {
      id: '3',
      type: 'login_attempt',
      title: 'New Device Login',
      description: 'Login from new device: iPhone 15 Pro',
      severity: 'low',
      timestamp: '2024-01-14 18:45',
      isRead: true,
      actionRequired: false
    },
    {
      id: '4',
      type: 'data_breach',
      title: 'Security Update Available',
      description: 'Important security patch available for enhanced protection',
      severity: 'medium',
      timestamp: '2024-01-14 09:00',
      isRead: true,
      actionRequired: false
    }
  ]);

  const [loginSessions, setLoginSessions] = useState<LoginSession[]>([
    {
      id: '1',
      device: 'iPhone 15 Pro (Current)',
      location: 'Mumbai, Maharashtra',
      ipAddress: '192.168.1.100',
      timestamp: '2024-01-15 09:30',
      isActive: true,
      isSuspicious: false
    },
    {
      id: '2',
      device: 'MacBook Pro',
      location: 'Mumbai, Maharashtra',
      ipAddress: '192.168.1.101',
      timestamp: '2024-01-14 18:45',
      isActive: true,
      isSuspicious: false
    },
    {
      id: '3',
      device: 'Unknown Device',
      location: 'Delhi, India',
      ipAddress: '203.122.45.78',
      timestamp: '2024-01-14 10:15',
      isActive: false,
      isSuspicious: true
    }
  ]);

  const [backupRecords, setBackupRecords] = useState<BackupRecord[]>([
    {
      id: '1',
      type: 'auto',
      timestamp: '2024-01-15 02:00',
      size: '2.5 MB',
      status: 'completed',
      location: 'Cloud Storage'
    },
    {
      id: '2',
      type: 'manual',
      timestamp: '2024-01-14 15:30',
      size: '2.3 MB',
      status: 'completed',
      location: 'Local Device'
    },
    {
      id: '3',
      type: 'auto',
      timestamp: '2024-01-14 02:00',
      size: '2.4 MB',
      status: 'completed',
      location: 'Cloud Storage'
    }
  ]);

  const getSecurityScore = () => {
    const settings = securitySettings;
    let score = 0;
    const totalFeatures = 9;

    if (settings.twoFactorAuth) score++;
    if (settings.biometricAuth) score++;
    if (settings.transactionAlerts) score++;
    if (settings.loginNotifications) score++;
    if (settings.autoLock) score++;
    if (settings.fraudDetection) score++;
    if (settings.dataEncryption) score++;
    if (settings.autoBackup) score++;
    if (settings.autoLockTimeout <= 5) score++;

    return Math.round((score / totalFeatures) * 100);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'fraud_detection': return <ShieldAlert className="h-4 w-4" />;
      case 'unusual_activity': return <AlertTriangle className="h-4 w-4" />;
      case 'login_attempt': return <Smartphone className="h-4 w-4" />;
      case 'data_breach': return <Database className="h-4 w-4" />;
      case 'suspicious_transaction': return <CreditCard className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const terminateSession = (sessionId: string) => {
    setLoginSessions(prev => prev.filter(session => session.id !== sessionId));
  };

  const markAlertAsRead = (alertId: string) => {
    setSecurityAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const createBackup = () => {
    const newBackup: BackupRecord = {
      id: Date.now().toString(),
      type: 'manual',
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      size: '2.6 MB',
      status: 'in_progress',
      location: 'Cloud Storage'
    };
    
    setBackupRecords(prev => [newBackup, ...prev]);
    
    // Simulate backup completion
    setTimeout(() => {
      setBackupRecords(prev => prev.map(backup => 
        backup.id === newBackup.id ? { ...backup, status: 'completed' as const } : backup
      ));
    }, 3000);
  };

  const updateSetting = (key: keyof SecuritySettings, value: boolean | number | string) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }));
  };

  const unreadAlerts = securityAlerts.filter(alert => !alert.isRead);
  const criticalAlerts = securityAlerts.filter(alert => alert.severity === 'critical' || alert.severity === 'high');

  return (
    <div className="space-y-6 p-4">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">Security Score</p>
            </div>
            <p className="text-2xl font-semibold">{getSecurityScore()}%</p>
            <Progress value={getSecurityScore()} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <p className="text-sm text-muted-foreground">Active Alerts</p>
            </div>
            <p className="text-2xl font-semibold">{unreadAlerts.length}</p>
            <p className="text-xs text-orange-600">{criticalAlerts.length} critical</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-blue-500" />
              <p className="text-sm text-muted-foreground">Active Sessions</p>
            </div>
            <p className="text-2xl font-semibold">{loginSessions.filter(s => s.isActive).length}</p>
            <p className="text-xs text-muted-foreground">{loginSessions.filter(s => s.isSuspicious).length} suspicious</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-purple-500" />
              <p className="text-sm text-muted-foreground">Last Backup</p>
            </div>
            <p className="text-2xl font-semibold">2 hrs</p>
            <p className="text-xs text-green-600">Automated</p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <ShieldAlert className="h-5 w-5" />
              Critical Security Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalAlerts.slice(0, 2).map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-100">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div>
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    {alert.actionRequired && (
                      <Button size="sm" onClick={() => markAlertAsRead(alert.id)}>
                        Review
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Security Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Security Health */}
          <Card>
            <CardHeader>
              <CardTitle>Security Health Check</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Two-Factor Authentication</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Enabled</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Biometric Security</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Data Encryption</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">256-bit AES</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Fraud Detection</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">AI-Powered</Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span>Password Last Changed</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-700">45 days ago</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Auto-Lock</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">5 minutes</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Session Management</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Secure</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Auto Backup</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Daily</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Security Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Security Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityAlerts.slice(0, 5).map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div>
                        <p className="font-medium">{alert.title}</p>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-6">
          {/* Authentication Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Authentication Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={securitySettings.twoFactorAuth} 
                    onCheckedChange={(checked) => updateSetting('twoFactorAuth', checked)}
                  />
                  {securitySettings.twoFactorAuth && (
                    <Button variant="outline" size="sm" onClick={() => setShowTwoFactorSetup(true)}>
                      Configure
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Biometric Authentication</h4>
                  <p className="text-sm text-muted-foreground">Use fingerprint or face recognition</p>
                </div>
                <Switch 
                  checked={securitySettings.biometricAuth} 
                  onCheckedChange={(checked) => updateSetting('biometricAuth', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto-Lock</h4>
                  <p className="text-sm text-muted-foreground">Automatically lock app when inactive</p>
                </div>
                <Switch 
                  checked={securitySettings.autoLock} 
                  onCheckedChange={(checked) => updateSetting('autoLock', checked)}
                />
              </div>

              {securitySettings.autoLock && (
                <div className="ml-6 space-y-2">
                  <Label>Auto-lock timeout (minutes)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={securitySettings.autoLockTimeout}
                      onChange={(e) => updateSetting('autoLockTimeout', parseInt(e.target.value))}
                      className="w-20"
                      min="1"
                      max="30"
                    />
                    <span className="text-sm text-muted-foreground">minutes</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Password Management */}
          <Card>
            <CardHeader>
              <CardTitle>Password & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Password</h4>
                  <p className="text-sm text-muted-foreground">Last changed 45 days ago</p>
                </div>
                <Button variant="outline" onClick={() => setShowChangePassword(true)}>
                  <Key className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Security Recommendation</span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  Consider changing your password. It's been over 30 days since your last update.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Active Login Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {loginSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${session.isSuspicious ? 'bg-red-100' : 'bg-green-100'}`}>
                        <Smartphone className={`h-4 w-4 ${session.isSuspicious ? 'text-red-600' : 'text-green-600'}`} />
                      </div>
                      <div>
                        <p className="font-medium">{session.device}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{session.location}</span>
                          <span>•</span>
                          <span>{session.timestamp}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">IP: {session.ipAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {session.isSuspicious && (
                        <Badge className="bg-red-100 text-red-700">Suspicious</Badge>
                      )}
                      {session.isActive && (
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                      )}
                      {!session.device.includes('Current') && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => terminateSession(session.id)}
                        >
                          Terminate
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          {/* Monitoring Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Security Monitoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">AI Fraud Detection</h4>
                  <p className="text-sm text-muted-foreground">Automatically detect suspicious transactions</p>
                </div>
                <Switch 
                  checked={securitySettings.fraudDetection} 
                  onCheckedChange={(checked) => updateSetting('fraudDetection', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Transaction Alerts</h4>
                  <p className="text-sm text-muted-foreground">Get notified of all transactions</p>
                </div>
                <Switch 
                  checked={securitySettings.transactionAlerts} 
                  onCheckedChange={(checked) => updateSetting('transactionAlerts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Login Notifications</h4>
                  <p className="text-sm text-muted-foreground">Alert when someone logs into your account</p>
                </div>
                <Switch 
                  checked={securitySettings.loginNotifications} 
                  onCheckedChange={(checked) => updateSetting('loginNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Security Alerts & Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div>
                        <p className="font-medium">{alert.title}</p>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      {!alert.isRead && (
                        <Button size="sm" onClick={() => markAlertAsRead(alert.id)}>
                          Mark Read
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Data Encryption</h4>
                  <p className="text-sm text-muted-foreground">All data encrypted with 256-bit AES</p>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Enabled
                </Badge>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Data Access & Control</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Your Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    View Data Usage
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account Data
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800">Privacy Notice</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Your financial data is encrypted and stored securely. We never share your personal information with third parties without your consent.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          {/* Backup Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Data Backup & Recovery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Automatic Backup</h4>
                  <p className="text-sm text-muted-foreground">Regularly backup your financial data</p>
                </div>
                <Switch 
                  checked={securitySettings.autoBackup} 
                  onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Manual Backup</h4>
                  <p className="text-sm text-muted-foreground">Create an immediate backup</p>
                </div>
                <Button onClick={createBackup}>
                  <Database className="h-4 w-4 mr-2" />
                  Create Backup
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Backup History */}
          <Card>
            <CardHeader>
              <CardTitle>Backup History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {backupRecords.map((backup) => (
                  <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        backup.status === 'completed' ? 'bg-green-100' :
                        backup.status === 'failed' ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        <Database className={`h-4 w-4 ${
                          backup.status === 'completed' ? 'text-green-600' :
                          backup.status === 'failed' ? 'text-red-600' : 'text-yellow-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">{backup.type === 'auto' ? 'Automatic' : 'Manual'} Backup</p>
                        <p className="text-sm text-muted-foreground">{backup.timestamp} • {backup.size}</p>
                        <p className="text-xs text-muted-foreground">{backup.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        backup.status === 'completed' ? 'bg-green-100 text-green-700' :
                        backup.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }>
                        {backup.status === 'in_progress' ? (
                          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                        ) : null}
                        {backup.status.replace('_', ' ')}
                      </Badge>
                      {backup.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Change Password Dialog */}
      <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Create a strong password to protect your account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type="password" placeholder="Confirm new password" />
            </div>
            <Button className="w-full">Update Password</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Two-Factor Setup Dialog */}
      <Dialog open={showTwoFactorSetup} onOpenChange={setShowTwoFactorSetup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Scan the QR code with your authenticator app or enter the code manually.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Manual Entry Code</Label>
              <Input value="JBSWY3DPEHPK3PXP" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Verification Code</Label>
              <Input placeholder="Enter 6-digit code from your app" />
            </div>
            <Button className="w-full">Verify & Enable</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}