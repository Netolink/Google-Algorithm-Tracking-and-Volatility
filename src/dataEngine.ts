/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language, NormalizedIncident, ServicesKeys, VolatilityPoint } from './types';

// Structured offline high-fidelity local database representing major Google incidents and Core Updates (2025 - 2026)
export interface OfflineIncident {
  id: string;
  service: ServicesKeys;
  begin: string; // ISO Date String
  end: string | null; // ISO Date String
  isCoreUpdate: boolean;
  descriptions: {
    en: string;
    he: string;
    ru: string;
  };
}

export const OFFLINE_INCIDENTS: OfflineIncident[] = [
  {
    id: 'wdAXJk6LRRihEjpzEeWE',
    service: 'Ranking',
    begin: '2026-05-21T15:40:00+00:00',
    end: null,
    isCoreUpdate: true,
    descriptions: {
      en: 'May 2026 core update: Released the May 2026 core update. The rollout may take up to 2 weeks to complete.',
      he: 'עדכון ליבה מאי 2026: שוחרר עדכון הליבה של מאי 2026. פריסת העדכון עשויה להמשך עד שבועיים.',
      ru: 'Обновление основного алгоритма за май 2026 года: Выпущено основное обновление за май 2026 года. Развертывание может занять до 2 недель.'
    }
  },
  {
    id: '7eTbAa2jWdToLkraZj5y',
    service: 'Ranking',
    begin: '2026-03-27T09:00:00+00:00',
    end: '2026-04-08T13:00:00+00:00',
    isCoreUpdate: true,
    descriptions: {
      en: 'March 2026 core update: Released the March 2026 core update. The rollout was complete as of April 8, 2026.',
      he: 'עדכון ליבה מרץ 2026: שוחרר עדכון הליבה של מרץ 2026. הפריסה הושלמה ב-8 באפריל 2026.',
      ru: 'Обновление основного алгоритма за март 2026 года: Выпущено основное обновление за март 2026 года. Развертывание завершено 8 апреля 2026 года.'
    }
  },
  {
    id: 'VbnSXAH4SmEcxPtx4YSD',
    service: 'Ranking',
    begin: '2026-03-24T19:00:00+00:00',
    end: '2026-03-25T14:30:00+00:00',
    isCoreUpdate: true,
    descriptions: {
      en: 'March 2026 spam update: Released the March 2026 spam update. The rollout was complete as of March 25, 2026.',
      he: 'עדכון ספאם מרץ 2026: שוחרר עדכון הספאם של מרץ 2026. הפריסה הושלמה ב-25 במרץ 2026.',
      ru: 'Обновление алгоритма борьбы со спамом за март 2026 года: Выпущено обновление борьбы со спамом за март 2026 года. Развертывание завершено 25 марта 2026 года.'
    }
  },
  {
    id: 'TZF4pLmbzFdoBPP6o3iv',
    service: 'Serving',
    begin: '2026-02-25T03:55:00+00:00',
    end: '2026-02-25T04:10:00+00:00',
    isCoreUpdate: false,
    descriptions: {
      en: 'Serving experienced an issue with serving search results. The issue was quickly resolved.',
      he: 'תקלת הגשה: מערכת ההגשה חוותה תקלה קלה בזמינות התוצאות. התקלה תוקנה במהירות.',
      ru: 'Проблема с обслуживанием в Google Search. Проблема с отдачей результатов поиска устранена.'
    }
  },
  {
    id: 'mYbNTqV1ytDc2fA8hUz4',
    service: 'Ranking',
    begin: '2026-02-05T17:00:00+00:00',
    end: '2026-02-27T10:00:00+00:00',
    isCoreUpdate: true,
    descriptions: {
      en: 'February 2026 Discover update: Released the February 2026 Discover core update for English language users in the US. The rollout was complete as of February 27, 2026.',
      he: 'עדכון דיסקבר פברואר 2026: שוחרר עדכון דיסקבר פברואר 2026 לשיפור איכות המלצות התוכן בפיד.',
      ru: 'Обновление Discover за февраль 2026 года: Выпущено обновление алгоритма рекомендаций Discover. Развертывание завершено 27 февраля 2026 года.'
    }
  },
  {
    id: 'DsirqJ1gpPRgVQeccPRv',
    service: 'Ranking',
    begin: '2025-12-11T17:25:00+00:00',
    end: '2025-12-29T19:00:00+00:00',
    isCoreUpdate: true,
    descriptions: {
      en: 'December 2025 core update: Released the December 2025 core update. The rollout was complete as of December 29, 2025.',
      he: 'עדכון ליבה דצמבר 2025: שוחרר עדכון הליבה של דצמבר 2025. הפריסה הושלמה ב-29 בדצמבר 2025.',
      ru: 'Обновление основного алгоритма за декабрь 2025 года: Выпущено основное обновление за декабрь 2025 года. Развертывание завершено 29 декабря 2025 года.'
    }
  },
  {
    id: 'pW6WN7Ymo49q7z8pKk9w',
    service: 'Serving',
    begin: '2025-10-03T20:00:00+00:00',
    end: '2025-10-06T20:40:00+00:00',
    isCoreUpdate: false,
    descriptions: {
      en: 'Serving experienced an issue. There was an ongoing data center issue that impacted serving of some pages in some locales.',
      he: 'תקלת הגשה: תקלת מרכז נתונים מתמשכת שהשפיעה על הגשת עמודים במספר מיקומים. נפתרה ב-6 באוקטובר 2025.',
      ru: 'Проблема с обслуживанием: Проблема с дата-центром повлияла на отдачу страниц в некоторых регионах. Устранено 6 октября 2025 года.'
    }
  },
  {
    id: 'a7Aainy6E9rZsmfq82xt',
    service: 'Ranking',
    begin: '2025-08-26T16:00:00+00:00',
    end: '2025-09-22T07:00:00+00:00',
    isCoreUpdate: true,
    descriptions: {
      en: 'August 2025 spam update: Released the August 2025 spam update. The rollout was complete as of September 22, 2025.',
      he: 'עדכון ספאם אוגוסט 2025: שוחרר עדכון הספאם של אוגוסט 2025. הפריסה הושלמה ב-22 בספטמבר 2025.',
      ru: 'Обновление алгоритма борьбы со спамом за август 2025 года: Выпущено обновление борьбы со спамом за август 2025 года. Развертывание завершено 22 сентября 2025 года.'
    }
  },
  {
    id: 'riq1AuqETW46NfBCe5NT',
    service: 'Ranking',
    begin: '2025-06-30T14:30:00+00:00',
    end: '2025-07-17T08:00:00+00:00',
    isCoreUpdate: true,
    descriptions: {
      en: 'June 2025 core update: Released the June 2025 core update. The rollout was complete as of July 17, 2025.',
      he: 'עדכון ליבה יוני 2025: שוחרר עדכון הליבה של יוני 2025. הפריסה הושלמה ב-17 ביולי 2025.',
      ru: 'Обновление основного алгоритма за июнь 2025 года: Выпущено основное обновление за июнь 2025 года. Развертывание завершено 17 июля 2025 года.'
    }
  },
  {
    id: 'rX6zGEp9vJJxxrY16g4A',
    service: 'Indexing',
    begin: '2025-06-12T23:54:00+00:00',
    end: '2025-06-13T05:15:00+00:00',
    isCoreUpdate: false,
    descriptions: {
      en: 'Indexing issue: Confirmed slower than usual indexing times for fresh content in Google Search.',
      he: 'תקלת אינדוקס: תקלה זמנית באינדוקס של תוכן חדש בגוגל. אתרים חוו זמני אינדוקס איטיים מהרגיל.',
      ru: 'Проблема с индексацией: Проблема с индексацией свежего контента в Google Search. Сайты могли испытывать задержки в индексации.'
    }
  },
  {
    id: 'wNcefVMLpVGGoFLzgMEg',
    service: 'Serving',
    begin: '2025-06-12T18:00:00+00:00',
    end: '2025-06-12T20:30:00+00:00',
    isCoreUpdate: false,
    descriptions: {
      en: "Serving issue: Confirmed ongoing issue with serving Google Lens, Discover, and Voice Search results that's affecting some users.",
      he: 'תקלת הגשה: תקלה זמנית בהגשת תוצאות ב-Google Lens, Discover וחיפוש קולי עבור כמה משתמשים.',
      ru: 'Проблема с обслуживанием: Проблема с обслуживанием результатов в Google Lens, Discover и голосовом поиске.'
    }
  }
];

