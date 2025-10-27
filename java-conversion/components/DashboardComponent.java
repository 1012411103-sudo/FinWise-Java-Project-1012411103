package components;

import models.*;
import services.LanguageService;
import java.util.*;

/**
 * DashboardComponent - Main financial dashboard
 * Equivalent to Dashboard.tsx
 */
public class DashboardComponent {
    private User user;
    private LanguageService langService;
    private String planningMode; // "annual" or "monthly"
    private String selectedPeriod;
    
    public DashboardComponent(User user) {
        this.user = user;
        this.langService = LanguageService.getInstance();
        this.planningMode = null;
        this.selectedPeriod = "2024";
    }
    
    /**
     * Display planning mode selection
     */
    public String selectPlanningMode(Scanner scanner) {
        System.out.println("\n========================================");
        System.out.println("    CHOOSE YOUR PLANNING MODE");
        System.out.println("========================================\n");
        
        System.out.println("1. Annual Planning");
        System.out.println("   Perfect for:");
        System.out.println("   • High earners (₹10+ lakhs annually)");
        System.out.println("   • Long-term financial goals");
        System.out.println("   • Tax planning and investments");
        System.out.println("   • Yearly budget allocation\n");
        
        System.out.println("2. Monthly Planning");
        System.out.println("   Perfect for:");
        System.out.println("   • Monthly salary earners");
        System.out.println("   • Day-to-day expense tracking");
        System.out.println("   • Short-term financial goals");
        System.out.println("   • Smaller budget management\n");
        
        System.out.println("3. Back to Main Menu\n");
        System.out.print("Enter your choice: ");
        
        int choice = getIntInput(scanner);
        
        switch (choice) {
            case 1:
                planningMode = "annual";
                break;
            case 2:
                planningMode = "monthly";
                break;
            case 3:
                return "back";
            default:
                System.out.println("Invalid choice.");
                return "back";
        }
        
        return planningMode;
    }
    
    /**
     * Display main dashboard
     */
    public void display(Scanner scanner) {
        if (planningMode == null) {
            String result = selectPlanningMode(scanner);
            if (result.equals("back")) {
                return;
            }
        }
        
        boolean running = true;
        while (running) {
            System.out.println("\n========================================");
            System.out.println("    " + (planningMode.equals("annual") ? "ANNUAL" : "MONTHLY") + " PLANNING DASHBOARD");
            System.out.println("========================================");
            
            displayFinancialOverview();
            displayMenu();
            
            int choice = getIntInput(scanner);
            
            switch (choice) {
                case 1:
                    viewDetailedBreakdown();
                    break;
                case 2:
                    manageSalary(scanner);
                    break;
                case 3:
                    manageExtraIncome(scanner);
                    break;
                case 4:
                    adjustFinancialAllocations(scanner);
                    break;
                case 5:
                    viewAISuggestions();
                    break;
                case 6:
                    viewFinancialGoals();
                    break;
                case 7:
                    planningMode = null;
                    return;
                case 8:
                    running = false;
                    break;
                default:
                    System.out.println("Invalid choice.");
            }
            
            if (running) {
                pressEnterToContinue(scanner);
            }
        }
    }
    
