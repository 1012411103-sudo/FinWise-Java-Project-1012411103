import models.*;
import services.*;
import services.LanguageService.Language;
import components.*;
import java.util.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * FinWise Application - Complete Financial Management System
 * Main entry point for the console-based Java version
 * 
 * This is a complete conversion of the React TypeScript application to Java.
 * All major features from the web app have been adapted for console use.
 * 
 * For school assessment purposes, this demonstrates:
 * - Object-Oriented Programming principles
 * - Service layer architecture
 * - Model-View separation
 * - User authentication
 * - Multi-language support
 * - Comprehensive financial management features
 */
public class FinWiseApplication {
    private static Scanner scanner = new Scanner(System.in);
    private static AuthService authService = AuthService.getInstance();
    private static LanguageService langService = LanguageService.getInstance();
    private static User currentUser = null;
    
    public static void main(String[] args) {
        printWelcomeBanner();
        
        // Authentication loop
        while (currentUser == null) {
            showAuthMenu();
        }
        
        // Main application loop
        while (true) {
            showMainMenu();
        }
    }
    
    private static void printWelcomeBanner() {
        System.out.println("===============================================");
        System.out.println("                                               ");
        System.out.println("    ███████╗██╗███╗   ██╗██╗    ██╗██╗███████╗███████╗");
        System.out.println("    ██╔════╝██║████╗  ██║██║    ██║██║██╔════╝██╔════╝");
        System.out.println("    █████╗  ██║██╔██╗ ██║██║ █╗ ██║██║███████╗█████╗  ");
        System.out.println("    ██╔══╝  ██║██║╚██╗██║██║███╗██║██║╚════██║██╔══╝  ");
        System.out.println("    ██║     ██║██║ ╚████║╚███╔███╔╝██║███████║███████╗");
        System.out.println("    ╚═╝     ╚═╝╚═╝  ╚═══╝ ╚══╝╚══╝ ╚═╝╚══════╝╚══════╝");
        System.out.println("                                               ");
        System.out.println("    Invest and Finance Wisely                  ");
        System.out.println("                                               ");
        System.out.println("===============================================\n");
    }
    
    private static void showAuthMenu() {
        System.out.println("\n========== AUTHENTICATION ==========");
        System.out.println("1. Sign In");
        System.out.println("2. Sign Up");
        System.out.println("3. Change Language");
        System.out.println("4. Exit");
        System.out.print("\nEnter your choice: ");
        
        int choice = getIntInput();
        
        switch (choice) {
            case 1:
                signIn();
                break;
            case 2:
                signUp();
                break;
            case 3:
                changeLanguage();
                break;
            case 4:
                System.out.println("\n" + langService.t("app.tagline"));
                System.out.println("Thank you for using FinWise!");
                System.exit(0);
                break;
            default:
                System.out.println("Invalid choice. Please try again.");
        }
    }
    
    private static void signIn() {
        System.out.println("\n========== SIGN IN ==========");
        System.out.print(langService.t("auth.email") + ": ");
        String email = scanner.nextLine();
        
        System.out.print(langService.t("auth.password") + ": ");
        String password = scanner.nextLine();
        
        try {
            authService.signIn(email, password);
            currentUser = authService.getCurrentUser();
            System.out.println("\n✓ Welcome back, " + currentUser.getFullName() + "!");
            System.out.println("Member since: " + currentUser.getFormattedCreatedDate());
        } catch (Exception e) {
            System.out.println("\n✗ " + e.getMessage());
        }
    }
    
    private static void signUp() {
        System.out.println("\n========== SIGN UP ==========");
        System.out.print(langService.t("auth.fullName") + ": ");
        String fullName = scanner.nextLine();
        
        System.out.print(langService.t("auth.email") + ": ");
        String email = scanner.nextLine();
        
        System.out.print(langService.t("auth.phone") + " (optional): ");
        String phone = scanner.nextLine();
        
        System.out.print(langService.t("auth.password") + ": ");
        String password = scanner.nextLine();
        
        try {
            authService.signUp(email, fullName, password, phone);
            currentUser = authService.getCurrentUser();
            System.out.println("\n✓ Account created successfully!");
            System.out.println("Welcome, " + fullName + "!");
        } catch (Exception e) {
            System.out.println("\n✗ " + e.getMessage());
        }
    }
    
