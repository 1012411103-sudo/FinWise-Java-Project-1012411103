import java.util.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * FinWise - Financial Management Application
 * A simple Java console application for managing personal finances
 */
public class FinWiseApp {
    private static Scanner scanner = new Scanner(System.in);
    private static User currentUser = null;
    private static List<User> users = new ArrayList<>();
    private static String currentLanguage = "en";
    
    public static void main(String[] args) {
        System.out.println("=======================================");
        System.out.println("    FINWISE - Your Financial Partner   ");
        System.out.println("=======================================\n");
        
        // Initialize with demo data
        initializeDemoData();
        
        // Authentication loop
        while (currentUser == null) {
            showAuthMenu();
        }
        
        // Main application loop
        while (true) {
            showMainMenu();
        }
    }
    
    private static void initializeDemoData() {
        // Create a demo user
        User demoUser = new User("demo@finwise.com", "Demo User", "password123");
        users.add(demoUser);
    }
    
    private static void showAuthMenu() {
        System.out.println("\n1. Sign In");
        System.out.println("2. Sign Up");
        System.out.println("3. Exit");
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
                System.out.println("Thank you for using FinWise!");
                System.exit(0);
                break;
            default:
                System.out.println("Invalid choice. Please try again.");
        }
    }
    
    private static void signIn() {
        System.out.print("\nEmail: ");
        String email = scanner.nextLine();
        System.out.print("Password: ");
        String password = scanner.nextLine();
        
        for (User user : users) {
            if (user.getEmail().equals(email) && user.authenticate(password)) {
                currentUser = user;
                System.out.println("\nWelcome back, " + user.getFullName() + "!");
                return;
            }
        }
        
        System.out.println("\nInvalid credentials. Please try again.");
    }
    
    private static void signUp() {
        System.out.print("\nFull Name: ");
        String fullName = scanner.nextLine();
        System.out.print("Email: ");
        String email = scanner.nextLine();
        System.out.print("Password: ");
        String password = scanner.nextLine();
        
        User newUser = new User(email, fullName, password);
        users.add(newUser);
        currentUser = newUser;
        
        System.out.println("\nAccount created successfully! Welcome, " + fullName + "!");
    }
    
    private static void showMainMenu() {
        System.out.println("\n=======================================");
        System.out.println("           MAIN MENU");
        System.out.println("=======================================");
        System.out.println("User: " + currentUser.getFullName());
        System.out.println("\n1. EcoPlanning");
        System.out.println("2. Wallet");
        System.out.println("3. Accounts");
        System.out.println("4. Settings");
        System.out.println("5. Logout");
        System.out.print("\nEnter your choice: ");
        
        int choice = getIntInput();
        
        switch (choice) {
            case 1:
                showEcoPlanningMenu();
                break;
            case 2:
                showWallet();
                break;
            case 3:
                showAccounts();
                break;
            case 4:
                showSettings();
                break;
            case 5:
                currentUser = null;
                System.out.println("Logged out successfully.");
                break;
            default:
                System.out.println("Invalid choice. Please try again.");
        }
    }
    
    private static void showEcoPlanningMenu() {
        System.out.println("\n--- EcoPlanning Menu ---");
        System.out.println("1. Dashboard");
        System.out.println("2. Expense Tracker");
        System.out.println("3. Budget Planner");
        System.out.println("4. Investment Overview");
        System.out.println("5. Bills & Reminders");
        System.out.println("6. Back to Main Menu");
        System.out.print("\nEnter your choice: ");
        
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
                return;
            default:
                System.out.println("Invalid choice.");
        }
    }
    
    private static void showDashboard() {
        System.out.println("\n========== DASHBOARD ==========");
        
        double totalIncome = currentUser.getTotalIncome();
        double totalExpenses = currentUser.getTotalExpenses();
        double balance = totalIncome - totalExpenses;
        
        System.out.println("Total Income: $" + String.format("%.2f", totalIncome));
        System.out.println("Total Expenses: $" + String.format("%.2f", totalExpenses));
        System.out.println("Balance: $" + String.format("%.2f", balance));
        
        System.out.println("\nRecent Transactions:");
        List<Transaction> recent = currentUser.getRecentTransactions(5);
        if (recent.isEmpty()) {
            System.out.println("No transactions yet.");
        } else {
            for (Transaction t : recent) {
                System.out.println(t);
            }
        }
        
        pressEnterToContinue();
    }
    
    private static void showExpenseTracker() {
        System.out.println("\n--- Expense Tracker ---");
        System.out.println("1. Add Expense");
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
    }
    
    private static void addExpense() {
        System.out.print("\nExpense Description: ");
        String description = scanner.nextLine();
        
        System.out.print("Amount: $");
        double amount = getDoubleInput();
        
        System.out.println("\nCategories:");
        String[] categories = {"Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"};
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
        
        System.out.println("\nExpense added successfully!");
        
        // Check budget
        Budget budget = currentUser.getBudgetForCategory(category);
        if (budget != null) {
            double spent = currentUser.getExpensesForCategory(category);
            double remaining = budget.getLimit() - spent;
            System.out.println("Budget for " + category + ": $" + String.format("%.2f", budget.getLimit()));
            System.out.println("Spent: $" + String.format("%.2f", spent));
            System.out.println("Remaining: $" + String.format("%.2f", remaining));
            
            if (remaining < 0) {
                System.out.println("⚠️  WARNING: You've exceeded your budget!");
            } else if (remaining < budget.getLimit() * 0.2) {
                System.out.println("⚠️  ALERT: You're running low on budget!");
            }
        }
        
        pressEnterToContinue();
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
            System.out.println("\nTotal Expenses: $" + String.format("%.2f", total));
        }
        
        pressEnterToContinue();
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
            System.out.println("\nTotal: $" + String.format("%.2f", total));
        }
        
        pressEnterToContinue();
    }
    
    private static void showBudgetPlanner() {
        System.out.println("\n--- Budget Planner ---");
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
    }
    
    private static void setBudget() {
        System.out.print("\nCategory: ");
        String category = scanner.nextLine();
        
        System.out.print("Monthly Limit: $");
        double limit = getDoubleInput();
        
        Budget budget = new Budget(category, limit);
        currentUser.addBudget(budget);
        
        System.out.println("\nBudget set successfully!");
        pressEnterToContinue();
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
                System.out.println("  Budget: $" + String.format("%.2f", b.getLimit()));
                System.out.println("  Spent: $" + String.format("%.2f", spent));
                System.out.println("  Remaining: $" + String.format("%.2f", remaining));
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
        
        pressEnterToContinue();
    }
    
    private static void budgetAnalysis() {
        System.out.println("\n========== BUDGET ANALYSIS ==========");
        
        List<Budget> budgets = currentUser.getAllBudgets();
        if (budgets.isEmpty()) {
            System.out.println("No budgets set yet.");
            pressEnterToContinue();
            return;
        }
        
        double totalBudget = 0;
        double totalSpent = 0;
        
        for (Budget b : budgets) {
            totalBudget += b.getLimit();
            totalSpent += currentUser.getExpensesForCategory(b.getCategory());
        }
        
        System.out.println("Total Budget: $" + String.format("%.2f", totalBudget));
        System.out.println("Total Spent: $" + String.format("%.2f", totalSpent));
        System.out.println("Remaining: $" + String.format("%.2f", totalBudget - totalSpent));
        
        double overallPercentage = (totalSpent / totalBudget) * 100;
        System.out.println("Overall Usage: " + String.format("%.1f", overallPercentage) + "%");
        
        System.out.println("\nAI Suggestion:");
        if (overallPercentage > 90) {
            System.out.println("🤖 You're using most of your budget. Consider reducing non-essential expenses.");
        } else if (overallPercentage > 70) {
            System.out.println("🤖 You're on track but monitor your spending in the coming days.");
        } else {
            System.out.println("🤖 Great job! You're managing your budget well.");
        }
        
        pressEnterToContinue();
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
            System.out.println("Total Investment Value: $" + String.format("%.2f", totalValue));
            System.out.println("Total Gain/Loss: $" + String.format("%.2f", totalGain));
            
            System.out.println("\n1. Add Investment");
            System.out.println("2. Back");
            System.out.print("\nEnter your choice: ");
            
            int choice = getIntInput();
            if (choice == 1) {
                addInvestment();
            }
        }
    }
    
    private static void addInvestment() {
        System.out.print("\nInvestment Name: ");
        String name = scanner.nextLine();
        
        System.out.print("Initial Amount: $");
        double amount = getDoubleInput();
        
        System.out.print("Current Value: $");
        double currentValue = getDoubleInput();
        
        System.out.println("\nTypes: Stocks, Bonds, Mutual Funds, Real Estate, Crypto, Other");
        System.out.print("Type: ");
        String type = scanner.nextLine();
        
        Investment investment = new Investment(name, amount, currentValue, type);
        currentUser.addInvestment(investment);
        
        System.out.println("\nInvestment added successfully!");
        pressEnterToContinue();
    }
    
    private static void showBillReminders() {
        System.out.println("\n--- Bill Reminders ---");
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
    }
    
    private static void addBill() {
        System.out.print("\nBill Name: ");
        String name = scanner.nextLine();
        
        System.out.print("Amount: $");
        double amount = getDoubleInput();
        
        System.out.print("Due Day of Month (1-31): ");
        int dueDay = getIntInput();
        
        Bill bill = new Bill(name, amount, dueDay);
        currentUser.addBill(bill);
        
        System.out.println("\nBill reminder added successfully!");
        pressEnterToContinue();
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
        
        pressEnterToContinue();
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
        
        pressEnterToContinue();
    }
    
    private static void showWallet() {
        System.out.println("\n========== WALLET ==========");
        System.out.println("Balance: $" + String.format("%.2f", currentUser.getWalletBalance()));
        
        System.out.println("\n1. Add Money");
        System.out.println("2. Transfer Money");
        System.out.println("3. Transaction History");
        System.out.println("4. Back");
        System.out.print("\nEnter your choice: ");
        
        int choice = getIntInput();
        
        switch (choice) {
            case 1:
                addMoney();
                break;
            case 2:
                transferMoney();
                break;
            case 3:
                showTransactionHistory();
                break;
            case 4:
                return;
        }
    }
    
    private static void addMoney() {
        System.out.print("\nAmount to add: $");
        double amount = getDoubleInput();
        
        if (amount > 0) {
            currentUser.addToWallet(amount);
            System.out.println("\n$" + String.format("%.2f", amount) + " added to wallet!");
            System.out.println("New balance: $" + String.format("%.2f", currentUser.getWalletBalance()));
        } else {
            System.out.println("Invalid amount.");
        }
        
        pressEnterToContinue();
    }
    
    private static void transferMoney() {
        System.out.print("\nRecipient Email: ");
        String recipient = scanner.nextLine();
        
        System.out.print("Amount: $");
        double amount = getDoubleInput();
        
        if (amount <= currentUser.getWalletBalance()) {
            currentUser.deductFromWallet(amount);
            Transaction transaction = new Transaction("Transfer to " + recipient, -amount, "Transfer");
            currentUser.addTransaction(transaction);
            
            System.out.println("\n$" + String.format("%.2f", amount) + " transferred successfully!");
            System.out.println("New balance: $" + String.format("%.2f", currentUser.getWalletBalance()));
        } else {
            System.out.println("\nInsufficient balance!");
        }
        
        pressEnterToContinue();
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
        
        pressEnterToContinue();
    }
    
    private static void showAccounts() {
        System.out.println("\n========== ACCOUNTS ==========");
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
                totalBalance += acc.getBalance();
            }
            
            System.out.println("\nTotal Balance Across All Accounts: $" + String.format("%.2f", totalBalance));
            
            System.out.println("\n1. Add Account");
            System.out.println("2. Back");
            System.out.print("\nEnter your choice: ");
            
            int choice = getIntInput();
            if (choice == 1) {
                addAccount();
            }
        }
    }
    
    private static void addAccount() {
        System.out.print("\nAccount Name: ");
        String name = scanner.nextLine();
        
        System.out.print("Account Number: ");
        String accountNumber = scanner.nextLine();
        
        System.out.print("Bank Name: ");
        String bankName = scanner.nextLine();
        
        System.out.print("Balance: $");
        double balance = getDoubleInput();
        
        System.out.println("\nTypes: Savings, Checking, Credit Card");
        System.out.print("Type: ");
        String type = scanner.nextLine();
        
        Account account = new Account(name, accountNumber, bankName, balance, type);
        currentUser.addAccount(account);
        
        System.out.println("\nAccount added successfully!");
        pressEnterToContinue();
    }
    
    private static void showSettings() {
        System.out.println("\n--- Settings ---");
        System.out.println("1. Change Language");
        System.out.println("2. View Profile");
        System.out.println("3. Change Password");
        System.out.println("4. Back");
        System.out.print("\nEnter your choice: ");
        
        int choice = getIntInput();
        
        switch (choice) {
            case 1:
                changeLanguage();
                break;
            case 2:
                viewProfile();
                break;
            case 3:
                changePassword();
                break;
            case 4:
                return;
        }
    }
    
    private static void changeLanguage() {
        System.out.println("\n1. English");
        System.out.println("2. Spanish");
        System.out.println("3. French");
        System.out.print("\nSelect language: ");
        
        int choice = getIntInput();
        
        switch (choice) {
            case 1:
                currentLanguage = "en";
                System.out.println("Language changed to English");
                break;
            case 2:
                currentLanguage = "es";
                System.out.println("Idioma cambiado a Español");
                break;
            case 3:
                currentLanguage = "fr";
                System.out.println("Langue changée en Français");
                break;
        }
        
        pressEnterToContinue();
    }
    
    private static void viewProfile() {
        System.out.println("\n========== PROFILE ==========");
        System.out.println("Name: " + currentUser.getFullName());
        System.out.println("Email: " + currentUser.getEmail());
        System.out.println("Member Since: " + currentUser.getCreatedDate());
        System.out.println("Language: " + currentLanguage);
        
        pressEnterToContinue();
    }
    
    private static void changePassword() {
        System.out.print("\nCurrent Password: ");
        String currentPassword = scanner.nextLine();
        
        if (!currentUser.authenticate(currentPassword)) {
            System.out.println("Incorrect password!");
            pressEnterToContinue();
            return;
        }
        
        System.out.print("New Password: ");
        String newPassword = scanner.nextLine();
        
        System.out.print("Confirm New Password: ");
        String confirmPassword = scanner.nextLine();
        
        if (newPassword.equals(confirmPassword)) {
            currentUser.setPassword(newPassword);
            System.out.println("\nPassword changed successfully!");
        } else {
            System.out.println("\nPasswords do not match!");
        }
        
        pressEnterToContinue();
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

// ============================================
// MODEL CLASSES
// ============================================

class User {
    private String email;
    private String fullName;
    private String password;
    private LocalDate createdDate;
    private double walletBalance;
    private List<Expense> expenses;
    private List<Budget> budgets;
    private List<Transaction> transactions;
    private List<Investment> investments;
    private List<Bill> bills;
    private List<Account> accounts;
    
    public User(String email, String fullName, String password) {
        this.email = email;
        this.fullName = fullName;
        this.password = password;
        this.createdDate = LocalDate.now();
        this.walletBalance = 0.0;
        this.expenses = new ArrayList<>();
        this.budgets = new ArrayList<>();
        this.transactions = new ArrayList<>();
        this.investments = new ArrayList<>();
        this.bills = new ArrayList<>();
        this.accounts = new ArrayList<>();
    }
    
    public boolean authenticate(String password) {
        return this.password.equals(password);
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getEmail() { return email; }
    public String getFullName() { return fullName; }
    public LocalDate getCreatedDate() { return createdDate; }
    
    public double getWalletBalance() { return walletBalance; }
    public void addToWallet(double amount) { 
        walletBalance += amount;
        addTransaction(new Transaction("Wallet Top-up", amount, "Deposit"));
    }
    public void deductFromWallet(double amount) { walletBalance -= amount; }
    
    public void addExpense(Expense expense) { 
        expenses.add(expense);
        addTransaction(new Transaction(expense.getDescription(), -expense.getAmount(), expense.getCategory()));
    }
    public List<Expense> getAllExpenses() { return new ArrayList<>(expenses); }
    public List<Expense> getExpensesByCategory(String category) {
        List<Expense> result = new ArrayList<>();
        for (Expense e : expenses) {
            if (e.getCategory().equalsIgnoreCase(category)) {
                result.add(e);
            }
        }
        return result;
    }
    public double getExpensesForCategory(String category) {
        double total = 0;
        for (Expense e : expenses) {
            if (e.getCategory().equalsIgnoreCase(category)) {
                total += e.getAmount();
            }
        }
        return total;
    }
    public double getTotalExpenses() {
        double total = 0;
        for (Expense e : expenses) {
            total += e.getAmount();
        }
        return total;
    }
    
    public void addBudget(Budget budget) { budgets.add(budget); }
    public List<Budget> getAllBudgets() { return new ArrayList<>(budgets); }
    public Budget getBudgetForCategory(String category) {
        for (Budget b : budgets) {
            if (b.getCategory().equalsIgnoreCase(category)) {
                return b;
            }
        }
        return null;
    }
    
    public void addTransaction(Transaction transaction) { transactions.add(transaction); }
    public List<Transaction> getAllTransactions() { return new ArrayList<>(transactions); }
    public List<Transaction> getRecentTransactions(int count) {
        int start = Math.max(0, transactions.size() - count);
        return new ArrayList<>(transactions.subList(start, transactions.size()));
    }
    public double getTotalIncome() {
        double total = 0;
        for (Transaction t : transactions) {
            if (t.getAmount() > 0) {
                total += t.getAmount();
            }
        }
        return total;
    }
    
    public void addInvestment(Investment investment) { investments.add(investment); }
    public List<Investment> getAllInvestments() { return new ArrayList<>(investments); }
    
    public void addBill(Bill bill) { bills.add(bill); }
    public List<Bill> getAllBills() { return new ArrayList<>(bills); }
    public List<Bill> getUpcomingBills(int days) {
        List<Bill> upcoming = new ArrayList<>();
        for (Bill bill : bills) {
            if (bill.getDaysUntilDue() <= days && bill.getDaysUntilDue() >= 0) {
                upcoming.add(bill);
            }
        }
        return upcoming;
    }
    
    public void addAccount(Account account) { accounts.add(account); }
    public List<Account> getAllAccounts() { return new ArrayList<>(accounts); }
}

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
        return String.format("[%s] %s - $%.2f (%s)", 
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
    public void setLimit(double limit) { this.limit = limit; }
    
    @Override
    public String toString() {
        return String.format("%s: $%.2f", category, limit);
    }
}

class Transaction {
    private String description;
    private double amount;
    private String type;
    private LocalDate date;
    
    public Transaction(String description, double amount, String type) {
        this.description = description;
        this.amount = amount;
        this.type = type;
        this.date = LocalDate.now();
    }
    
    public String getDescription() { return description; }
    public double getAmount() { return amount; }
    public String getType() { return type; }
    public LocalDate getDate() { return date; }
    
    @Override
    public String toString() {
        String sign = amount >= 0 ? "+" : "";
        return String.format("[%s] %s: %s$%.2f (%s)", 
            date.format(DateTimeFormatter.ofPattern("MMM dd")),
            description, sign, amount, type);
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
    public LocalDate getPurchaseDate() { return purchaseDate; }
    
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
        return String.format("%s (%s)\n  Initial: $%.2f | Current: $%.2f | Gain/Loss: %s$%.2f (%.1f%%)",
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
            LocalDate dueDate = LocalDate.of(nextMonth.getYear(), nextMonth.getMonth(), Math.min(dueDay, nextMonth.lengthOfMonth()));
            return (int) java.time.temporal.ChronoUnit.DAYS.between(today, dueDate);
        }
    }
    
    @Override
    public String toString() {
        return String.format("%s - $%.2f (Due: Day %d)", name, amount, dueDay);
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
        return String.format("%s (%s)\n  Bank: %s | Account: %s | Balance: $%.2f",
            name, type, bankName, accountNumber, balance);
    }
}
