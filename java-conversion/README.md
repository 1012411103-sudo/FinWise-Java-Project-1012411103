# FinWise Java Console Application

## Complete Conversion from TypeScript/React to Java

This is a comprehensive conversion of the FinWise web application (built with React/TypeScript) to a Java console application. All major features have been adapted to work in a terminal/console environment.

## 📁 Project Structure

```
java-conversion/
├── FinWiseApplication.java     # Main application entry point (includes inline models)
├── FinWiseApp.java             # Alternative simplified version
├── models/                      # Data models
│   ├── User.java
│   └── ExtraIncome.java
├── services/                    # Business logic services
│   ├── AuthService.java         # Authentication (AuthContext.tsx)
│   └── LanguageService.java     # Internationalization (LanguageContext.tsx)
├── components/                  # UI Components converted to Java
│   └── DashboardComponent.java  # Dashboard logic
└── README.md                    # This file
```

## 🎯 Features Converted from React App

### ✅ Core Features
- **User Authentication** (SignIn.tsx, SignUp.tsx → AuthService.java)
  - Email/password login
  - User registration
  - Session management
  
- **Multi-Language Support** (LanguageContext.tsx → LanguageService.java)
  - 15+ languages including English, Hindi, Gujarati, Spanish, French
  - Real-time language switching
  - Localized UI text

- **Dashboard** (Dashboard.tsx → DashboardComponent.java)
  - Annual and Monthly planning modes
  - Financial overview with charts (displayed as text)
  - Extra income tracking
  - AI-powered suggestions
  - Financial goal tracking

- **Expense Tracker** (ExpenseTracker.tsx)
  - Add expenses with categories
  - View expenses by category
  - Track spending patterns

- **Budget Planner** (BudgetPlanner.tsx)
  - Set budgets per category
  - Monitor budget usage
  - Budget alerts and warnings
  - AI-powered analysis

- **Investment Management** (InvestmentOverview.tsx)
  - Track multiple investments
  - Monitor gains/losses
  - Calculate ROI

- **Bill Reminders** (BillReminders.tsx)
  - Add recurring bills
  - View upcoming payments
  - Due date tracking

- **Wallet** (Wallet.tsx)
  - Digital wallet management
  - Send/receive payments
  - Transaction history
  - QR code simulation

- **Multi-Account Management** (MultiAccount.tsx)
  - Link multiple bank accounts
  - Track balances across accounts
  - Account categorization

- **Reports & Analytics** (ReportsAnalytics.tsx)
  - Financial summaries
  - Expense breakdown
  - AI insights

- **Tax Documents** (TaxDocuments.tsx)
  - Tax document tracking
  - Tax-saving opportunities

- **AI Virtual Assistant** (VirtualAssistant.tsx)
  - Personalized recommendations
  - Financial health score
  - Smart suggestions

- **Security Features** (EcoSecurity.tsx)
  - Account security overview
  - Privacy settings
  - Activity monitoring

- **Settings** (Settings.tsx)
  - Profile management
  - Password change
  - Notification preferences

## 🚀 How to Compile and Run

### Option 1: Compile All Files (Recommended for Production)

```bash
# Navigate to the java-conversion directory
cd java-conversion

# Compile all Java files
javac -d bin models/*.java services/*.java components/*.java FinWiseApplication.java

# Run the application
java -cp bin FinWiseApplication
```

### Option 2: Quick Single File Compilation (For Testing)

```bash
# Navigate to the java-conversion directory
cd java-conversion

# Compile the main application (includes all models inline)
javac FinWiseApplication.java

# Run the application
java FinWiseApplication
```

### Option 3: Simple Version (Original)

```bash
# Compile the simplified version
javac FinWiseApp.java

# Run the application
java FinWiseApp
```

## 📝 Demo Credentials

For testing purposes, a demo account is pre-configured:

- **Email:** demo@finwise.com
- **Password:** password123

## 🎓 Educational Value for School Assessment

This project demonstrates comprehensive Java programming concepts:

### Object-Oriented Programming
- **Classes and Objects:** User, Expense, Budget, Investment, etc.
- **Encapsulation:** Private fields with public getters/setters
- **Inheritance:** Model classes extending common patterns
- **Polymorphism:** Service interfaces and implementations

### Design Patterns
- **Singleton Pattern:** AuthService, LanguageService
- **Service Layer Pattern:** Separation of business logic
- **Model-View Pattern:** Data models separate from UI logic

### Core Java Concepts
- **Collections Framework:** ArrayList, HashMap, List
- **Exception Handling:** try-catch blocks for user input
- **Date/Time API:** LocalDate, LocalDateTime, DateTimeFormatter
- **String Formatting:** printf, String.format for currency display
- **Input Validation:** Scanner input with error handling

### Advanced Features
- **Multi-language Support:** HashMap-based translation system
- **Data Persistence Simulation:** In-memory storage
- **Business Logic:** Complex financial calculations
- **User Interface:** Menu-driven console application

## 🔄 Conversion Details

### React Components → Java Classes

