package services;

import java.util.*;

/**
 * LanguageService - Handles internationalization and translations
 * Equivalent to LanguageContext.tsx in the React app
 */
public class LanguageService {
    private static LanguageService instance;
    private String currentLanguage;
    private Map<String, Map<String, String>> translations;
    private List<Language> supportedLanguages;
    
    private LanguageService() {
        this.currentLanguage = "en";
        this.translations = new HashMap<>();
        this.supportedLanguages = new ArrayList<>();
        initializeTranslations();
        initializeLanguages();
    }
    
    public static LanguageService getInstance() {
        if (instance == null) {
            instance = new LanguageService();
        }
        return instance;
    }
    
    private void initializeLanguages() {
        supportedLanguages.add(new Language("en", "English", "English"));
        supportedLanguages.add(new Language("hi", "Hindi", "हिन्दी"));
        supportedLanguages.add(new Language("gu", "Gujarati", "ગુજરાતી"));
        supportedLanguages.add(new Language("te", "Telugu", "తెలుగు"));
        supportedLanguages.add(new Language("ta", "Tamil", "தமிழ்"));
        supportedLanguages.add(new Language("bn", "Bengali", "বাংলা"));
        supportedLanguages.add(new Language("mr", "Marathi", "मराठी"));
        supportedLanguages.add(new Language("zh", "Chinese", "中文"));
        supportedLanguages.add(new Language("es", "Spanish", "Español"));
        supportedLanguages.add(new Language("fr", "French", "Français"));
        supportedLanguages.add(new Language("ar", "Arabic", "العربية"));
        supportedLanguages.add(new Language("pt", "Portuguese", "Português"));
        supportedLanguages.add(new Language("ru", "Russian", "Русский"));
        supportedLanguages.add(new Language("ja", "Japanese", "日本語"));
        supportedLanguages.add(new Language("ko", "Korean", "한국어"));
        supportedLanguages.add(new Language("de", "German", "Deutsch"));
    }
    
    private void initializeTranslations() {
        // English translations
        Map<String, String> en = new HashMap<>();
        en.put("app.title", "FinWise");
        en.put("app.tagline", "Invest and finance wisely");
        en.put("auth.signin", "Sign In");
        en.put("auth.signup", "Sign Up");
        en.put("auth.email", "Email");
        en.put("auth.password", "Password");
        en.put("auth.fullName", "Full Name");
        en.put("auth.phone", "Phone Number");
        en.put("auth.welcome", "Welcome to FinWise");
        en.put("nav.wallet", "Wallet");
        en.put("nav.ecoplanning", "EcoPlanning");
        en.put("nav.settings", "Settings");
        en.put("common.menu", "Menu");
        en.put("common.loading", "Loading...");
        en.put("common.add", "Add");
        en.put("common.save", "Save");
        en.put("common.cancel", "Cancel");
        translations.put("en", en);
        
        // Hindi translations
        Map<String, String> hi = new HashMap<>();
        hi.put("app.title", "फिनवाइज");
        hi.put("app.tagline", "समझदारी से निवेश और वित्त प्रबंधन करें");
        hi.put("auth.signin", "साइन इन करें");
        hi.put("auth.signup", "साइन अप करें");
        hi.put("auth.email", "ईमेल");
        hi.put("auth.password", "पासवर्ड");
        hi.put("auth.fullName", "पूरा नाम");
        hi.put("auth.phone", "फोन नंबर");
        hi.put("auth.welcome", "फिनवाइज में आपका स्वागत है");
        hi.put("nav.wallet", "वॉलेट");
        hi.put("nav.ecoplanning", "इकोप्लानिंग");
        hi.put("nav.settings", "सेटिंग्स");
        hi.put("common.menu", "मेनू");
        hi.put("common.loading", "लोड हो रहा है...");
        hi.put("common.add", "जोड़ें");
        hi.put("common.save", "सहेजें");
        hi.put("common.cancel", "रद्द करें");
        translations.put("hi", hi);
        
        // Gujarati translations
        Map<String, String> gu = new HashMap<>();
        gu.put("app.title", "ફિનવાઇઝ");
        gu.put("app.tagline", "સમજદારીથી રોકાણ અને નાણાં વ્યવસ્થાપન");
        gu.put("auth.signin", "સાઇન ઇન કરો");
        gu.put("auth.signup", "સાઇન અપ કરો");
        gu.put("auth.email", "ઇમેઇલ");
        gu.put("auth.password", "પાસવર્ડ");
        gu.put("auth.fullName", "પૂરું નામ");
        gu.put("auth.phone", "ફોન નંબર");
        gu.put("auth.welcome", "ફિનવાઇઝમાં આપનું સ્વાગત છે");
        gu.put("nav.wallet", "વૉલેટ");
        gu.put("nav.ecoplanning", "ઇકોપ્લાનિંગ");
        gu.put("nav.settings", "સેટિંગ્સ");
        gu.put("common.menu", "મેનૂ");
        gu.put("common.loading", "લોડ થઈ રહ્યું છે...");
        gu.put("common.add", "ઉમેરો");
        gu.put("common.save", "સેવ કરો");
        gu.put("common.cancel", "રદ કરો");
        translations.put("gu", gu);
    }
    
    /**
     * Get translation for a key
     */
    public String t(String key) {
        Map<String, String> languageMap = translations.get(currentLanguage);
        if (languageMap != null && languageMap.containsKey(key)) {
            return languageMap.get(key);
        }
        
        // Fallback to English
        Map<String, String> englishMap = translations.get("en");
        if (englishMap != null && englishMap.containsKey(key)) {
            return englishMap.get(key);
        }
        
        // Return key if translation not found
        return key;
    }
    
    /**
     * Set current language
     */
    public void setLanguage(String languageCode) {
        if (translations.containsKey(languageCode)) {
            this.currentLanguage = languageCode;
        }
    }
    
    /**
     * Get current language
     */
    public String getCurrentLanguage() {
        return currentLanguage;
    }
    
    /**
     * Get list of supported languages
     */
    public List<Language> getSupportedLanguages() {
        return new ArrayList<>(supportedLanguages);
    }
    
    /**
     * Inner class for Language
     */
    public static class Language {
        private String code;
        private String name;
        private String nativeName;
        
        public Language(String code, String name, String nativeName) {
            this.code = code;
            this.name = name;
            this.nativeName = nativeName;
        }
        
        public String getCode() { return code; }
        public String getName() { return name; }
        public String getNativeName() { return nativeName; }
        
        @Override
        public String toString() {
            return String.format("%s (%s)", nativeName, name);
        }
    }
}
