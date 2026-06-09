"use client";

import { useState, useEffect } from "react";

interface Service {
  id: string;
  name: string;
  icon: string;
  category: string;
  status: 'synced' | 'syncing' | 'error' | 'pending';
  lastSync: string;
  dataSize: string;
  items: number;
  connected: boolean;
}

const initialServices: Service[] = [
  { id: 'google', name: 'Google', icon: '🔍', category: 'cloud', status: 'synced', lastSync: '2 min', dataSize: '45.2 GB', items: 23847, connected: true },
  { id: 'icloud', name: 'iCloud', icon: '☁️', category: 'cloud', status: 'synced', lastSync: '5 min', dataSize: '32.1 GB', items: 18293, connected: true },
  { id: 'dropbox', name: 'Dropbox', icon: '📦', category: 'cloud', status: 'syncing', lastSync: 'En cours', dataSize: '12.8 GB', items: 4521, connected: true },
  { id: 'gmail', name: 'Gmail', icon: '✉️', category: 'email', status: 'synced', lastSync: '1 min', dataSize: '8.4 GB', items: 34521, connected: true },
  { id: 'outlook', name: 'Outlook', icon: '📧', category: 'email', status: 'synced', lastSync: '3 min', dataSize: '2.1 GB', items: 8743, connected: true },
  { id: 'twitter', name: 'X / Twitter', icon: '🐦', category: 'social', status: 'synced', lastSync: '10 min', dataSize: '1.2 GB', items: 12453, connected: true },
  { id: 'instagram', name: 'Instagram', icon: '📷', category: 'social', status: 'error', lastSync: 'Échec', dataSize: '4.8 GB', items: 2341, connected: true },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', category: 'social', status: 'synced', lastSync: '1h', dataSize: '0.3 GB', items: 892, connected: true },
  { id: 'notion', name: 'Notion', icon: '📝', category: 'productivity', status: 'synced', lastSync: '15 min', dataSize: '2.4 GB', items: 1247, connected: true },
  { id: 'slack', name: 'Slack', icon: '💬', category: 'productivity', status: 'syncing', lastSync: 'En cours', dataSize: '5.6 GB', items: 89234, connected: true },
  { id: 'github', name: 'GitHub', icon: '🐙', category: 'dev', status: 'synced', lastSync: '30 min', dataSize: '18.7 GB', items: 342, connected: true },
  { id: 'spotify', name: 'Spotify', icon: '🎵', category: 'media', status: 'synced', lastSync: '2h', dataSize: '0.1 GB', items: 4521, connected: true },
  { id: 'netflix', name: 'Netflix', icon: '🎬', category: 'media', status: 'pending', lastSync: '-', dataSize: '-', items: 0, connected: false },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬', category: 'messaging', status: 'synced', lastSync: '5 min', dataSize: '12.3 GB', items: 145672, connected: true },
  { id: 'telegram', name: 'Telegram', icon: '✈️', category: 'messaging', status: 'synced', lastSync: '2 min', dataSize: '8.9 GB', items: 67234, connected: true },
];

