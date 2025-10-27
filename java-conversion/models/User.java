package models;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * User Model - Represents a FinWise user
 */
public class User {
    private String id;
    private String email;
    private String fullName;
    private String phone;
    private String password; // In production, this should be hashed
    private LocalDateTime createdAt;
    
    // Financial data collections
    private List<Expense> expenses;
    private List<Budget> budgets;
    private List<Transaction> transactions;
    private List<Investment> investments;
    private List<Bill> bills;
    private List<Account> accounts;
    private List<ExtraIncome> extraIncomes;
    
    // Financial tracking
    private double walletBalance;
    private double annualSalary;
    private double monthlySalary;
    
    // Annual financial data
    private double annualExpenses;
    private double annualSavings;
    private double annualInvestments;
    private double annualRemaining;
    
    // Monthly financial data
    private double monthlyExpenses;
    private double monthlySavings;
    private double monthlyInvestments;
    private double monthlyRemaining;
    
    public User(String email, String fullName, String password) {
        this.id = UUID.randomUUID().toString();
        this.email = email;
        this.fullName = fullName;
        this.password = password;
        this.createdAt = LocalDateTime.now();
        
        // Initialize collections
        this.expenses = new ArrayList<>();
        this.budgets = new ArrayList<>();
        this.transactions = new ArrayList<>();
        this.investments = new ArrayList<>();
        this.bills = new ArrayList<>();
        this.accounts = new ArrayList<>();
        this.extraIncomes = new ArrayList<>();
        
        // Initialize default values
        this.walletBalance = 205430.0;
        this.annualSalary = 6200000.0;
        this.monthlySalary = 52000.0;
        
        // Initialize annual financial data
        this.annualExpenses = 3720000.0;
        this.annualSavings = 1240000.0;
        this.annualInvestments = 830000.0;
        this.annualRemaining = 410000.0;
        
        // Initialize monthly financial data
        this.monthlyExpenses = 31000.0;
        this.monthlySavings = 10500.0;
        this.monthlyInvestments = 7000.0;
        this.monthlyRemaining = 3500.0;
    }
    
    // Authentication
    public boolean authenticate(String password) {
        return this.password.equals(password);
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    // Getters
    public String getId() { return id; }
    public String getEmail() { return email; }
    public String getFullName() { return fullName; }
    public String getPhone() { return phone; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public double getWalletBalance() { return walletBalance; }
    public double getAnnualSalary() { return annualSalary; }
    public double getMonthlySalary() { return monthlySalary; }
    
    // Setters
    public void setPhone(String phone) { this.phone = phone; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setAnnualSalary(double salary) { this.annualSalary = salary; }
    public void setMonthlySalary(double salary) { this.monthlySalary = salary; }
    
    // Wallet operations
    public void addToWallet(double amount) {
        this.walletBalance += amount;
        addTransaction(new Transaction("Wallet Top-up", amount, "Deposit", "receive"));
    }
    
    public void deductFromWallet(double amount) {
        this.walletBalance -= amount;
    }
    
    // Annual financial data
    public double getAnnualExpenses() { return annualExpenses; }
    public double getAnnualSavings() { return annualSavings; }
    public double getAnnualInvestments() { return annualInvestments; }
    public double getAnnualRemaining() { return annualRemaining; }
    
    public void setAnnualExpenses(double amount) { this.annualExpenses = amount; updateAnnualRemaining(); }
    public void setAnnualSavings(double amount) { this.annualSavings = amount; updateAnnualRemaining(); }
    public void setAnnualInvestments(double amount) { this.annualInvestments = amount; updateAnnualRemaining(); }
    
    private void updateAnnualRemaining() {
        double totalExtraIncome = getTotalExtraIncome("2024");
        this.annualRemaining = (annualSalary + totalExtraIncome) - (annualExpenses + annualSavings + annualInvestments);
    }
    
    // Monthly financial data
    public double getMonthlyExpenses() { return monthlyExpenses; }
    public double getMonthlySavings() { return monthlySavings; }
    public double getMonthlyInvestments() { return monthlyInvestments; }
    public double getMonthlyRemaining() { return monthlyRemaining; }
    
    public void setMonthlyExpenses(double amount) { this.monthlyExpenses = amount; updateMonthlyRemaining(); }
    public void setMonthlySavings(double amount) { this.monthlySavings = amount; updateMonthlyRemaining(); }
    public void setMonthlyInvestments(double amount) { this.monthlyInvestments = amount; updateMonthlyRemaining(); }
    
    private void updateMonthlyRemaining() {
        this.monthlyRemaining = monthlySalary - (monthlyExpenses + monthlySavings + monthlyInvestments);
    }
    
    // Extra income management
    public void addExtraIncome(ExtraIncome income) {
        extraIncomes.add(income);
    }
    
    public List<ExtraIncome> getExtraIncomes(String period) {
        List<ExtraIncome> result = new ArrayList<>();
        for (ExtraIncome income : extraIncomes) {
            if (income.getPeriod().equals(period)) {
                result.add(income);
            }
        }
        return result;
    }
    
    public double getTotalExtraIncome(String period) {
        double total = 0;
        for (ExtraIncome income : extraIncomes) {
            if (income.getPeriod().equals(period)) {
                total += income.getAmount();
            }
        }
        return total;
    }
    
    // Expense management
    public void addExpense(Expense expense) {
        expenses.add(expense);
        addTransaction(new Transaction(expense.getDescription(), -expense.getAmount(), expense.getCategory(), "send"));
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
    
    // Budget management
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
    
    // Transaction management
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
    
    // Investment management
    public void addInvestment(Investment investment) { investments.add(investment); }
    public List<Investment> getAllInvestments() { return new ArrayList<>(investments); }
    
    // Bill management
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
    
    // Account management
    public void addAccount(Account account) { accounts.add(account); }
    public List<Account> getAllAccounts() { return new ArrayList<>(accounts); }
    
    public String getFormattedCreatedDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy");
        return createdAt.format(formatter);
    }
}
