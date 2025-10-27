import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Cloud, 
  Smartphone, 
  Monitor, 
  Tablet,
  Globe,
  RefreshCw, 
  Download, 
  Upload,
  CheckCircle,
  AlertTriangle,
  Clock,
  Wifi,
  WifiOff,
  Database,
  Shield,
  Settings,
  Trash2,
  Archive,
  HardDrive,
  Server,
  Zap,
  Lock,
  Users,
  Calendar
} from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet' | 'web';
  platform: string;
  lastSync: string;
  syncStatus: 'synced' | 'syncing' | 'offline' | 'error';
  dataSize: string;
  isActive: boolean;
  location: string;
}

interface SyncData {
  category: string;
  lastSync: string;
  size: string;
  status: 'synced' | 'pending' | 'error';
  records: number;
  icon: React.ReactNode;
}

interface BackupSchedule {
  type: 'auto' | 'manual';
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  enabled: boolean;
  lastBackup: string;
  nextBackup: string;
}

interface CloudStorage {
  provider: string;
  used: number;
  total: number;
  cost: number;
  status: 'active' | 'inactive';
}

export function DataSyncComponent() {
  const [activeTab, setActiveTab] = useState('devices');
  const [isOnline, setIsOnline] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [cloudBackup, setCloudBackup] = useState(true);
  const [encryptData, setEncryptData] = useState(true);

  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro',
      type: 'mobile',
      platform: 'iOS 17.2',
      lastSync: '2 minutes ago',
      syncStatus: 'synced',
      dataSize: '2.4 MB',
      isActive: true,
      location: 'Mumbai, India'
    },
    {
      id: '2',
      name: 'MacBook Pro',
      type: 'desktop',
      platform: 'macOS Sonoma',
      lastSync: '5 minutes ago',
      syncStatus: 'synced',
      dataSize: '2.4 MB',
      isActive: true,
      location: 'Mumbai, India'
    },
    {
      id: '3',
      name: 'iPad Air',
      type: 'tablet',
      platform: 'iPadOS 17.2',
      lastSync: '1 hour ago',
      syncStatus: 'syncing',
      dataSize: '2.1 MB',
      isActive: false,
      location: 'Delhi, India'
    },
    {
      id: '4',
      name: 'Chrome Browser',
      type: 'web',
      platform: 'Windows 11',
      lastSync: '3 hours ago',
      syncStatus: 'offline',
      dataSize: '1.8 MB',
      isActive: false,
      location: 'Mumbai, India'
    }
  ]);

  const [syncData, setSyncData] = useState<SyncData[]>([
    {
      category: 'Transactions',
      lastSync: '2 minutes ago',
      size: '850 KB',
      status: 'synced',
      records: 1247,
      icon: <RefreshCw className="h-4 w-4" />
    },
    {
      category: 'Accounts',
      lastSync: '5 minutes ago',
      size: '156 KB',
      status: 'synced',
      records: 8,
      icon: <Database className="h-4 w-4" />
    },
    {
      category: 'Budgets',
      lastSync: '10 minutes ago',
      size: '89 KB',
      status: 'synced',
      records: 12,
      icon: <Archive className="h-4 w-4" />
    },
    {
      category: 'Investments',
      lastSync: '15 minutes ago',
      size: '234 KB',
      status: 'synced',
      records: 25,
      icon: <Upload className="h-4 w-4" />
    },
    {
      category: 'Bills & EMIs',
      lastSync: '20 minutes ago',
      size: '167 KB',
      status: 'pending',
      records: 18,
      icon: <Calendar className="h-4 w-4" />
    },
    {
      category: 'Documents',
      lastSync: '1 hour ago',
      size: '1.2 MB',
      status: 'error',
      records: 42,
      icon: <HardDrive className="h-4 w-4" />
    }
  ]);

  const [backupSchedule, setBackupSchedule] = useState<BackupSchedule>({
    type: 'auto',
    frequency: 'daily',
    time: '02:00',
    enabled: true,
    lastBackup: '2024-01-15 02:00',
    nextBackup: '2024-01-16 02:00'
  });

  const [cloudStorage, setCloudStorage] = useState<CloudStorage>({
    provider: 'FinWise Cloud',
    used: 2.4,
    total: 100,
    cost: 0,
    status: 'active'
  });

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'desktop': return <Monitor className="h-4 w-4" />;
      case 'tablet': return <Tablet className="h-4 w-4" />;
      case 'web': return <Globe className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return 'bg-green-100 text-green-700';
      case 'syncing': return 'bg-blue-100 text-blue-700';
      case 'offline': return 'bg-gray-100 text-gray-700';
      case 'error': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'synced': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'syncing': return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'offline': return <WifiOff className="h-4 w-4 text-gray-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const syncAllData = () => {
    setSyncData(prev => prev.map(data => ({ ...data, status: 'syncing' as const })));
    
    // Simulate sync process
    setTimeout(() => {
      setSyncData(prev => prev.map(data => ({ 
        ...data, 
        status: 'synced' as const,
        lastSync: 'Just now'
      })));
    }, 3000);
  };

  const removeDevice = (deviceId: string) => {
    if (confirm('Are you sure you want to remove this device from sync?')) {
      setDevices(prev => prev.filter(device => device.id !== deviceId));
    }
  };

  const createBackup = () => {
    alert('Creating manual backup... This may take a few minutes.');
  };

  const restoreBackup = () => {
    if (confirm('Are you sure you want to restore from the latest backup? This will overwrite current data.')) {
      alert('Restoring from backup... Please wait.');
    }
  };

  const getTotalSyncedData = () => {
    return syncData.reduce((total, data) => {
      const size = parseFloat(data.size.split(' ')[0]);
      const unit = data.size.split(' ')[1];
      return total + (unit === 'MB' ? size : size / 1024);
    }, 0);
  };

  const getSyncHealth = () => {
    const totalItems = syncData.length;
    const syncedItems = syncData.filter(data => data.status === 'synced').length;
    return Math.round((syncedItems / totalItems) * 100);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Data Sync & Cloud Backup
              <Badge className={isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                {isOnline ? 'Online' : 'Offline'}
              </Badge>
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Auto Sync</span>
                <Switch checked={autoSync} onCheckedChange={setAutoSync} />
              </div>
              <Button onClick={syncAllData} disabled={!isOnline}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Now
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4 text-blue-500" />
              <p className="text-sm text-muted-foreground">Sync Health</p>
            </div>
            <p className="text-2xl font-semibold">{getSyncHealth()}%</p>
            <Progress value={getSyncHealth()} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">Data Synced</p>
            </div>
            <p className="text-2xl font-semibold">{getTotalSyncedData().toFixed(1)} MB</p>
            <p className="text-xs text-muted-foreground">Across all devices</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-purple-500" />
              <p className="text-sm text-muted-foreground">Connected Devices</p>
            </div>
            <p className="text-2xl font-semibold">{devices.filter(d => d.isActive).length}</p>
            <p className="text-xs text-muted-foreground">Active now</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-orange-500" />
              <p className="text-sm text-muted-foreground">Last Backup</p>
            </div>
            <p className="text-2xl font-semibold">2 hrs</p>
            <p className="text-xs text-muted-foreground">Auto backup</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="data">Data Sync</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${device.isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {getDeviceIcon(device.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{device.name}</h4>
                          {device.isActive && (
                            <Badge className="bg-green-100 text-green-700">Active</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{device.platform}</span>
                          <span>•</span>
                          <span>{device.location}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{device.dataSize} synced</p>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(device.syncStatus)}
                        <Badge className={getStatusColor(device.syncStatus)}>
                          {device.syncStatus}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{device.lastSync}</p>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeDevice(device.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add New Device</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Cloud className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium mb-2">Connect a New Device</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  To sync your data across devices, install FinWise on your other devices and sign in with your account.
                </p>
                <div className="flex justify-center gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download App
                  </Button>
                  <Button variant="outline">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Generate QR Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Data Synchronization</CardTitle>
                <Button onClick={syncAllData} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {syncData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        data.status === 'synced' ? 'bg-green-100' :
                        data.status === 'syncing' ? 'bg-blue-100' :
                        data.status === 'error' ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        {data.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{data.category}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{data.records} records</span>
                          <span>•</span>
                          <span>{data.size}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Last sync: {data.lastSync}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {getStatusIcon(data.status)}
                      <Badge className={getStatusColor(data.status)}>
                        {data.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sync Conflicts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-medium mb-2">No Sync Conflicts</h3>
                <p className="text-sm text-muted-foreground">
                  All your data is synchronized across devices without any conflicts.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          {/* Cloud Storage Status */}
          <Card>
            <CardHeader>
              <CardTitle>Cloud Storage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{cloudStorage.provider}</h4>
                    <p className="text-sm text-muted-foreground">
                      {cloudStorage.used} MB of {cloudStorage.total} MB used
                    </p>
                  </div>
                  <Badge className={cloudStorage.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                    {cloudStorage.status}
                  </Badge>
                </div>
                
                <Progress value={(cloudStorage.used / cloudStorage.total) * 100} className="h-3" />
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{((cloudStorage.used / cloudStorage.total) * 100).toFixed(1)}% used</span>
                  <span>{cloudStorage.total - cloudStorage.used} MB free</span>
                </div>
                
                {cloudStorage.cost > 0 && (
                  <p className="text-sm">
                    Monthly cost: <span className="font-medium">₹{cloudStorage.cost}</span>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Backup Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Backup Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Automatic Backup</h4>
                  <p className="text-sm text-muted-foreground">
                    {backupSchedule.frequency} at {backupSchedule.time}
                  </p>
                </div>
                <Switch 
                  checked={backupSchedule.enabled} 
                  onCheckedChange={(checked) => setBackupSchedule(prev => ({ ...prev, enabled: checked }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Backup Frequency</Label>
                  <Select 
                    value={backupSchedule.frequency} 
                    onValueChange={(value) => setBackupSchedule(prev => ({ ...prev, frequency: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Backup Time</Label>
                  <Input
                    type="time"
                    value={backupSchedule.time}
                    onChange={(e) => setBackupSchedule(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Backup Status</span>
                </div>
                <div className="mt-2 space-y-1 text-sm text-blue-700">
                  <p>Last backup: {backupSchedule.lastBackup}</p>
                  <p>Next backup: {backupSchedule.nextBackup}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Manual Backup */}
          <Card>
            <CardHeader>
              <CardTitle>Manual Backup & Restore</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={createBackup} className="h-auto p-4 justify-start">
                  <div className="flex items-center gap-3">
                    <Upload className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Create Backup</p>
                      <p className="text-sm text-muted-foreground">Backup all data immediately</p>
                    </div>
                  </div>
                </Button>
                
                <Button onClick={restoreBackup} variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center gap-3">
                    <Download className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Restore Backup</p>
                      <p className="text-sm text-muted-foreground">Restore from latest backup</p>
                    </div>
                  </div>
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Recent Backups</h4>
                <div className="space-y-2">
                  {[
                    { date: '2024-01-15 02:00', size: '2.4 MB', type: 'Auto' },
                    { date: '2024-01-14 02:00', size: '2.3 MB', type: 'Auto' },
                    { date: '2024-01-13 15:30', size: '2.2 MB', type: 'Manual' },
                  ].map((backup, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{backup.date}</p>
                        <p className="text-sm text-muted-foreground">{backup.size} • {backup.type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sync Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto Sync</h4>
                  <p className="text-sm text-muted-foreground">Automatically sync data across devices</p>
                </div>
                <Switch checked={autoSync} onCheckedChange={setAutoSync} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Cloud Backup</h4>
                  <p className="text-sm text-muted-foreground">Automatically backup data to cloud</p>
                </div>
                <Switch checked={cloudBackup} onCheckedChange={setCloudBackup} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Encrypt Data</h4>
                  <p className="text-sm text-muted-foreground">Encrypt all synced and backed up data</p>
                </div>
                <Switch checked={encryptData} onCheckedChange={setEncryptData} />
              </div>

              <div className="space-y-2">
                <Label>Sync Frequency</Label>
                <Select defaultValue="real-time">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-time">Real-time</SelectItem>
                    <SelectItem value="hourly">Every hour</SelectItem>
                    <SelectItem value="daily">Once daily</SelectItem>
                    <SelectItem value="manual">Manual only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Data Retention</Label>
                <Select defaultValue="forever">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30-days">30 days</SelectItem>
                    <SelectItem value="90-days">90 days</SelectItem>
                    <SelectItem value="1-year">1 year</SelectItem>
                    <SelectItem value="forever">Forever</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="h-4 w-4 mr-2" />
                Force Sync All Devices
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Database className="h-4 w-4 mr-2" />
                Clear Local Cache
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Archive className="h-4 w-4 mr-2" />
                Export All Data
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete All Cloud Data
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}