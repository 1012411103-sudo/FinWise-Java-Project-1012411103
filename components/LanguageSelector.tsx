import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, Search, Check } from 'lucide-react';

export function LanguageSelector() {
  const { language, setLanguage, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode as any);
    setOpen(false);
    setSearchTerm('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-40 justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="truncate">{currentLanguage?.nativeName || 'English'}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search languages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <ScrollArea className="h-80">
          <div className="p-1">
            {filteredLanguages.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No languages found
              </div>
            ) : (
              filteredLanguages.map((lang) => (
                <Button
                  key={lang.code}
                  variant="ghost"
                  className="w-full justify-between h-auto p-2"
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{lang.nativeName}</span>
                    <span className="text-xs text-muted-foreground">{lang.name}</span>
                  </div>
                  {language === lang.code && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </Button>
              ))
            )}
          </div>
        </ScrollArea>
        <div className="p-3 border-t bg-muted/50">
          <p className="text-xs text-muted-foreground text-center">
            {filteredLanguages.length} of {languages.length} languages
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}