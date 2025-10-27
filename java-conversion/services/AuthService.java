package services;

import models.User;
import java.util.*;

/**
 * AuthService - Handles user authentication and session management
 * Equivalent to AuthContext.tsx in the React app
 */
public class AuthService {
    private static AuthService instance;
    private List<User> users;
    private User currentUser;
    private boolean isAuthenticated;
    
    private AuthService() {
        this.users = new ArrayList<>();
        this.currentUser = null;
        this.isAuthenticated = false;
        initializeDemoData();
    }
    
    public static AuthService getInstance() {
        if (instance == null) {
            instance = new AuthService();
        }
        return instance;
    }
    
    private void initializeDemoData() {
        // Create a demo user for testing
        User demoUser = new User("demo@finwise.com", "Rahul Sharma", "password123");
        demoUser.setPhone("+91 98765 43210");
        users.add(demoUser);
    }
    
    /**
     * Sign in with email and password
     */
    public boolean signIn(String email, String password) throws Exception {
        // Simulate API delay
        Thread.sleep(500);
        
        for (User user : users) {
            if (user.getEmail().equals(email) && user.authenticate(password)) {
                this.currentUser = user;
                this.isAuthenticated = true;
                return true;
            }
        }
        
        throw new Exception("Invalid credentials. Please check your email and password.");
    }
    
    /**
     * Sign up new user
     */
    public boolean signUp(String email, String fullName, String password, String phone) throws Exception {
        // Simulate API delay
        Thread.sleep(500);
        
        // Check if email already exists
        for (User user : users) {
            if (user.getEmail().equals(email)) {
                throw new Exception("Email already registered. Please use a different email.");
            }
        }
        
        // Create new user
        User newUser = new User(email, fullName, password);
        if (phone != null && !phone.isEmpty()) {
            newUser.setPhone(phone);
        }
        
        users.add(newUser);
        this.currentUser = newUser;
        this.isAuthenticated = true;
        
        return true;
    }
    
    /**
     * Sign out current user
     */
    public void signOut() {
        this.currentUser = null;
        this.isAuthenticated = false;
    }
    
    /**
     * Forgot password (mock implementation)
     */
    public void forgotPassword(String email) throws Exception {
        // Simulate API delay
        Thread.sleep(500);
        
        boolean userExists = false;
        for (User user : users) {
            if (user.getEmail().equals(email)) {
                userExists = true;
                break;
            }
        }
        
        if (!userExists) {
            throw new Exception("Email not found in our records.");
        }
        
        System.out.println("Password reset email sent to: " + email);
    }
    
    /**
     * Get current user
     */
    public User getCurrentUser() {
        return currentUser;
    }
    
    /**
     * Check if user is authenticated
     */
    public boolean isAuthenticated() {
        return isAuthenticated;
    }
    
    /**
     * Get all users (for debugging)
     */
    public List<User> getAllUsers() {
        return new ArrayList<>(users);
    }
}