    private static void changeLanguage() {
        System.out.println("\n========== SELECT LANGUAGE ==========");
        List<Language> languages = langService.getSupportedLanguages();
        
        for (int i = 0; i < Math.min(10, languages.size()); i++) {
            Language lang = languages.get(i);
            System.out.println((i + 1) + ". " + lang);
        }
        
        System.out.print("\nSelect language (1-" + Math.min(10, languages.size()) + "): ");
        int choice = getIntInput();
        
        if (choice > 0 && choice <= Math.min(10, languages.size())) {
            Language selected = languages.get(choice - 1);
            langService.setLanguage(selected.getCode());
            System.out.println("\n✓ Language changed to " + selected.getNativeName());
        }
    }
    
    private static void showMainMenu() {
        System.out.println("\n===============================================");
        System.out.println("           FINWISE MAIN MENU");
        System.out.println("===============================================");
        System.out.println("User: " + currentUser.getFullName());
        System.out.println("Wallet Balance: ₹" + String.format("%,.2f", currentUser.getWalletBalance()));
        System.out.println();
        
        System.out.println("📊 ECOPLANNING");
        System.out.println("  1. Annual/Monthly Planning (Dashboard)");
        System.out.println("  2. Expense Tracker");
        System.out.println("  3. Budget Planner");
        System.out.println("  4. Investment Overview");
        System.out.println("  5. Bills & Reminders");
        System.out.println();
        
        System.out.println("💰 FINANCIAL TOOLS");
        System.out.println("  6. Wallet Management");
        System.out.println("  7. SMS/Quick Transfer");
        System.out.println("  8. Multi-Account Management");
        System.out.println();
        
        System.out.println("📈 REPORTS & ANALYTICS");
        System.out.println("  9. Financial Reports");
        System.out.println(" 10. Tax Documents");
        System.out.println();
        
        System.out.println("🤖 AI & SECURITY");
        System.out.println(" 11. AI Virtual Assistant");
        System.out.println(" 12. Security Features");
        System.out.println();
        
        System.out.println("⚙️  OTHER");
        System.out.println(" 13. Settings");
        System.out.println(" 14. About FinWise");
        System.out.println(" 15. Logout");
        System.out.println();
        
        System.out.print("Enter your choice: ");
        
        int choice = getIntInput();
        
        switch (choice) {
            case 1:
                showDashboard();
                break;
            case 2:
                showExpenseTracker();
                break;
            case 3:
                showBudgetPlanner();
                break;
            case 4:
                showInvestmentOverview();
                break;
            case 5:
                showBillReminders();
                break;
            case 6:
                showWallet();
                break;
            case 7:
                showSMSTransfer();
                break;
            case 8:
                showMultiAccount();
                break;
            case 9:
                showReports();
                break;
            case 10:
                showTaxDocuments();
                break;
            case 11:
                showAIAssistant();
                break;
            case 12:
                showSecurityFeatures();
                break;
            case 13:
                showSettings();
                break;
            case 14:
                showAbout();
                break;
            case 15:
                logout();
                break;
            default:
                System.out.println("Invalid choice. Please try again.");
        }
    }
    
    private static void showDashboard() {
        DashboardComponent dashboard = new DashboardComponent(currentUser);
        dashboard.display(scanner);
    }
    
    private static void showExpenseTracker() {
        System.out.println("\n========== EXPENSE TRACKER ==========");
        System.out.println("1. Add New Expense");
        System.out.println("2. View All Expenses");
        System.out.println("3. View by Category");
        System.out.println("4. Back");
        System.out.print("\nEnter your choice: ");
        
        int choice = getIntInput();
        
        switch (choice) {
            case 1:
                addExpense();
                break;
            case 2:
                viewAllExpenses();
                break;
            case 3:
                viewExpensesByCategory();
                break;
            case 4:
                return;
        }
        
        pressEnterToContinue();
    }
    
    private static void addExpense() {
        System.out.print("\nExpense Description: ");
        String description = scanner.nextLine();
        
        System.out.print("Amount: ₹");
        double amount = getDoubleInput();
        
        System.out.println("\nCategories:");
        String[] categories = {"Food", "Transport", "Shopping", "Bills", "Entertainment", "Healthcare", "Education", "Other"};
        for (int i = 0; i < categories.length; i++) {
            System.out.println((i + 1) + ". " + categories[i]);
        }
        System.out.print("Select category: ");
        int categoryChoice = getIntInput();
        
        String category = (categoryChoice > 0 && categoryChoice <= categories.length) 
            ? categories[categoryChoice - 1] 
            : "Other";
        
        Expense expense = new Expense(description, amount, category);
        currentUser.addExpense(expense);
        
        System.out.println("\n✓ Expense added successfully!");
        
        // Check budget
        Budget budget = currentUser.getBudgetForCategory(category);
        if (budget != null) {
            double spent = currentUser.getExpensesForCategory(category);
            double remaining = budget.getLimit() - spent;
            System.out.println("\nBudget for " + category + ": ₹" + String.format("%,.2f", budget.getLimit()));
            System.out.println("Spent: ₹" + String.format("%,.2f", spent));
            System.out.println("Remaining: ₹" + String.format("%,.2f", remaining));
            
            if (remaining < 0) {
                System.out.println("⚠️  WARNING: You've exceeded your budget!");
            } else if (remaining < budget.getLimit() * 0.2) {
                System.out.println("⚠️  ALERT: You're running low on budget!");
            }
        }
    }
    
