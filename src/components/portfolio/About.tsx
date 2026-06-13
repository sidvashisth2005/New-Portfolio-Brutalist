import { motion } from "framer-motion";
import { FileText, Link as LinkIcon } from "lucide-react";

const EASE = [0.85, 0, 0.15, 1] as const;

const metrics = [
  ["6,200+", "Participants outranked / HackNITR 7.0"],
  ["01", "Global rank held"],
  ["30%", "Platform user growth delivered"],
  ["65%", "Infrastructure cost cut"],
];

export function About() {
  return (
    <section id="about" className="relative px-5 py-32 border-t-2 border-white bg-black">
      <div className="grid grid-cols-12 gap-5">
        {/* Left column info */}
        <div className="col-span-12 md:col-span-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 sticky top-28">
            (01) ABOUT / MANIFESTO
          </div>
        </div>

        {/* Right column content */}
        <div className="col-span-12 md:col-span-9">
          {/* Biography paragraphs */}
          <div className="space-y-6 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              className="font-display text-2xl md:text-4xl font-black leading-tight uppercase"
            >
              I am a highly driven fresher with a strong background in{" "}
              <span className="text-[#ffff00]">Business Development, Recruitment, and Market Research</span>.
              My passion lies at the intersection of technology and business strategy.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="font-mono text-xs md:text-sm uppercase tracking-wider text-white/70 leading-relaxed"
            >
              Recently, I achieved <span className="text-white font-bold">Rank 1 out of 6,200+ participants</span> at the international HackNITR 7.0, where I was recognized for pitching compelling product strategies across AgriTech, AR, and AI.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              className="font-mono text-xs md:text-sm uppercase tracking-wider text-white/70 leading-relaxed"
            >
              I have a proven track record of delivering real-world consulting outcomes across 6+ national and international competitions, combining analytical thinking with hands-on technical knowledge.
            </motion.p>
          </div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            className="mt-16 border-2 border-white p-6 bg-black relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h3 className="font-display font-black text-xl md:text-2xl tracking-tight uppercase hover:text-[#ffff00] transition-colors">
                  <a href="https://www.juet.ac.in/" target="_blank" rel="noopener noreferrer">
                    Jaypee University of Engineering and Technology
                  </a>
                </h3>
                <p className="font-mono text-xs uppercase tracking-wider text-white/50 mt-1">
                  B.Tech, Computer Science and Engineering
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/40 mt-1">
                  Guna, Madhya Pradesh, India
                </p>
              </div>
              <span className="font-display font-black text-lg md:text-xl text-right md:self-start">
                2023 - 2027
              </span>
            </div>

            <div className="font-mono text-xs md:text-sm uppercase tracking-wider mt-6 border-t-2 border-white/20 pt-6 space-y-2">
              <p>
                <strong className="text-[#ffff00]">Coursework:</strong> Data Structures & Algorithms, DBMS, SQL.
              </p>
              <p>
                <strong className="text-[#ffff00]">Certifications:</strong> Machine Learning (Skill Dzire), Flutter Development (Trustique), Google Cloud Platform (GCP).
              </p>
              <p className="text-white/80">
                <strong className="text-[#ffff00]">CGPA:</strong> 7.5 / 10.0
              </p>
            </div>

            {/* Document Links */}
            <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.2em]">
              <a
                href="https://drive.google.com/file/d/1Du6QLPI58renRduOlaXqYmsCB6aXjen-/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white px-4 py-2 hover:bg-[#ffff00] hover:text-black transition-colors"
              >
                <FileText size={12} />
                View Certificates
              </a>
              <a
                href="https://drive.google.com/file/d/17h6O7igTIUcqdN9EDRrzjLlQS-GsbZVA/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white px-4 py-2 hover:bg-[#ffff00] hover:text-black transition-colors"
              >
                <LinkIcon size={12} />
                Supporting Documents
              </a>
            </div>
          </motion.div>

          {/* Metrics Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white border-2 border-white">
            {metrics.map(([n, l], i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
                className="bg-black p-5 hover:bg-[#ffff00] hover:text-black transition-colors group"
              >
                <div className="font-display font-black text-4xl md:text-5xl tracking-[-0.04em] leading-none">
                  {n}
                </div>
                <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.12em] text-white/60 group-hover:text-black/70 mt-3 leading-relaxed">
                  {l}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}