import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Mail, Phone, ArrowUpRight, Star, Check, Zap, BarChart3, Layers, PenTool, TrendingUp, Cpu, Lock } from 'lucide-react';

// --- Components ---

const MagneticButton = ({ children, className = "", onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${className} relative`}
    >
      {children}
    </motion.button>
  );
};

const RevealText = ({ children, delay = 0, className = "" }) => {
  return (
    <div className={`overflow-hidden flex justify-center w-full ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay }}
        className="flex justify-center w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

// --- MODALS ---

const LegalModal = ({ type, onClose }) => {
  if (!type) return null;

  const content = {
    privacy: {
      title: "Privacy Policy",
      text: "At Navro Media, we value your privacy. We collect minimal data necessary to provide our services (Name, Email, Project Details). We do not sell your data to third parties. All inquiries are processed securely via encrypted channels. By using this site, you agree to the collection of this information for business communication purposes only."
    },
    terms: {
      title: "Terms of Service",
      text: "By engaging with Navro Media, you agree to our standard operating procedures. We operate on a performance-first basis. All intellectual property created during paid engagements belongs to the client upon final settlement. We reserve the right to refuse projects that do not align with our ethical standards."
    }
  };

  const data = content[type];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#111] border border-white/10 max-w-lg w-full p-8 md:p-12 relative rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
          <h2 className="text-3xl font-bold mb-6 text-white">{data.title}</h2>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            {data.text}
          </p>
          <button onClick={onClose} className="mt-8 text-sm uppercase tracking-widest text-white border-b border-white hover:text-gray-400 hover:border-gray-400 transition-colors">
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ServiceModal = ({ service, onClose, onBook }) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} 
          className="bg-[#0f0f0f] border-t md:border border-white/10 w-full max-w-6xl md:rounded-3xl relative overflow-hidden flex flex-col h-[85vh] md:h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 left-0 w-full p-8 z-20 flex justify-between items-start pointer-events-none">
             <div className="text-white/30 pointer-events-auto scale-150 origin-top-left">
                {service.icon}
             </div>
             <button onClick={onClose} className="pointer-events-auto p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                <X size={24} />
             </button>
          </div>

          <div className="p-8 md:p-16 pt-32 overflow-y-auto custom-scrollbar">
             <div className="grid md:grid-cols-2 gap-16 md:gap-24">
                <div>
                   <h2 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-none text-white font-sans uppercase">
                     {service.title}
                   </h2>
                   <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-12">
                     {service.description}
                   </p>
                   <button 
                    onClick={() => { onClose(); onBook(); }}
                    className="w-full md:w-auto bg-white text-black px-12 py-6 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center gap-3"
                  >
                    Start Project <ArrowRight size={18} />
                  </button>
                </div>

                <div className="space-y-16 mt-8 md:mt-0">
                   <div>
                      <h4 className="text-sm uppercase tracking-widest text-white/50 mb-6">The Strategy</h4>
                      <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed border-l-2 border-white/20 pl-6">
                        {service.strategy}
                      </p>
                   </div>
                   
                   <div>
                      <h4 className="text-sm uppercase tracking-widest text-white/50 mb-6">Deliverables</h4>
                      <ul className="grid grid-cols-1 gap-4">
                        {service.deliverables.map((item, i) => (
                          <li key={i} className="flex items-center gap-4 text-xl font-light text-white group">
                            <Check size={18} className="text-white/50 group-hover:text-white transition-colors" /> {item}
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const BookingModal = ({ isOpen, onClose }) => {
  const [result, setResult] = useState("");
  
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    formData.append("access_key", "004a1269-0297-40f1-ad40-ffc6299568ae");

    // Spam Protection
    if (formData.get("botcheck")) { return; }

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();
      if (data.success) {
        setResult("Request Received. Talk soon.");
        setTimeout(onClose, 2000);
      } else { setResult(data.message); }
    } catch (error) { setResult("Error. Try again."); }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-neutral-950 text-white overflow-y-auto"
        >
          <div className="min-h-screen p-6 md:p-12 flex flex-col">
            <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
              <h2 className="text-3xl font-bold tracking-tighter">START A PROJECT</h2>
              <button onClick={onClose} className="p-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={onSubmit} className="max-w-3xl mx-auto w-full space-y-12">
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">First Name</label>
                  <input type="text" name="first_name" required className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-white transition-colors" placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Last Name</label>
                  <input type="text" name="last_name" required className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-white transition-colors" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500">Email Address</label>
                <input type="email" name="email" required className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-white transition-colors" placeholder="jane@company.com" />
              </div>

              <div className="space-y-6">
                <label className="text-xs uppercase tracking-widest text-gray-500 block">Services Required</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Content Creation', 'Paid Ads (Meta/Google)', 'Branding Strategy', 'Digital Design'].map((s) => (
                    <label key={s} className="flex items-center space-x-4 cursor-pointer group">
                      <input type="checkbox" name="services" value={s} className="w-6 h-6 border-2 border-white/30 bg-transparent checked:bg-white transition-colors cursor-pointer" />
                      <span className="text-xl font-light group-hover:opacity-70 transition-opacity">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500">Additional Details</label>
                <textarea name="message" rows="3" className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-white transition-colors resize-none" placeholder="Tell us about your goals..."></textarea>
              </div>

              <div className="flex items-center justify-between pt-8">
                <button type="submit" className="bg-white text-black px-12 py-5 text-lg font-bold tracking-widest hover:bg-gray-200 transition-colors uppercase">
                  Submit Request
                </button>
                <span className="text-lg">{result}</span>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- DATA ---

const servicesData = [
  {
    title: 'Content Creation',
    icon: <PenTool size={32} />,
    description: "We don't just make videos; we engineer attention assets designed to stop the scroll instantly.",
    strategy: "We analyze viral structures on TikTok and Reels, reversing the hook-retention-reward loop. Every piece of content is built to spike dopamine and drive action.",
    deliverables: ["Short-form Video (Reels/TikTok)", "UGC Strategy", "Visual Identity Assets", "Copywriting"]
  },
  {
    title: 'Paid Ads',
    icon: <BarChart3 size={32} />,
    description: "Algorithmic dominance. We structure Meta & Google campaigns that scale ROAS and crush CPA using data-driven psychology.",
    strategy: "We move beyond basic targeting. We build 'Psychographic Funnels' that segment users by desire, not just demographics, allowing us to scale spend without losing efficiency.",
    deliverables: ["Meta Ads Management", "Google PPC", "Retargeting Funnels", "A/B Testing"]
  },
  {
    title: 'Branding Strategy',
    icon: <Layers size={32} />,
    description: "Identity that sticks. We build brands that live rent-free in your customer's head through positioning and narrative.",
    strategy: "Your brand isn't a logo; it's a gut feeling. We align your visual identity with deep market gaps to ensure you aren't just seen—you are remembered.",
    deliverables: ["Brand Voice", "Visual Systems", "Market Positioning", "Growth Roadmap"]
  },
  {
    title: 'Digital Design',
    icon: <Zap size={32} />,
    description: "User-centric aesthetics. High-performance landing pages and interfaces that convert visitors into loyalists.",
    strategy: "Beautiful websites that don't convert are useless art. We combine luxury aesthetics with direct-response UX principles to turn traffic into revenue.",
    deliverables: ["Web Design", "Landing Pages", "UI/UX", "Conversion Optimization"]
  }
];

// --- Main Application ---

export default function AgencyWebsite() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [legalOpen, setLegalOpen] = useState(null); // 'privacy' or 'terms'

  // Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Syne:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const testimonials = [
    { text: "Scaled our ad spend from $10k to $150k/mo while maintaining 4x ROAS. Insane.", author: "Sarah Jenkins, CMO" },
    { text: "The anti-agency approach is exactly what we needed. No fluff, just profit.", author: "Mark D., Founder" },
    { text: "Their creative team understands human psychology better than any agency we've used.", author: "Alex Rivera, VP Growth" },
    { text: "Revenue up 240% in Q4 alone. Navro Media is our secret weapon.", author: "Ecom Giant, CEO" },
  ];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden selection:bg-white selection:text-black" style={{ fontFamily: "'Manrope', sans-serif" }}>
      
      {/* Modals */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} onBook={() => { setSelectedService(null); setBookingOpen(true); }} />
      <LegalModal type={legalOpen} onClose={() => setLegalOpen(null)} /> {/* <-- Legal Modal Added */}
      
      {/* Noise Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      {/* Header / Nav */}
      <nav className="fixed w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference bg-gradient-to-b from-black/80 to-transparent">
        <MagneticButton>
          <div className="text-2xl font-bold tracking-tighter cursor-pointer">
            NAVRO<span className="font-light italic font-serif">MEDIA</span>
          </div>
        </MagneticButton>
        
        <div className="flex items-center gap-8">
          {[{ name: 'Capabilities', link: '#capabilities' }, { name: 'Approach', link: '#approach' }, { name: 'Results', link: '#results' }].map((item, i) => (
            <a key={i} href={item.link} className="hidden md:block text-sm font-medium uppercase tracking-widest hover:text-gray-400 transition-colors">
              {item.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-32 relative overflow-hidden">
        
        {/* 3D Moving Blob Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
           <motion.div
             animate={{ scale: [1, 1.3, 1], rotate: [0, 120, 0], opacity: [0.1, 0.2, 0.1] }}
             transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
             className="absolute w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] mix-blend-overlay"
           />
           <motion.div
             animate={{ scale: [1.2, 1, 1.2], rotate: [0, -120, 0], opacity: [0.15, 0.25, 0.15] }}
             transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
             className="absolute w-[600px] h-[600px] bg-neutral-500/10 rounded-full blur-[120px] mix-blend-overlay"
           />
        </div>

        <div className="max-w-[90vw] mx-auto z-10 relative">
          <RevealText className="mb-2"><h1 className="text-[18vw] md:text-[10vw] leading-[0.85] font-light tracking-tighter">WE DON'T</h1></RevealText>
          <RevealText delay={0.1} className="mb-2"><h1 className="text-[18vw] md:text-[10vw] leading-[0.85] font-light tracking-tighter font-serif italic text-gray-400">FOLLOW</h1></RevealText>
          <RevealText delay={0.2}><h1 className="text-[18vw] md:text-[10vw] leading-[0.85] font-light tracking-tighter">TRENDS.</h1></RevealText>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 max-w-4xl pt-8"
          >
            <p className="max-w-md text-lg text-gray-400 font-light leading-relaxed mb-8">
              We hack human psychology to scale brands. No retainers. Just aggressive growth and creative that forces people to stop scrolling.
            </p>
            
            <div className="flex items-center gap-6">
              <MagneticButton onClick={() => setBookingOpen(true)}>
                <div className="px-10 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-3">
                  Start Project <ArrowRight size={18} />
                </div>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-32 bg-[#0a0a0a] px-6 border-y border-white/10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { label: "Revenue Generated", value: "$5.4M+" },
            { label: "Years Experience", value: "5+" },
            { label: "Satisfied Clients", value: "60+" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-12 md:py-0 px-4 text-center">
              <RevealText delay={i * 0.1} className="flex justify-center w-full">
                <h3 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 text-white font-sans leading-none">
                  {stat.value}
                </h3>
              </RevealText>
              <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-gray-500 font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS / ANTI-AGENCY */}
      <section id="approach" className="py-32 bg-white text-black px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-bold tracking-widest mb-12 uppercase opacity-50">Our Approach</p>
          <RevealText>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-24 tracking-tight">
              We specialize in <span className="font-serif italic text-gray-500">aggressive growth</span>. The old agency model is dead. We don't do fluff. We do numbers.
            </h2>
          </RevealText>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div><img src="/assets/project5.jpg" alt="Strategy" className="w-full aspect-square object-cover grayscale" /></div>
            <div className="flex flex-col justify-center">
               <div className="grid grid-cols-1 gap-12">
                  <div className="border-t border-black/10 pt-8"><div className="flex items-center gap-4 mb-4"><TrendingUp size={24} /><h3 className="text-2xl font-bold">Profit Over Awards</h3></div><p className="text-lg text-gray-600 leading-relaxed">We don't care about Cannes Lions. We care about your ROAS. Every creative decision is made to lower CPA and increase LTV.</p></div>
                  <div className="border-t border-black/10 pt-8"><div className="flex items-center gap-4 mb-4"><Cpu size={24} /><h3 className="text-2xl font-bold">Data-Driven Creative</h3></div><p className="text-lg text-gray-600 leading-relaxed">We don't guess. We iterate. We test hundreds of hooks, angles, and formats to find the winning combination that scales.</p></div>
                  <div className="border-t border-black/10 pt-8"><div className="flex items-center gap-4 mb-4"><Lock size={24} /><h3 className="text-2xl font-bold">No Retainers (Results First)</h3></div><p className="text-lg text-gray-600 leading-relaxed">We believe in earning our keep. Our flexible structures mean we are incentivized to grow your business, not just bill hours.</p></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-light mb-24 tracking-tight">Our Capabilities</h2>
          <div className="grid grid-cols-1 gap-4">
            {servicesData.map((service, i) => (
              <div key={i} onClick={() => setSelectedService(service)} className="group border-t border-white/20 py-12 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors px-4">
                <div className="flex items-center gap-8"><span className="text-white/30 font-mono text-xl">0{i+1}</span><h3 className="text-3xl md:text-5xl font-light group-hover:pl-4 transition-all duration-300">{service.title}</h3></div>
                <div className="flex items-center gap-4"><span className="text-xs uppercase tracking-widest text-gray-500 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">Explore</span><ArrowUpRight className="text-white" size={32} /></div>
              </div>
            ))}
            <div className="border-t border-white/20"></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="results" className="py-32 bg-[#0a0a0a] overflow-hidden">
        <div className="mb-20 px-6 md:px-12 text-center"><h2 className="text-3xl font-serif italic mb-4">Client Feedback</h2><p className="text-gray-500 uppercase tracking-widest text-xs">Real Results</p></div>
        <div className="relative flex overflow-x-hidden">
          <motion.div className="flex gap-8 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 30 }}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-[400px] md:w-[500px] bg-neutral-900/50 p-8 border border-white/5 rounded-sm whitespace-normal flex flex-col justify-between">
                <div className="flex gap-1 mb-4">{[1,2,3,4,5].map(star => <Star key={star} size={16} fill="white" stroke="none" />)}</div>
                <p className="text-lg font-light leading-relaxed mb-6">"{t.text}"</p>
                <p className="text-xs uppercase tracking-widest text-gray-500">{t.author}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#0a0a0a] pt-32 pb-12 px-6 md:px-12 min-h-[60vh] flex flex-col justify-between border-t border-white/10">
        <div onClick={() => setBookingOpen(true)}><RevealText><h2 className="text-[12vw] leading-none font-light tracking-tighter hover:text-gray-400 transition-colors cursor-pointer">LET'S SCALE</h2></RevealText></div>
        <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-12 gap-8">
          <div className="flex gap-8">
             {/* UPDATED EMAIL LINK */}
             <MagneticButton><a href="mailto:Navromedia@gmail.com" className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Mail size={18} /></a></MagneticButton>
             <MagneticButton><a href="tel:+1234567890" className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Phone size={18} /></a></MagneticButton>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm mb-2">BASED IN</p><p className="text-xl font-light mb-8">Kandy, Sri Lanka</p>
            <p className="text-gray-500 text-sm mb-2">INQUIRIES</p>
            {/* UPDATED DISPLAY EMAIL */}
            <a href="mailto:Navromedia@gmail.com" className="text-2xl font-serif italic hover:text-gray-400 transition-colors">Navromedia@gmail.com</a>
            
            {/* LEGAL LINKS (Functional) */}
            <div className="mt-8 flex justify-end gap-6 text-xs text-gray-600 uppercase tracking-widest">
                <button onClick={() => setLegalOpen('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
                <button onClick={() => setLegalOpen('terms')} className="hover:text-white transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}