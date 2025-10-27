import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  FileText, 
  Upload, 
  Download, 
  Search,
  Filter,
  Calendar,
  Folder,
  Eye,
  Trash2,
  Share2,
  Lock,
  Unlock,
  Star,
  Archive,
  AlertTriangle,
  CheckCircle,
  Clock,
  Camera,
  Scan,
  Tags,
  DollarSign,
  Calculator
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'receipt' | 'invoice' | 'tax_form' | 'bank_statement' | 'investment' | 'insurance' | 'other';
  category: string;
  uploadDate: string;
  financialYear: string;
  amount?: number;
  tags: string[];
  size: string;
  isStarred: boolean;
  isEncrypted: boolean;
  description?: string;
  vendor?: string;
  taxDeductible: boolean;
}

interface TaxCalculation {
  income: number;
  deductions: number;
  taxableIncome: number;
  tax: number;
  savings: number;
}

export function TaxDocumentsComponent() {
  const [activeTab, setActiveTab] = useState('documents');
  const [selectedFY, setSelectedFY] = useState('2024-25');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Salary Certificate FY 2024-25',
      type: 'tax_form',
      category: 'Income',
      uploadDate: '2024-01-15',
      financialYear: '2024-25',
      amount: 1200000,
      tags: ['salary', 'income', 'tax'],
      size: '2.3 MB',
      isStarred: true,
      isEncrypted: true,
      description: 'Annual salary certificate from employer',
      vendor: 'TechCorp India',
      taxDeductible: false
    },
    {
      id: '2',
      name: 'Medical Insurance Premium',
      type: 'receipt',
      category: 'Health Insurance',
      uploadDate: '2024-01-10',
      financialYear: '2024-25',
      amount: 25000,
      tags: ['insurance', '80D', 'medical'],
      size: '1.1 MB',
      isStarred: false,
      isEncrypted: true,
      description: 'Health insurance premium payment receipt',
      vendor: 'HDFC ERGO',
      taxDeductible: true
    },
    {
      id: '3',
      name: 'Home Loan Interest Certificate',
      type: 'tax_form',
      category: 'Home Loan',
      uploadDate: '2024-01-08',
      financialYear: '2024-25',
      amount: 180000,
      tags: ['home loan', '24b', 'interest'],
      size: '890 KB',
      isStarred: true,
      isEncrypted: true,
      description: 'Interest certificate for home loan',
      vendor: 'HDFC Bank',
      taxDeductible: true
    },
    {
      id: '4',
      name: 'ELSS Investment Statement',
      type: 'investment',
      category: 'Mutual Funds',
      uploadDate: '2024-01-05',
      financialYear: '2024-25',
      amount: 150000,
      tags: ['elss', '80c', 'mutual funds'],
      size: '756 KB',
      isStarred: false,
      isEncrypted: true,
      description: 'ELSS mutual fund investment proof',
      vendor: 'SBI Mutual Fund',
      taxDeductible: true
    },
    {
      id: '5',
      name: 'Laptop Purchase Receipt',
      type: 'receipt',
      category: 'Business Expense',
      uploadDate: '2023-12-20',
      financialYear: '2024-25',
      amount: 85000,
      tags: ['laptop', 'business', 'equipment'],
      size: '1.2 MB',
      isStarred: false,
      isEncrypted: false,
      description: 'Laptop for work purposes',
      vendor: 'Apple Store',
      taxDeductible: true
    },
    {
      id: '6',
      name: 'Rent Receipts Q3',
      type: 'receipt',
      category: 'HRA',
      uploadDate: '2023-12-15',
      financialYear: '2024-25',
      amount: 180000,
      tags: ['rent', 'hra', 'quarterly'],
      size: '3.4 MB',
      isStarred: true,
      isEncrypted: true,
      description: 'Rent receipts for HRA exemption',
      vendor: 'Property Owner',
      taxDeductible: true
    }
  ]);

  const [taxCalculation, setTaxCalculation] = useState<TaxCalculation>({
    income: 1200000,
    deductions: 355000,
    taxableIncome: 845000,
    tax: 67500,
    savings: 87500
  });

  const categories = [
    'Income', 'Health Insurance', 'Home Loan', 'Mutual Funds', 
    'Business Expense', 'HRA', 'Education', 'Donation', 'Other'
  ];

  const financialYears = ['2024-25', '2023-24', '2022-23', '2021-22'];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'receipt': return <FileText className="h-4 w-4 text-green-500" />;
      case 'invoice': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'tax_form': return <Calculator className="h-4 w-4 text-purple-500" />;
      case 'bank_statement': return <DollarSign className="h-4 w-4 text-orange-500" />;
      case 'investment': return <FileText className="h-4 w-4 text-red-500" />;
      case 'insurance': return <FileText className="h-4 w-4 text-cyan-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getFilteredDocuments = () => {
    return documents.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
      const matchesFY = doc.financialYear === selectedFY;
      
      return matchesSearch && matchesCategory && matchesFY;
    });
  };

  const getTotalDeductions = () => {
    return documents
      .filter(doc => doc.taxDeductible && doc.financialYear === selectedFY)
      .reduce((total, doc) => total + (doc.amount || 0), 0);
  };

  const getDocumentsByCategory = () => {
    const filtered = getFilteredDocuments();
    return categories.map(category => ({
      category,
      count: filtered.filter(doc => doc.category === category).length,
      amount: filtered
        .filter(doc => doc.category === category && doc.taxDeductible)
        .reduce((sum, doc) => sum + (doc.amount || 0), 0)
    })).filter(item => item.count > 0);
  };

  const toggleStar = (docId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, isStarred: !doc.isStarred } : doc
    ));
  };

  const deleteDocument = (docId: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== docId));
    }
  };

  const uploadDocument = () => {
    if (uploadFiles && uploadFiles.length > 0) {
      // Mock upload functionality
      Array.from(uploadFiles).forEach((file, index) => {
        const newDoc: Document = {
          id: (Date.now() + index).toString(),
          name: file.name,
          type: 'receipt',
          category: 'Other',
          uploadDate: new Date().toISOString().split('T')[0],
          financialYear: selectedFY,
          tags: [],
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          isStarred: false,
          isEncrypted: false,
          taxDeductible: false
        };
        setDocuments(prev => [newDoc, ...prev]);
      });
      setShowUploadDialog(false);
      setUploadFiles(null);
    }
  };

  const exportDocuments = () => {
    // Mock export functionality
    alert('Exporting documents for FY ' + selectedFY);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Tax & Document Management
            </CardTitle>
            <div className="flex items-center gap-4">
              <Select value={selectedFY} onValueChange={setSelectedFY}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {financialYears.map(year => (
                    <SelectItem key={year} value={year}>FY {year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Documents</DialogTitle>
                    <DialogDescription>
                      Upload your tax documents, receipts, and financial records.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Files</Label>
                      <Input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={(e) => setUploadFiles(e.target.files)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Document Type</Label>
                        <Select defaultValue="receipt">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="receipt">Receipt</SelectItem>
                            <SelectItem value="invoice">Invoice</SelectItem>
                            <SelectItem value="tax_form">Tax Form</SelectItem>
                            <SelectItem value="bank_statement">Bank Statement</SelectItem>
                            <SelectItem value="investment">Investment</SelectItem>
                            <SelectItem value="insurance">Insurance</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select defaultValue="Other">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button onClick={uploadDocument} className="w-full">
                      Upload Documents
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              <p className="text-sm text-muted-foreground">Total Documents</p>
            </div>
            <p className="text-2xl font-semibold">{getFilteredDocuments().length}</p>
            <p className="text-xs text-muted-foreground">FY {selectedFY}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">Tax Deductions</p>
            </div>
            <p className="text-2xl font-semibold">₹{getTotalDeductions().toLocaleString('en-IN')}</p>
            <p className="text-xs text-green-600">Section 80C, 80D, etc.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-purple-500" />
              <p className="text-sm text-muted-foreground">Estimated Tax</p>
            </div>
            <p className="text-2xl font-semibold">₹{taxCalculation.tax.toLocaleString('en-IN')}</p>
            <p className="text-xs text-purple-600">After deductions</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-orange-500" />
              <p className="text-sm text-muted-foreground">Encrypted Docs</p>
            </div>
            <p className="text-2xl font-semibold">
              {documents.filter(doc => doc.isEncrypted).length}
            </p>
            <p className="text-xs text-orange-600">Secure storage</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="tax-calc">Tax Calculator</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documents, tags, vendor..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button variant="outline" onClick={exportDocuments}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Documents List */}
          <Card>
            <CardHeader>
              <CardTitle>Documents ({getFilteredDocuments().length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getFilteredDocuments().map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-gray-100">
                        {getTypeIcon(doc.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{doc.name}</h4>
                          {doc.isStarred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                          {doc.isEncrypted && <Lock className="h-4 w-4 text-orange-500" />}
                          {doc.taxDeductible && (
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Tax Deductible
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span>{doc.category}</span>
                          <span>•</span>
                          <span>{doc.uploadDate}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          {doc.vendor && (
                            <>
                              <span>•</span>
                              <span>{doc.vendor}</span>
                            </>
                          )}
                        </div>
                        {doc.amount && (
                          <p className="text-sm font-medium text-green-600 mt-1">
                            ₹{doc.amount.toLocaleString('en-IN')}
                          </p>
                        )}
                        {doc.tags.length > 0 && (
                          <div className="flex gap-1 mt-2">
                            {doc.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => toggleStar(doc.id)}>
                        <Star className={`h-4 w-4 ${doc.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteDocument(doc.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documents by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {getDocumentsByCategory().map((item) => (
                  <div key={item.category} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.category}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.count} document{item.count !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{item.amount.toLocaleString('en-IN')}</p>
                      <p className="text-sm text-muted-foreground">Tax deductible</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax-calc" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Calculator FY {selectedFY}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Annual Income (₹)</Label>
                    <Input
                      type="number"
                      value={taxCalculation.income}
                      onChange={(e) => setTaxCalculation(prev => ({ 
                        ...prev, 
                        income: parseInt(e.target.value) || 0 
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Label>Total Deductions (₹)</Label>
                    <Input
                      type="number"
                      value={getTotalDeductions()}
                      readOnly
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Calculated from uploaded documents
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800">Tax Calculation Summary</h4>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Gross Income:</span>
                        <span>₹{taxCalculation.income.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deductions:</span>
                        <span>₹{getTotalDeductions().toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Taxable Income:</span>
                        <span>₹{(taxCalculation.income - getTotalDeductions()).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between font-medium text-red-600">
                        <span>Estimated Tax:</span>
                        <span>₹{Math.max(0, (taxCalculation.income - getTotalDeductions() - 250000) * 0.05 + 
                                       Math.max(0, (taxCalculation.income - getTotalDeductions() - 500000) * 0.15)).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Deduction Breakdown</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Section 80C (ELSS, PPF):</span>
                        <span>₹1,50,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Section 80D (Health Insurance):</span>
                        <span>₹25,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Home Loan Interest:</span>
                        <span>₹1,80,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Reports & Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <p className="font-medium">Income Tax Return Summary</p>
                    <p className="text-sm text-muted-foreground">Comprehensive tax report for FY {selectedFY}</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <p className="font-medium">Deduction Summary</p>
                    <p className="text-sm text-muted-foreground">All tax-deductible expenses and investments</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <p className="font-medium">Investment Portfolio Report</p>
                    <p className="text-sm text-muted-foreground">Detailed investment analysis and gains</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <p className="font-medium">Document Archive</p>
                    <p className="text-sm text-muted-foreground">Backup all documents for the year</p>
                  </div>
                </Button>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Tax Filing Reminder</span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  ITR filing deadline for FY 2024-25 is July 31, 2025. Make sure all documents are uploaded and verified.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}