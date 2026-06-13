import { motion } from "framer-motion";
import { SliceHeading } from "./SliceHeading";

const moments = [
  { id: 1, caption: "My HackNITR trophy.", img: "https://images.unsplash.com/photo-1578269174936-2709b5a19083?w=400&auto=format&fit=crop&q=80" },
  { id: 2, caption: "Discussing my project with the Vice Chancellor of my university.", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&auto=format&fit=crop&q=80" },
  { id: 3, caption: "Facilitation ceremony of my HackNITR win.", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&auto=format&fit=crop&q=80" },
  { id: 4, caption: "My amazing teammates.", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80" },
  { id: 5, caption: "Receiving the prize at NIT.", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=80" },
  { id: 6, caption: "Presenting my project at the NIT hackathon to the chairman.", img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&auto=format&fit=crop&q=80" },
  { id: 7, caption: "Presenting my project at the NIT hackathon in front of the jury.", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=80" },
  { id: 8, caption: "Celebrating our win at NIT.", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=80" },
  { id: 9, caption: "Delivering a solo presentation at NIT.", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&auto=format&fit=crop&q=80" },
  { id: 10, caption: "My SIH team.", img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&auto=format&fit=crop&q=80" },
  { id: 11, caption: "SIH team group photo.", img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&auto=format&fit=crop&q=80" },
  { id: 12, caption: "At Hacksagon IIITM.", img: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=400&auto=format&fit=crop&q=80" },
  { id: 13, caption: "Hacksagon IIITM experience.", img: "https://images.unsplash.com/photo-1552581230-c0152862c900?w=400&auto=format&fit=crop&q=80" },
  { id: 14, caption: "At JIIT Noida for a conference and counselling.", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&auto=format&fit=crop&q=80" },
  { id: 15, caption: "BIS tour to Guna, MP (1).", img: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=400&auto=format&fit=crop&q=80" },
  { id: 16, caption: "BIS tour to Guna, MP (2).", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop&q=80" },
  { id: 17, caption: "BIS tour to Guna, MP (3).", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&auto=format&fit=crop&q=80" },
  { id: 18, caption: "BIS tour to Guna, MP (4).", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&auto=format&fit=crop&q=80" },
  { id: 19, caption: "My BVM experience.", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=80" },
  { id: 20, caption: "Receiving an award at the National Conference.", img: "https://images.unsplash.com/photo-1496469888073-80de7e9527c6?w=400&auto=format&fit=crop&q=80" },
  { id: 21, caption: "Meeting with other coordinators at the National Conference.", img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&auto=format&fit=crop&q=80" },
  { id: 22, caption: "Receiving my certificate in college.", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop&q=80" },
  { id: 23, caption: "Me at Bhopal Vigyan Mela (BVM).", img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=400&auto=format&fit=crop&q=80" },
  { id: 24, caption: "College ceremony in the auditorium.", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&auto=format&fit=crop&q=80" }
];

export function Gallery() {
  // We duplicate the array to create a seamless infinite scroll loop
  const duplicateMoments = [...moments, ...moments];

  return (
    <section id="gallery" className="relative py-32 border-t-2 border-white bg-black overflow-hidden">
      <div className="px-5">
        <SliceHeading index="(05)" label="GALLERY">
          MOMENTS & <span className="text-outline">ACHIEVEMENTS</span>
        </SliceHeading>
      </div>

      {/* Infinite Horizontal Marquee Track */}
      <div className="relative w-full overflow-hidden mt-10 py-4 border-y-2 border-white">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 90, // adjust speed of marquee scroll
            repeat: Infinity
          }}
          className="flex gap-6 w-max whitespace-nowrap cursor-grab active:cursor-grabbing"
        >
          {duplicateMoments.map((m, idx) => (
            <div
              key={idx}
              className="inline-block w-[300px] border-2 border-white bg-black flex-shrink-0"
            >
              {/* Photo Area */}
              <div className="h-[220px] w-full border-b-2 border-white overflow-hidden bg-white/5">
                <img
                  src={m.img}
                  alt={m.caption}
                  className="h-full w-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>

              {/* Caption Area */}
              <div className="p-4 h-[90px] flex flex-col justify-between font-mono text-[9px] uppercase tracking-wider text-white select-none whitespace-normal leading-relaxed">
                <div>
                  <span className="text-[#ffff00] mr-1">[{m.id.toString().padStart(2, "0")}]</span>
                  {m.caption}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
