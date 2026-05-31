/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language, TranslationDict } from './types';

export const translations: Record<Language, TranslationDict> = {
  en: {
    title: 'Google Algorithm & Volatility Tracker',
    subtitle: 'Real-time SERP volatility analytics correlated with official Google search infrastructure incidents.',
    langLabel: 'Language',
    timeframes: {
      thirtyDays: '30 Days',
      ninetyDays: '90 Days',
      year: '365 Days'
    },
    liveStatus: {
      title: 'Current SERP Environment Status',
      calmDesc: 'Calm search environment. Lower volatility, search results are stable and consistent.',
      volatileDesc: 'Unstable. Moderate fluctuations detected. Localized shifts or early update phases possible.',
      stormDesc: 'Algo Storm! Heavy algorithmic turbulence. High ranks volatility observed globally.',
      outageDesc: 'Critical Incidents. Google search system or indexing is currently experiencing technical errors.'
    },
    volatilityGuide: {
      title: 'Volatility Reference Levels',
      subtitle: 'Understanding Google algorithm volatility index levels and SEO implications.',
      calm: {
        title: 'Calm (0% - 30%)',
        range: '0% - 30%',
        desc: 'Normal baseline shifts. No active core or spam algorithm updates monitored.'
      },
      volatile: {
        title: 'Unstable (31% - 60%)',
        range: '31% - 60%',
        desc: 'Minor update pre-rolls or system indexing anomalies. Monitor rankings closely.'
      },
      storm: {
        title: 'Algo Storm (61%+)',
        range: '61% - 100%',
        desc: 'Official Core/Spam update active or major system bug. High ranking flux globally.'
      }
    },
    eventTable: {
      title: 'Google Search Incident & Update Log',
      subtitle: 'Official incident logs streamed from Google Status Dashboard.',
      colDate: 'Date Range',
      colEvent: 'Incident & Context',
      colType: 'Impact Core',
      colStatus: 'Status',
      statusActive: 'Active',
      statusResolved: 'Resolved',
      noEvents: 'No official security or system incidents reported by Google during this timeframe.',
      showDetails: 'Show Details',
      hideDetails: 'Hide Details'
    },
    faq: {
      title: 'Google Algorithm Core FAQ',
      subtitle: 'Answers to essential questions surrounding SERP tracking and search ecosystem health.',
      q1: 'How is the Volatility Index calculated?',
      a1: 'The Volatility Index (0-100%) merges baseline organic SERP adjustments (simulated via daily deterministic periodic seeds) with sudden, heavy amplification spikes triggered on dates and ranges of official Google Search incidents and active Search Core updates.',
      q2: 'What is the purpose of the Google Search Status API?',
      a2: 'Google officially publishes system status alerts covering Ranking, Indexing, Crawling, and Serving. By correlating official outages and announcements with volatility, SEO specialists can instantly determine if global drops are due to site issues or Google side bugs.',
      q3: 'What should I do during an Algorithm Storm?',
      a3: 'During an active Algo Storm or Core Update, Google recommends avoiding premature site changes. Wait until the rollout is fully complete (typically 2-3 weeks) to re-evaluate and audit your traffic changes.',
      q4: 'How does the translation and regional tracking engine work?',
      a4: 'This application dynamically manages layout directions. Selecting Hebrew enables bi-directional Right-to-Left (RTL) mode. Russian maps complex SEO terminology (like Indexing and Ranking) with strict terminology accuracy to represent professional industry context.'
    },
    services: {
      Ranking: 'Ranking',
      Indexing: 'Indexing',
      Serving: 'Serving',
      Crawling: 'Crawling',
      General: 'General Status'
    },
    apiStatus: {
      loading: 'Establishing secure communication with Google Dashboard APIs...',
      proxy1: 'Direct network connection restricted. Retrying via Secure Proxy Tier 1...',
      proxy2: 'Primary Proxy unavailable. Engaging Backup Proxy Tier 2...',
      usingLocal: 'Network sandboxed. Safe offline mode initialized. Core Update databases active.',
      apiSuccess: 'Successfully synchronized with live Google Search Status Dashboard API.',
      lastUpdated: 'Synchronized at',
      refreshBtn: 'Refresh'
    },
    footer: {
      toolName: 'Google Algorithm Tracking & Volatility Tool',
      by: 'by',
      copyright: 'Copyright ©'
    }
  },
  he: {
    title: 'כלי מעקב אלגוריתם Google ותנודתיות',
    subtitle: 'ניתוח תנודתיות תוצאות חיפוש בזמן אמת בשילוב עם דיווחי תקלות רשמיים של מערכות Google.',
    langLabel: 'שפה',
    timeframes: {
      thirtyDays: '30 יום אחרונים',
      ninetyDays: '90 יום אחרונים',
      year: 'שנה (365 יום)'
    },
    liveStatus: {
      title: 'סטטוס סביבת החיפוש הנוכחי',
      calmDesc: 'תוצאות החיפוש רגועות ויציבות. רמת תנודתיות נמוכה, השינויים במיקומים מינוריים.',
      volatileDesc: 'מצב תנודתי. שינויים בינוניים מורגשים במיקומים. ייתכן עדכון אלגוריתם בשלבי הרצה.',
      stormDesc: 'סערת אלגוריתם! תנודות חריפות בדירוגים בכל העולם. שינויים קיצוניים בדפי תוצאות החיפוש.',
      outageDesc: 'תקלות קריטיות! שירותי Google חווים שיבושים במערכות האנדוקס, הזחילה או הדירוג.'
    },
    volatilityGuide: {
      title: 'מדריך רמות תנודתיות',
      subtitle: 'הסבר מפורט על רמות התנודתיות השונות והשפעתן על הקידום האורגני (SEO).',
      calm: {
        title: 'רגוע (0% - 30%)',
        range: '0% - 30%',
        desc: 'שינויים טבעיים ורגילים בדירוג. אין עדכוני אלגוריתם או תקלות רשת פעילים.'
      },
      volatile: {
        title: 'תנודתי (31% - 60%)',
        range: '31% - 60%',
        desc: 'כניסה של עדכונים קטנים או בעיות דיווח זמניות. מומלץ לעקוב מקרוב אחר מיקומים.'
      },
      storm: {
        title: 'סערת אלגוריתם (61%+)',
        range: '61% - 100%',
        desc: 'עדכון ליבה רשמי או תקלה רחבה במערכות Google. תנודתיות חדה ומהירה ברחבי הרשת.'
      }
    },
    eventTable: {
      title: 'יומן תקלות ועדכונים רשמי - Google Search',
      subtitle: 'יומן אירועים ותקלות רשת מסונכרן ישירות מ-Google Search Status Dashboard.',
      colDate: 'טווח תאריכים',
      colEvent: 'אירוע ופירוט',
      colType: 'אזור השפעה',
      colStatus: 'סטטוס',
      statusActive: 'פעיל',
      statusResolved: 'טופל',
      noEvents: 'לא דווחו תקלות או עדכונים רשמיים על ידי Google בטווח הזמן שנבחר.',
      showDetails: 'הצג פרטים',
      hideDetails: 'הסתר פרטים'
    },
    faq: {
      title: 'שאלות ותשובות אלגוריתם Google',
      subtitle: 'מידע קריטי על מעקב תנודות ומצב הבריאות של סביבת ה-SERP.',
      q1: 'כיצד מחושב מדד התנודתיות?',
      a1: 'מדד התנודתיות (0-100%) משלב מיקרו-תנודות טבעיות יומיות (המבוססות על חישוב מחזורי דטרמיניסטי לפי התאריך) יחד עם קפיצות תנודתיות מסיביות ברשת הנגרמות בתאריכים שבהם חלו עדכוני ליבה או תקלות רשמיות בדירוג וזחילה.',
      q2: 'מהי מטרת ה-Google Search Status API?',
      a2: 'Google מספקת עדכונים רשמיים על ביצועי המערכות שלה: דירוגים, אינדוקס, זחילה, והצגת תוצאות. קורלציה של אירועים אלו עם התנודתיות מאפשרת להבין האם ירידה בדירוג של אתר נגרמה מבעיה פנימית או מתקלה גלובלית ב-Google.',
      q3: 'מה לעשות במהלך סערת אלגוריתם?',
      a3: 'במהלך עדכון ליבה פעיל או תקלה רחבה, Google ממליצה להימנע משינויים משמעותיים ויזומים באתר. יש להמתין עד לסיום מלא של עדכון הליבה (בדרך כלל בין שבועיים לחודש) ורק אז לבצע אופטימיזציה מחדש.',
      q4: 'איך עובד מנגנון התרגום והתצוגה הדו-כיווני?',
      a4: 'הכלי מנהל את פריסת האתר באופן דינמי. בחירה בשפה העברית מפעילה מצב כתיבה מימין לשמאל (RTL) להצגה אופטימלית ונוחה. תרגום מונחים מקצועיים של SEO כגון "אינדוקס" (Indexing) ו"דירוגים" (Ranking) מיושר במדויק לצורך שמירה על סטנדרטים מקצועיים.'
    },
    services: {
      Ranking: 'דירוגים',
      Indexing: 'אינדוקס',
      Serving: 'הגשת תוצאות',
      Crawling: 'זחילה',
      General: 'מצב כללי'
    },
    apiStatus: {
      loading: 'מתחבר למערכות המידע הרשמיות של Google...',
      proxy1: 'חיבור ישיר חסום. מנסה להתחבר דרך שרת מתווך מאובטח (Proxy Tier 1)...',
      proxy2: 'פרוקסי ראשי לא זמין. מתחבר לפרוקסי גיבוי (Proxy Tier 2)...',
      usingLocal: 'סביבה מאובטחת במצב אופליין. טוען היסטוריית אלגוריתם שמורה.',
      apiSuccess: 'חיבור בוצע בהצלחה ובוצע סנכרון מול לוח הבקרה הרשמי של Google.',
      lastUpdated: 'עודכן לאחרונה ב-',
      refreshBtn: 'רענן מידע'
    },
    footer: {
      toolName: 'כלי מעקב אלגוריתם Google ותנודתיות',
      by: 'מבית',
      copyright: 'זכויות יוצרים ©'
    }
  },
  ru: {
    title: 'Мониторинг обновлений и волатильности Google',
    subtitle: 'Аналитика волатильности поисковой выдачи (SERP) в реальном времени, сопоставленная с официальными сбоями Google.',
    langLabel: 'Язык',
    timeframes: {
      thirtyDays: '30 дней',
      ninetyDays: '90 дней',
      year: '365 дней'
    },
    liveStatus: {
      title: 'Текущее состояние выдачи',
      calmDesc: 'В поисковой выдаче всё спокойно. Минимальные колебания, позиции сайтов стабильны.',
      volatileDesc: 'Нестабильно. Наблюдаются средние колебания. Возможен запуск локального обновления или ранние тесты.',
      stormDesc: 'Шторм алгоритма! Сильнейшая волатильность выдачи по всему миру. Позиции штормит на глобальном уровне.',
      outageDesc: 'Критические инциденты. В системах индексации, сканирования или ранжирования Google зафиксированы сбои.'
    },
    volatilityGuide: {
      title: 'Справочник волатильности',
      subtitle: 'Классификация уровней волатильности поисковых систем и рекомендации для SEO.',
      calm: {
        title: 'Спокойно (0% - 30%)',
        range: '0% - 30%',
        desc: 'Органические микро-колебания в пределах нормы. Активные обновления алгоритмов ядра не зафиксированы.'
      },
      volatile: {
        title: 'Нестабильно (31% - 60%)',
        range: '31% - 60%',
        desc: 'Предварительные раскатки мелких апдейтов или незначительные технические баги индексации.'
      },
      storm: {
        title: 'Шторм алгоритма (61%+)',
        range: '61% - 100%',
        desc: 'Активное глобальное обновление ядра Core или Spam Update, порождающее тектонические сдвиги в SERP.'
      }
    },
    eventTable: {
      title: 'Реестр сбоев и апдейтов Google Search',
      subtitle: 'Официальные логи мониторинга, синхронизируемые в реальном времени с Google Status Dashboard.',
      colDate: 'Диапазон дат',
      colEvent: 'Инцидент и контекст',
      colType: 'Область влияния',
      colStatus: 'Статус',
      statusActive: 'Активно',
      statusResolved: 'Решено',
      noEvents: 'Официальных сообщений о сбоях алгоритмов от Google в выбранном диапазоне не зарегистрировано.',
      showDetails: 'Показать детали',
      hideDetails: 'Скрыть детали'
    },
    faq: {
      title: 'Часто задаваемые вопросы',
      subtitle: 'Всё, что вам нужно знать об отслеживании алгоритмов поисковой выдачи Google.',
      q1: 'Как рассчитывается индекс волатильности?',
      a1: 'Индекс волатильности (0-100%) объединяет базовые органические микро-колебания выдачи (рассчитываемые детерминистически по формуле на каждый день) и резкие пиковые всплески, накладывающиеся в периоды официальных апдейтов или технических аварий.',
      q2: 'Каковы функции Google Search Status API?',
      a2: 'Google официально публикует статус работы своих сервисов: Ранжирование, Индексация, Сканирование и Выдача. Их сопоставление с графиком изменений позволяет понять: падение трафика вызвано внутренними ошибками сайта или багом самой системы Google.',
      q3: 'Что делать во время Шторма алгоритма?',
      a3: 'Во время активного Core Update Google строго рекомендует не предпринимать поспешных действий по изменению сайта. Дождитесь официального окончания раскатки (обычно 2-4 недели) и только потом проводите глубокий аудит просевших страниц.',
      q4: 'Как работает двунаправленная локализация интерфейса?',
      a4: 'Приложение поддерживает динамическую смену настроек DOM-структуры страницы. При выборе иврита документ переходит в режим чтения справа налево (RTL). Термины профессионального уровня (такие как "Ранжирование" для Ranking и "Индексация" для Indexing) точно адаптированы.'
    },
    services: {
      Ranking: 'Ранжирование',
      Indexing: 'Индексация',
      Serving: 'Выдача результатов',
      Crawling: 'Сканирование',
      General: 'Общее состояние'
    },
    apiStatus: {
      loading: 'Установка безопасного соединения с серверами Google API...',
      proxy1: 'Прямое соединение заблокировано. Пытаемся подключиться через безопасный шлюз Proxy Tier 1...',
      proxy2: 'Основной прокси-сервер недоступен. Запуск резервного Proxy Tier 2...',
      usingLocal: 'Защищенная среда. Загружен локальный реестр проверенных апдейтов Google в автономном режиме.',
      apiSuccess: 'Синхронизация с серверами Google Search Status Dashboard API успешно завершена.',
      lastUpdated: 'Синхронизировано в',
      refreshBtn: 'Обновить данные'
    },
    footer: {
      toolName: 'Инструмент отслеживания алгоритмов и волатильности Google',
      by: 'от',
      copyright: 'Copyright ©'
    }
  }
};
