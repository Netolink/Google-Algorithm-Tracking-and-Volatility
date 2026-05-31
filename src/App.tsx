/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Globe,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Search,
  ExternalLink,
  ShieldAlert,
  Info,
  TrendingUp,
  Zap,
  Sliders,
  Check
} from 'lucide-react';
import { Language, NormalizedIncident, VolatilityPoint } from './types';
import { translations } from './translations';
import { fetchGoogleIncidents, compileTimeline } from './dataEngine';
import VolatilityChart from './components/VolatilityChart';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [timeframe, setTimeframe] = useState<30 | 90 | 365>(90);
  const [apiState, setApiState] = useState<'loading' | 'proxy1' | 'proxy2' | 'usingLocal' | 'apiSuccess'>('loading');
  const [incidents, setIncidents] = useState<NormalizedIncident[]>([]);
  const [timeline, setTimeline] = useState<VolatilityPoint[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<Record<string, boolean>>({});
  const [expandedIncident, setExpandedIncident] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('');

  // Update dynamic sync timestamp helper
  const updateSyncTimestamp = () => {
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    setLastUpdatedTime(`${utcHours}:${utcMinutes} UTC`);
  };

  // Load and process data
  const loadData = async (forceLang?: Language) => {
    const currentLang = forceLang || lang;
    try {
      const data = await fetchGoogleIncidents(currentLang, setApiState);
      setIncidents(data);
      updateSyncTimestamp();
    } catch (err) {
      console.error('Failed to resolve Google Algorithm data streams:', err);
      setApiState('usingLocal');
      updateSyncTimestamp();
    }
  };

  useEffect(() => {
    loadData();
  }, [lang]);

  // Sync timeline on changes to timeframe or incidents
  useEffect(() => {
    const baseDate = new Date(); // Dynamic real-world target date coordinate context
    const points = compileTimeline(timeframe, incidents, baseDate);
    setTimeline(points);
  }, [timeframe, incidents]);

  // Synchronize dynamic DOM elements for LTR/RTL support
  useEffect(() => {
    const isRtl = lang === 'he';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];
  const isRtl = lang === 'he';

  // State calculations for analytical Overview HUD cards
  const activeTimeline = timeline;
  const lastPoint = activeTimeline[activeTimeline.length - 1];
  const currentVolatility = lastPoint ? lastPoint.metricValue : 0;

  // Average volatility calculation
  const totalVolatility = activeTimeline.reduce((acc, curr) => acc + curr.metricValue, 0);
  const avgVolatility = activeTimeline.length > 0 ? (totalVolatility / activeTimeline.length) : 0;

  // Maximum Volatility point search
  const maxPoint = activeTimeline.reduce((prev, current) => {
    return (prev.metricValue > current.metricValue) ? prev : current;
  }, { metricValue: 0, date: new Date() });

  // Core update events count and standard incidents count inside the active timeframe
  const activeTimeframeIncidents = incidents.filter(inc => {
    const timeframeDaysAgo = new Date(); // Dynamic real-world target date
    timeframeDaysAgo.setDate(timeframeDaysAgo.getDate() - timeframe);
    return new Date(inc.begin) >= timeframeDaysAgo;
  });

  const coreUpdatesCount = activeTimeframeIncidents.filter(i => i.isCoreUpdate).length;
  const standardIncidentsCount = activeTimeframeIncidents.filter(i => !i.isCoreUpdate).length;

  // Determine Overall Status characteristics based on current volatility score
  const getVolatilityLevel = (val: number) => {
    if (val > 60) return {
      statusKey: 'storm',
      color: 'red',
      title: t.volatilityGuide.storm.title.split(' ')[0],
      bg: 'bg-white border-[#EA4335] text-[#EA4335]',
      fill: 'bg-[#EA4335]',
      badge: 'bg-[#EA4335] text-white',
      textColor: 'text-[#EA4335]',
      desc: t.liveStatus.stormDesc
    };
    if (val > 30) return {
      statusKey: 'volatile',
      color: 'yellow',
      title: t.volatilityGuide.volatile.title.split(' ')[0],
      bg: 'bg-white border-[#FBBC05] text-[#B06000]',
      fill: 'bg-[#FBBC05]',
      badge: 'bg-[#FBBC05] text-[#202124]',
      textColor: 'text-[#B06000]',
      desc: t.liveStatus.volatileDesc
    };
    return {
      statusKey: 'calm',
      color: 'green',
      title: t.volatilityGuide.calm.title.split(' ')[0],
      bg: 'bg-white border-[#34A853] text-[#137333]',
      fill: 'bg-[#34A853]',
      badge: 'bg-[#34A853] text-white',
      textColor: 'text-[#137333]',
      desc: t.liveStatus.calmDesc
    };
  };

  const statusObj = getVolatilityLevel(currentVolatility);

  const toggleFaq = (key: string) => {
    setExpandedFaq(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const selectLanguage = (selectedLang: Language) => {
    setLang(selectedLang);
    setIsLangMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#202124] selection:bg-blue-100 font-sans transition-all duration-300">
      
      {/* Top Professional Header Bar */}
      <header className="border-b border-[#DADCE0] bg-white sticky top-0 z-30 shadow-[0_1px_2px_0_rgba(60,64,67,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* Title Block with Brand Elements */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#4285F4] rounded-lg text-white shadow-xs">
                <Activity className="h-5 w-5 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-bold font-heading tracking-tight text-[#202124] leading-tight">
                  {t.title}
                </h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="flex h-2 w-2 relative">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusObj.fill}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${statusObj.fill}`}></span>
                  </span>
                  <span className="text-[10px] font-mono text-[#70757A] font-semibold tracking-wide flex items-center gap-1.5 uppercase">
                    {lang === 'he' ? 'סינכרון רשת פעיל' : lang === 'ru' ? 'СИНХРОНИЗАЦИЯ С СЕТЬЮ' : 'Live Sync Active'}
                    <span className="text-[#DADCE0]">|</span>
                    {t.apiStatus.lastUpdated}: {lastUpdatedTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Language Selection Bar and Refresher */}
            <div className="flex items-center gap-2">
              
              {/* Force Ingestion Refresh */}
              <button 
                onClick={() => loadData()}
                disabled={apiState === 'loading'}
                className="p-2 text-[#5F6368] hover:text-[#202124] hover:bg-[#F8F9FA] border border-[#DADCE0] rounded-lg transition-all text-xs flex items-center gap-1.5 font-medium whitespace-nowrap"
                title={t.apiStatus.refreshBtn}
                id="btn-refresh-data"
              >
                <RefreshCw className={`h-4 w-4 ${apiState === 'loading' ? 'animate-spin text-[#4285F4]' : ''}`} />
                <span className="hidden sm:inline">{t.apiStatus.refreshBtn}</span>
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-[#DADCE0] rounded-lg hover:border-[#9AA0A6] transition-all font-medium text-[#5F6368] shadow-xs"
                  id="btn-language-selector"
                >
                  <Globe className="h-4 w-4 text-[#70757A]" />
                  <span className="hidden sm:inline">{t.langLabel}:</span>
                  <span className="text-[#202124] font-bold uppercase">{lang}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-[#70757A]" />
                </button>

                {/* Dropdown Menu */}
                {isLangMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsLangMenuOpen(false)}></div>
                    <ul className={`absolute z-50 mt-1.5 w-40 bg-white border border-slate-200 rounded-lg shadow-lg py-1 text-sm ${isRtl ? 'left-0' : 'right-0'}`}>
                      <li>
                        <button
                          type="button"
                          onClick={() => selectLanguage('en')}
                          className="w-full flex items-center justify-between px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          <span>English</span>
                          {lang === 'en' && <Check className="h-4 w-4 text-blue-600" />}
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => selectLanguage('he')}
                          className="w-full flex items-center justify-between px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          <span>עברית (RTL)</span>
                          {lang === 'he' && <Check className="h-4 w-4 text-blue-600" />}
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => selectLanguage('ru')}
                          className="w-full flex items-center justify-between px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                        >
                          <span>Русский</span>
                          {lang === 'ru' && <Check className="h-4 w-4 text-blue-600" />}
                        </button>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Core Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        
        {/* Dynamic API Status Indicators */}
        <div className="w-full">
          {apiState === 'loading' && (
            <div className="p-3 bg-white border border-[#DADCE0] border-l-4 border-l-[#4285F4] text-[#202124] rounded-xl text-xs flex items-center gap-3 animate-pulse shadow-xs">
              <RefreshCw className="h-4 w-4 animate-spin text-[#4285F4]" />
              <span className="font-medium text-[#5F6368]">{t.apiStatus.loading}</span>
            </div>
          )}
          {apiState === 'proxy1' && (
            <div className="p-3 bg-white border border-[#DADCE0] border-l-4 border-l-[#FBBC05] text-[#202124] rounded-xl text-xs flex items-center gap-3 shadow-xs">
              <Info className="h-4 w-4 text-[#FBBC05]" />
              <span className="font-medium text-[#5F6368]">{t.apiStatus.proxy1}</span>
            </div>
          )}
          {apiState === 'proxy2' && (
            <div className="p-3 bg-white border border-[#DADCE0] border-l-4 border-l-purple-500 text-[#202124] rounded-xl text-xs flex items-center gap-3 animate-pulse shadow-xs">
              <Zap className="h-4 w-4 text-purple-600 animate-bounce" />
              <span className="font-medium text-[#5F6368]">{t.apiStatus.proxy2}</span>
            </div>
          )}
          {apiState === 'usingLocal' && (
            <div className="p-3 bg-white border border-[#DADCE0] border-l-4 border-l-[#4285F4] text-[#202124] rounded-xl text-xs flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 bg-[#4285F4] rounded-full"></span>
                <span className="font-medium text-[#5F6368]">{t.apiStatus.usingLocal}</span>
              </div>
              <span className="text-[10px] bg-blue-50 text-[#1967D2] px-2 py-0.5 rounded-sm font-semibold select-none border border-[#E8F0FE]">OFFLINE CACHE</span>
            </div>
          )}
          {apiState === 'apiSuccess' && (
            <div className="p-3 bg-white border border-[#DADCE0] border-l-4 border-l-[#34A853] text-[#202124] rounded-xl text-xs flex items-center gap-2 shadow-xs">
              <CheckCircle className="h-4 w-4 text-[#34A853]" />
              <span className="font-medium text-[#5F6368]">{t.apiStatus.apiSuccess}</span>
            </div>
          )}
        </div>

        {/* Dynamic Status Dashboard Header Banner */}
        <section className={`p-6 sm:p-8 rounded-2xl border bg-white shadow-[0_1px_3px_rgba(60,64,67,0.1)] transition-all duration-300 relative overflow-hidden ${
          statusObj.color === 'red' ? 'border-t-[#EA4335] border-t-4 border-[#DADCE0]' : 
          statusObj.color === 'yellow' ? 'border-t-[#FBBC05] border-t-4 border-[#DADCE0]' : 
          'border-t-[#34A853] border-t-4 border-[#DADCE0]'
        }`}>
          
          {/* Subtle Ambient Decorative Wave Background */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial from-slate-100/10 to-transparent pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#70757A] font-bold">
                {t.liveStatus.title}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-heading tracking-tight text-[#202124] flex items-center gap-3">
                <span className={statusObj.textColor}>{statusObj.title}</span>
                <span className="text-[#DADCE0]">/</span>
                <span className="text-[#4285F4] font-mono font-black">{currentVolatility}%</span>
              </h2>
              <p className="text-[#5F6368] text-sm md:text-base max-w-2xl font-light mt-1">
                {statusObj.desc}
              </p>
            </div>

            {/* Glowing Big Badge UI */}
            <div className="flex items-center">
              <div className="flex flex-col items-center justify-center p-5 bg-white border border-[#DADCE0] rounded-2xl shadow-xs text-center min-w-[140px]">
                <div className="relative flex items-center justify-center h-12 w-12 rounded-full bg-[#F8F9FA] border border-[#DADCE0]">
                  <Activity className={`h-6 w-6 ${
                    statusObj.color === 'red' ? 'text-[#EA4335] animate-bounce' : 
                    statusObj.color === 'yellow' ? 'text-[#B06000]' : 'text-[#137333]'
                  }`} />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#70757A] mt-3 tracking-wider uppercase block">
                  {lang === 'he' ? 'מדד נוכחי' : lang === 'ru' ? 'ТЕКУЩИЙ ИНДЕКС' : 'Current Index'}
                </span>
                <span className={`text-2xl font-black font-mono tracking-tight mt-1 ${statusObj.textColor}`}>
                  {currentVolatility}%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Statistical Overview Hud Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="stats-hud">
          
          <div className="bg-white border border-[#DADCE0] rounded-xl p-5 shadow-xs flex items-center gap-4 hover:border-[#9AA0A6] hover:shadow-[0_1px_3px_rgba(60,64,67,0.1)] transition-all">
            <div className="p-3 rounded-lg bg-[#E8F0FE] text-[#1967D2]">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#70757A] font-bold uppercase tracking-wider block">
                {lang === 'he' ? 'ממוצע תנודתיות' : lang === 'ru' ? 'СРЕДНЯЯ ВОЛАТИЛЬНОСТЬ' : 'Average Volatility'}
              </span>
              <span className="text-xl font-bold font-mono text-[#202124] tracking-tight">
                {avgVolatility.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-xl p-5 shadow-xs flex items-center gap-4 hover:border-[#9AA0A6] hover:shadow-[0_1px_3px_rgba(60,64,67,0.1)] transition-all">
            <div className={`p-3 rounded-lg ${
              maxPoint.metricValue > 60 ? 'bg-[#FCE8E6] text-[#A50E0E]' : 'bg-[#FEF7E0] text-[#B06000]'
            }`}>
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#70757A] font-bold uppercase tracking-wider block">
                {lang === 'he' ? 'שיא תנודתיות' : lang === 'ru' ? 'ПИКОВАЯ ВОЛАТИЛЬНОСТЬ' : 'Peak Volatility'}
              </span>
              <span className="text-xl font-bold font-mono text-[#202124] tracking-tight block leading-tight">
                {maxPoint.metricValue}%
              </span>
              <span className="text-[9px] font-mono text-[#70757A] font-medium">
                {maxPoint.date instanceof Date ? maxPoint.date.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'he' ? 'he-IL' : 'ru-RU', { month: 'short', day: 'numeric' }) : ''}
              </span>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-xl p-5 shadow-xs flex items-center gap-4 hover:border-[#9AA0A6] hover:shadow-[0_1px_3px_rgba(60,64,67,0.1)] transition-all">
            <div className="p-3 rounded-lg bg-[#FCE8E6] text-[#A50E0E]">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#70757A] font-bold uppercase tracking-wider block">
                {lang === 'he' ? 'עדכוני ליבה ששוחררו' : lang === 'ru' ? 'ОФИЦИАЛЬНЫЕ ОБНОВЛЕНИЯ' : 'Core Algorithmic Updates'}
              </span>
              <span className="text-xl font-bold font-mono text-[#202124] tracking-tight">
                {coreUpdatesCount} {isRtl ? 'אירועים' : lang === 'ru' ? 'событий' : 'events'}
              </span>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-xl p-5 shadow-xs flex items-center gap-4 hover:border-[#9AA0A6] hover:shadow-[0_1px_3px_rgba(60,64,67,0.1)] transition-all">
            <div className="p-3 rounded-lg bg-[#EAF0F6] text-[#1A73E8]">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#70757A] font-bold uppercase tracking-wider block">
                {lang === 'he' ? 'תקלות זחילה/אינדוקס' : lang === 'ru' ? 'ТЕХНИЧЕСКИЕ СБОИ' : 'System Incidents'}
              </span>
              <span className="text-xl font-bold font-mono text-[#202124] tracking-tight">
                {standardIncidentsCount} {isRtl ? 'תקלות' : lang === 'ru' ? 'багов' : 'alerts'}
              </span>
            </div>
          </div>

        </section>

        {/* Dynamic Chart Dashboard Display */}
        <section className="bg-white border border-[#DADCE0] rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col gap-6" id="chart-section">
          
          {/* Chart Header with Timeframe filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F3F4] pb-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold font-heading text-[#202124] uppercase tracking-wide">
                {lang === 'he' ? 'מגמת תנודות ב-SERP' : lang === 'ru' ? 'Динамика колебаний в SERP' : 'Volatility Index Trend'}
              </h3>
              <p className="text-xs text-[#70757A] font-light select-none">
                {lang === 'he' ? 'טווח הצגה נוכחי' : lang === 'ru' ? 'Показаны данные за' : 'Current display window'}: {timeframe} {lang === 'he' ? 'ימים' : lang === 'ru' ? 'дней' : 'days'}
              </p>
            </div>

            {/* Timeframe selector controls */}
            <div className="flex items-center gap-1 bg-[#F1F3F4] p-1 rounded-xl self-start">
              <button
                onClick={() => setTimeframe(30)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  timeframe === 30 ? 'bg-white text-[#1967D2] shadow-xs' : 'text-[#5F6368] hover:text-[#202124]'
                }`}
                id="btn-timeframe-30"
              >
                {t.timeframes.thirtyDays}
              </button>
              <button
                onClick={() => setTimeframe(90)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  timeframe === 90 ? 'bg-white text-[#1967D2] shadow-xs' : 'text-[#5F6368] hover:text-[#202124]'
                }`}
                id="btn-timeframe-90"
              >
                {t.timeframes.ninetyDays}
              </button>
              <button
                onClick={() => setTimeframe(365)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  timeframe === 365 ? 'bg-white text-[#1967D2] shadow-xs' : 'text-[#5F6368] hover:text-[#202124]'
                }`}
                id="btn-timeframe-365"
              >
                {t.timeframes.year}
              </button>
            </div>
          </div>

          {/* Actual Line Graph Canvas Container */}
          <div className="w-full">
            <VolatilityChart points={timeline} lang={lang} />
          </div>

        </section>

        {/* Reference Levels Cards */}
        <section className="flex flex-col gap-3">
          <div className="flex flex-col mb-1 select-none">
            <h3 className="text-sm font-bold font-heading uppercase text-[#70757A] tracking-wider">
              {t.volatilityGuide.title}
            </h3>
            <p className="text-xs text-[#70757A] font-light">
              {t.volatilityGuide.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="reference-guide">
            
            <div className="p-4 bg-white border border-[#DADCE0] border-l-4 border-l-[#34A853] rounded-xl hover:bg-[#F8F9FA] transition-all flex flex-col gap-2 shadow-xs">
              <span className="text-xs font-bold text-[#137333] bg-[#E6F4EA] px-2 py-0.5 rounded-sm self-start">
                {t.volatilityGuide.calm.title}
              </span>
              <p className="text-xs text-[#5F6368] font-normal leading-relaxed">
                {t.volatilityGuide.calm.desc}
              </p>
            </div>

            <div className="p-4 bg-white border border-[#DADCE0] border-l-4 border-l-[#FBBC05] rounded-xl hover:bg-[#F8F9FA] transition-all flex flex-col gap-2 shadow-xs">
              <span className="text-xs font-bold text-[#B06000] bg-[#FEF7E0] px-2 py-0.5 rounded-sm self-start">
                {t.volatilityGuide.volatile.title}
              </span>
              <p className="text-xs text-[#5F6368] font-normal leading-relaxed">
                {t.volatilityGuide.volatile.desc}
              </p>
            </div>

            <div className="p-4 bg-white border border-[#DADCE0] border-l-4 border-l-[#EA4335] rounded-xl hover:bg-[#F8F9FA] transition-all flex flex-col gap-2 shadow-xs">
              <span className="text-xs font-bold text-[#C5221F] bg-[#FCE8E6] px-2 py-0.5 rounded-sm self-start">
                {t.volatilityGuide.storm.title}
              </span>
              <p className="text-xs text-[#5F6368] font-normal leading-relaxed">
                {t.volatilityGuide.storm.desc}
              </p>
            </div>

          </div>
        </section>

        {/* Official incident Log Data Grid Table */}
        <section className="bg-white border border-[#DADCE0] rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col gap-4" id="log-section">
          <div className="flex flex-col border-b border-[#F1F3F4] pb-3">
            <h3 className="text-base font-bold font-heading text-[#202124] uppercase tracking-wide">
              {t.eventTable.title}
            </h3>
            <p className="text-xs text-[#70757A] font-light">
              {t.eventTable.subtitle}
            </p>
          </div>

          {activeTimeframeIncidents.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center px-4 bg-[#F8F9FA] rounded-xl border border-dashed border-[#DADCE0]">
              <CheckCircle className="h-8 w-8 text-[#34A853] mb-3 animate-pulse" />
              <p className="text-sm font-medium text-[#5F6368] max-w-md">
                {t.eventTable.noEvents}
              </p>
            </div>
          ) : (
            <div className="overflow-hidden border border-[#DADCE0] rounded-xl bg-white shadow-xs">
              
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-[#5F6368]">
                  <thead className="text-[11px] uppercase tracking-wider text-[#70757A] bg-[#F8F9FA] border-b border-[#DADCE0] select-none font-bold">
                    <tr>
                      <th scope="col" className="px-6 py-3.5 w-[180px]">{t.eventTable.colDate}</th>
                      <th scope="col" className="px-6 py-3.5">{t.eventTable.colEvent}</th>
                      <th scope="col" className="px-6 py-3.5 w-[150px]">{t.eventTable.colType}</th>
                      <th scope="col" className="px-6 py-3.5 w-[120px]">{t.eventTable.colStatus}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F3F4] bg-white">
                    {activeTimeframeIncidents.map((inc) => {
                      const serviceLabel = t.services[inc.service as keyof typeof t.services] || inc.service;
                      const currentLocale = lang === 'he' ? 'he-IL' : lang === 'ru' ? 'ru-RU' : 'en-US';
                      const dateRangeStr = inc.end
                        ? `${new Date(inc.begin).toLocaleDateString(currentLocale, { month: 'short', day: 'numeric', year: 'numeric' })} - ${new Date(inc.end).toLocaleDateString(currentLocale, { month: 'short', day: 'numeric', year: 'numeric' })}`
                        : `${new Date(inc.begin).toLocaleDateString(currentLocale, { month: 'short', day: 'numeric', year: 'numeric' })} - ${lang === 'he' ? 'פעיל' : lang === 'ru' ? 'Активно' : 'Active'}`;

                      return (
                        <tr key={inc.id} className="hover:bg-[#F8F9FA]/70 transition-all font-light">
                          <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-[#70757A] font-bold">
                            {dateRangeStr}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <span className="font-semibold text-[#202124] block font-heading">
                                {inc.isCoreUpdate 
                                  ? (lang === 'he' ? 'עדכון ליבה רשמי' : lang === 'ru' ? 'Ротация поискового алгоритма' : 'Google Algorithmic Core Update') 
                                  : serviceLabel}
                              </span>
                              <span className="text-[#5F6368] text-xs text-balance block">
                                {inc.description}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs font-mono">
                            <span className={`px-2 py-1 rounded-md font-semibold select-none ${
                              inc.service === 'Ranking' ? 'bg-[#FCE8E6] text-[#A50E0E] border border-[#FAD2CF]' :
                              inc.service === 'Indexing' ? 'bg-[#E8F0FE] text-[#1967D2] border border-[#D2E3FC]' :
                              'bg-[#FEF7E0] text-[#B06000] border border-[#FEEFC3]'
                            }`}>
                              {serviceLabel}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs">
                            <span className={`inline-flex items-center gap-1.5 font-bold ${
                              inc.status === 'active' ? 'text-[#D93025]' : 'text-[#70757A]'
                            }`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${inc.status === 'active' ? 'bg-[#EA4335] animate-ping' : 'bg-[#9AA0A6]'}`}></span>
                              {inc.status === 'active' ? t.eventTable.statusActive : t.eventTable.statusResolved}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Adaptive Cards View */}
              <div className="md:hidden divide-y divide-[#F1F3F4] bg-white">
                {activeTimeframeIncidents.map((inc) => {
                  const serviceLabel = t.services[inc.service as keyof typeof t.services] || inc.service;
                  const currentLocale = lang === 'he' ? 'he-IL' : lang === 'ru' ? 'ru-RU' : 'en-US';
                  const dateRangeStr = inc.end
                    ? `${new Date(inc.begin).toLocaleDateString(currentLocale, { month: 'short', day: 'numeric' })} - ${new Date(inc.end).toLocaleDateString(currentLocale, { month: 'short', day: 'numeric', year: 'numeric' })}`
                    : `${new Date(inc.begin).toLocaleDateString(currentLocale, { month: 'short', day: 'numeric' })} - ${lang === 'he' ? 'פעיל' : lang === 'ru' ? 'Активно' : 'Active'}`;

                  return (
                    <div key={inc.id} className="p-4 flex flex-col gap-3 hover:bg-[#F8F9FA]/50">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-mono text-[#70757A] font-bold">
                            {dateRangeStr}
                          </span>
                          <span className="font-bold text-[#202124] mt-0.5 text-sm font-heading">
                            {inc.isCoreUpdate 
                              ? (lang === 'he' ? 'עדכון ליבה רשמי' : lang === 'ru' ? 'Ротация поискового алгоритма' : 'Core Update') 
                              : serviceLabel}
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold select-none ${
                          inc.service === 'Ranking' ? 'bg-[#FCE8E6] text-[#A50E0E] border border-[#FAD2CF]' :
                          inc.service === 'Indexing' ? 'bg-[#E8F0FE] text-[#1967D2] border border-[#D2E3FC]' :
                          'bg-[#FEF7E0] text-[#B06000] border border-[#FEEFC3]'
                        }`}>
                          {serviceLabel}
                        </span>
                      </div>

                      <p className="text-xs text-[#5F6368] leading-relaxed text-balance">
                        {inc.description}
                      </p>

                      <div className="flex items-center justify-between border-t border-[#F1F3F4] pt-2 text-[11px]">
                        <span className="text-[#70757A] font-mono">ID: {inc.id.substring(0, 15)}</span>
                        <span className={`inline-flex items-center gap-1.5 font-bold ${
                          inc.status === 'active' ? 'text-[#D93025]' : 'text-[#70757A]'
                        }`}>
                          <span className={`h-1 w-1 bg-current rounded-full ${inc.status === 'active' ? 'animate-ping' : ''}`}></span>
                          {inc.status === 'active' ? t.eventTable.statusActive : t.eventTable.statusResolved}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </section>

        {/* SEO Educational & FAQ Accordion Section */}
        <section className="bg-white border border-[#DADCE0] rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col gap-6" id="faq-section">
          <div className="flex flex-col border-b border-[#F1F3F4] pb-3">
            <h3 className="text-base font-bold font-heading text-[#202124] uppercase tracking-wide">
              {t.faq.title}
            </h3>
            <p className="text-xs text-[#70757A] font-light">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((num) => {
              const qKey = `q${num}` as keyof typeof t.faq;
              const aKey = `a${num}` as keyof typeof t.faq;
              const qText = t.faq[qKey];
              const aText = t.faq[aKey];
              const isOpen = expandedFaq[num] || false;

              return (
                <div 
                  key={num} 
                  className="border border-[#DADCE0] rounded-xl overflow-hidden hover:border-[#9AA0A6] transition-all bg-white shadow-3xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(String(num))}
                    className="w-full flex items-center justify-between p-4 text-left rtl:text-right font-medium text-[#202124] text-sm md:text-base outline-none hover:bg-[#F8F9FA]/60"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="h-4.5 w-4.5 text-[#4285F4] shrink-0" />
                      <span className="font-semibold text-[#202124] text-balance leading-tight">{qText}</span>
                    </span>
                    {isOpen 
                      ? <ChevronUp className="h-4 w-4 text-[#70757A] shrink-0" /> 
                      : <ChevronDown className="h-4 w-4 text-[#70757A] shrink-0" />
                    }
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 pb-4 pt-4 text-[#5F6368] text-xs md:text-sm font-light leading-relaxed border-t border-[#F1F3F4] bg-[#F8F9FA]">
                          {aText}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Elegant informative Footer */}
      <footer className="bg-white border-t border-[#DADCE0] mt-20 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#70757A] font-medium">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#4285F4]"></span>
            <span>
              {t.footer.toolName} {t.footer.by}{' '}
              <a
                href="https://netolink.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4285F4] hover:underline"
              >
                Netolink
              </a>
            </span>
          </div>
          <div className="flex items-center gap-4 text-[#70757A]">
            <span>{t.footer.copyright} {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