| React Component | Java Equivalent | Purpose |
|----------------|-----------------|---------|
| App.tsx | FinWiseApplication.java | Main application |
| AuthContext.tsx | AuthService.java | Authentication |
| LanguageContext.tsx | LanguageService.java | i18n |
| Dashboard.tsx | DashboardComponent.java | Financial dashboard |
| Wallet.tsx | Wallet methods in main | Digital wallet |
| ExpenseTracker.tsx | Expense tracking methods | Expense management |
| BudgetPlanner.tsx | Budget methods | Budget planning |
| InvestmentOverview.tsx | Investment methods | Portfolio tracking |
| BillReminders.tsx | Bill methods | Bill management |

### UI Adaptation

Since Java console apps don't have the rich UI of React apps, here's how features were adapted:

- **Charts (recharts)** → Text-based summaries and ASCII art
- **Cards (shadcn/ui)** → Formatted console sections
- **Buttons** → Menu options with number selection
- **Inputs** → Scanner-based console input
- **Modals/Dialogs** → Submenu screens
- **Responsive Layout** → Fixed-width console display

## 💡 Features Highlight

### Financial Planning Modes
1. **Annual Planning** - For high earners and long-term goals
2. **Monthly Planning** - For monthly salary earners

### AI Suggestions
- Savings optimization recommendations
- Expense reduction strategies
- Investment allocation advice
- Budget health monitoring

### Multi-Currency Support
- Indian Rupee (₹) formatting
- Locale-aware number formatting

### Security
- Password-based authentication
- Session management
- Secure data handling

## 🌍 Supported Languages

The application supports 15+ languages:
- English (en)
- Hindi (hi) - हिन्दी
- Gujarati (gu) - ગુજરાતી
- Telugu (te) - తెలుగు
- Tamil (ta) - தமிழ்
- Bengali (bn) - বাংলা
- Marathi (mr) - मराठी
- Chinese (zh) - 中文
- Spanish (es) - Español
- French (fr) - Français
- Arabic (ar) - العربية
- Portuguese (pt) - Português
- Russian (ru) - Русский
- Japanese (ja) - 日本語
- Korean (ko) - 한국어
- German (de) - Deutsch

## 📊 Sample Data

The application comes with pre-loaded demo data:
- Demo user account
- Sample expenses
- Example budgets
- Investment portfolio samples
- Transaction history

## 🔧 Customization

You can easily customize:
- **Languages:** Add more in `LanguageService.java`
- **Categories:** Modify expense categories in menu arrays
- **Financial Data:** Adjust default values in `User.java`
- **Menu Options:** Add/remove features in `showMainMenu()`

## 🎯 Assessment Criteria Coverage

### Programming Fundamentals ✓
- Variables, data types, operators
- Control structures (if-else, switch, loops)
- Arrays and Collections
- Methods and functions

### OOP Concepts ✓
- Classes and objects
- Constructors
- Inheritance and polymorphism
- Encapsulation and abstraction

### Advanced Topics ✓
- Exception handling
- File I/O concepts (simulated)
- Data structures
- Design patterns

### Code Quality ✓
- Clean, readable code
- Meaningful variable names
- Comments and documentation
- Modular design

## 📚 Learning Resources

This code demonstrates:
1. **Service Architecture** - How to separate concerns
2. **Data Modeling** - Creating meaningful domain models
3. **User Interaction** - Console-based UI patterns
4. **State Management** - Maintaining application state
5. **Input Validation** - Handling user errors gracefully

## 🤝 Comparison with React App

| Feature | React App | Java Console App |
|---------|-----------|------------------|
| UI Framework | React + Tailwind CSS | Console menus |
| State Management | React Hooks | Object properties |
| Routing | React Router | Menu navigation |
| API Calls | fetch/axios | Simulated delays |
| Storage | localStorage | In-memory |
| Styling | CSS/Tailwind | ASCII formatting |
| Charts | recharts library | Text summaries |
| Forms | React forms | Scanner input |

## 🐛 Known Limitations

Due to console environment:
- No graphical charts (converted to text summaries)
- No real-time updates (requires user action)
- Limited to sequential interaction (no simultaneous windows)
- No QR code camera (simulated with mock data)
- No actual API calls (simulated with delays)

## 📖 Code Comments

The code includes extensive comments explaining:
- What each class/method does
- How it relates to the original React component
- Key business logic decisions
- Educational concepts being demonstrated

## 🎓 For Students

When presenting this for assessment:
1. Explain the conversion process from React to Java
2. Demonstrate the running application
3. Walk through the code architecture
4. Explain OOP principles used
5. Discuss design decisions and trade-offs

## 🔐 Security Note

This is a **demonstration/educational application**:
- Passwords are stored in plain text (don't do this in production!)
- No actual encryption
- No database persistence
- Simulated authentication

For production, you would need:
- Password hashing (bcrypt, etc.)
- Database storage
- Proper session management
- Encryption for sensitive data

## 📞 Support

This project was created as an educational conversion of a React web application to Java.
All features have been adapted to work within the constraints of a console environment while
maintaining the core functionality and business logic of the original application.

## 📄 License

Educational/School Assessment Project
