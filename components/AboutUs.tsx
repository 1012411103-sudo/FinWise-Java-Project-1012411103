import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Users, 
  Lightbulb, 
  Code, 
  Palette, 
  Database, 
  FileText,
  TrendingUp,
  Shield,
  Sparkles
} from 'lucide-react';
import finwiseLogo from 'figma:asset/8666621d31297bca911aa740568410291d3dcac6.png';

export function AboutUsComponent() {
  const teamMembers = [
    {
      name: 'Ninad Thakur',
      roles: ['UI Designing', 'Idea & Conceptualization', 'Frontend Development', 'Finance Visualizations'],
      icon: Lightbulb,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      description: 'The visionary behind FinWise, bringing innovative ideas to life through cutting-edge frontend development and comprehensive financial visualization solutions.'
    },
    {
      name: 'Lobhas Kulkarni',
      roles: ['UX Designing', 'Backend Development', 'Finance Director'],
      icon: Palette,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'Master of design and backend architecture, ensuring FinWise delivers both aesthetic excellence and robust financial management capabilities.'
    },
    {
      name: 'Sheetal Mandavakar',
      roles: ['Backend', 'Data Handling'],
      icon: Database,
      color: 'bg-green-50 text-green-700 border-green-200',
      description: 'Expert in backend systems and data management, ensuring secure, efficient, and scalable data processing for all financial operations.'
    },
    {
      name: 'Tanishqua Akkalkotkar',
      roles: ['Documentation', 'Designing'],
      icon: FileText,
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      description: 'Specialist in creating comprehensive documentation and designing user-focused interfaces that make FinWise accessible and easy to understand for all users.'
    },
    {
      name: 'Devashree Bhadalkar',
      roles: ['Documentation', 'Designing'],
      icon: FileText,
      color: 'bg-pink-50 text-pink-700 border-pink-200',
      description: 'Documentation and design expert focused on user experience, creating clear guides, resources, and intuitive designs to help users maximize their FinWise experience.'
    }
  ];

  const appFeatures = [
    {
      icon: TrendingUp,
      title: 'Smart Financial Management',
      description: 'Advanced budgeting, expense tracking, and investment oversight'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Insights',
      description: 'Intelligent recommendations for optimizing your financial health'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with advanced fraud detection and protection'
    },
    {
      icon: Users,
      title: 'Multi-Account Integration',
      description: 'Seamlessly manage multiple accounts and financial institutions'
    }
  ];

  return (
    <div className="space-y-8 p-4">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <img 
            src={finwiseLogo} 
            alt="FinWise Logo" 
            className="h-24 w-24 object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold text-foreground">About FinWise</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Invest and finance wisely with India's most comprehensive financial management platform
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              FinWise empowers individuals and families across India to take control of their financial future through 
              intelligent planning, comprehensive tracking, and AI-driven insights. We believe that financial wisdom 
              should be accessible to everyone, regardless of their economic background or financial expertise.
            </p>
            <div className="flex justify-center gap-2 mt-6">
              <Badge className="bg-amber-100 text-amber-800 border-amber-300 px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered
              </Badge>
              <Badge className="bg-green-100 text-green-800 border-green-300 px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Secure
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-300 px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                Smart Analytics
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Features */}
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-center">What Makes FinWise Special</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {appFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Team Section */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-semibold">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals behind FinWise, dedicated to revolutionizing financial management in India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => {
            const Icon = member.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full ${member.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {member.roles.map((role, roleIndex) => (
                      <Badge 
                        key={roleIndex} 
                        variant="secondary" 
                        className="text-xs px-2 py-1"
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Technology Stack */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Built with Modern Technology</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <Code className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="font-medium">React & TypeScript</p>
              <p className="text-xs text-muted-foreground">Modern Frontend</p>
            </div>
            <div className="p-4">
              <Palette className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="font-medium">Tailwind CSS</p>
              <p className="text-xs text-muted-foreground">Beautiful Design</p>
            </div>
            <div className="p-4">
              <Database className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="font-medium">Secure Backend</p>
              <p className="text-xs text-muted-foreground">Data Protection</p>
            </div>
            <div className="p-4">
              <Sparkles className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <p className="font-medium">AI Integration</p>
              <p className="text-xs text-muted-foreground">Smart Insights</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="text-center bg-primary/5 border-primary/20">
        <CardContent className="p-8">
          <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
          <p className="text-muted-foreground mb-6">
            Have questions or feedback? We'd love to hear from you and help you on your financial journey.
          </p>
          <div className="flex justify-center gap-4">
            <Badge className="bg-blue-100 text-blue-800 border-blue-300 px-4 py-2">
              Version 1.0.0
            </Badge>
            <Badge className="bg-green-100 text-green-800 border-green-300 px-4 py-2">
              Made in India 🇮🇳
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}