/**
 * Returns a deterministic pseudo-random baseline volatility (usually 6% - 29%)
 * for simple un-spiked quiet days.
 */
export function getDeterministicBaseline(date: Date): number {
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();
  // Safe hash value
  const seed = (d * 37 + m * 79 + y * 13) % 1000;
  // Sin/cos waves overlay
  const x = (seed * Math.PI) / 180;
  const base = 17;
  const wave = Math.sin(x) * 6.5 + Math.cos(x * 1.6) * 3.5 + Math.sin(x * 3.2) * 1.5;
  return Math.max(4, Math.min(29, Number((base + wave).toFixed(1))));
}

/**
 * Custom algorithmic model to project volatility index (0% - 100%)
 * Spikes volatility during active incidents (65% - 95%)
 */
export function calculateVolatility(date: Date, activeIncidents: NormalizedIncident[]): number {
  const baseline = getDeterministicBaseline(date);
  if (activeIncidents.length === 0) {
    return baseline;
  }

  let maxBoost = 0;
  activeIncidents.forEach(inc => {
    let boost = 25;
    if (inc.isCoreUpdate) {
      boost = 58;
    } else if (inc.service === 'Ranking') {
      boost = 42;
    } else if (inc.service === 'Indexing') {
      boost = 36;
    } else if (inc.service === 'Serving') {
      boost = 22;
    } else if (inc.service === 'Crawling') {
      boost = 18;
    }
    if (boost > maxBoost) maxBoost = boost;
  });

  const dateSeed = date.getDate();
  const noise = (dateSeed * 13) % 13 - 6; // -6% to +6% to keep dynamic curves
  let finalVal = baseline + maxBoost + noise;

  const hasCore = activeIncidents.some(i => i.isCoreUpdate);
  if (hasCore) {
    if (finalVal < 74) finalVal = 74 + (dateSeed % 14);
    if (finalVal > 98) finalVal = 98 - (dateSeed % 5);
  } else {
    if (finalVal < 45) finalVal = 45 + (dateSeed % 12);
    if (finalVal > 73) finalVal = 73 - (dateSeed % 6);
  }

  return Number(finalVal.toFixed(1));
}

