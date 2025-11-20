import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    window.location.href = "mailto:pablokahura@gmail.com";
  };

  return (
    <section id="hero" className="min-h-screen w-full relative px-6 lg:px-12 py-16 overflow-hidden flex flex-col justify-center">
      {/* Background Pattern & Frame */}
      <div className="absolute inset-0 bg-[#fafafa] -z-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />
      
      <div className="absolute inset-4 md:inset-8 border border-gray-200/50 rounded-[2rem] pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-gray-300 rounded-tl-[2rem]" />
        <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-gray-300 rounded-tr-[2rem]" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-gray-300 rounded-bl-[2rem]" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-gray-300 rounded-br-[2rem]" />
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-purple-500 rounded-full" />
            <span className="text-gray-600 font-semibold tracking-wide text-sm uppercase">Full Stack Engineer</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-gray-900 mb-8 text-center">
            PAUL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
              KAHURA
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl leading-relaxed mb-12 mx-auto text-center">
            Architecting digital experiences at the intersection of{' '}
            <span className="text-gray-900 font-semibold">human creativity</span> and{' '}
            <span className="text-gray-900 font-semibold">artificial intelligence</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={scrollToProjects}
              className="px-10 py-5 bg-gradient-to-r from-red-500 to-purple-600 text-white font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 group"
            >
              View Projects
              <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
            </button>
            <button
              onClick={scrollToContact}
              className="px-10 py-5 border-2 border-gray-300 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 font-bold"
            >
              Contact Me
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        className="absolute left-1/2 -translate-x-1/2 bottom-10 flex flex-col items-center gap-2 text-gray-400"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll to Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gray-400 to-transparent" />
      </motion.div>
    </section>
  );
};
