package models;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * ExtraIncome Model - Represents additional income like bonuses, gifts, etc.
 */
public class ExtraIncome {
    private String id;
    private double amount;
    private String description;
    private LocalDate date;
    private String period; // Year or month period (e.g., "2024" or "January 2024")
    
    public ExtraIncome(String description, double amount, String period) {
        this.id = String.valueOf(System.currentTimeMillis());
        this.description = description;
        this.amount = amount;
        this.period = period;
        this.date = LocalDate.now();
    }
    
    public ExtraIncome(String description, double amount, String period, LocalDate date) {
        this.id = String.valueOf(System.currentTimeMillis());
        this.description = description;
        this.amount = amount;
        this.period = period;
        this.date = date;
    }
    
    public String getId() { return id; }
    public double getAmount() { return amount; }
    public String getDescription() { return description; }
    public LocalDate getDate() { return date; }
    public String getPeriod() { return period; }
    
    @Override
    public String toString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy");
        return String.format("%s - ₹%.2f (%s) [%s]", 
            description, amount, date.format(formatter), period);
    }
}