/**
 * Translates incident titles/updates into Hebrew and Russian dynamically
 */
export function translateTextAuto(text: string, lang: Language): string {
  if (lang === 'en') return text;

  let translated = text;

  // Hebrew Translation Mapping
  if (lang === 'he') {
    const heMap: Array<[RegExp, string]> = [
      [/Released the May 2026 core update/gi, 'שוחרר עדכון הליבה של מאי 2026'],
      [/Released the March 2026 core update/gi, 'שוחרר עדכון הליבה של מרץ 2026'],
      [/Released the March 2026 spam update/gi, 'שוחרר עדכון הספאם של מרץ 2026'],
      [/Released the February 2026 Discover core update/gi, 'שוחרר עדכון הדיסקבר של פברואר 2026'],
      [/Released the December 2025 core update/gi, 'שוחרר עדכון הליבה של דצמבר 2025'],
      [/Released the August 2025 spam update/gi, 'שוחרר עדכון הספאם של אוגוסט 2025'],
      [/Released the June 2025 core update/gi, 'שוחרר עדכון הליבה של יוני 2025'],
      
      [/May 2026 core update/gi, 'עדכון ליבה מאי 2026'],
      [/March 2026 core update/gi, 'עדכון ליבה מרץ 2026'],
      [/March 2026 spam update/gi, 'עדכון ספאם מרץ 2026'],
      [/February 2026 Discover update/gi, 'עדכון דיסקבר פברואר 2026'],
      [/December 2025 core update/gi, 'עדכון ליבה דצמבר 2025'],
      [/August 2025 spam update/gi, 'עדכון ספאם אוגוסט 2025'],
      [/June 2025 core update/gi, 'עדכון ליבה יוני 2025'],

      [/The rollout may take up to 2 weeks to complete/gi, 'הפריסה עשויה להמשך עד שבועיים'],
      [/The rollout was complete as of April 8, 2026/gi, 'הפריסה הושלמה במלואה ב-8 באפריל 2026'],
      [/The rollout was complete as of March 25, 2026/gi, 'הפריסה הושלמה במלואה ב-25 במרץ 2026'],
      [/The rollout was complete as of February 27, 2026/gi, 'הפריסה הושלמה במלואה ב-27 בפברואר 2026'],
      [/The rollout was complete as of December 29, 2025/gi, 'הפריסה הושלמה במлואה ב-29 בדצמבר 2025'],
      [/The rollout was complete as of September 22, 2025/gi, 'הפריסה הושלמה במלואה ב-22 בספטמבר 2025'],
      [/The rollout was complete as of July 17, 2025/gi, 'הפריסה הושלמה במלואה ב-17 ביולי 2025'],
      [/The rollout may take a few days to complete/gi, 'הפריסה עשויה להמשך מספר ימים'],
      [/The rollout may take up to 3 weeks to complete/gi, 'הפריסה עשויה להמשך עד 3 שבועות'],

      [/Serving was experiencing an issue/gi, 'מערכת הגשת התוצאות חוותה תקלה טכנית'],
      [/We fixed the issue with serving search results. There will be no more updates/gi, 'תיקנו את התקלה בהגשת תוצאות החיפוש. לא יפורסמו עדכונים נוספים'],
      [/Serving experienced an issue/gi, 'מערכת הגשת התוצאות חוותה תקלה'],
      [/The issue with serving has resolved itself. There will be no more updates/gi, 'התקלה במערכת ההגשה נפתרה מעצמה. לא יפורסמו עדכונים נוספים'],
      [/There's an ongoing data center issue that may impact serving of some pages in some locales. We're working on identifying the root cause/gi, 'קיימת תקלה מתמשכת במרכז הנתונים שעשויה להשפיע על הגשת דפים מסוימים באזורים מסוימים. אנו פועלים לזיהוי סיבת השורש'],
      [/There was an issue with indexing fresh content in Google Search. Sites may have experienced slower than usual indexing times/gi, 'התרחשה תקלה באינדוקס תוכן חדש בחיפוש גוגל. אתרים מסוימים חוו זמני אינדוקס איטיים מהרגיל'],
      [/We fixed the issue with indexing fresh content. There will be no more updates/gi, 'תיקנו את התקלה באינדוקס תוכן טרי. לא יפורסמו עדכונים נוספים'],
      [/There's an ongoing issue with serving Google Lens, Discover, and Voice Search results that's affecting some users. We're working on identifying the root cause/gi, 'קיימת תקלה מתמשכת בהגשת תוצאות ב-Google Lens, Discover וחיפוש קולי המשפיעה על חלק מהמשתמשים. אנו פועלים לזיהוי סיבת השורש'],
      [/We fixed the issue with serving in Google Lens, Discover, and Voice Search. There will be no more updates/gi, 'תיקנו את תקלת ההגשה ב-Google Lens, Discover וחיפוש קולי. לא יפורסמו עדכונים נוספים'],

      [/released/gi, 'שוחרר'],
      [/rollout/gi, 'פריסה'],
      [/complete as of/gi, 'הושלם החל מ-'],
      [/complete/gi, 'הושלם'],
      [/indexing issue/gi, 'תקלת אינדוקס'],
      [/serving issue/gi, 'תקלת הגשה'],
      [/ranking issue/gi, 'תקלת דירוג'],
      [/crawling issue/gi, 'תקלת זחילה']
    ];

    for (const [regex, replacement] of heMap) {
      translated = translated.replace(regex, replacement);
    }
  }

  // Russian Translation Mapping
  if (lang === 'ru') {
    const ruMap: Array<[RegExp, string]> = [
      [/Released the May 2026 core update/gi, 'Выпущено основное обновление алгоритма за май 2026 года'],
      [/Released the March 2026 core update/gi, 'Выпущено основное обновление алгоритма за март 2026 года'],
      [/Released the March 2026 spam update/gi, 'Выпущено обновление алгоритма борьбы со спамом за март 2026 года'],
      [/Released the February 2026 Discover core update/gi, 'Выпущено обновление алгоритма рекомендаций Discover за февраль 2026 года'],
      [/Released the December 2025 core update/gi, 'Выпущено основное обновление алгоритма за декабрь 2025 года'],
      [/Released the August 2025 spam update/gi, 'Выпущено обновление алгоритма борьбы со спамом за август 2025 года'],
      [/Released the June 2025 core update/gi, 'Выпущено основное обновление алгоритма за июнь 2025 года'],
      
      [/May 2026 core update/gi, 'Обновление основного алгоритма за май 2026 года'],
      [/March 2026 core update/gi, 'Обновление основного алгоритма за март 2026 года'],
      [/March 2026 spam update/gi, 'Обновление алгоритма борьбы со спамом за март 2026 года'],
      [/February 2026 Discover update/gi, 'Обновление Discover за февраль 2026 года'],
      [/December 2025 core update/gi, 'Обновление основного алгоритма за декабрь 2025 года'],
      [/August 2025 spam update/gi, 'Обновление алгоритма борьбы со спамом за август 2025 года'],
      [/June 2025 core update/gi, 'Обновление основного алгоритма за июнь 2025 года'],

      [/The rollout may take up to 2 weeks to complete/gi, 'Развертывание может занять до 2 недель'],
      [/The rollout was complete as of April 8, 2026/gi, 'Развертывание полностью завершено 8 апреля 2026 года'],
      [/The rollout was complete as of March 25, 2026/gi, 'Развертывание полностью завершено 25 марта 2026 года'],
      [/The rollout was complete as of February 27, 2026/gi, 'Развертывание полностью завершено 27 февраля 2026 года'],
      [/The rollout was complete as of December 29, 2025/gi, 'Развертывание полностью завершено 29 декабря 2025 года'],
      [/The rollout was complete as of September 22, 2025/gi, 'Развертывание полностью завершено 22 сентября 2025 года'],
      [/The rollout was complete as of July 17, 2025/gi, 'Развертывание полностью завершено 17 июля 2025 года'],
      [/The rollout may take a few days to complete/gi, 'Развертывание может занять несколько дней'],
      [/The rollout may take up to 3 weeks to complete/gi, 'Развертывание может занять до 3 недель'],

      [/Serving was experiencing an issue/gi, 'В серверах отдачи результатов наблюдался технический сбой'],
      [/We fixed the issue with serving search results. There will be no more updates/gi, 'Мы исправили проблему с выдачей результатов поиска. Больше обновлений не будет'],
      [/Serving experienced an issue/gi, 'В системе выдачи результатов произошел сбой'],
      [/The issue with serving has resolved itself. There will be no more updates/gi, 'Проблема с обслуживанием результатов устранена сама собой. Больше обновлений не будет'],
      [/There's an ongoing data center issue that may impact serving of some pages in some locales. We're working on identifying the root cause/gi, 'Наблюдается технический сбой в дата-центре, который может повлиять на выдачу страниц в некоторых регионах. Мы работаем над поиском первопричины'],
      [/There was an issue with indexing fresh content in Google Search. Sites may have experienced slower than usual indexing times/gi, 'Возникла проблема с индексацией свежего контента в Google Поиске. Сайты могли испытывать задержки в индексации'],
      [/We fixed the issue with indexing fresh content. There will be no more updates/gi, 'Мы исправили проблему с индексацией свежего контента. Больше обновлений не будет'],
      [/There's an ongoing issue with serving Google Lens, Discover, and Voice Search results that's affecting some users. We're working on identifying the root cause/gi, 'Наблюдается проблема с обслуживанием результатов в Google Lens, Discover и голосовом поиске, затрагивающая некоторых пользователей. Мы работаем над устранением причин'],
      [/We fixed the issue with serving in Google Lens, Discover, and Voice Search. There will be no more updates/gi, 'Проблема с обслуживанием в Google Lens, Discover и голосовом поиске решена. Больше обновлений не будет'],

      [/released/gi, 'Выпущено'],
      [/rollout/gi, 'развертывание'],
      [/complete as of/gi, 'завершено на'],
      [/complete/gi, 'завершено'],
      [/indexing issue/gi, 'проблема с индексацией'],
      [/serving issue/gi, 'проблема с выдачей результатов'],
      [/ranking issue/gi, 'проблема с ранжированием'],
      [/crawling issue/gi, 'проблема со сканированием']
    ];

    for (const [regex, replacement] of ruMap) {
      translated = translated.replace(regex, replacement);
    }
  }

  return translated;
}

/**
 * Normalization pipeline mapping raw incident anomalies safely
 */
export function normalizeIncident(raw: any, lang: Language): NormalizedIncident {
  const id = raw.id || `incident-${Math.random()}`;
  
  // Normalized Title/Description from correct Google statuses keys
  const title = raw.external_desc || raw.external_description || raw.description || raw.summary || 'Google Search Operations Adjustment';
  
  let updateText = '';
  if (raw.updates && Array.isArray(raw.updates) && raw.updates.length > 0) {
    updateText = raw.updates.map((u: any) => u.text).join('\n— ');
  } else if (raw.most_recent_update && raw.most_recent_update.text) {
    updateText = raw.most_recent_update.text;
  }
  
  const desc = updateText ? `${title}: ${updateText}` : title;

  // Premium translation dictionary / fallback mapping
  const offlineMatch = OFFLINE_INCIDENTS.find(o => o.id === id);
  let finalDesc = desc;
  if (offlineMatch) {
    finalDesc = offlineMatch.descriptions[lang] || offlineMatch.descriptions['en'];
  } else {
    finalDesc = translateTextAuto(desc, lang);
  }

  // Parse fields using real Google keys
  let service: ServicesKeys = 'General';
  const rawService = String(raw.service_name || raw.service || raw.source || 'General').toLowerCase();
  
  if (rawService.includes('rank')) service = 'Ranking';
  else if (rawService.includes('index')) service = 'Indexing';
  else if (rawService.includes('serv')) service = 'Serving';
  else if (rawService.includes('crawl')) service = 'Crawling';

  const beginStr = raw.begin || raw.start_time;
  const endStr = raw.end || raw.end_time || raw.resolved;

  const isCoreUpdate = title.toLowerCase().includes('core update') || 
                       title.toLowerCase().includes('spam update') || 
                       title.toLowerCase().includes('helpful content') ||
                       desc.toLowerCase().includes('core update') ||
                       desc.toLowerCase().includes('spam update') ||
                       desc.toLowerCase().includes('helpful content');

  return {
    id,
    description: finalDesc,
    service,
    begin: beginStr ? new Date(beginStr) : new Date(),
    end: endStr ? new Date(endStr) : null,
    status: raw.status === 'active' || !endStr ? 'active' : 'resolved',
    isCoreUpdate
  };
}

/**
 * Integrates localized descriptors into NormalizedIncidents when fallback occurs
 */
export function getOfflineIncidents(lang: Language): NormalizedIncident[] {
  return OFFLINE_INCIDENTS.map(inc => ({
    id: inc.id,
    description: inc.descriptions[lang] || inc.descriptions['en'],
    service: inc.service,
    begin: new Date(inc.begin),
    end: inc.end ? new Date(inc.end) : null,
    status: inc.end ? 'resolved' : 'active',
    isCoreUpdate: inc.isCoreUpdate
  }));
}

/**
 * Fetch and Multi-Proxy failover ingestion layer for Google Search Status Dashboard API
 */
export async function fetchGoogleIncidents(
  lang: Language,
  onStateUpdate: (state: 'loading' | 'proxy1' | 'proxy2' | 'usingLocal' | 'apiSuccess') => void
): Promise<NormalizedIncident[]> {
  const url = 'https://status.search.google.com/incidents.json';

  // State 1: Loading
  onStateUpdate('loading');

  // Try Proxy Tier 1: allorigins
  try {
    onStateUpdate('proxy1');
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500); // Fail fast

    const response = await fetch(proxyUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const outerData = await response.json();
      if (outerData && outerData.contents) {
        // Parse raw string in JSON
        const rawArray = JSON.parse(outerData.contents);
        if (Array.isArray(rawArray)) {
          onStateUpdate('apiSuccess');
          return rawArray.map(item => normalizeIncident(item, lang));
        }
      }
    }
  } catch (err) {
    console.warn('Proxy Tier 1 (allorigins) blocked or failed:', err);
  }

  // Try Proxy Tier 2: corsproxy
  try {
    onStateUpdate('proxy2');
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // Fail fast

    const response = await fetch(proxyUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const rawArray = await response.json();
      if (Array.isArray(rawArray)) {
        onStateUpdate('apiSuccess');
        return rawArray.map(item => normalizeIncident(item, lang));
      }
    }
  } catch (err) {
    console.warn('Proxy Tier 2 (corsproxy.io) blocked or failed:', err);
  }

  // Offline / Sanboxed local fallback
  onStateUpdate('usingLocal');
  return getOfflineIncidents(lang);
}

/**
 * Compiles absolute chronology of points (dates mapped with volatility scores and incidents details)
 */
export function compileTimeline(
  days: number,
  incidents: NormalizedIncident[],
  currentDate: Date = new Date() // Current real-world timestamp
): VolatilityPoint[] {
  const points: VolatilityPoint[] = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(currentDate);
    d.setUTCDate(currentDate.getUTCDate() - i);
    d.setUTCHours(0, 0, 0, 0);

    // List the official incidents active during *this* date
    const activeIncidents = incidents.filter(inc => {
      const beginDay = new Date(inc.begin);
      beginDay.setUTCHours(0,0,0,0);
      
      const endDay = inc.end ? new Date(inc.end) : null;
      if (endDay) endDay.setUTCHours(23,59,59,999);

      if (endDay) {
        return d >= beginDay && d <= endDay;
      } else {
        // Active/Ongoing incident
        return d >= beginDay;
      }
    });

    const metricValue = calculateVolatility(d, activeIncidents);

    // Dynamic formatting for labels
    const dateStr = d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    points.push({
      date: d,
      dateStr,
      metricValue,
      incidentCount: activeIncidents.length,
      incidents: activeIncidents
    });
  }

  return points;
}