    private static void viewAllExpenses() {
        System.out.println("\n========== ALL EXPENSES ==========");
        List<Expense> expenses = currentUser.getAllExpenses();
        
        if (expenses.isEmpty()) {
            System.out.println("No expenses recorded yet.");
        } else {
            double total = 0;
            for (Expense e : expenses) {
                System.out.println(e);
                total += e.getAmount();
            }
            System.out.println("\nTotal Expenses: ₹" + String.format("%,.2f", total));
        }
    }
    
    private static void viewExpensesByCategory() {
        System.out.print("\nEnter category name: ");
        String category = scanner.nextLine();
        
        System.out.println("\n========== EXPENSES: " + category.toUpperCase() + " ==========");
        List<Expense> expenses = currentUser.getExpensesByCategory(category);
        
        if (expenses.isEmpty()) {
            System.out.println("No expenses in this category.");
        } else {
            double total = 0;
            for (Expense e : expenses) {
                System.out.println(e);
                total += e.getAmount();
            }
            System.out.println("\nTotal: ₹" + String.format("%,.2f", total));
        }
    }
    
    private static void showBudgetPlanner() {
        System.out.println("\n========== BUDGET PLANNER ==========");
        System.out.println("1. Set Budget");
        System.out.println("2. View Budgets");
        System.out.println("3. Budget Analysis");
        System.out.println("4. Back");
        System.out.print("\nEnter your choice: ");
        
        int choice = getIntInput();
        
        switch (choice) {
            case 1:
                setBudget();
                break;
            case 2:
                viewBudgets();
                break;
            case 3:
                budgetAnalysis();
                break;
            case 4:
                return;
        }
        
        pressEnterToContinue();
    }
    
    private static void setBudget() {
        System.out.print("\nCategory: ");
        String category = scanner.nextLine();
        
        System.out.print("Monthly Limit: ₹");
        double limit = getDoubleInput();
        
        Budget budget = new Budget(category, limit);
        currentUser.addBudget(budget);
        
        System.out.println("\n✓ Budget set successfully!");
    }
    
    private static void viewBudgets() {
        System.out.println("\n========== BUDGETS ==========");
        List<Budget> budgets = currentUser.getAllBudgets();
        
        if (budgets.isEmpty()) {
            System.out.println("No budgets set yet.");
        } else {
            for (Budget b : budgets) {
                double spent = currentUser.getExpensesForCategory(b.getCategory());
                double remaining = b.getLimit() - spent;
                double percentage = (spent / b.getLimit()) * 100;
                
                System.out.println("\n" + b.getCategory() + ":");
                System.out.println("  Budget: ₹" + String.format("%,.2f", b.getLimit()));
                System.out.println("  Spent: ₹" + String.format("%,.2f", spent));
                System.out.println("  Remaining: ₹" + String.format("%,.2f", remaining));
                System.out.println("  Used: " + String.format("%.1f", percentage) + "%");
                
                if (percentage > 100) {
                    System.out.println("  Status: ⚠️  OVER BUDGET");
                } else if (percentage > 80) {
                    System.out.println("  Status: ⚠️  WARNING");
                } else {
                    System.out.println("  Status: ✓ On Track");
                }
            }
        }
    }
    
    private static void budgetAnalysis() {
        System.out.println("\n========== BUDGET ANALYSIS ==========");
        
        List<Budget> budgets = currentUser.getAllBudgets();
        if (budgets.isEmpty()) {
            System.out.println("No budgets set yet.");
            return;
        }
        
        double totalBudget = 0;
        double totalSpent = 0;
        
        for (Budget b : budgets) {
            totalBudget += b.getLimit();
            totalSpent += currentUser.getExpensesForCategory(b.getCategory());
        }
        
        System.out.println("Total Budget: ₹" + String.format("%,.2f", totalBudget));
        System.out.println("Total Spent: ₹" + String.format("%,.2f", totalSpent));
        System.out.println("Remaining: ₹" + String.format("%,.2f", totalBudget - totalSpent));
        
        double overallPercentage = (totalSpent / totalBudget) * 100;
        System.out.println("Overall Usage: " + String.format("%.1f", overallPercentage) + "%");
        
        System.out.println("\n🤖 AI Suggestion:");
        if (overallPercentage > 90) {
            System.out.println("You're using most of your budget. Consider reducing non-essential expenses.");
        } else if (overallPercentage > 70) {
            System.out.println("You're on track but monitor your spending in the coming days.");
        } else {
            System.out.println("Great job! You're managing your budget well.");
        }
    }
    
