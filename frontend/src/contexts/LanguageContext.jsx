import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Header
    signIn: 'Sign In',
    logout: 'Logout',
    welcome: 'Welcome',
    // Auth
    welcomeBack: 'Welcome Back',
    createAccount: 'Create Account',
    signInToAccount: 'Sign in to your account',
    startShortening: 'Start shortening your links today',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    loading: 'Loading...',
    dontHaveAccount: "Don't have an account? Sign up",
    alreadyHaveAccount: 'Already have an account? Sign in',
    // Dashboard
    totalUrls: 'Total URLs',
    totalClicks: 'Total Clicks',
    plan: 'Plan',
    upgrade: 'Upgrade',
    manageSubscription: 'Manage Subscription',
    createShortUrl: 'Create Short URL',
    myLinks: 'My Links',
    settings: 'Settings',
    help: 'Help & Support',
    // Common
    create: 'Create',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    close: 'Close',
    search: 'Search',
    // URL Form
    longUrl: 'Long URL',
    customAlias: 'Custom Alias (optional)',
    title: 'Title (optional)',
    urlCreated: 'URL created successfully!',
    urlDeleted: 'URL deleted',
    // Errors
    connectionFailed: 'Connection failed. Check if backend is running.',
    failedToCreate: 'Failed to create URL',
    failedToDelete: 'Failed to delete URL'
  },
  ne: {
    // Header
    signIn: 'साइन इन',
    logout: 'लगआउट',
    welcome: 'स्वागत छ',
    // Auth
    welcomeBack: 'फेरि स्वागत छ',
    createAccount: 'खाता बनाउनुहोस्',
    signInToAccount: 'तपाईंको खातामा साइन इन गर्नुहोस्',
    startShortening: 'आजै आफ्ना लिंकहरू छोटो बनाउनुहोस्',
    name: 'नाम',
    email: 'इमेल',
    password: 'पासवर्ड',
    loading: 'लोड हुँदैछ...',
    dontHaveAccount: 'खाता छैन? साइन अप गर्नुहोस्',
    alreadyHaveAccount: 'पहिले नै खाता छ? साइन इन गर्नुहोस्',
    // Dashboard
    totalUrls: 'कुल URL',
    totalClicks: 'कुल क्लिक',
    plan: 'योजना',
    upgrade: 'अपग्रेड',
    manageSubscription: 'सदस्यता व्यवस्थापन',
    createShortUrl: 'छोटो URL बनाउनुहोस्',
    myLinks: 'मेरा लिंकहरू',
    settings: 'सेटिङहरू',
    help: 'सहायता र समर्थन',
    // Common
    create: 'बनाउनुहोस्',
    cancel: 'रद्द गर्नुहोस्',
    delete: 'मेटाउनुहोस्',
    edit: 'सम्पादन गर्नुहोस्',
    save: 'बचत गर्नुहोस्',
    close: 'बन्द गर्नुहोस्',
    search: 'खोज्नुहोस्',
    // URL Form
    longUrl: 'लामो URL',
    customAlias: 'कस्टम उपनाम (वैकल्पिक)',
    title: 'शीर्षक (वैकल्पिक)',
    urlCreated: 'URL सफलतापूर्वक बनाइयो!',
    urlDeleted: 'URL मेटाइयो',
    // Errors
    connectionFailed: 'कनेक्शन असफल। ब्याकएन्ड चलिरहेको छ/छैन जाँच गर्नुहोस्।',
    failedToCreate: 'URL बनाउन असफल',
    failedToDelete: 'URL मेटाउन असफल'
  },
  de: {
    // Header
    signIn: 'Anmelden',
    logout: 'Abmelden',
    welcome: 'Willkommen',
    // Auth
    welcomeBack: 'Willkommen zurück',
    createAccount: 'Konto erstellen',
    signInToAccount: 'Bei Ihrem Konto anmelden',
    startShortening: 'Beginnen Sie heute mit der Verkürzung Ihrer Links',
    name: 'Name',
    email: 'E-Mail',
    password: 'Passwort',
    loading: 'Lädt...',
    dontHaveAccount: 'Noch kein Konto? Registrieren',
    alreadyHaveAccount: 'Bereits ein Konto? Anmelden',
    // Dashboard
    totalUrls: 'Gesamt URLs',
    totalClicks: 'Gesamt Klicks',
    plan: 'Plan',
    upgrade: 'Upgrade',
    manageSubscription: 'Abonnement verwalten',
    createShortUrl: 'Kurze URL erstellen',
    myLinks: 'Meine Links',
    settings: 'Einstellungen',
    help: 'Hilfe & Support',
    // Common
    create: 'Erstellen',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    save: 'Speichern',
    close: 'Schließen',
    search: 'Suchen',
    // URL Form
    longUrl: 'Lange URL',
    customAlias: 'Benutzerdefinierter Alias (optional)',
    title: 'Titel (optional)',
    urlCreated: 'URL erfolgreich erstellt!',
    urlDeleted: 'URL gelöscht',
    // Errors
    connectionFailed: 'Verbindung fehlgeschlagen. Prüfen Sie, ob das Backend läuft.',
    failedToCreate: 'URL konnte nicht erstellt werden',
    failedToDelete: 'URL konnte nicht gelöscht werden'
  },
  hi: {
    // Header
    signIn: 'साइन इन',
    logout: 'लॉग आउट',
    welcome: 'स्वागत है',
    // Auth
    welcomeBack: 'वापस स्वागत है',
    createAccount: 'खाता बनाएं',
    signInToAccount: 'अपने खाते में साइन इन करें',
    startShortening: 'आज ही अपने लिंक्स को छोटा करना शुरू करें',
    name: 'नाम',
    email: 'ईमेल',
    password: 'पासवर्ड',
    loading: 'लोड हो रहा है...',
    dontHaveAccount: 'खाता नहीं है? साइन अप करें',
    alreadyHaveAccount: 'पहले से खाता है? साइन इन करें',
    // Dashboard
    totalUrls: 'कुल URL',
    totalClicks: 'कुल क्लिक्स',
    plan: 'प्लान',
    upgrade: 'अपग्रेड',
    manageSubscription: 'सब्सक्रिप्शन प्रबंधन',
    createShortUrl: 'छोटा URL बनाएं',
    myLinks: 'मेरे लिंक्स',
    settings: 'सेटिंग्स',
    help: 'सहायता और समर्थन',
    // Common
    create: 'बनाएं',
    cancel: 'रद्द करें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    save: 'सेव करें',
    close: 'बंद करें',
    search: 'खोजें',
    // URL Form
    longUrl: 'लंबा URL',
    customAlias: 'कस्टम एलियास (वैकल्पिक)',
    title: 'शीर्षक (वैकल्पिक)',
    urlCreated: 'URL सफलतापूर्वक बनाया गया!',
    urlDeleted: 'URL हटाया गया',
    // Errors
    connectionFailed: 'कनेक्शन असफल। जांचें कि बैकएंड चल रहा है या नहीं।',
    failedToCreate: 'URL बनाने में असफल',
    failedToDelete: 'URL हटाने में असफल'
  },
  fr: {
    // Header
    signIn: 'Se connecter',
    logout: 'Se déconnecter',
    welcome: 'Bienvenue',
    // Auth
    welcomeBack: 'Bon retour',
    createAccount: 'Créer un compte',
    signInToAccount: 'Se connecter à votre compte',
    startShortening: 'Commencez à raccourcir vos liens aujourd\'hui',
    name: 'Nom',
    email: 'E-mail',
    password: 'Mot de passe',
    loading: 'Chargement...',
    dontHaveAccount: 'Pas de compte? S\'inscrire',
    alreadyHaveAccount: 'Déjà un compte? Se connecter',
    // Dashboard
    totalUrls: 'Total URLs',
    totalClicks: 'Total clics',
    plan: 'Plan',
    upgrade: 'Mettre à niveau',
    manageSubscription: 'Gérer l\'abonnement',
    createShortUrl: 'Créer une URL courte',
    myLinks: 'Mes liens',
    settings: 'Paramètres',
    help: 'Aide et support',
    // Common
    create: 'Créer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    save: 'Enregistrer',
    close: 'Fermer',
    search: 'Rechercher',
    // URL Form
    longUrl: 'URL longue',
    customAlias: 'Alias personnalisé (optionnel)',
    title: 'Titre (optionnel)',
    urlCreated: 'URL créée avec succès!',
    urlDeleted: 'URL supprimée',
    // Errors
    connectionFailed: 'Connexion échouée. Vérifiez si le backend fonctionne.',
    failedToCreate: 'Échec de la création de l\'URL',
    failedToDelete: 'Échec de la suppression de l\'URL'
  },
  es: {
    // Header
    signIn: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    welcome: 'Bienvenido',
    // Auth
    welcomeBack: 'Bienvenido de nuevo',
    createAccount: 'Crear cuenta',
    signInToAccount: 'Iniciar sesión en su cuenta',
    startShortening: 'Comience a acortar sus enlaces hoy',
    name: 'Nombre',
    email: 'Correo electrónico',
    password: 'Contraseña',
    loading: 'Cargando...',
    dontHaveAccount: '¿No tiene cuenta? Registrarse',
    alreadyHaveAccount: '¿Ya tiene cuenta? Iniciar sesión',
    // Dashboard
    totalUrls: 'Total URLs',
    totalClicks: 'Total clics',
    plan: 'Plan',
    upgrade: 'Actualizar',
    manageSubscription: 'Gestionar suscripción',
    createShortUrl: 'Crear URL corta',
    myLinks: 'Mis enlaces',
    settings: 'Configuración',
    help: 'Ayuda y soporte',
    // Common
    create: 'Crear',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    save: 'Guardar',
    close: 'Cerrar',
    search: 'Buscar',
    // URL Form
    longUrl: 'URL larga',
    customAlias: 'Alias personalizado (opcional)',
    title: 'Título (opcional)',
    urlCreated: '¡URL creada exitosamente!',
    urlDeleted: 'URL eliminada',
    // Errors
    connectionFailed: 'Conexión fallida. Verifique si el backend está funcionando.',
    failedToCreate: 'Error al crear URL',
    failedToDelete: 'Error al eliminar URL'
  },
  ja: {
    // Header
    signIn: 'サインイン',
    logout: 'ログアウト',
    welcome: 'ようこそ',
    // Auth
    welcomeBack: 'おかえりなさい',
    createAccount: 'アカウント作成',
    signInToAccount: 'アカウントにサインイン',
    startShortening: '今日からリンクを短縮しましょう',
    name: '名前',
    email: 'メール',
    password: 'パスワード',
    loading: '読み込み中...',
    dontHaveAccount: 'アカウントをお持ちでないですか？サインアップ',
    alreadyHaveAccount: 'すでにアカウントをお持ちですか？サインイン',
    // Dashboard
    totalUrls: '総URL数',
    totalClicks: '総クリック数',
    plan: 'プラン',
    upgrade: 'アップグレード',
    manageSubscription: 'サブスクリプション管理',
    createShortUrl: '短縮URLを作成',
    myLinks: 'マイリンク',
    settings: '設定',
    help: 'ヘルプとサポート',
    // Common
    create: '作成',
    cancel: 'キャンセル',
    delete: '削除',
    edit: '編集',
    save: '保存',
    close: '閉じる',
    search: '検索',
    // URL Form
    longUrl: '長いURL',
    customAlias: 'カスタムエイリアス（オプション）',
    title: 'タイトル（オプション）',
    urlCreated: 'URLが正常に作成されました！',
    urlDeleted: 'URLが削除されました',
    // Errors
    connectionFailed: '接続に失敗しました。バックエンドが動作しているか確認してください。',
    failedToCreate: 'URLの作成に失敗しました',
    failedToDelete: 'URLの削除に失敗しました'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