    private void displayFinancialOverview() {
        double salary = planningMode.equals("annual") ? user.getAnnualSalary() : user.getMonthlySalary();
        double extraIncome = user.getTotalExtraIncome(selectedPeriod);
        double totalIncome = salary + extraIncome;
        
        double expenses = planningMode.equals("annual") ? user.getAnnualExpenses() : user.getMonthlyExpenses();
        double savings = planningMode.equals("annual") ? user.getAnnualSavings() : user.getMonthlySavings();
        double investments = planningMode.equals("annual") ? user.getAnnualInvestments() : user.getMonthlyInvestments();
        double remaining = planningMode.equals("annual") ? user.getAnnualRemaining() : user.getMonthlyRemaining();
        
        System.out.println("\nFINANCIAL OVERVIEW");
        System.out.println("Period: " + selectedPeriod);
        System.out.println("─────────────────────────────────────");
        System.out.printf("Base Salary:        ₹%,15.2f\n", salary);
        
        if (extraIncome > 0) {
            System.out.printf("Extra Income:       +₹%,14.2f\n", extraIncome);
            System.out.printf("Total Income:       ₹%,15.2f\n", totalIncome);
            System.out.println("─────────────────────────────────────");
        }
        
        System.out.printf("Expenses:           ₹%,15.2f (%.1f%%)\n", expenses, (expenses/totalIncome)*100);
        System.out.printf("Savings:            ₹%,15.2f (%.1f%%)\n", savings, (savings/totalIncome)*100);
        System.out.printf("Investments:        ₹%,15.2f (%.1f%%)\n", investments, (investments/totalIncome)*100);
        System.out.printf("Remaining:          ₹%,15.2f (%.1f%%)\n", Math.max(0, remaining), (Math.max(0, remaining)/totalIncome)*100);
        System.out.println("─────────────────────────────────────");
        
        if (remaining < 0) {
            System.out.println("⚠️  WARNING: Allocations exceed income by ₹" + String.format("%,.2f", Math.abs(remaining)));
        }
    }
    
    private void displayMenu() {
        System.out.println("\n1. View Detailed Breakdown");
        System.out.println("2. Manage Salary");
        System.out.println("3. Manage Extra Income");
        System.out.println("4. Adjust Financial Allocations");
        System.out.println("5. View AI Suggestions");
        System.out.println("6. View Financial Goals");
        System.out.println("7. Switch Planning Mode");
        System.out.println("8. Back to Main Menu");
        System.out.print("\nEnter your choice: ");
    }
    
    private void viewDetailedBreakdown() {
        System.out.println("\n========== DETAILED BREAKDOWN ==========\n");
        
        if (planningMode.equals("annual")) {
            System.out.println("Monthly Average Breakdown:");
            System.out.println("─────────────────────────────────────");
            
            // Sample monthly data
            String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun"};
            double[] monthlyExpenses = {310000, 304000, 315000, 310000, 322000, 301000};
            double[] monthlySavings = {103000, 107000, 99000, 103000, 95000, 111000};
            double[] monthlyInvestments = {69000, 70000, 66000, 69000, 74000, 62000};
            
            for (int i = 0; i < months.length; i++) {
                System.out.printf("%s - Exp: ₹%,10.0f | Sav: ₹%,10.0f | Inv: ₹%,10.0f\n",
                    months[i], monthlyExpenses[i], monthlySavings[i], monthlyInvestments[i]);
            }
        } else {
            System.out.println("Weekly Breakdown:");
            System.out.println("─────────────────────────────────────");
            
            String[] weeks = {"Week 1", "Week 2", "Week 3", "Week 4"};
            double[] weeklyExpenses = {7800, 7600, 7900, 7700};
            double[] weeklySavings = {2500, 2700, 2300, 2800};
            double[] weeklyInvestments = {1800, 1750, 1650, 1800};
            
            for (int i = 0; i < weeks.length; i++) {
                System.out.printf("%s - Exp: ₹%,7.0f | Sav: ₹%,7.0f | Inv: ₹%,7.0f\n",
                    weeks[i], weeklyExpenses[i], weeklySavings[i], weeklyInvestments[i]);
            }
        }
    }
    
    private void manageSalary(Scanner scanner) {
        System.out.println("\n========== MANAGE SALARY ==========");
        
        double currentSalary = planningMode.equals("annual") ? user.getAnnualSalary() : user.getMonthlySalary();
        System.out.printf("Current %s Salary: ₹%,.2f\n", 
            planningMode.equals("annual") ? "Annual" : "Monthly", currentSalary);
        
        System.out.print("\nEnter new salary (or 0 to cancel): ₹");
        double newSalary = getDoubleInput(scanner);
        
        if (newSalary > 0) {
            if (planningMode.equals("annual")) {
                user.setAnnualSalary(newSalary);
            } else {
                user.setMonthlySalary(newSalary);
            }
            System.out.println("\n✓ Salary updated successfully!");
        } else {
            System.out.println("\nSalary update cancelled.");
        }
    }
    