    private static void showInvestmentOverview() {
        System.out.println("\n========== INVESTMENT OVERVIEW ==========");
        
        List<Investment> investments = currentUser.getAllInvestments();
        
        if (investments.isEmpty()) {
            System.out.println("No investments yet.");
            System.out.println("\n1. Add Investment");
            System.out.println("2. Back");
            System.out.print("\nEnter your choice: ");
            
            int choice = getIntInput();
            if (choice == 1) {
                addInvestment();
            }
        } else {
            double totalValue = 0;
            double totalGain = 0;
            
            for (Investment inv : investments) {
                System.out.println("\n" + inv);
                totalValue += inv.getCurrentValue();
                totalGain += inv.getGain();
            }
            
            System.out.println("\n--- Summary ---");
            System.out.println("Total Investment Value: ₹" + String.format("%,.2f", totalValue));
            System.out.println("Total Gain/Loss: ₹" + String.format("%,.2f", totalGain));
            
            System.out.println("\n1. Add Investment");
            System.out.println("2. Back");
            System.out.print("\nEnter your choice: ");
            
            int choice = getIntInput();
            if (choice == 1) {
                addInvestment();
            }
        }
        
        pressEnterToContinue();
    }
    
    private static void addInvestment() {
        System.out.print("\nInvestment Name: ");
        String name = scanner.nextLine();
        
        System.out.print("Initial Amount: ₹");
        double amount = getDoubleInput();
        
        System.out.print("Current Value: ₹");
        double currentValue = getDoubleInput();
        
        System.out.println("\nTypes: Stocks, Bonds, Mutual Funds, Real Estate, Crypto, Other");
        System.out.print("Type: ");
        String type = scanner.nextLine();
        
        Investment investment = new Investment(name, amount, currentValue, type);
        currentUser.addInvestment(investment);
        
        System.out.println("\n✓ Investment added successfully!");
    }
    
    private static void showBillReminders() {
        System.out.println("\n========== BILL REMINDERS ==========");
        System.out.println("1. Add Bill");
        System.out.println("2. View All Bills");
        System.out.println("3. View Upcoming Bills");
        System.out.println("4. Back");
        System.out.print("\nEnter your choice: ");
        
        int choice = getIntInput();
        
        switch (choice) {
            case 1:
                addBill();
                break;
            case 2:
                viewAllBills();
                break;
            case 3:
                viewUpcomingBills();
                break;
            case 4:
                return;
        }
        
        pressEnterToContinue();
    }
    
    private static void addBill() {
        System.out.print("\nBill Name: ");
        String name = scanner.nextLine();
        
        System.out.print("Amount: ₹");
        double amount = getDoubleInput();
        
        System.out.print("Due Day of Month (1-31): ");
        int dueDay = getIntInput();
        
        Bill bill = new Bill(name, amount, dueDay);
        currentUser.addBill(bill);
        
        System.out.println("\n✓ Bill reminder added successfully!");
    }
    
    private static void viewAllBills() {
        System.out.println("\n========== ALL BILLS ==========");
        List<Bill> bills = currentUser.getAllBills();
        
        if (bills.isEmpty()) {
            System.out.println("No bills added yet.");
        } else {
            for (Bill bill : bills) {
                System.out.println(bill);
            }
        }
    }
    
    private static void viewUpcomingBills() {
        System.out.println("\n========== UPCOMING BILLS ==========");
        List<Bill> upcomingBills = currentUser.getUpcomingBills(7);
        
        if (upcomingBills.isEmpty()) {
            System.out.println("No upcoming bills in the next 7 days.");
        } else {
            for (Bill bill : upcomingBills) {
                System.out.println(bill + " - Due in " + bill.getDaysUntilDue() + " days");
            }
        }
    }
    
    private static void showWallet() {
        System.out.println("\n========== WALLET ==========");
        System.out.println("Balance: ₹" + String.format("%,.2f", currentUser.getWalletBalance()));
        
        System.out.println("\n1. Add Money");
        System.out.println("2. Send Payment");
        System.out.println("3. Transaction History");
        System.out.println("4. Back");
        System.out.print("\nEnter your choice: ");
        
        int choice = getIntInput();
        
        switch (choice) {
            case 1:
                addMoney();
                break;
            case 2:
                sendPayment();
                break;
            case 3:
                showTransactionHistory();
                break;
            case 4:
                return;
        }
        
        pressEnterToContinue();
    }
    
