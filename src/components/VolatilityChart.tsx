/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext
} from 'chart.js';
import { Language, VolatilityPoint } from '../types';
import { translations } from '../translations';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface VolatilityChartProps {
  points: VolatilityPoint[];
  lang: Language;
}

export default function VolatilityChart({ points, lang }: VolatilityChartProps) {
  const chartRef = useRef<any>(null);
  const t = translations[lang];
  const isRtl = lang === 'he';

  // Helpers to build gradients dynamically depending on the chart area size
  function createLineGradient(ctx: CanvasRenderingContext2D, area: { top: number; bottom: number }) {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    // Grid bounds in percentage of height (0% to 100% represents 0 to 100 volatility index)
    // Dynamic coloring rules: Y > 60 is Red, Y > 30 is Yellow, Y <= 30 is Green
    gradient.addColorStop(0, '#34A853');   // Green #34A853
    gradient.addColorStop(0.3, '#34A853');
    gradient.addColorStop(0.31, '#FBBC05'); // Yellow #FBBC05
    gradient.addColorStop(0.6, '#FBBC05');
    gradient.addColorStop(0.61, '#EA4335'); // Red #EA4335
    gradient.addColorStop(1, '#EA4335');
    return gradient;
  }

  function createFillGradient(ctx: CanvasRenderingContext2D, area: { top: number; bottom: number }) {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, 'rgba(52, 168, 83, 0.05)');
    gradient.addColorStop(0.3, 'rgba(52, 168, 83, 0.15)');
    gradient.addColorStop(0.31, 'rgba(251, 188, 5, 0.15)');
    gradient.addColorStop(0.6, 'rgba(251, 188, 5, 0.2)');
    gradient.addColorStop(0.61, 'rgba(234, 67, 53, 0.25)');
    gradient.addColorStop(1, 'rgba(234, 67, 53, 0.35)');
    return gradient;
  }

  const chartLabels = points.map(p => p.dateStr);
  const chartValues = points.map(p => p.metricValue);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: t.title,
        data: chartValues,
        fill: true,
        tension: 0.35,
        borderWidth: 3.5,
        borderColor: (context: ScriptableContext<'line'>) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return '#22c55e'; // Fallback initial color
          return createLineGradient(ctx, chartArea);
        },
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return 'rgba(34, 197, 94, 0.1)'; // Fallback initial fill
          return createFillGradient(ctx, chartArea);
        },
        // Selective points depending on whether they contain official Google incidents
        pointRadius: (context: any) => {
          const idx = context.dataIndex;
          if (idx === undefined || idx < 0 || idx >= points.length) return 3;
          return points[idx].incidentCount > 0 ? 8 : 3;
        },
        pointHoverRadius: (context: any) => {
          const idx = context.dataIndex;
          if (idx === undefined || idx < 0 || idx >= points.length) return 6;
          return points[idx].incidentCount > 0 ? 11 : 6;
        },
        pointBackgroundColor: (context: any) => {
          const idx = context.dataIndex;
          if (idx === undefined || idx < 0 || idx >= points.length) return '#ffffff';
          const pt = points[idx];
          if (pt.incidentCount > 0) {
            // Check if any of the incidents is Ranking or Indexing for stylized colors
            const services = pt.incidents.map(i => i.service);
            if (services.includes('Indexing')) return '#4285F4'; // Google Clean Blue
            return '#EA4335'; // Google Red
          }
          // Normal point background
          if (pt.metricValue > 60) return '#EA4335';
          if (pt.metricValue > 30) return '#FBBC05'; // Google Yellow
          return '#34A853'; // Google Green
        },
        pointBorderColor: '#ffffff',
        pointBorderWidth: (context: any) => {
          const idx = context.dataIndex;
          if (idx === undefined || idx < 0 || idx >= points.length) return 1;
          return points[idx].incidentCount > 0 ? 3 : 1;
        },
      }
    ]
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    rtl: isRtl,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false // We use premium custom HUD cards instead of default keys
      },
      tooltip: {
        enabled: true,
        rtl: isRtl,
        textDirection: isRtl ? 'rtl' : 'ltr',
        padding: 12,
        cornerRadius: 8,
        backgroundColor: 'rgba(15, 23, 42, 0.95)', // Slate-900 transparent theme
        titleFont: {
          family: 'Inter, system-ui',
          size: 13,
          weight: 'bold'
        },
        bodyFont: {
          family: 'Inter, system-ui',
          size: 12
        },
        callbacks: {
          title: (tooltipItems: any) => {
            const idx = tooltipItems[0].dataIndex;
            const pt = points[idx];
            if (!pt) return '';
            // Return formatted date or localized string representation if needed
            return pt.date.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'he' ? 'he-IL' : 'ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
          },
          label: (context: any) => {
            const pt = points[context.dataIndex];
            if (!pt) return '';
            const val = pt.metricValue.toFixed(1);
            let lvl = t.volatilityGuide.calm.title.split(' ')[0];
            if (pt.metricValue > 60) {
              lvl = t.volatilityGuide.storm.title.split(' ')[0];
            } else if (pt.metricValue > 30) {
              lvl = t.volatilityGuide.volatile.title.split(' ')[0];
            }
            return ` Volatility: ${val}% (${lvl})`;
          },
          afterBody: (tooltipItems: any) => {
            const idx = tooltipItems[0].dataIndex;
            const pt = points[idx];
            if (!pt || pt.incidents.length === 0) return '';
            
            const lines = [
              '',
              isRtl ? '📌 אירועי גוגל רשמיים:' : lang === 'ru' ? '📌 Официальные события:' : '📌 Official Google Events:',
            ];

            pt.incidents.forEach(inc => {
              const serviceLabel = t.services[inc.service as keyof typeof t.services] || inc.service;
              const typeLabel = inc.isCoreUpdate 
                ? (isRtl ? 'עדכון ליבה' : lang === 'ru' ? 'Обновление ядра' : 'Core Update')
                : serviceLabel;
              lines.push(`• [${typeLabel}] ${inc.description}`);
            });

            return lines.join('\n');
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'ui-monospace, monospace, monospace',
            size: 11
          },
          color: '#94a3b8',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: lang === 'he' ? 8 : 10
        }
      },
      y: {
        min: 0,
        max: 100,
        position: isRtl ? 'right' : 'left',
        grid: {
          color: 'rgba(226, 232, 240, 0.6)',
        },
        ticks: {
          callback: (value: any) => `${value}%`,
          font: {
            family: 'ui-monospace, monospace, monospace',
            size: 11,
            weight: 'bold'
          },
          color: '#64748b'
        }
      }
    }
  };

  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-[400px]">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}
