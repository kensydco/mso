/**
 * StatCounter Component - Corporate Monumentalism Design
 * Large, bold counter animation on scroll
 * Numbers: 120px+ with thin labels beneath
 */

import { useScrollAnimation, useCounterAnimation } from '@/hooks/useScrollAnimation';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  description: string;
}

interface StatCounterProps {
  stats: Stat[];
}

function StatItem({ stat, isVisible }: { stat: Stat; isVisible: boolean }) {
  const count = useCounterAnimation(stat.value, 2000, isVisible);

  return (
    <div className="text-center">
      <div className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-[#0F172A] mb-2">
        {count}
        {stat.suffix && <span className="text-[#3B82F6]">{stat.suffix}</span>}
      </div>
      <div className="font-display font-semibold text-sm uppercase tracking-wider text-[#3B82F6] mb-2">
        {stat.label}
      </div>
      <p className="text-sm text-[#64748B] max-w-[200px] mx-auto">
        {stat.description}
      </p>
    </div>
  );
}

export default function StatCounter({ stats }: StatCounterProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="container">
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