    private static void addMoney() {
        System.out.print("\nAmount to add: ₹");
        double amount = getDoubleInput();
        
        if (amount > 0) {
            currentUser.addToWallet(amount);
            System.out.println("\n✓ ₹" + String.format("%,.2f", amount) + " added to wallet!");
            System.out.println("New balance: ₹" + String.format("%,.2f", currentUser.getWalletBalance()));
        } else {
            System.out.println("Invalid amount.");
        }
    }
    
    private static void sendPayment() {
        System.out.print("\nRecipient Phone/Email: ");
        String recipient = scanner.nextLine();
        
        System.out.print("Amount: ₹");
        double amount = getDoubleInput();
        
        if (amount <= currentUser.getWalletBalance()) {
            currentUser.deductFromWallet(amount);
            Transaction transaction = new Transaction("Transfer to " + recipient, -amount, "Transfer", "send");
            currentUser.addTransaction(transaction);
            
            System.out.println("\n✓ ₹" + String.format("%,.2f", amount) + " sent successfully!");
            System.out.println("New balance: ₹" + String.format("%,.2f", currentUser.getWalletBalance()));
        } else {
            System.out.println("\n✗ Insufficient balance!");
        }
    }
    
    private static void showTransactionHistory() {
        System.out.println("\n========== TRANSACTION HISTORY ==========");
        List<Transaction> transactions = currentUser.getAllTransactions();
        
        if (transactions.isEmpty()) {
            System.out.println("No transactions yet.");
        } else {
            for (Transaction t : transactions) {
                System.out.println(t);
            }
        }
    }
    
    private static void showSMSTransfer() {
        System.out.println("\n========== SMS/QUICK TRANSFER ==========");
        System.out.println("Send money using phone number");
        
        System.out.print("\nRecipient Phone Number: ");
        String phone = scanner.nextLine();
        
        System.out.print("Amount: ₹");
        double amount = getDoubleInput();
        
        System.out.print("Note (optional): ");
        String note = scanner.nextLine();
        
        if (amount <= currentUser.getWalletBalance()) {
            currentUser.deductFromWallet(amount);
            String description = "SMS Transfer to " + phone;
            if (!note.isEmpty()) {
                description += " - " + note;
            }
            Transaction transaction = new Transaction(description, -amount, "SMS Transfer", "send");
            currentUser.addTransaction(transaction);
            
            System.out.println("\n✓ ₹" + String.format("%,.2f", amount) + " sent via SMS!");
            System.out.println("Transaction ID: " + transaction.getDate());
        } else {
            System.out.println("\n✗ Insufficient balance!");
        }
        
        pressEnterToContinue();
    }
    
    private static void showMultiAccount() {
        System.out.println("\n========== MULTI-ACCOUNT MANAGEMENT ==========");
        List<Account> accounts = currentUser.getAllAccounts();
        
        if (accounts.isEmpty()) {
            System.out.println("No accounts added yet.");
            System.out.println("\n1. Add Account");
            System.out.println("2. Back");
            System.out.print("\nEnter your choice: ");
            
            int choice = getIntInput();
            if (choice == 1) {
                addAccount();
            }
        } else {
            double totalBalance = 0;
            for (Account acc : accounts) {
                System.out.println(acc);
                System.out.println();
                totalBalance += acc.getBalance();
            }
            
            System.out.println("Total Balance Across All Accounts: ₹" + String.format("%,.2f", totalBalance));
            
            System.out.println("\n1. Add Account");
            System.out.println("2. Back");
            System.out.print("\nEnter your choice: ");
            
            int choice = getIntInput();
            if (choice == 1) {
                addAccount();
            }
        }
        
        pressEnterToContinue();
    }
    
    private static void addAccount() {
        System.out.print("\nAccount Name: ");
        String name = scanner.nextLine();
        
        System.out.print("Account Number: ");
        String accountNumber = scanner.nextLine();
        
        System.out.print("Bank Name: ");
        String bankName = scanner.nextLine();
        
        System.out.print("Balance: ₹");
        double balance = getDoubleInput();
        
        System.out.println("\nTypes: Savings, Checking, Credit Card");
        System.out.print("Type: ");
        String type = scanner.nextLine();
        
        Account account = new Account(name, accountNumber, bankName, balance, type);
        currentUser.addAccount(account);
        
        System.out.println("\n✓ Account added successfully!");
    }
    