export default function DataVault() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [language, setLanguage] = useState<'en' | 'fr'>('fr');
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [syncAnimation, setSyncAnimation] = useState(false);

  const t = {
    en: {
      title: "DataVault",
      subtitle: "Your Data. Your Control.",
      tagline: "Automatic backup of ALL your online services. Local-first. You own everything.",
      totalData: "Total Data Secured",
      services: "Connected Services",
      lastBackup: "Last Full Backup",
      storage: "Local Storage",
      allCategories: "All",
      cloud: "Cloud",
      email: "Email",
      social: "Social",
      productivity: "Productivity",
      dev: "Development",
      media: "Media",
      messaging: "Messaging",
      syncNow: "Sync All Now",
      syncing: "Syncing...",
      connected: "Connected",
      connect: "Connect",
      lastSync: "Last sync",
      items: "items",
      status: {
        synced: "Synced",
        syncing: "Syncing",
        error: "Error",
        pending: "Not connected"
      },
      features: "Why DataVault?",
      feature1Title: "Never Lose Data Again",
      feature1Desc: "Service shuts down? Account locked? You have everything locally.",
      feature2Title: "True Ownership",
      feature2Desc: "Your data lives on YOUR storage. NAS, external drive, or encrypted cloud.",
      feature3Title: "Privacy First",
      feature3Desc: "All processing happens locally. Your credentials never leave your machine.",
      feature4Title: "One-Click Export",
      feature4Desc: "GDPR export automation. Switch services without losing history.",
      connectService: "Connect Service",
      cancel: "Cancel",
      connectNow: "Connect Now",
      enterCredentials: "Enter your credentials for",
      protectedBy: "Protected by end-to-end encryption",
      viewDetails: "View Details",
      retrySync: "Retry Sync",
    },
    fr: {
      title: "DataVault",
      subtitle: "Vos données. Votre contrôle.",
      tagline: "Backup automatique de TOUS vos services en ligne. Local-first. Vous possédez tout.",
      totalData: "Données sécurisées",
      services: "Services connectés",
      lastBackup: "Dernier backup complet",
      storage: "Stockage local",
      allCategories: "Tout",
      cloud: "Cloud",
      email: "Email",
      social: "Social",
      productivity: "Productivité",
      dev: "Développement",
      media: "Media",
      messaging: "Messagerie",
      syncNow: "Synchroniser tout",
      syncing: "Synchronisation...",
      connected: "Connecté",
      connect: "Connecter",
      lastSync: "Dernière sync",
      items: "éléments",
      status: {
        synced: "Synchronisé",
        syncing: "En cours",
        error: "Erreur",
        pending: "Non connecté"
      },
      features: "Pourquoi DataVault ?",
      feature1Title: "Ne perdez plus jamais de données",
      feature1Desc: "Service fermé ? Compte bloqué ? Vous avez tout en local.",
      feature2Title: "Vraie propriété",
      feature2Desc: "Vos données sur VOTRE stockage. NAS, disque externe, ou cloud chiffré.",
      feature3Title: "Privacy First",
      feature3Desc: "Tout le traitement est local. Vos identifiants ne quittent jamais votre machine.",
      feature4Title: "Export en un clic",
      feature4Desc: "Automatisation RGPD. Changez de service sans perdre l'historique.",
      connectService: "Connecter un service",
      cancel: "Annuler",
      connectNow: "Connecter",
      enterCredentials: "Entrez vos identifiants pour",
      protectedBy: "Protégé par chiffrement de bout en bout",
      viewDetails: "Voir détails",
      retrySync: "Réessayer",
    }
  }[language];

  const categories = [
    { id: 'all', label: t.allCategories },
    { id: 'cloud', label: t.cloud },
    { id: 'email', label: t.email },
    { id: 'social', label: t.social },
    { id: 'productivity', label: t.productivity },
    { id: 'dev', label: t.dev },
    { id: 'media', label: t.media },
    { id: 'messaging', label: t.messaging },
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  const connectedServices = services.filter(s => s.connected).length;
  const totalSize = services.reduce((acc, s) => {
    const size = parseFloat(s.dataSize) || 0;
    return acc + size;
  }, 0).toFixed(1);
  const totalItems = services.reduce((acc, s) => acc + s.items, 0);

  const handleSyncAll = () => {
    setSyncAnimation(true);
    setServices(prev => prev.map(s => 
      s.connected && s.status !== 'error' ? { ...s, status: 'syncing' as const, lastSync: 'En cours' } : s
    ));
    
    setTimeout(() => {
      setServices(prev => prev.map(s => 
        s.status === 'syncing' ? { ...s, status: 'synced' as const, lastSync: '< 1 min' } : s
      ));
      setSyncAnimation(false);
    }, 3000);
  };

  const handleConnect = (service: Service) => {
    setSelectedService(service);
    setShowConnectModal(true);
  };

  const confirmConnect = () => {
    if (selectedService) {
      setServices(prev => prev.map(s => 
        s.id === selectedService.id 
          ? { ...s, connected: true, status: 'syncing' as const, lastSync: 'En cours' }
          : s
      ));
      setShowConnectModal(false);
      
      setTimeout(() => {
        setServices(prev => prev.map(s => 
          s.id === selectedService?.id 
            ? { ...s, status: 'synced' as const, lastSync: '< 1 min', dataSize: '0.5 GB', items: 234 }
            : s
        ));
      }, 2000);
    }
  };

  const statusColors = {
    synced: 'bg-green-500',
    syncing: 'bg-blue-500 animate-pulse',
    error: 'bg-red-500',
    pending: 'bg-slate-500',
  };

  const statusBg = {
    synced: 'bg-green-500/10 text-green-400 border-green-500/30',
    syncing: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    error: 'bg-red-500/10 text-red-400 border-red-500/30',
    pending: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
          className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors"
        >
          {language === 'en' ? '🇫🇷 FR' : '🇬🇧 EN'}
        </button>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-1 mb-4">
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
            <span className="text-emerald-300 text-sm font-medium">Local-First</span>
          </div>
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl text-slate-400 mb-2">{t.subtitle}</p>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">{t.tagline}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
          <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700/50">
            <p className="text-3xl font-bold text-emerald-400">{totalSize} GB</p>
            <p className="text-sm text-slate-400">{t.totalData}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700/50">
            <p className="text-3xl font-bold text-teal-400">{connectedServices}</p>
            <p className="text-sm text-slate-400">{t.services}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700/50">
            <p className="text-3xl font-bold text-cyan-400">Il y a 2h</p>
            <p className="text-sm text-slate-400">{t.lastBackup}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700/50">
            <p className="text-3xl font-bold text-blue-400">78%</p>
            <p className="text-sm text-slate-400">{t.storage}</p>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="max-w-5xl mx-auto">
          {/* Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sync Button */}
            <button
              onClick={handleSyncAll}
              disabled={syncAnimation}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                syncAnimation 
                  ? 'bg-slate-600 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-600'
              }`}
            >
              <svg 
                className={`w-4 h-4 ${syncAnimation ? 'animate-spin' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {syncAnimation ? t.syncing : t.syncNow}
            </button>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {filteredServices.map(service => (
              <div 
                key={service.id}
                className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center text-xl">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs border ${statusBg[service.status]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusColors[service.status]}`}></span>
                        {t.status[service.status]}
                      </div>
                    </div>
                  </div>
                </div>

                {service.connected ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>{t.lastSync}:</span>
                      <span className="text-slate-300">{service.lastSync}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Data:</span>
                      <span className="text-slate-300">{service.dataSize}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>{t.items}:</span>
                      <span className="text-slate-300">{service.items.toLocaleString()}</span>
                    </div>
                    {service.status === 'error' && (
                      <button className="w-full mt-2 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors">
                        {t.retrySync}
                      </button>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={() => handleConnect(service)}
                    className="w-full py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                  >
                    {t.connect}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">{t.features}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '🛡️', title: t.feature1Title, desc: t.feature1Desc },
                { icon: '🏠', title: t.feature2Title, desc: t.feature2Desc },
                { icon: '🔒', title: t.feature3Title, desc: t.feature3Desc },
                { icon: '📤', title: t.feature4Title, desc: t.feature4Desc },
              ].map((feature, i) => (
                <div key={i} className="bg-slate-800/30 rounded-xl p-6 flex gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Storage Visualization */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-8">
            <h3 className="font-semibold mb-4">Storage Breakdown</h3>
            <div className="h-4 bg-slate-700 rounded-full overflow-hidden flex">
              <div className="bg-blue-500 h-full" style={{ width: '30%' }}></div>
              <div className="bg-purple-500 h-full" style={{ width: '20%' }}></div>
              <div className="bg-emerald-500 h-full" style={{ width: '15%' }}></div>
              <div className="bg-orange-500 h-full" style={{ width: '13%' }}></div>
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-500 rounded"></span> Google (30%)</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-purple-500 rounded"></span> iCloud (20%)</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-emerald-500 rounded"></span> GitHub (15%)</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-orange-500 rounded"></span> Messaging (13%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connect Modal */}
      {showConnectModal && selectedService && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-2xl">
                {selectedService.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t.connectService}</h3>
                <p className="text-sm text-slate-400">{selectedService.name}</p>
              </div>
            </div>

            <p className="text-slate-300 mb-4">{t.enterCredentials} {selectedService.name}:</p>

            <div className="space-y-4 mb-6">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-emerald-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
              {t.protectedBy}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConnectModal(false)}
                className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={confirmConnect}
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
              >
                {t.connectNow}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
