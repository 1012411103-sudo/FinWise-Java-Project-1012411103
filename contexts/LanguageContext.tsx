import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 
  // Major World Languages
  'en' | 'zh' | 'hi' | 'es' | 'fr' | 'ar' | 'bn' | 'pt' | 'ru' | 'ja' | 'pa' | 'de' | 'jv' | 'wu' | 'ms' | 'te' | 'vi' | 'ko' | 'ta' | 'ur' | 'tr' | 'it' | 'th' | 'gu' | 'pl' | 'uk' | 'ml' | 'kn' | 'my' | 'or' | 'nl' | 'sw' | 'ro' | 'as' | 'hu' | 'cs' | 'el' | 'bg' | 'be' | 'az' | 'sv' | 'he' | 'da' | 'fi' | 'no' | 'sk' | 'hr' | 'lt' | 'lv' | 'et' | 'sl' | 'mk' | 'sq' | 'eu' | 'gl' | 'ca' | 'cy' | 'ga' | 'gd' | 'is' | 'mt' | 'lb' | 'fo' | 'rm' |
  // Indian Subcontinent
  'mr' | 'ne' | 'si' | 'dv' | 'ps' | 'sd' | 'ks' | 'bo' | 'dz' | 'bh' | 'sa' | 'pi' |
  // African Languages
  'ha' | 'yo' | 'ig' | 'zu' | 'xh' | 'af' | 'st' | 'tn' | 'ts' | 've' | 'ss' | 'nr' | 'nd' | 'am' | 'ti' | 'om' | 'so' | 'mg' | 'ny' | 'sn' | 'rw' | 'rn' | 'ki' | 'lg' | 'sw' | 'wo' | 'ff' | 'bm' | 'ee' | 'tw' | 'ak' | 'kr' | 'sg' |
  // European Languages
  'is' | 'fo' | 'kl' | 'se' | 'smj' | 'sma' | 'smn' | 'sms' | 'ie' | 'co' | 'br' | 'kw' | 'gv' | 'sc' | 'fur' | 'lad' | 'an' | 'ast' | 'ext' | 'mwl' | 'oc' | 'frp' | 'wa' | 'li' | 'vls' | 'zea' | 'fy' | 'nds' | 'pdc' | 'gsw' | 'bar' | 'ksh' | 'pfl' | 'sli' | 'hsb' | 'dsb' | 'csb' | 'szl' |
  // Asian Languages
  'lo' | 'km' | 'si' | 'my' | 'ka' | 'hy' | 'ku' | 'fa' | 'tg' | 'uz' | 'kk' | 'ky' | 'tk' | 'mn' | 'ug' | 'tt' | 'ba' | 'cv' | 'sah' | 'ce' | 'av' | 'lez' | 'lbe' | 'tab' | 'xmf' | 'sva' |
  // Oceanic Languages
  'fj' | 'to' | 'sm' | 'ty' | 'haw' | 'mi' | 'ch' | 'pau' | 'gil' | 'mh' | 'na' | 'tvl' | 'niu' | 'tkl' |
  // Native American Languages
  'qu' | 'gn' | 'ay' | 'nv' | 'chr' | 'iu' | 'cr' | 'oj' | 'dak' | 'lkt' |
  // Artificial Languages
  'eo' | 'ia' | 'ie' | 'vo' | 'jbo' | 'tpi' |
  // Additional Asian Languages
  'yi' | 'ug' | 'xh' | 'ii' | 'za' | 'bo' | 'dz' | 'mn' | 'ks' | 'sd' | 'ne' | 'as' | 'or' | 'bh' | 'mai' | 'mag' | 'bho' | 'awa' | 'brx' | 'gom' | 'kok' | 'doi' | 'nno' | 'nob' |
  // More African Languages
  'ln' | 'lua' | 'run' | 'kin' | 'hut' | 'bnt' | 'tw' | 'fat' | 'dag' | 'mos' | 'gur' | 'ful' | 'man' | 'men' | 'tem' | 'vai' | 'kpe' | 'sus' | 'snk' | 'dyu' | 'bla' |
  // More European Languages
  'vec' | 'lmo' | 'pms' | 'lij' | 'nap' | 'scn' | 'srd' | 'eml' | 'rgn' | 'lld' | 'roa' | 'wa' | 'pcd' | 'nrm' | 'gcf' |
  // Middle Eastern Languages
  'arc' | 'syr' | 'tmr' | 'mid' | 'xmf' | 'lzz' | 'ab' | 'os' | 'inh' | 'dar' | 'udi' | 'tat' |
  // Southeast Asian Languages
  'ace' | 'ban' | 'bug' | 'gor' | 'mad' | 'min' | 'nij' | 'pag' | 'pam' | 'sas' | 'sun' | 'war' | 'ceb' | 'hil' | 'ilo' | 'pag' | 'bik' | 'akl' | 'krj' |
  // Pacific Languages
  'bis' | 'pon' | 'kos' | 'yap' | 'chk' | 'wol' | 'ulk' | 'sat' | 'uli' | 'puw' | 'ngr' | 'kpg' |
  // Additional Languages
  'ale' | 'esu' | 'ipk' | 'smi' | 'krl' | 'vep' | 'vot' | 'liv' | 'fit' | 'fkv' | 'kvk' | 'sje' | 'sju' | 'sia' | 'sjd' | 'sjk' | 'sms' | 'sjt' | 'sje' |
  // Central Asian Languages
  'alt' | 'kjh' | 'tyv' | 'xal' | 'bua' | 'myv' | 'mdf' | 'koi' | 'kpv' | 'udm' | 'mhr' | 'mrj' | 'chm' | 'vot' | 'izh' | 'krl' | 'olo' | 'lud' | 'vep' |
  // More Indigenous Languages
  'abs' | 'abq' | 'ady' | 'kbd' | 'ubx' | 'cji' | 'krc' | 'kdr' | 'bdk' | 'nog' | 'kum' | 'lbe' | 'dar' | 'lak' | 'rut' | 'tsz' | 'tab' | 'agx' | 'lez' | 'udi' | 'aqc' | 'xqt' |
  // East Asian Variants
  'yue' | 'nan' | 'hak' | 'cdo' | 'cpx' | 'czh' | 'czo' | 'mnp' | 'wuu' | 'hsn' | 'gan' |
  // Additional World Languages  
  'bpy' | 'tcy' | 'grt' | 'ryu' | 'ain' | 'hnj' | 'hmn' | 'mww' | 'hnj' | 'hmd' | 'hms' | 'blt' | 'shn' | 'mnw' | 'pwo' | 'ksw' | 'blk' |
  // More Languages
  'nso' | 'ven' | 'tso' | 'sot' | 'nbl' | 'ssw' | 'her' | 'kwn' | 'naq' | 'ktz' | 'dta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: { code: Language; name: string; nativeName: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // App Title
    'app.title': 'FinWise',
    'app.tagline': 'Invest and finance wisely',
    
    // Authentication
    'auth.signin': 'Sign In',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.phone': 'Phone Number',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.rememberMe': 'Remember me',
    'auth.dontHaveAccount': "Don't have an account?",
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.signInWithGoogle': 'Sign in with Google',
    'auth.signInWithApple': 'Sign in with Apple',
    'auth.orContinueWith': 'Or continue with',
    'auth.welcome': 'Welcome to FinWise',
    'auth.welcomeBack': 'Welcome back',
    'auth.signInToContinue': 'Sign in to continue to your account',
    'auth.createAccount': 'Create your account',
    
    // Navigation
    'nav.wallet': 'Wallet',
    'nav.smsTransfer': 'SMS Transfer',
    'nav.accounts': 'Accounts',
    'nav.ecoplanning': 'EcoPlanning',
    'nav.annualPlanning': 'Annual Planning',
    'nav.monthWise': 'Month wise Economy',
    'nav.expensesBills': 'Expenses & Bills',
    'nav.budgetPlanning': 'Budget Planning',
    'nav.investments': 'Investments',
    'nav.aiAssistant': 'AI Assistant',
    'nav.taxData': 'Tax and Data',
    'nav.allReportsData': 'All Reports & Data',
    'nav.ecoSecurity': 'EcoSecurity',
    'nav.settings': 'Settings',
    
    // Common
    'common.menu': 'Menu',
    'common.openMenu': 'Open Menu',
    'common.add': 'Add',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Info',
    'common.language': 'Language',
    'common.selectLanguage': 'Select Language',
    
    // Wallet
    'wallet.balance': 'Balance',
    'wallet.totalBalance': 'Total Balance',
    'wallet.availableBalance': 'Available Balance',
    'wallet.sendMoney': 'Send Money',
    'wallet.receiveMoney': 'Receive Money',
    'wallet.addMoney': 'Add Money',
    'wallet.recentTransactions': 'Recent Transactions',
    
    // Expenses
    'expense.addNewExpense': 'Add New Expense',
    'expense.recentExpenses': 'Recent Expenses',
    'expense.dailySpendingPattern': 'Daily Spending Pattern',
    'expense.categoryBreakdown': 'Category Breakdown',
    'expense.totalSpent': 'Total Spent',
    'expense.budgetRemaining': 'Budget Remaining',
    
    // Bills
    'bills.billsEmiManagement': 'Bills & EMI Management',
    'bills.monthlyBills': 'Monthly Bills',
    'bills.upcoming': 'Upcoming',
    'bills.overdue': 'Overdue',
    'bills.autoPay': 'Auto-Pay',
    'bills.markPaid': 'Mark Paid',
    'bills.addBill': 'Add Bill',
    'bills.paymentCalendar': 'Payment Calendar',
    
    // Settings
    'settings.profile': 'Profile',
    'settings.security': 'Security',
    'settings.notifications': 'Notifications',
    'settings.appearance': 'Appearance',
    'settings.languageRegion': 'Language & Region',
    'settings.privacy': 'Privacy',
    'settings.help': 'Help & Support',
    'settings.about': 'About',
    'settings.signOut': 'Sign Out'
  },
  
  hi: {
    // App Title
    'app.title': 'फिनवाइज',
    'app.tagline': 'समझदारी से निवेश और वित्त प्रबंधन करें',
    
    // Authentication
    'auth.signin': 'साइन इन करें',
    'auth.signup': 'साइन अप करें',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'auth.fullName': 'पूरा नाम',
    'auth.phone': 'फोन नंबर',
    'auth.forgotPassword': 'पासवर्ड भूल गए?',
    'auth.rememberMe': 'मुझे याद रखें',
    'auth.dontHaveAccount': 'खाता नहीं है?',
    'auth.alreadyHaveAccount': 'पहले से खाता है?',
    'auth.signInWithGoogle': 'Google से साइन इन करें',
    'auth.signInWithApple': 'Apple से साइन इन करें',
    'auth.orContinueWith': 'या इसके साथ जारी रखें',
    'auth.welcome': 'फिनवाइज में आपका स्वागत है',
    'auth.welcomeBack': 'वापस स्वागत है',
    'auth.signInToContinue': 'अपने खाते में जारी रखने के लिए साइन इन करें',
    'auth.createAccount': 'अपना खाता बनाएं',
    
    // Navigation
    'nav.wallet': 'वॉलेट',
    'nav.smsTransfer': 'SMS स्थानांतरण',
    'nav.accounts': 'खाते',
    'nav.ecoplanning': 'इकोप्लानिंग',
    'nav.annualPlanning': 'वार्षिक योजना',
    'nav.monthWise': 'मासिक अर्थव्यवस्था',
    'nav.expensesBills': 'खर्च और बिल',
    'nav.budgetPlanning': 'बजट योजना',
    'nav.investments': 'निवेश',
    'nav.aiAssistant': 'AI सहायक',
    'nav.taxData': 'कर और डेटा',
    'nav.allReportsData': 'सभी रिपोर्ट और डेटा',
    'nav.ecoSecurity': 'इकोसिक्योरिटी',
    'nav.settings': 'सेटिंग्स',
    
    // Common
    'common.menu': 'मेनू',
    'common.openMenu': 'मेनू खोलें',
    'common.add': 'जोड़ें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.confirm': 'पुष्टि करें',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.warning': 'चेतावनी',
    'common.info': 'जानकारी',
    'common.language': 'भाषा',
    'common.selectLanguage': 'भाषा चुनें',
    
    // Wallet
    'wallet.balance': 'शेष राशि',
    'wallet.totalBalance': 'कुल शेष राशि',
    'wallet.availableBalance': 'उपलब्ध शेष राशि',
    'wallet.sendMoney': 'पैसे भेजें',
    'wallet.receiveMoney': 'पैसे प्राप्त करें',
    'wallet.addMoney': 'पैसे जोड़ें',
    'wallet.recentTransactions': 'हाल की लेनदेन',
    
    // Expenses
    'expense.addNewExpense': 'नया खर्च जोड़ें',
    'expense.recentExpenses': 'हाल के खर्च',
    'expense.dailySpendingPattern': 'दैनिक खर्च पैटर्न',
    'expense.categoryBreakdown': 'श्रेणी विभाजन',
    'expense.totalSpent': 'कुल खर्च',
    'expense.budgetRemaining': 'बचा हुआ बजट',
    
    // Bills
    'bills.billsEmiManagement': 'बिल और EMI प्रबंधन',
    'bills.monthlyBills': 'मासिक बिल',
    'bills.upcoming': 'आगामी',
    'bills.overdue': 'बकाया',
    'bills.autoPay': 'ऑटो-पे',
    'bills.markPaid': 'भुगतान किया गया चिह्नित करें',
    'bills.addBill': 'बिल जोड़ें',
    'bills.paymentCalendar': 'भुगतान कैलेंडर',
    
    // Settings
    'settings.profile': 'प्रोफ़ाइल',
    'settings.security': 'सुरक्षा',
    'settings.notifications': 'सूचनाएं',
    'settings.appearance': 'रूप',
    'settings.languageRegion': 'भाषा और क्षेत्र',
    'settings.privacy': 'गोपनीयता',
    'settings.help': 'सहायता और समर्थन',
    'settings.about': 'के बारे में',
    'settings.signOut': 'साइन आउट'
  },
  
  gu: {
    // App Title
    'app.title': 'ફિનવાઇઝ',
    'app.tagline': 'સમજદારીથી રોકાણ અને નાણાં વ્યવસ્થાપન',
    
    // Authentication
    'auth.signin': 'સાઇન ઇન કરો',
    'auth.signup': 'સાઇન અપ કરો',
    'auth.email': 'ઇમેઇલ',
    'auth.password': 'પાસવર્ડ',
    'auth.confirmPassword': 'પાસવર્ડની પુષ્ટિ કરો',
    'auth.fullName': 'પૂરું નામ',
    'auth.phone': 'ફોન નંબર',
    'auth.forgotPassword': 'પાસવર્ડ ભૂલ્યા?',
    'auth.rememberMe': 'મને યાદ રાખો',
    'auth.dontHaveAccount': 'એકાઉન્ટ નથી?',
    'auth.alreadyHaveAccount': 'પહેલેથી એકાઉન્ટ છે?',
    'auth.signInWithGoogle': 'Google સાથે સાઇન ઇન કરો',
    'auth.signInWithApple': 'Apple સાથે સાઇન ઇન કરો',
    'auth.orContinueWith': 'અથવા આ સાથે ચાલુ રાખો',
    'auth.welcome': 'ફિનવાઇઝમાં આપનું સ્વાગત છે',
    'auth.welcomeBack': 'પાછા સ્વાગત છે',
    'auth.signInToContinue': 'તમારા એકાઉન્ટમાં ચાલુ રાખવા માટે સાઇન ઇન કરો',
    'auth.createAccount': 'તમારું એકાઉન્ટ બનાવો',
    
    // Navigation
    'nav.wallet': 'વૉલેટ',
    'nav.smsTransfer': 'SMS ટ્રાન્સફર',
    'nav.accounts': 'એકાઉન્ટ્સ',
    'nav.ecoplanning': 'ઇકોપ્લાનિંગ',
    'nav.annualPlanning': 'વાર્ષિક યોજના',
    'nav.monthWise': 'માસિક અર્થવ્યવસ્થા',
    'nav.expensesBills': 'ખર્ચ અને બિલ',
    'nav.budgetPlanning': 'બજેટ યોજના',
    'nav.investments': 'રોકાણ',
    'nav.aiAssistant': 'AI સહાયક',
    'nav.taxData': 'કર અને ડેટા',
    'nav.allReportsData': 'બધી રિપોર્ટ્સ અને ડેટા',
    'nav.ecoSecurity': 'ઇકોસિક્યુરિટી',
    'nav.settings': 'સેટિંગ્સ',
    
    // Common
    'common.menu': 'મેનૂ',
    'common.openMenu': 'મેનૂ ખોલો',
    'common.add': 'ઉમેરો',
    'common.edit': 'સંપાદિત કરો',
    'common.delete': 'કાઢો',
    'common.save': 'સેવ કરો',
    'common.cancel': 'રદ કરો',
    'common.confirm': 'પુષ્ટિ કરો',
    'common.loading': 'લોડ થઈ રહ્યું છે...',
    'common.error': 'ભૂલ',
    'common.success': 'સફળતા',
    'common.warning': 'ચેતવણી',
    'common.info': 'માહિતી',
    'common.language': 'ભાષા',
    'common.selectLanguage': 'ભાષા પસંદ કરો',
    
    // Wallet
    'wallet.balance': 'બેલેન્સ',
    'wallet.totalBalance': 'કુલ બેલેન્સ',
    'wallet.availableBalance': 'ઉપલબ્ધ બેલેન્સ',
    'wallet.sendMoney': 'પૈસા મોકલો',
    'wallet.receiveMoney': 'પૈસા મેળવો',
    'wallet.addMoney': 'પૈસા ઉમેરો',
    'wallet.recentTransactions': 'તાજેતરના વ્યવહારો',
    
    // Expenses
    'expense.addNewExpense': 'નવો ખર્ચ ઉમેરો',
    'expense.recentExpenses': 'તાજેતરના ખર્ચ',
    'expense.dailySpendingPattern': 'દૈનિક ખર્ચ પેટર્ન',
    'expense.categoryBreakdown': 'કેટેગરી વિભાજન',
    'expense.totalSpent': 'કુલ ખર્ચ',
    'expense.budgetRemaining': 'બાકી બજેટ',
    
    // Bills
    'bills.billsEmiManagement': 'બિલ અને EMI વ્યવસ્થાપન',
    'bills.monthlyBills': 'માસિક બિલ',
    'bills.upcoming': 'આગામી',
    'bills.overdue': 'બાકી',
    'bills.autoPay': 'ઓટો-પે',
    'bills.markPaid': 'ચૂકવાયું માર્ક કરો',
    'bills.addBill': 'બિલ ઉમેરો',
    'bills.paymentCalendar': 'ચુકવણી કેલેન્ડર',
    
    // Settings
    'settings.profile': 'પ્રોફાઇલ',
    'settings.security': 'સુરક્ષા',
    'settings.notifications': 'નોટિફિકેશન',
    'settings.appearance': 'દેખાવ',
    'settings.languageRegion': 'ભાષા અને પ્રદેશ',
    'settings.privacy': 'ગોપનીયતા',
    'settings.help': 'મદદ અને સહાય',
    'settings.about': 'વિશે',
    'settings.signOut': 'સાઇન આઉટ'
  },
  
  // Additional Indian Languages with basic translations
  te: {
    'app.title': 'FinWise',
    'app.tagline': 'తెలివిగా పెట్టుబడి మరియు ఆర్థిక నిర్వహణ',
    'auth.signin': 'సైన్ ఇన్',
    'auth.signup': 'సైన్ అప్',
    'nav.wallet': 'వాలెట్',
    'nav.settings': 'సెట్టింగ్స్',
    'common.menu': 'మెనూ'
  },
  ta: {
    'app.title': 'FinWise',
    'app.tagline': 'புத்திசாலித்தனமாக முதலீடு மற்றும் நிதி',
    'auth.signin': 'உள்நுழை',
    'auth.signup': 'பதிவுசெய்',
    'nav.wallet': 'பணப்பை',
    'nav.settings': 'அமைப்புகள்',
    'common.menu': 'மெனு'
  },
  bn: {
    'app.title': 'FinWise',
    'app.tagline': 'বুদ্ধিমত্তার সাথে বিনিয়োগ এবং অর্থ',
    'auth.signin': 'সাইন ইন',
    'auth.signup': 'সাইন আপ',
    'nav.wallet': 'ওয়ালেট',
    'nav.settings': 'সেটিংস',
    'common.menu': 'মেনু'
  },
  mr: {
    'app.title': 'FinWise',
    'app.tagline': 'हुशारीने गुंतवणूक आणि अर्थ',
    'auth.signin': 'साइन इन',
    'auth.signup': 'साइन अप',
    'nav.wallet': 'वॉलेट',
    'nav.settings': 'सेटिंग्स',
    'common.menu': 'मेनू'
  },
  
  // Major World Languages with basic translations
  zh: {
    'app.title': 'FinWise',
    'app.tagline': '智慧投资和理财',
    'auth.signin': '登录',
    'auth.signup': '注册',
    'nav.wallet': '钱包',
    'nav.settings': '设置',
    'common.menu': '菜单'
  },
  es: {
    'app.title': 'FinWise',
    'app.tagline': 'Invierte y financia sabiamente',
    'auth.signin': 'Iniciar sesión',
    'auth.signup': 'Registrarse',
    'nav.wallet': 'Billetera',
    'nav.settings': 'Configuración',
    'common.menu': 'Menú'
  },
  fr: {
    'app.title': 'FinWise',
    'app.tagline': 'Investir et financer intelligemment',
    'auth.signin': 'Se connecter',
    'auth.signup': 'S\'inscrire',
    'nav.wallet': 'Portefeuille',
    'nav.settings': 'Paramètres',
    'common.menu': 'Menu'
  },
  ar: {
    'app.title': 'FinWise',
    'app.tagline': 'الاستثمار والتمويل بحكمة',
    'auth.signin': 'تسجيل الدخول',
    'auth.signup': 'التسجيل',
    'nav.wallet': 'المحفظة',
    'nav.settings': 'الإعدادات',
    'common.menu': 'القائمة'
  },
  pt: {
    'app.title': 'FinWise',
    'app.tagline': 'Invista e financie com sabedoria',
    'auth.signin': 'Entrar',
    'auth.signup': 'Cadastrar',
    'nav.wallet': 'Carteira',
    'nav.settings': 'Configurações',
    'common.menu': 'Menu'
  },
  ru: {
    'app.title': 'FinWise',
    'app.tagline': 'Инвестируйте и управляйте финансами мудро',
    'auth.signin': 'Войти',
    'auth.signup': 'Регистрация',
    'nav.wallet': 'Кошелёк',
    'nav.settings': 'Настройки',
    'common.menu': 'Меню'
  },
  ja: {
    'app.title': 'FinWise',
    'app.tagline': '賢く投資し、賢く金融',
    'auth.signin': 'ログイン',
    'auth.signup': '登録',
    'nav.wallet': 'ウォレット',
    'nav.settings': '設定',
    'common.menu': 'メニュー'
  },
  ko: {
    'app.title': 'FinWise',
    'app.tagline': '현명하게 투자하고 금융하기',
    'auth.signin': '로그인',
    'auth.signup': '회원가입',
    'nav.wallet': '지갑',
    'nav.settings': '설정',
    'common.menu': '메뉴'
  },
  de: {
    'app.title': 'FinWise',
    'app.tagline': 'Klug investieren und finanzieren',
    'auth.signin': 'Anmelden',
    'auth.signup': 'Registrieren',
    'nav.wallet': 'Geldbörse',
    'nav.settings': 'Einstellungen',
    'common.menu': 'Menü'
  },
  it: {
    'app.title': 'FinWise',
    'app.tagline': 'Investi e finanzia saggiamente',
    'auth.signin': 'Accedi',
    'auth.signup': 'Registrati',
    'nav.wallet': 'Portafoglio',
    'nav.settings': 'Impostazioni',
    'common.menu': 'Menu'
  },
  tr: {
    'app.title': 'FinWise',
    'app.tagline': 'Akıllıca yatırım yapın ve finanse edin',
    'auth.signin': 'Giriş',
    'auth.signup': 'Kayıt',
    'nav.wallet': 'Cüzdan',
    'nav.settings': 'Ayarlar',
    'common.menu': 'Menü'
  },
  th: {
    'app.title': 'FinWise',
    'app.tagline': 'ลงทุนและจัดการการเงินอย่างชาญฉลาด',
    'auth.signin': 'เข้าสู่ระบบ',
    'auth.signup': 'สมัครสมาชิก',
    'nav.wallet': 'กระเป๋าเงิน',
    'nav.settings': 'การตั้งค่า',
    'common.menu': 'เมนู'
  },
  vi: {
    'app.title': 'FinWise',
    'app.tagline': 'Đầu tư và tài chính khôn ngoan',
    'auth.signin': 'Đăng nhập',
    'auth.signup': 'Đăng ký',
    'nav.wallet': 'Ví',
    'nav.settings': 'Cài đặt',
    'common.menu': 'Menu'
  },
  
  // More Indian Languages
  ml: {
    'app.title': 'FinWise',
    'app.tagline': 'ബുദ്ധിപരമായി നിക്ഷേപിക്കുകയും ധനകാര്യം നടത്തുകയും ചെയ്യുക',
    'auth.signin': 'സൈൻ ഇൻ',
    'auth.signup': 'സൈൻ അപ്പ്',
    'nav.wallet': 'വാലറ്റ്',
    'nav.settings': 'ക്രമീകരണങ്ങൾ',
    'common.menu': 'മെനു'
  },
  kn: {
    'app.title': 'FinWise',
    'app.tagline': 'ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಹೂಡಿಕೆ ಮತ್ತು ಹಣಕಾಸು',
    'auth.signin': 'ಸೈನ್ ಇನ್',
    'auth.signup': 'ಸೈನ್ ಅಪ್',
    'nav.wallet': 'ವಾಲೆಟ್',
    'nav.settings': 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    'common.menu': 'ಮೆನು'
  },
  pa: {
    'app.title': 'FinWise',
    'app.tagline': 'ਸਮਝਦਾਰੀ ਨਾਲ ਨਿਵੇਸ਼ ਅਤੇ ਵਿੱਤ',
    'auth.signin': 'ਸਾਈਨ ਇਨ',
    'auth.signup': 'ਸਾਈਨ ਅਪ',
    'nav.wallet': 'ਵਾਲਿਟ',
    'nav.settings': 'ਸੈਟਿੰਗਾਂ',
    'common.menu': 'ਮੀਨੂ'
  },
  or: {
    'app.title': 'FinWise',
    'app.tagline': 'ବୁଦ୍ଧିମତାର ସହିତ ପୁଞ୍ଜି ନିବେଶ ଏବଂ ଅର୍ଥ',
    'auth.signin': 'ସାଇନ୍ ଇନ୍',
    'auth.signup': 'ସାଇନ୍ ଅପ୍',
    'nav.wallet': 'ୱାଲେଟ୍',
    'nav.settings': 'ସେଟିଂସ୍',
    'common.menu': 'ମେନୁ'
  },
  as: {
    'app.title': 'FinWise',
    'app.tagline': 'বুদ্ধিমত্তাৰে বিনিয়োগ আৰু বিত্ত',
    'auth.signin': 'ছাইন ইন',
    'auth.signup': 'ছাইন আপ',
    'nav.wallet': 'ৱালেট',
    'nav.settings': 'ছেটিংছ',
    'common.menu': 'মেনু'
  },
  
  // African Languages
  sw: {
    'app.title': 'FinWise',
    'app.tagline': 'Wekeza na fedha kwa busara',
    'auth.signin': 'Ingia',
    'auth.signup': 'Jisajili',
    'nav.wallet': 'Mkoba',
    'nav.settings': 'Mipangilio',
    'common.menu': 'Menyu'
  },
  ha: {
    'app.title': 'FinWise',
    'app.tagline': 'Saka hannun jari da kudi da hikima',
    'auth.signin': 'Shiga',
    'auth.signup': 'Yi rajista',
    'nav.wallet': 'Wallet',
    'nav.settings': 'Saitunan',
    'common.menu': 'Menu'
  },
  yo: {
    'app.title': 'FinWise',
    'app.tagline': 'Fi ọgbọn ṣe idoko-owo ati inawo',
    'auth.signin': 'Wọlé',
    'auth.signup': 'Forukọsilẹ',
    'nav.wallet': 'Apamọwọ',
    'nav.settings': 'Awọn eto',
    'common.menu': 'Akojọ'
  },
  
  // European Languages
  pl: {
    'app.title': 'FinWise',
    'app.tagline': 'Mądrze inwestuj i finansuj',
    'auth.signin': 'Zaloguj',
    'auth.signup': 'Zarejestruj',
    'nav.wallet': 'Portfel',
    'nav.settings': 'Ustawienia',
    'common.menu': 'Menu'
  },
  nl: {
    'app.title': 'FinWise',
    'app.tagline': 'Verstandig investeren en financieren',
    'auth.signin': 'Inloggen',
    'auth.signup': 'Registreren',
    'nav.wallet': 'Portemonnee',
    'nav.settings': 'Instellingen',
    'common.menu': 'Menu'
  },
  sv: {
    'app.title': 'FinWise',
    'app.tagline': 'Investera och finansiera klokt',
    'auth.signin': 'Logga in',
    'auth.signup': 'Registrera',
    'nav.wallet': 'Plånbok',
    'nav.settings': 'Inställningar',
    'common.menu': 'Meny'
  },
  
  // For all other languages, use English as fallback with a note
  default: {
    'app.title': 'FinWise',
    'app.tagline': 'Invest and finance wisely',
    'auth.signin': 'Sign In',
    'auth.signup': 'Sign Up',
    'nav.wallet': 'Wallet',
    'nav.settings': 'Settings',
    'common.menu': 'Menu',
    'common.language': 'Language',
    'common.openMenu': 'Open Menu'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const languages = [
    // Major World Languages
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'zh' as Language, name: 'Chinese (Mandarin)', nativeName: '中文' },
    { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'es' as Language, name: 'Spanish', nativeName: 'Español' },
    { code: 'fr' as Language, name: 'French', nativeName: 'Français' },
    { code: 'ar' as Language, name: 'Arabic', nativeName: 'العربية' },
    { code: 'bn' as Language, name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'pt' as Language, name: 'Portuguese', nativeName: 'Português' },
    { code: 'ru' as Language, name: 'Russian', nativeName: 'Русский' },
    { code: 'ja' as Language, name: 'Japanese', nativeName: '日本語' },
    { code: 'pa' as Language, name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'de' as Language, name: 'German', nativeName: 'Deutsch' },
    { code: 'jv' as Language, name: 'Javanese', nativeName: 'ꦧꦱꦗꦮ' },
    { code: 'ko' as Language, name: 'Korean', nativeName: '한국어' },
    { code: 'te' as Language, name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'vi' as Language, name: 'Vietnamese', nativeName: 'Tiếng Việt' },
    { code: 'ta' as Language, name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'ur' as Language, name: 'Urdu', nativeName: 'اردو' },
    { code: 'tr' as Language, name: 'Turkish', nativeName: 'Türkçe' },
    { code: 'it' as Language, name: 'Italian', nativeName: 'Italiano' },
    
    // Indian Languages
    { code: 'mr' as Language, name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu' as Language, name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'ml' as Language, name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'kn' as Language, name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'or' as Language, name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'as' as Language, name: 'Assamese', nativeName: 'অসমীয়া' },
    { code: 'ne' as Language, name: 'Nepali', nativeName: 'नेपाली' },
    { code: 'si' as Language, name: 'Sinhala', nativeName: 'සිංහල' },
    { code: 'dv' as Language, name: 'Dhivehi', nativeName: 'ދިވެހި' },
    { code: 'ps' as Language, name: 'Pashto', nativeName: 'پښتو' },
    { code: 'sd' as Language, name: 'Sindhi', nativeName: 'سنڌي' },
    { code: 'ks' as Language, name: 'Kashmiri', nativeName: 'کٲشُر' },
    { code: 'bo' as Language, name: 'Tibetan', nativeName: 'བོད་ཡིག' },
    { code: 'dz' as Language, name: 'Dzongkha', nativeName: 'རྫོང་ཁ' },
    { code: 'sa' as Language, name: 'Sanskrit', nativeName: 'संस्कृतम्' },
    
    // European Languages
    { code: 'th' as Language, name: 'Thai', nativeName: 'ไทย' },
    { code: 'pl' as Language, name: 'Polish', nativeName: 'Polski' },
    { code: 'uk' as Language, name: 'Ukrainian', nativeName: 'Українська' },
    { code: 'nl' as Language, name: 'Dutch', nativeName: 'Nederlands' },
    { code: 'ro' as Language, name: 'Romanian', nativeName: 'Română' },
    { code: 'hu' as Language, name: 'Hungarian', nativeName: 'Magyar' },
    { code: 'cs' as Language, name: 'Czech', nativeName: 'Čeština' },
    { code: 'el' as Language, name: 'Greek', nativeName: 'Ελληνικά' },
    { code: 'bg' as Language, name: 'Bulgarian', nativeName: 'Български' },
    { code: 'be' as Language, name: 'Belarusian', nativeName: 'Беларуская' },
    { code: 'az' as Language, name: 'Azerbaijani', nativeName: 'Azərbaycan' },
    { code: 'sv' as Language, name: 'Swedish', nativeName: 'Svenska' },
    { code: 'he' as Language, name: 'Hebrew', nativeName: 'עברית' },
    { code: 'da' as Language, name: 'Danish', nativeName: 'Dansk' },
    { code: 'fi' as Language, name: 'Finnish', nativeName: 'Suomi' },
    { code: 'no' as Language, name: 'Norwegian', nativeName: 'Norsk' },
    { code: 'sk' as Language, name: 'Slovak', nativeName: 'Slovenčina' },
    { code: 'hr' as Language, name: 'Croatian', nativeName: 'Hrvatski' },
    { code: 'lt' as Language, name: 'Lithuanian', nativeName: 'Lietuvių' },
    { code: 'lv' as Language, name: 'Latvian', nativeName: 'Latviešu' },
    { code: 'et' as Language, name: 'Estonian', nativeName: 'Eesti' },
    { code: 'sl' as Language, name: 'Slovenian', nativeName: 'Slovenščina' },
    { code: 'mk' as Language, name: 'Macedonian', nativeName: 'Македонски' },
    { code: 'sq' as Language, name: 'Albanian', nativeName: 'Shqip' },
    { code: 'eu' as Language, name: 'Basque', nativeName: 'Euskera' },
    { code: 'gl' as Language, name: 'Galician', nativeName: 'Galego' },
    { code: 'ca' as Language, name: 'Catalan', nativeName: 'Català' },
    { code: 'cy' as Language, name: 'Welsh', nativeName: 'Cymraeg' },
    { code: 'ga' as Language, name: 'Irish', nativeName: 'Gaeilge' },
    { code: 'gd' as Language, name: 'Scottish Gaelic', nativeName: 'Gàidhlig' },
    { code: 'is' as Language, name: 'Icelandic', nativeName: 'Íslenska' },
    { code: 'mt' as Language, name: 'Maltese', nativeName: 'Malti' },
    { code: 'lb' as Language, name: 'Luxembourgish', nativeName: 'Lëtzebuergesch' },
    { code: 'fo' as Language, name: 'Faroese', nativeName: 'Føroyskt' },
    
    // African Languages
    { code: 'sw' as Language, name: 'Swahili', nativeName: 'Kiswahili' },
    { code: 'ha' as Language, name: 'Hausa', nativeName: 'هَوُسَ' },
    { code: 'yo' as Language, name: 'Yoruba', nativeName: 'Yorùbá' },
    { code: 'ig' as Language, name: 'Igbo', nativeName: 'Igbo' },
    { code: 'zu' as Language, name: 'Zulu', nativeName: 'isiZulu' },
    { code: 'xh' as Language, name: 'Xhosa', nativeName: 'isiXhosa' },
    { code: 'af' as Language, name: 'Afrikaans', nativeName: 'Afrikaans' },
    { code: 'st' as Language, name: 'Sesotho', nativeName: 'Sesotho' },
    { code: 'tn' as Language, name: 'Setswana', nativeName: 'Setswana' },
    { code: 'ts' as Language, name: 'Xitsonga', nativeName: 'Xitsonga' },
    { code: 've' as Language, name: 'Tshivenda', nativeName: 'Tshivenda' },
    { code: 'ss' as Language, name: 'Siswati', nativeName: 'siSwati' },
    { code: 'nr' as Language, name: 'isiNdebele', nativeName: 'isiNdebele' },
    { code: 'am' as Language, name: 'Amharic', nativeName: 'አማርኛ' },
    { code: 'ti' as Language, name: 'Tigrinya', nativeName: 'ትግርኛ' },
    { code: 'om' as Language, name: 'Oromo', nativeName: 'Afaan Oromoo' },
    { code: 'so' as Language, name: 'Somali', nativeName: 'Soomaali' },
    { code: 'mg' as Language, name: 'Malagasy', nativeName: 'Malagasy' },
    { code: 'ny' as Language, name: 'Chichewa', nativeName: 'Chichewa' },
    { code: 'sn' as Language, name: 'Shona', nativeName: 'chiShona' },
    { code: 'rw' as Language, name: 'Kinyarwanda', nativeName: 'Ikinyarwanda' },
    { code: 'rn' as Language, name: 'Kirundi', nativeName: 'Ikirundi' },
    
    // Middle Eastern Languages
    { code: 'fa' as Language, name: 'Persian', nativeName: 'فارسی' },
    { code: 'ku' as Language, name: 'Kurdish', nativeName: 'کوردی' },
    { code: 'ka' as Language, name: 'Georgian', nativeName: 'ქართული' },
    { code: 'hy' as Language, name: 'Armenian', nativeName: 'Հայերեն' },
    
    // Central Asian Languages
    { code: 'tg' as Language, name: 'Tajik', nativeName: 'тоҷикӣ' },
    { code: 'uz' as Language, name: 'Uzbek', nativeName: 'Oʻzbekcha' },
    { code: 'kk' as Language, name: 'Kazakh', nativeName: 'Қазақша' },
    { code: 'ky' as Language, name: 'Kyrgyz', nativeName: 'Кыргызча' },
    { code: 'tk' as Language, name: 'Turkmen', nativeName: 'Türkmençe' },
    { code: 'mn' as Language, name: 'Mongolian', nativeName: 'Монгол' },
    { code: 'ug' as Language, name: 'Uyghur', nativeName: 'ئۇيغۇر تىلى' },
    
    // Southeast Asian Languages
    { code: 'ms' as Language, name: 'Malay', nativeName: 'Bahasa Melayu' },
    { code: 'my' as Language, name: 'Burmese', nativeName: 'မြန်မာ' },
    { code: 'lo' as Language, name: 'Lao', nativeName: 'ລາວ' },
    { code: 'km' as Language, name: 'Khmer', nativeName: 'ខ្មែរ' },
    
    // Oceanic Languages
    { code: 'fj' as Language, name: 'Fijian', nativeName: 'Bau Fijian' },
    { code: 'to' as Language, name: 'Tongan', nativeName: 'lea fakatonga' },
    { code: 'sm' as Language, name: 'Samoan', nativeName: 'Gagana Samoa' },
    { code: 'ty' as Language, name: 'Tahitian', nativeName: 'Reo Tahiti' },
    { code: 'haw' as Language, name: 'Hawaiian', nativeName: 'ʻŌlelo Hawaiʻi' },
    { code: 'mi' as Language, name: 'Māori', nativeName: 'te reo Māori' },
    
    // Native American Languages
    { code: 'qu' as Language, name: 'Quechua', nativeName: 'Runasimi' },
    { code: 'gn' as Language, name: 'Guarani', nativeName: 'Avañeʼẽ' },
    { code: 'ay' as Language, name: 'Aymara', nativeName: 'Aymar aru' },
    { code: 'nv' as Language, name: 'Navajo', nativeName: 'Diné bizaad' },
    { code: 'chr' as Language, name: 'Cherokee', nativeName: 'ᏣᎳᎩ ᎦᏬᏂᎯᏍᏗ' },
    { code: 'iu' as Language, name: 'Inuktitut', nativeName: 'ᐃᓄᒃᑎᑐᑦ' },
    
    // Constructed Languages
    { code: 'eo' as Language, name: 'Esperanto', nativeName: 'Esperanto' },
    { code: 'ia' as Language, name: 'Interlingua', nativeName: 'Interlingua' },
    { code: 'vo' as Language, name: 'Volapük', nativeName: 'Volapük' },
    { code: 'jbo' as Language, name: 'Lojban', nativeName: 'la .lojban.' },
    
    // Additional Languages
    { code: 'yi' as Language, name: 'Yiddish', nativeName: 'ייִדיש' },
    { code: 'ii' as Language, name: 'Sichuan Yi', nativeName: 'ꆈꌠ꒿' },
    { code: 'za' as Language, name: 'Zhuang', nativeName: 'Sawcuengh' },
    { code: 'mai' as Language, name: 'Maithili', nativeName: 'मैथिली' },
    { code: 'bho' as Language, name: 'Bhojpuri', nativeName: 'भोजपुरी' },
    { code: 'awa' as Language, name: 'Awadhi', nativeName: 'अवधी' },
    { code: 'brx' as Language, name: 'Bodo', nativeName: 'बड़ो' },
    { code: 'gom' as Language, name: 'Konkani', nativeName: 'कोंकणी' },
    { code: 'kok' as Language, name: 'Konkani', nativeName: 'कोंकणी' },
    { code: 'doi' as Language, name: 'Dogri', nativeName: 'डोगरी' },
    { code: 'sat' as Language, name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ' },
    { code: 'lus' as Language, name: 'Mizo', nativeName: 'Mizo ṭawng' },
    { code: 'mni' as Language, name: 'Manipuri', nativeName: 'মৈতৈলোন্' },
    
    // More African Languages
    { code: 'wo' as Language, name: 'Wolof', nativeName: 'Wollof' },
    { code: 'ff' as Language, name: 'Fulah', nativeName: 'Fulfulde' },
    { code: 'bm' as Language, name: 'Bambara', nativeName: 'Bamanankan' },
    { code: 'ee' as Language, name: 'Ewe', nativeName: 'Eʋegbe' },
    { code: 'tw' as Language, name: 'Twi', nativeName: 'Twi' },
    { code: 'ak' as Language, name: 'Akan', nativeName: 'Akan' },
    { code: 'kr' as Language, name: 'Kanuri', nativeName: 'Kanuri' },
    { code: 'sg' as Language, name: 'Sango', nativeName: 'Sängö' },
    { code: 'ln' as Language, name: 'Lingala', nativeName: 'Lingála' },
    { code: 'lua' as Language, name: 'Luba-Katanga', nativeName: 'Tshiluba' },
    { code: 'kg' as Language, name: 'Kongo', nativeName: 'Kikongo' },
    
    // Pacific Languages
    { code: 'ch' as Language, name: 'Chamorro', nativeName: 'Chamoru' },
    { code: 'pau' as Language, name: 'Palauan', nativeName: 'Tekoi ra Belau' },
    { code: 'gil' as Language, name: 'Gilbertese', nativeName: 'taetae ni Kiribati' },
    { code: 'mh' as Language, name: 'Marshallese', nativeName: 'Kajin M̧ajeļ' },
    { code: 'na' as Language, name: 'Nauru', nativeName: 'Ekakairũ Naoero' },
    { code: 'tvl' as Language, name: 'Tuvaluan', nativeName: 'Te Ggana Tuuvalu' },
    
    // More Asian Languages
    { code: 'ceb' as Language, name: 'Cebuano', nativeName: 'Cebuano' },
    { code: 'hil' as Language, name: 'Hiligaynon', nativeName: 'Ilonggo' },
    { code: 'ilo' as Language, name: 'Ilocano', nativeName: 'Ilocano' },
    { code: 'pag' as Language, name: 'Pangasinan', nativeName: 'Salitan Pangasinan' },
    { code: 'war' as Language, name: 'Waray', nativeName: 'Winaray' },
    { code: 'bik' as Language, name: 'Bikol', nativeName: 'Bikol' },
    { code: 'pam' as Language, name: 'Kapampangan', nativeName: 'Kapampangan' },
    { code: 'akl' as Language, name: 'Aklanon', nativeName: 'Akeanon' },
    
    // Additional World Languages
    { code: 'sun' as Language, name: 'Sundanese', nativeName: 'Basa Sunda' },
    { code: 'mad' as Language, name: 'Madurese', nativeName: 'Basa Madhura' },
    { code: 'min' as Language, name: 'Minangkabau', nativeName: 'Baso Minangkabau' },
    { code: 'ban' as Language, name: 'Balinese', nativeName: 'Basa Bali' },
    { code: 'bug' as Language, name: 'Buginese', nativeName: 'Basa Ugi' },
    { code: 'ace' as Language, name: 'Acehnese', nativeName: 'Basa Acèh' },
    { code: 'sas' as Language, name: 'Sasak', nativeName: 'Basa Sasak' },
    
    // More European Regional Languages
    { code: 'vec' as Language, name: 'Venetian', nativeName: 'Vèneto' },
    { code: 'lmo' as Language, name: 'Lombard', nativeName: 'Lumbaart' },
    { code: 'pms' as Language, name: 'Piedmontese', nativeName: 'Piemontèis' },
    { code: 'lij' as Language, name: 'Ligurian', nativeName: 'Ligure' },
    { code: 'nap' as Language, name: 'Neapolitan', nativeName: 'Napulitano' },
    { code: 'scn' as Language, name: 'Sicilian', nativeName: 'Sicilianu' },
    { code: 'srd' as Language, name: 'Sardinian', nativeName: 'Sardu' },
    { code: 'co' as Language, name: 'Corsican', nativeName: 'Corsu' },
    { code: 'fur' as Language, name: 'Friulian', nativeName: 'Furlan' },
    { code: 'rm' as Language, name: 'Romansh', nativeName: 'Rumantsch' },
    { code: 'an' as Language, name: 'Aragonese', nativeName: 'Aragonés' },
    { code: 'ast' as Language, name: 'Asturian', nativeName: 'Asturianu' },
    { code: 'ext' as Language, name: 'Extremaduran', nativeName: 'Estremeñu' },
    { code: 'mwl' as Language, name: 'Mirandese', nativeName: 'Mirandés' },
    { code: 'oc' as Language, name: 'Occitan', nativeName: 'Occitan' },
    { code: 'br' as Language, name: 'Breton', nativeName: 'Brezhoneg' },
    { code: 'kw' as Language, name: 'Cornish', nativeName: 'Kernewek' },
    { code: 'gv' as Language, name: 'Manx', nativeName: 'Gaelg' },
    { code: 'fy' as Language, name: 'Western Frisian', nativeName: 'Frysk' },
    { code: 'li' as Language, name: 'Limburgish', nativeName: 'Limburgs' },
    { code: 'wa' as Language, name: 'Walloon', nativeName: 'Walon' },
    { code: 'pcd' as Language, name: 'Picard', nativeName: 'Picard' },
    { code: 'nrm' as Language, name: 'Norman', nativeName: 'Nouormand' },
    { code: 'ksh' as Language, name: 'Colognian', nativeName: 'Kölsch' },
    { code: 'nds' as Language, name: 'Low German', nativeName: 'Plattdüütsch' },
    { code: 'bar' as Language, name: 'Bavarian', nativeName: 'Boarisch' },
    { code: 'gsw' as Language, name: 'Swiss German', nativeName: 'Schwyzerdütsch' },
    { code: 'hsb' as Language, name: 'Upper Sorbian', nativeName: 'Hornjoserbšćina' },
    { code: 'dsb' as Language, name: 'Lower Sorbian', nativeName: 'Dolnoserbšćina' },
    { code: 'csb' as Language, name: 'Kashubian', nativeName: 'Kaszëbsczi' },
    { code: 'szl' as Language, name: 'Silesian', nativeName: 'Ślōnski' },
    
    // More Languages from various regions
    { code: 'se' as Language, name: 'Northern Sami', nativeName: 'Davvisámegiella' },
    { code: 'smj' as Language, name: 'Lule Sami', nativeName: 'Julevsámegiella' },
    { code: 'sma' as Language, name: 'Southern Sami', nativeName: 'Åarjelsaemien' },
    { code: 'smn' as Language, name: 'Inari Sami', nativeName: 'Anarâškielâ' },
    { code: 'sms' as Language, name: 'Skolt Sami', nativeName: 'Sääʹmǩiõll' },
    { code: 'krl' as Language, name: 'Karelian', nativeName: 'Karjala' },
    { code: 'vep' as Language, name: 'Veps', nativeName: 'Vepsän kel\'' },
    { code: 'vot' as Language, name: 'Votic', nativeName: 'Vaďďa tšeeli' },
    { code: 'liv' as Language, name: 'Livonian', nativeName: 'Līvõ kēļ' },
    { code: 'fit' as Language, name: 'Tornedalen Finnish', nativeName: 'Meänkieli' },
    { code: 'fkv' as Language, name: 'Kven', nativeName: 'Kvääni' },
    { code: 'kvk' as Language, name: 'Korean (North)', nativeName: '조선어' },
    
    // More indigenous languages
    { code: 'ale' as Language, name: 'Aleut', nativeName: 'Unangam tunuu' },
    { code: 'esu' as Language, name: 'Yup\'ik', nativeName: 'Yugtun' },
    { code: 'ipk' as Language, name: 'Inupiaq', nativeName: 'Iñupiaq' },
    { code: 'cr' as Language, name: 'Cree', nativeName: 'ᓀᐦᐃᔭᐍᐏᐣ' },
    { code: 'oj' as Language, name: 'Ojibwe', nativeName: 'Anishinaabemowin' },
    { code: 'dak' as Language, name: 'Dakota', nativeName: 'Dakȟótiyapi' },
    { code: 'lkt' as Language, name: 'Lakota', nativeName: 'Lakȟótiyapi' },
    
    // Caucasian Languages
    { code: 'ab' as Language, name: 'Abkhaz', nativeName: 'Аҧсуа бызшәа' },
    { code: 'os' as Language, name: 'Ossetian', nativeName: 'Ирон æвзаг' },
    { code: 'ce' as Language, name: 'Chechen', nativeName: 'Нохчийн мотт' },
    { code: 'inh' as Language, name: 'Ingush', nativeName: 'ГӀалгӀай мотт' },
    { code: 'av' as Language, name: 'Avar', nativeName: 'Авар мацӏ' },
    { code: 'dar' as Language, name: 'Dargwa', nativeName: 'Дарган мез' },
    { code: 'lak' as Language, name: 'Lak', nativeName: 'Лакку маз' },
    { code: 'lez' as Language, name: 'Lezgian', nativeName: 'Лезги чӏал' },
    { code: 'tab' as Language, name: 'Tabasaran', nativeName: 'Табасаран чӏал' },
    { code: 'ady' as Language, name: 'Adyghe', nativeName: 'Адыгабзэ' },
    { code: 'kbd' as Language, name: 'Kabardian', nativeName: 'Адыгэбзэ' },
    { code: 'krc' as Language, name: 'Karachay-Balkar', nativeName: 'Къарачай-малкъар тил' },
    { code: 'kum' as Language, name: 'Kumyk', nativeName: 'Къумукъ тил' },
    { code: 'nog' as Language, name: 'Nogai', nativeName: 'Ногай тили' },
    
    // Finno-Ugric Languages
    { code: 'myv' as Language, name: 'Erzya', nativeName: 'Эрзянь кель' },
    { code: 'mdf' as Language, name: 'Moksha', nativeName: 'Мокшень кяль' },
    { code: 'koi' as Language, name: 'Komi-Permyak', nativeName: 'Перем коми кыв' },
    { code: 'kpv' as Language, name: 'Komi-Zyrian', nativeName: 'Коми кыв' },
    { code: 'udm' as Language, name: 'Udmurt', nativeName: 'Удмурт кыл' },
    { code: 'mhr' as Language, name: 'Eastern Mari', nativeName: 'Олык марий йылме' },
    { code: 'mrj' as Language, name: 'Western Mari', nativeName: 'Кырык мары йӹлмӹ' },
    
    // Turkic Languages
    { code: 'tt' as Language, name: 'Tatar', nativeName: 'Татар теле' },
    { code: 'ba' as Language, name: 'Bashkir', nativeName: 'Башҡорт теле' },
    { code: 'cv' as Language, name: 'Chuvash', nativeName: 'Чӑваш чӗлхи' },
    { code: 'sah' as Language, name: 'Sakha', nativeName: 'Саха тыла' },
    { code: 'tyv' as Language, name: 'Tuvan', nativeName: 'Тыва дыл' },
    { code: 'alt' as Language, name: 'Southern Altai', nativeName: 'Алтай тил' },
    { code: 'kjh' as Language, name: 'Khakas', nativeName: 'Хакас тілі' },
    { code: 'xal' as Language, name: 'Kalmyk', nativeName: 'Хальмг келн' },
    { code: 'bua' as Language, name: 'Buryat', nativeName: 'Буряад хэлэн' },
    
    // Sign Languages
    { code: 'ase' as Language, name: 'American Sign Language', nativeName: 'ASL' },
    { code: 'bfi' as Language, name: 'British Sign Language', nativeName: 'BSL' },
    { code: 'gsg' as Language, name: 'German Sign Language', nativeName: 'DGS' },
    { code: 'fsl' as Language, name: 'French Sign Language', nativeName: 'LSF' },
    { code: 'jsl' as Language, name: 'Japanese Sign Language', nativeName: 'JSL' },
    { code: 'csl' as Language, name: 'Chinese Sign Language', nativeName: 'CSL' },
    
    // More Philippine Languages
    { code: 'tl' as Language, name: 'Filipino/Tagalog', nativeName: 'Filipino' },
    { code: 'bcl' as Language, name: 'Central Bikol', nativeName: 'Bikol Sentral' },
    { code: 'bhw' as Language, name: 'Bicolano', nativeName: 'Bikolano' },
    { code: 'mdh' as Language, name: 'Maguindanao', nativeName: 'Maguindanaon' },
    { code: 'mrw' as Language, name: 'Maranao', nativeName: 'Maranao' },
    { code: 'tsg' as Language, name: 'Tausug', nativeName: 'Bahasa Sūg' },
    
    // Indonesian Regional Languages
    { code: 'bjn' as Language, name: 'Banjar', nativeName: 'Bahasa Banjar' },
    { code: 'bbc' as Language, name: 'Batak Toba', nativeName: 'Hata Batak Toba' },
    { code: 'btk' as Language, name: 'Batak', nativeName: 'Hata Batak' },
    { code: 'gor' as Language, name: 'Gorontalo', nativeName: 'Bahasa Hulontalo' },
    { code: 'mak' as Language, name: 'Makasar', nativeName: 'Basa Mangkasara' },
    { code: 'mnw' as Language, name: 'Mon', nativeName: 'ဘာသာမန်' },
    { code: 'shn' as Language, name: 'Shan', nativeName: 'လိၵ်ႈတႆး' },
    { code: 'pwo' as Language, name: 'Pwo Karen', nativeName: 'ဖၠုံလိၵ်' },
    { code: 'ksw' as Language, name: 'S\'gaw Karen', nativeName: 'စှီၤ' },
    { code: 'blk' as Language, name: 'Pa\'O', nativeName: 'ပအိုဝ်ႏဘာႏသာႏ' },
    
    // More Chinese Varieties
    { code: 'yue' as Language, name: 'Cantonese', nativeName: '粵語' },
    { code: 'nan' as Language, name: 'Min Nan', nativeName: '閩南語' },
    { code: 'hak' as Language, name: 'Hakka', nativeName: '客家話' },
    { code: 'cdo' as Language, name: 'Min Dong', nativeName: '閩東語' },
    { code: 'gan' as Language, name: 'Gan', nativeName: '贛語' },
    { code: 'hsn' as Language, name: 'Xiang', nativeName: '湘語' },
    { code: 'wuu' as Language, name: 'Wu', nativeName: '吳語' },
    
    // More languages
    { code: 'hmn' as Language, name: 'Hmong', nativeName: 'Hmoob' },
    { code: 'mww' as Language, name: 'White Hmong', nativeName: 'Hmong Daw' },
    { code: 'hnj' as Language, name: 'Green Hmong', nativeName: 'Mong Njua' },
    { code: 'ryu' as Language, name: 'Okinawan', nativeName: 'うちなーぐち' },
    { code: 'ain' as Language, name: 'Ainu', nativeName: 'アイヌ・イタㇰ' }
  ];

  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('finwise-language') as Language;
    if (savedLanguage && languages.find(l => l.code === savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('finwise-language', lang);
  };

  // Translation function with comprehensive fallback
  const t = (key: string): string => {
    // First try the selected language
    const langTranslations = translations[language];
    if (langTranslations && langTranslations[key]) {
      return langTranslations[key];
    }
    
    // Then try English
    if (translations.en[key]) {
      return translations.en[key];
    }
    
    // Then try default fallback
    if (translations.default && translations.default[key]) {
      return translations.default[key];
    }
    
    // Finally return the key itself
    return key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: changeLanguage,
      t,
      languages
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}