    private void manageExtraIncome(Scanner scanner) {
        System.out.println("\n========== MANAGE EXTRA INCOME ==========");
        
        List<ExtraIncome> extras = user.getExtraIncomes(selectedPeriod);
        
        if (!extras.isEmpty()) {
            System.out.println("\nCurrent Extra Income for " + selectedPeriod + ":");
            System.out.println("─────────────────────────────────────");
            for (ExtraIncome income : extras) {
                System.out.println(income);
            }
            System.out.printf("Total: ₹%,.2f\n", user.getTotalExtraIncome(selectedPeriod));
        }
        
        System.out.println("\n1. Add New Extra Income");
        System.out.println("2. Back");
        System.out.print("\nEnter your choice: ");
        
        int choice = getIntInput(scanner);
        
        if (choice == 1) {
            System.out.print("\nDescription (e.g., Bonus, Gift): ");
            String description = scanner.nextLine();
            
            System.out.print("Amount: ₹");
            double amount = getDoubleInput(scanner);
            
            if (amount > 0 && !description.isEmpty()) {
                ExtraIncome newIncome = new ExtraIncome(description, amount, selectedPeriod);
                user.addExtraIncome(newIncome);
                System.out.println("\n✓ Extra income added successfully!");
            }
        }
    }
    
    private void adjustFinancialAllocations(Scanner scanner) {
        System.out.println("\n========== ADJUST FINANCIAL ALLOCATIONS ==========");
        
        System.out.println("\n1. Adjust Expenses");
        System.out.println("2. Adjust Savings");
        System.out.println("3. Adjust Investments");
        System.out.println("4. Back");
        System.out.print("\nEnter your choice: ");
        
        int choice = getIntInput(scanner);
        
        System.out.print("\nEnter new amount: ₹");
        double amount = getDoubleInput(scanner);
        
        if (amount >= 0) {
            if (planningMode.equals("annual")) {
                switch (choice) {
                    case 1: user.setAnnualExpenses(amount); break;
                    case 2: user.setAnnualSavings(amount); break;
                    case 3: user.setAnnualInvestments(amount); break;
                    default: return;
                }
            } else {
                switch (choice) {
                    case 1: user.setMonthlyExpenses(amount); break;
                    case 2: user.setMonthlySavings(amount); break;
                    case 3: user.setMonthlyInvestments(amount); break;
                    default: return;
                }
            }
            System.out.println("\n✓ Allocation updated successfully!");
        }
    }
    
