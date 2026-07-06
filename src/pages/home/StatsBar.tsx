import { CountUp } from '../../components/CountUp';
import { StaggerGroup, StaggerItem } from '../../components/Reveal';
import { stats } from '../../data';

export function StatsBar() {
  return (
    <section className="bg-cream pb-32 pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <StaggerGroup className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="border-l border-ink/10 pl-5">
              <p className="font-display text-5xl font-light tracking-tightest text-ink sm:text-6xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-ink/50">{s.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
