/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'he' | 'ru';

export interface TranslationDict {
  title: string;
  subtitle: string;
  langLabel: string;
  timeframes: {
    thirtyDays: string;
    ninetyDays: string;
    year: string;
  };
  liveStatus: {
    title: string;
    calmDesc: string;
    volatileDesc: string;
    stormDesc: string;
    outageDesc: string;
  };
  volatilityGuide: {
    title: string;
    subtitle: string;
    calm: {
      title: string;
      range: string;
      desc: string;
    };
    volatile: {
      title: string;
      range: string;
      desc: string;
    };
    storm: {
      title: string;
      range: string;
      desc: string;
    };
  };
  eventTable: {
    title: string;
    subtitle: string;
    colDate: string;
    colEvent: string;
    colType: string;
    colStatus: string;
    statusActive: string;
    statusResolved: string;
    noEvents: string;
    showDetails: string;
    hideDetails: string;
  };
  faq: {
    title: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
  };
  services: {
    Ranking: string;
    Indexing: string;
    Serving: string;
    Crawling: string;
    General: string;
  };
  apiStatus: {
    loading: string;
    proxy1: string;
    proxy2: string;
    usingLocal: string;
    apiSuccess: string;
    lastUpdated: string;
    refreshBtn: string;
  };
}

export type ServicesKeys = 'Ranking' | 'Indexing' | 'Serving' | 'Crawling' | 'General';

export interface RawGoogleIncident {
  id?: string;
  external_description?: string;
  description?: string;
  summary?: string;
  service?: string;
  source?: string;
  begin?: string;
  start_time?: string;
  end?: string;
  end_time?: string;
  resolved?: string;
  status?: string;
}

export interface NormalizedIncident {
  id: string;
  description: string;
  service: ServicesKeys;
  begin: Date;
  end: Date | null;
  status: 'active' | 'resolved';
  isCoreUpdate: boolean;
}

export interface VolatilityPoint {
  date: Date;
  dateStr: string;
  metricValue: number;
  incidentCount: number;
  incidents: NormalizedIncident[];
}
