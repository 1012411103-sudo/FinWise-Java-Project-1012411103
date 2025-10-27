import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { LanguageSelector } from './LanguageSelector';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Palette, 
  Globe, 
  Download, 
  Upload,
  Smartphone,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Eye,
  DollarSign,
  Calendar,
  CreditCard,
  Target,
  BarChart3,
  Save,
  RefreshCw,
  Trash2,
  HelpCircle,
  Mail,
  Phone,
  LogOut
} from 'lucide-react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  occupation: string;
  annualIncome: string;
  riskTolerance: 'low' | 'medium' | 'high';
  investmentGoals: string[];
}

interface NotificationSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  transactionAlerts: boolean;
  billReminders: boolean;
  investmentUpdates: boolean;
  securityAlerts: boolean;
  marketNews: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto';
  accentColor: string;
  fontSize: number;
  compactMode: boolean;
  showBalances: boolean;
  defaultCurrency: string;
  numberFormat: 'indian' | 'international';
  chartType: 'pie' | 'bar' | 'line';
}

interface PrivacySettings {
  dataSharing: boolean;
  analytics: boolean;
  crashReporting: boolean;
  marketingEmails: boolean;
  locationServices: boolean;
  biometricData: boolean;
}

export function SettingsComponent() {
  const { t, language, setLanguage, languages } = useLanguage();
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1990-05-15',
    occupation: 'Software Engineer',
    annualIncome: '1200000',
    riskTolerance: 'medium',
    investmentGoals: ['Retirement', 'Emergency Fund', 'Vacation']
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    transactionAlerts: true,
    billReminders: true,
    investmentUpdates: true,
    securityAlerts: true,
    marketNews: false,
    soundEnabled: true,
    vibrationEnabled: true
  });

  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>({
    theme: 'auto',
    accentColor: '#3b82f6',
    fontSize: 16,
    compactMode: false,
    showBalances: true,
    defaultCurrency: 'INR',
    numberFormat: 'indian',
    chartType: 'pie'
  });

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    dataSharing: false,
    analytics: true,
    crashReporting: true,
    marketingEmails: false,
    locationServices: true,
    biometricData: true
  });

  const updateProfile = (field: keyof UserProfile, value: string | string[]) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const updateNotifications = (field: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const updateAppearance = (field: keyof AppearanceSettings, value: string | number | boolean) => {
    setAppearanceSettings(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const updatePrivacy = (field: keyof PrivacySettings, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const saveSettings = () => {
    // Mock save functionality
    console.log('Settings saved:', {
      userProfile,
      notificationSettings,
      appearanceSettings,
      privacySettings
    });
    setHasUnsavedChanges(false);
    alert('Settings saved successfully!');
  };

  const resetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default values
      setHasUnsavedChanges(true);
      alert('Settings reset to defaults. Click Save to apply changes.');
    }
  };

  const exportSettings = () => {
    const settings = {
      userProfile,
      notificationSettings,
      appearanceSettings,
      privacySettings
    };
    
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'finwise-settings.json';
    link.click();
  };

  const accentColors = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Orange', value: '#f59e0b' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Pink', value: '#ec4899' }
  ];

  const investmentGoalOptions = [
    'Retirement', 'Emergency Fund', 'Vacation', 'Home Purchase', 
    'Education', 'Car', 'Investment Growth', 'Debt Payoff'
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Settings & Preferences
            </CardTitle>
            <div className="flex items-center gap-2">
              {hasUnsavedChanges && (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Unsaved Changes
                </Badge>
              )}
              <Button variant="outline" onClick={resetSettings}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={saveSettings} disabled={!hasUnsavedChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input
                    value={userProfile.firstName}
                    onChange={(e) => updateProfile('firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input
                    value={userProfile.lastName}
                    onChange={(e) => updateProfile('lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => updateProfile('email', e.target.value)}
                    placeholder="Enter email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    value={userProfile.phone}
                    onChange={(e) => updateProfile('phone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={userProfile.dateOfBirth}
                    onChange={(e) => updateProfile('dateOfBirth', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Occupation</Label>
                  <Input
                    value={userProfile.occupation}
                    onChange={(e) => updateProfile('occupation', e.target.value)}
                    placeholder="Enter occupation"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Annual Income (₹)</Label>
                  <Input
                    type="number"
                    value={userProfile.annualIncome}
                    onChange={(e) => updateProfile('annualIncome', e.target.value)}
                    placeholder="Enter annual income"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Risk Tolerance</Label>
                  <Select value={userProfile.riskTolerance} onValueChange={(value) => updateProfile('riskTolerance', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Conservative (Low Risk)</SelectItem>
                      <SelectItem value="medium">Moderate (Medium Risk)</SelectItem>
                      <SelectItem value="high">Aggressive (High Risk)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Investment Goals</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {investmentGoalOptions.map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={goal}
                        checked={userProfile.investmentGoals.includes(goal)}
                        onChange={(e) => {
                          const currentGoals = userProfile.investmentGoals;
                          if (e.target.checked) {
                            updateProfile('investmentGoals', [...currentGoals, goal]);
                          } else {
                            updateProfile('investmentGoals', currentGoals.filter(g => g !== goal));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={goal} className="text-sm">{goal}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.pushNotifications} 
                    onCheckedChange={(checked) => updateNotifications('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications} 
                    onCheckedChange={(checked) => updateNotifications('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive SMS alerts for important updates</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.smsNotifications} 
                    onCheckedChange={(checked) => updateNotifications('smsNotifications', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specific Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Specific Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-blue-500" />
                  <span>Transaction Alerts</span>
                </div>
                <Switch 
                  checked={notificationSettings.transactionAlerts} 
                  onCheckedChange={(checked) => updateNotifications('transactionAlerts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span>Bill Reminders</span>
                </div>
                <Switch 
                  checked={notificationSettings.billReminders} 
                  onCheckedChange={(checked) => updateNotifications('billReminders', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-purple-500" />
                  <span>Investment Updates</span>
                </div>
                <Switch 
                  checked={notificationSettings.investmentUpdates} 
                  onCheckedChange={(checked) => updateNotifications('investmentUpdates', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-orange-500" />
                  <span>Security Alerts</span>
                </div>
                <Switch 
                  checked={notificationSettings.securityAlerts} 
                  onCheckedChange={(checked) => updateNotifications('securityAlerts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-red-500" />
                  <span>Market News</span>
                </div>
                <Switch 
                  checked={notificationSettings.marketNews} 
                  onCheckedChange={(checked) => updateNotifications('marketNews', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Sound & Vibration */}
          <Card>
            <CardHeader>
              <CardTitle>Sound & Vibration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {notificationSettings.soundEnabled ? 
                    <Volume2 className="h-4 w-4" /> : 
                    <VolumeX className="h-4 w-4" />
                  }
                  <span>Notification Sound</span>
                </div>
                <Switch 
                  checked={notificationSettings.soundEnabled} 
                  onCheckedChange={(checked) => updateNotifications('soundEnabled', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span>Vibration</span>
                </div>
                <Switch 
                  checked={notificationSettings.vibrationEnabled} 
                  onCheckedChange={(checked) => updateNotifications('vibrationEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {t('settings.languageRegion')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t('common.language')}</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Choose from {languages.length}+ languages worldwide
                  </span>
                  <LanguageSelector />
                </div>
                <p className="text-xs text-muted-foreground">
                  FinWise supports major world languages. If your language isn't fully translated yet, 
                  English will be used as a fallback.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme & Display
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={appearanceSettings.theme === 'light' ? 'default' : 'outline'}
                    onClick={() => updateAppearance('theme', 'light')}
                    className="flex items-center gap-2"
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={appearanceSettings.theme === 'dark' ? 'default' : 'outline'}
                    onClick={() => updateAppearance('theme', 'dark')}
                    className="flex items-center gap-2"
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                  <Button
                    variant={appearanceSettings.theme === 'auto' ? 'default' : 'outline'}
                    onClick={() => updateAppearance('theme', 'auto')}
                    className="flex items-center gap-2"
                  >
                    <Smartphone className="h-4 w-4" />
                    Auto
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="grid grid-cols-6 gap-2">
                  {accentColors.map((color) => (
                    <Button
                      key={color.value}
                      variant="outline"
                      className={`h-12 ${appearanceSettings.accentColor === color.value ? 'ring-2 ring-offset-2' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => updateAppearance('accentColor', color.value)}
                    >
                      <span className="sr-only">{color.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Font Size: {appearanceSettings.fontSize}px</Label>
                <Slider
                  value={[appearanceSettings.fontSize]}
                  onValueChange={(value) => updateAppearance('fontSize', value[0])}
                  max={24}
                  min={12}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Compact Mode</h4>
                  <p className="text-sm text-muted-foreground">Use smaller spacing and elements</p>
                </div>
                <Switch 
                  checked={appearanceSettings.compactMode} 
                  onCheckedChange={(checked) => updateAppearance('compactMode', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Show Balances</h4>
                  <p className="text-sm text-muted-foreground">Display balances on dashboard</p>
                </div>
                <Switch 
                  checked={appearanceSettings.showBalances} 
                  onCheckedChange={(checked) => updateAppearance('showBalances', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Currency & Format */}
          <Card>
            <CardHeader>
              <CardTitle>Currency & Formatting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Currency</Label>
                <Select value={appearanceSettings.defaultCurrency} onValueChange={(value) => updateAppearance('defaultCurrency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="GBP">British Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Number Format</Label>
                <Select value={appearanceSettings.numberFormat} onValueChange={(value) => updateAppearance('numberFormat', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indian">Indian (1,00,000)</SelectItem>
                    <SelectItem value="international">International (100,000)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Default Chart Type</Label>
                <Select value={appearanceSettings.chartType} onValueChange={(value) => updateAppearance('chartType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          {/* Privacy Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Privacy & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Data Sharing</h4>
                  <p className="text-sm text-muted-foreground">Share anonymized data for app improvement</p>
                </div>
                <Switch 
                  checked={privacySettings.dataSharing} 
                  onCheckedChange={(checked) => updatePrivacy('dataSharing', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Analytics</h4>
                  <p className="text-sm text-muted-foreground">Help improve the app with usage analytics</p>
                </div>
                <Switch 
                  checked={privacySettings.analytics} 
                  onCheckedChange={(checked) => updatePrivacy('analytics', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Crash Reporting</h4>
                  <p className="text-sm text-muted-foreground">Automatically report crashes to help fix bugs</p>
                </div>
                <Switch 
                  checked={privacySettings.crashReporting} 
                  onCheckedChange={(checked) => updatePrivacy('crashReporting', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Marketing Emails</h4>
                  <p className="text-sm text-muted-foreground">Receive promotional emails and newsletters</p>
                </div>
                <Switch 
                  checked={privacySettings.marketingEmails} 
                  onCheckedChange={(checked) => updatePrivacy('marketingEmails', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Location Services</h4>
                  <p className="text-sm text-muted-foreground">Use location for fraud detection and nearby ATMs</p>
                </div>
                <Switch 
                  checked={privacySettings.locationServices} 
                  onCheckedChange={(checked) => updatePrivacy('locationServices', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Biometric Data</h4>
                  <p className="text-sm text-muted-foreground">Store biometric data locally for authentication</p>
                </div>
                <Switch 
                  checked={privacySettings.biometricData} 
                  onCheckedChange={(checked) => updatePrivacy('biometricData', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          {/* Advanced Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Data Management</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Button variant="outline" onClick={exportSettings}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Settings
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Settings
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Account Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset All Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Current User</h4>
                  <p className="text-sm text-muted-foreground">{user?.email || 'Not signed in'}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={signOut}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('settings.signOut')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Support & Help */}
          <Card>
            <CardHeader>
              <CardTitle>Support & Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="h-4 w-4 mr-2" />
                Help Center
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Call Support
              </Button>
            </CardContent>
          </Card>

          {/* App Information */}
          <Card>
            <CardHeader>
              <CardTitle>App Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Version</span>
                <span className="font-medium">2.4.1</span>
              </div>
              <div className="flex justify-between">
                <span>Build</span>
                <span className="font-medium">20240115</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated</span>
                <span className="font-medium">Jan 15, 2024</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}