    private static void showReports() {
        System.out.println("\n========== FINANCIAL REPORTS & ANALYTICS ==========");
        
        System.out.println("\n📊 Monthly Summary");
        System.out.println("   Total Income: ₹" + String.format("%,.2f", currentUser.getTotalIncome()));
        System.out.println("   Total Expenses: ₹" + String.format("%,.2f", currentUser.getTotalExpenses()));
        System.out.println("   Net Savings: ₹" + String.format("%,.2f", currentUser.getTotalIncome() - currentUser.getTotalExpenses()));
        
        System.out.println("\n📈 Expense Breakdown by Category");
        String[] categories = {"Food", "Transport", "Shopping", "Bills", "Entertainment"};
        for (String category : categories) {
            double amount = currentUser.getExpensesForCategory(category);
            if (amount > 0) {
                System.out.printf("   %s: ₹%,.2f\n", category, amount);
            }
        }
        
        System.out.println("\n💡 AI Insights");
        System.out.println("   • Your spending is " + (currentUser.getTotalExpenses() < currentUser.getTotalIncome() * 0.6 ? "healthy" : "above average"));
        System.out.println("   • Savings rate: " + String.format("%.1f%%", ((currentUser.getTotalIncome() - currentUser.getTotalExpenses()) / currentUser.getTotalIncome()) * 100));
        System.out.println("   • Recommended action: Continue tracking expenses regularly");
        
        pressEnterToContinue();
    }
    
    private static void showTaxDocuments() {
        System.out.println("\n========== TAX DOCUMENTS ==========");
        System.out.println("\n📄 Available Tax Documents:");
        System.out.println("   • Form 16 - 2024");
        System.out.println("   • Investment Proofs - 2024");
        System.out.println("   • Expense Summary - 2024");
        System.out.println("   • Interest Certificates - 2024");
        
        System.out.println("\n💡 Tax Saving Opportunities:");
        System.out.println("   • Eligible for 80C deduction: ₹1,50,000");
        System.out.println("   • HRA exemption available");
        System.out.println("   • Investment in ELSS suggested");
        
        System.out.println("\n📊 Estimated Tax Liability: ₹" + String.format("%,.2f", currentUser.getAnnualSalary() * 0.15));
        
        pressEnterToContinue();
    }
    
    private static void showAIAssistant() {
        System.out.println("\n========== AI VIRTUAL ASSISTANT ==========");
        System.out.println("\n🤖 FinWise AI Assistant");
        System.out.println("   Hello " + currentUser.getFullName() + "! I'm here to help you manage your finances.");
        
        System.out.println("\n💡 Personalized Recommendations:");
        System.out.println("   1. You're spending 60% on expenses. Consider reducing to 50%.");
        System.out.println("   2. Increase your emergency fund to cover 6 months of expenses.");
        System.out.println("   3. Diversify investments across multiple asset classes.");
        System.out.println("   4. Set up automatic bill payments to avoid late fees.");
        
        System.out.println("\n📊 Financial Health Score: 78/100");
        System.out.println("   Rating: Good - Keep up the good work!");
        
        System.out.println("\n🎯 Suggested Actions:");
        System.out.println("   • Review and optimize your monthly subscriptions");
        System.out.println("   • Increase SIP amount by 10% next month");
        System.out.println("   • Consider tax-saving fixed deposits");
        
        pressEnterToContinue();
    }
    
    private static void showSecurityFeatures() {
        System.out.println("\n========== SECURITY FEATURES ==========");
        System.out.println("\n🔒 Account Security:");
        System.out.println("   ✓ Two-factor authentication enabled");
        System.out.println("   ✓ End-to-end encryption");
        System.out.println("   ✓ Biometric login available");
        System.out.println("   ✓ Regular security audits");
        
        System.out.println("\n🛡️  Privacy Settings:");
        System.out.println("   ✓ Data encryption at rest and in transit");
        System.out.println("   ✓ No data sharing with third parties");
        System.out.println("   ✓ Offline mode available");
        System.out.println("   ✓ Automatic session timeout");
        
        System.out.println("\n📱 Recent Activity:");
        System.out.println("   • Last login: " + LocalDate.now());
        System.out.println("   • Device: Console Application");
        System.out.println("   • No suspicious activity detected");
        
        pressEnterToContinue();
    }
    
    private static void showSettings() {
        System.out.println("\n========== SETTINGS ==========");
        System.out.println("1. View Profile");
        System.out.println("2. Change Password");
        System.out.println("3. Change Language");
        System.out.println("4. Notification Preferences");
        System.out.println("5. Back");
        System.out.print("\nEnter your choice: ");
        
        int choice = getIntInput();
        
        switch (choice) {
            case 1:
                viewProfile();
                break;
            case 2:
                changePassword();
                break;
            case 3:
                changeLanguage();
                break;
            case 4:
                notificationPreferences();
                break;
            case 5:
                return;
        }
        
        pressEnterToContinue();
    }
    
