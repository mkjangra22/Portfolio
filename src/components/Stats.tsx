import { motion } from "motion/react";
import { Award, Briefcase, Smile } from "lucide-react";
import { ReactNode } from "react";

interface StatItem {
  value: string;
  label: string;
  icon: ReactNode;
}

const STATS: StatItem[] = [
  {
    value: "10+",
    label: "Hackathons & Competitions",
    icon: <Briefcase className="w-5 h-5 text-[#89AACC]" />,
  },
  {
    value: "Numbers of",
    label: "Certifications & Courses",
    icon: <Award className="w-5 h-5 text-[#4E85BF]" />,
  },
  {
    value: "Lead",
    label: "Association for Computing Machinery",
    icon: <Smile className="w-5 h-5 text-text-primary" />,
  },
];

export default function Stats() {
  return (
    <section id="stats" className="bg-bg py-16 sm:py-24 lg:py-28 border-t border-b border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16" id="stats-container">
        
        {/* Bento/Grid columns container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-16">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              id={`stat-column-${idx}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="group flex flex-col items-center md:items-start text-center md:text-left relative p-6 bg-surface/10 rounded-2xl border border-stroke/40 hover:border-stroke hover:bg-surface/30 transition-all duration-300"
            >
              {/* Floating icon */}
              <div className="mb-4 p-3 rounded-full border border-stroke bg-surface/50 group-hover:scale-110 group-hover:bg-surface transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Statistical Value */}
              <div className="h-16 flex items-baseline">
                <span className="text-5xl sm:text-6xl md:text-7xl font-display font-light text-text-primary tracking-tighter leading-none">
                  {stat.value}
                </span>
              </div>

              {/* Label */}
              <div className="mt-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#89AACC] font-semibold">
                  {stat.label}
                </span>
              </div>

              {/* Detail support sentence */}
              <p className="text-muted text-[11px] leading-relaxed mt-2 max-w-[200px] font-sans font-light opacity-60">
                {idx === 0 && "Participated and Explored."}
                {idx === 1 && "Full-cycle delivery from initial whiteboard prompts to final production deployment."}
                {idx === 2 && "Leading technical initiatives, workshops, and student engagement activities."}
              </p>

              {/* Corner accent hover glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#89AACC]/5 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