    private void viewAISuggestions() {
        System.out.println("\n========== AI FINANCIAL INSIGHTS ==========\n");
        
        double salary = planningMode.equals("annual") ? user.getAnnualSalary() : user.getMonthlySalary();
        double expenses = planningMode.equals("annual") ? user.getAnnualExpenses() : user.getMonthlyExpenses();
        double savings = planningMode.equals("annual") ? user.getAnnualSavings() : user.getMonthlySavings();
        
        double savingsRate = (savings / salary) * 100;
        
        // AI Suggestion 1: Savings optimization
        System.out.println("💡 SAVINGS OPTIMIZATION");
        if (savingsRate < 20) {
            System.out.println("   Your savings rate is " + String.format("%.1f%%", savingsRate));
            System.out.println("   AI recommends increasing to 20% for better financial security.");
            System.out.println("   Potential savings: ₹" + String.format("%,.2f", (salary * 0.20) - savings));
        } else {
            System.out.println("   Great job! You're saving " + String.format("%.1f%%", savingsRate) + " of your income.");
            System.out.println("   This is above the recommended 20% threshold.");
        }
        
        // AI Suggestion 2: Expense reduction
        System.out.println("\n💡 EXPENSE OPTIMIZATION");
        double expenseRate = (expenses / salary) * 100;
        if (expenseRate > 60) {
            System.out.println("   Your expenses are " + String.format("%.1f%%", expenseRate) + " of income.");
            System.out.println("   AI suggests reviewing discretionary spending.");
            System.out.println("   Target: Reduce to 50-60% of income");
            System.out.println("   Potential savings: ₹" + String.format("%,.2f", expenses - (salary * 0.60)));
        } else {
            System.out.println("   Your expense ratio is healthy at " + String.format("%.1f%%", expenseRate));
        }
        
        // AI Suggestion 3: Investment boost
        System.out.println("\n💡 INVESTMENT SUGGESTION");
        double investments = planningMode.equals("annual") ? user.getAnnualInvestments() : user.getMonthlyInvestments();
        double investmentRate = (investments / salary) * 100;
        System.out.println("   Current investment: " + String.format("%.1f%%", investmentRate) + " of income");
        System.out.println("   Recommended: 15-20% for long-term wealth building");
        if (investmentRate < 15) {
            System.out.println("   Consider investing an additional ₹" + 
                String.format("%,.2f", (salary * 0.15) - investments));
        }
    }
    
    private void viewFinancialGoals() {
        System.out.println("\n========== FINANCIAL GOALS PROGRESS ==========\n");
        
        double expenses = planningMode.equals("annual") ? user.getAnnualExpenses() : user.getMonthlyExpenses();
        double savings = planningMode.equals("annual") ? user.getAnnualSavings() : user.getMonthlySavings();
        double investments = planningMode.equals("annual") ? user.getAnnualInvestments() : user.getMonthlyInvestments();
        double salary = planningMode.equals("annual") ? user.getAnnualSalary() : user.getMonthlySalary();
        
        // Emergency Fund Goal
        double emergencyTarget = planningMode.equals("annual") ? expenses / 2 : expenses * 3;
        System.out.println("📊 Emergency Fund");
        System.out.printf("   Target: ₹%,.2f (%s expenses)\n", 
            emergencyTarget, planningMode.equals("annual") ? "6 months" : "3 months");
        System.out.println("   Progress: [██████████] 100%");
        
        // Investment Goal
        double investmentTarget = salary * 0.15;
        double investmentProgress = (investments / investmentTarget) * 100;
        System.out.println("\n📊 Investment Target (15% of income)");
        System.out.printf("   Target: ₹%,.2f\n", investmentTarget);
        System.out.printf("   Current: ₹%,.2f\n", investments);
        System.out.printf("   Progress: %.0f%%\n", Math.min(100, investmentProgress));
        
        // Savings Goal
        double savingsTarget = salary * 0.20;
        double savingsProgress = (savings / savingsTarget) * 100;
        System.out.println("\n📊 Savings Goal (20% of income)");
        System.out.printf("   Target: ₹%,.2f\n", savingsTarget);
        System.out.printf("   Current: ₹%,.2f\n", savings);
        System.out.printf("   Progress: %.0f%%\n", Math.min(100, savingsProgress));
    }
    
    // Utility methods
    private int getIntInput(Scanner scanner) {
        while (true) {
            try {
                int value = Integer.parseInt(scanner.nextLine());
                return value;
            } catch (NumberFormatException e) {
                System.out.print("Invalid input. Please enter a number: ");
            }
        }
    }
    
    private double getDoubleInput(Scanner scanner) {
        while (true) {
            try {
                double value = Double.parseDouble(scanner.nextLine());
                return value;
            } catch (NumberFormatException e) {
                System.out.print("Invalid input. Please enter a number: ");
            }
        }
    }
    
    private void pressEnterToContinue(Scanner scanner) {
        System.out.print("\nPress Enter to continue...");
        scanner.nextLine();
    }
}