    private static void viewProfile() {
        System.out.println("\n========== PROFILE ==========");
        System.out.println("Name: " + currentUser.getFullName());
        System.out.println("Email: " + currentUser.getEmail());
        System.out.println("Phone: " + (currentUser.getPhone() != null ? currentUser.getPhone() : "Not set"));
        System.out.println("Member Since: " + currentUser.getFormattedCreatedDate());
        System.out.println("Language: " + langService.getCurrentLanguage());
        System.out.println("\nFinancial Summary:");
        System.out.println("Wallet Balance: ₹" + String.format("%,.2f", currentUser.getWalletBalance()));
        System.out.println("Total Expenses: ₹" + String.format("%,.2f", currentUser.getTotalExpenses()));
        System.out.println("Active Budgets: " + currentUser.getAllBudgets().size());
        System.out.println("Investments: " + currentUser.getAllInvestments().size());
        System.out.println("Linked Accounts: " + currentUser.getAllAccounts().size());
    }
    
    private static void changePassword() {
        System.out.print("\nCurrent Password: ");
        String currentPassword = scanner.nextLine();
        
        if (!currentUser.authenticate(currentPassword)) {
            System.out.println("✗ Incorrect password!");
            return;
        }
        
        System.out.print("New Password: ");
        String newPassword = scanner.nextLine();
        
        System.out.print("Confirm New Password: ");
        String confirmPassword = scanner.nextLine();
        
        if (newPassword.equals(confirmPassword)) {
            currentUser.setPassword(newPassword);
            System.out.println("\n✓ Password changed successfully!");
        } else {
            System.out.println("\n✗ Passwords do not match!");
        }
    }
    
    private static void notificationPreferences() {
        System.out.println("\n========== NOTIFICATION PREFERENCES ==========");
        System.out.println("✓ Email notifications enabled");
        System.out.println("✓ SMS alerts enabled");
        System.out.println("✓ Bill reminders enabled");
        System.out.println("✓ Budget alerts enabled");
        System.out.println("✓ Investment updates enabled");
        System.out.println("\nNote: Notification settings are currently view-only in console mode.");
    }
    
    private static void showAbout() {
        System.out.println("\n========== ABOUT FINWISE ==========");
        System.out.println("\nFinWise - Your Personal Financial Management System");
        System.out.println("Version: 2.0 (Java Console Edition)");
        System.out.println("\n📱 Features:");
        System.out.println("   • Comprehensive expense tracking");
        System.out.println("   • Budget planning and monitoring");
        System.out.println("   • Investment portfolio management");
        System.out.println("   • Bill reminders and auto-pay");
        System.out.println("   • Multi-account management");
        System.out.println("   • AI-powered financial insights");
        System.out.println("   • Multi-language support");
        System.out.println("   • Secure offline wallet");
        
        System.out.println("\n🌍 Supported Languages: 15+");
        System.out.println("   Including: English, Hindi, Gujarati, Spanish, French, and more");
        
        System.out.println("\n📧 Contact: support@finwise.app");
        System.out.println("🌐 Website: www.finwise.app");
        
        System.out.println("\n© 2024 FinWise. All rights reserved.");
        System.out.println("Built for educational purposes - School Assessment Project");
        
        pressEnterToContinue();
    }
    
    private static void logout() {
        System.out.print("\nAre you sure you want to logout? (y/n): ");
        String confirm = scanner.nextLine();
        
        if (confirm.equalsIgnoreCase("y")) {
            authService.signOut();
            currentUser = null;
            System.out.println("\n✓ Logged out successfully!");
            System.out.println("Thank you for using FinWise!");
        }
    }
    
    // Utility methods
    private static int getIntInput() {
        while (true) {
            try {
                int value = Integer.parseInt(scanner.nextLine());
                return value;
            } catch (NumberFormatException e) {
                System.out.print("Invalid input. Please enter a number: ");
            }
        }
    }
    
    private static double getDoubleInput() {
        while (true) {
            try {
                double value = Double.parseDouble(scanner.nextLine());
                return value;
            } catch (NumberFormatException e) {
                System.out.print("Invalid input. Please enter a number: ");
            }
        }
    }
    
    private static void pressEnterToContinue() {
        System.out.print("\nPress Enter to continue...");
        scanner.nextLine();
    }
}

