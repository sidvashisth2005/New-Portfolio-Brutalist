import { motion } from "framer-motion";

const EASE = [0.85, 0, 0.15, 1] as const;

export function Contact() {
  return (
    <section id="contact" className="relative px-5 py-32 border-t-2 border-white overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
          (08) CONTACT / TRANSMIT
        </div>
        <div className="col-span-12 md:col-span-9">
          <motion.h2
            initial={{ opacity: 0, scaleX: 0.5 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="origin-left font-display font-black tracking-[-0.04em] leading-[0.82] text-[18vw] md:text-[14vw] uppercase"
          >
            LET&rsquo;S<br />
            <span className="text-outline-yellow">BUILD.</span>
          </motion.h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            <a
              href="mailto:siddhantvashisth05@gmail.com"
              className="group relative block border-2 border-white p-6 hover:bg-[#ffff00] hover:text-black transition-colors duration-300"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60 mb-3">EMAIL — PRIMARY</div>
              <div className="font-display font-black text-lg md:text-2xl uppercase tracking-tight break-all">
                siddhantvashisth05@gmail.com
              </div>
              <span className="absolute top-4 right-4 font-display font-black text-xl">→</span>
            </a>
            <a
              href="https://www.linkedin.com/in/siddhant-vashisth-04887b29b/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block border-2 border-white p-6 hover:bg-[#ffff00] hover:text-black transition-colors duration-300"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60 mb-3">LINKEDIN — CONNECT</div>
              <div className="font-display font-black text-lg md:text-2xl uppercase tracking-tight break-all">
                CONNECT ON LINKEDIN
              </div>
              <span className="absolute top-4 right-4 font-display font-black text-xl">→</span>
            </a>
            <a
              href="tel:+918871592579"
              className="group relative block border-2 border-white p-6 hover:bg-[#ffff00] hover:text-black transition-colors duration-300"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60 mb-3">TELEPHONE — DIRECT</div>
              <div className="font-display font-black text-lg md:text-2xl uppercase tracking-tight break-all">
                +91-88715-92579
              </div>
              <span className="absolute top-4 right-4 font-display font-black text-xl">→</span>
            </a>
          </div>
        </div>
      </div>

      <footer className="relative mt-32 pt-6 border-t-2 border-white grid grid-cols-12 gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
        <div className="col-span-6 md:col-span-3">© 2026 SIDDHANT VASHISTH</div>
        <div className="col-span-6 md:col-span-3">JUET GUNA — M.P., INDIA</div>
        <div className="col-span-12 md:col-span-6 flex md:justify-end gap-6 mt-4 md:mt-0">
          <a href="https://github.com/sidvashisth2005" className="hover:text-[#ffff00] transition-colors" target="_blank" rel="noopener noreferrer">GITHUB</a>
          <a href="https://www.linkedin.com/in/siddhant-vashisth-04887b29b/" className="hover:text-[#ffff00] transition-colors" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
        </div>
      </footer>
    </section>
  );
}