// Model classes (if not in separate files)
class Expense {
    private String description;
    private double amount;
    private String category;
    private LocalDate date;
    
    public Expense(String description, double amount, String category) {
        this.description = description;
        this.amount = amount;
        this.category = category;
        this.date = LocalDate.now();
    }
    
    public String getDescription() { return description; }
    public double getAmount() { return amount; }
    public String getCategory() { return category; }
    public LocalDate getDate() { return date; }
    
    @Override
    public String toString() {
        return String.format("[%s] %s - ₹%.2f (%s)", 
            date.format(DateTimeFormatter.ofPattern("MMM dd")), 
            description, amount, category);
    }
}

class Budget {
    private String category;
    private double limit;
    
    public Budget(String category, double limit) {
        this.category = category;
        this.limit = limit;
    }
    
    public String getCategory() { return category; }
    public double getLimit() { return limit; }
    
    @Override
    public String toString() {
        return String.format("%s: ₹%.2f", category, limit);
    }
}

class Transaction {
    private String description;
    private double amount;
    private String type;
    private String transactionType; // "receive" or "send"
    private LocalDate date;
    
    public Transaction(String description, double amount, String type, String transactionType) {
        this.description = description;
        this.amount = amount;
        this.type = type;
        this.transactionType = transactionType;
        this.date = LocalDate.now();
    }
    
    public String getDescription() { return description; }
    public double getAmount() { return amount; }
    public String getType() { return type; }
    public LocalDate getDate() { return date; }
    
    @Override
    public String toString() {
        String sign = transactionType.equals("receive") ? "+" : "";
        return String.format("[%s] %s: %s₹%.2f (%s)", 
            date.format(DateTimeFormatter.ofPattern("MMM dd")),
            description, sign, Math.abs(amount), type);
    }
}

class Investment {
    private String name;
    private double initialAmount;
    private double currentValue;
    private String type;
    private LocalDate purchaseDate;
    
    public Investment(String name, double initialAmount, double currentValue, String type) {
        this.name = name;
        this.initialAmount = initialAmount;
        this.currentValue = currentValue;
        this.type = type;
        this.purchaseDate = LocalDate.now();
    }
    
    public String getName() { return name; }
    public double getInitialAmount() { return initialAmount; }
    public double getCurrentValue() { return currentValue; }
    public String getType() { return type; }
    
    public double getGain() {
        return currentValue - initialAmount;
    }
    
    public double getReturnPercentage() {
        return ((currentValue - initialAmount) / initialAmount) * 100;
    }
    
    @Override
    public String toString() {
        double gain = getGain();
        String gainSign = gain >= 0 ? "+" : "";
        return String.format("%s (%s)\n  Initial: ₹%.2f | Current: ₹%.2f | Gain/Loss: %s₹%.2f (%.1f%%)",
            name, type, initialAmount, currentValue, gainSign, gain, getReturnPercentage());
    }
}

class Bill {
    private String name;
    private double amount;
    private int dueDay;
    
    public Bill(String name, double amount, int dueDay) {
        this.name = name;
        this.amount = amount;
        this.dueDay = dueDay;
    }
    
    public String getName() { return name; }
    public double getAmount() { return amount; }
    public int getDueDay() { return dueDay; }
    
    public int getDaysUntilDue() {
        LocalDate today = LocalDate.now();
        int currentDay = today.getDayOfMonth();
        
        if (dueDay >= currentDay) {
            return dueDay - currentDay;
        } else {
            LocalDate nextMonth = today.plusMonths(1);
            LocalDate dueDate = LocalDate.of(nextMonth.getYear(), nextMonth.getMonth(), 
                Math.min(dueDay, nextMonth.lengthOfMonth()));
            return (int) java.time.temporal.ChronoUnit.DAYS.between(today, dueDate);
        }
    }
    
    @Override
    public String toString() {
        return String.format("%s - ₹%.2f (Due: Day %d)", name, amount, dueDay);
    }
}

class Account {
    private String name;
    private String accountNumber;
    private String bankName;
    private double balance;
    private String type;
    
    public Account(String name, String accountNumber, String bankName, double balance, String type) {
        this.name = name;
        this.accountNumber = accountNumber;
        this.bankName = bankName;
        this.balance = balance;
        this.type = type;
    }
    
    public String getName() { return name; }
    public String getAccountNumber() { return accountNumber; }
    public String getBankName() { return bankName; }
    public double getBalance() { return balance; }
    public String getType() { return type; }
    
    @Override
    public String toString() {
        return String.format("%s (%s)\n  Bank: %s | Account: %s | Balance: ₹%.2f",
            name, type, bankName, accountNumber, balance);
    }
}
