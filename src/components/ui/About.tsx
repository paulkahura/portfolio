import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { User, GraduationCap, Briefcase, Code2, Calendar, MapPin } from 'lucide-react';

export const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={containerRef} className="min-h-screen w-full py-32 px-6 lg:px-12 relative overflow-hidden">
      {/* Creative Background Elements */}
      <div className="absolute inset-0 bg-[#f8f8fa] -z-20" />
      <div className="absolute inset-0 opacity-30" 
           style={{ 
             backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }} 
      />
      
      <div className="absolute inset-0 -z-10 overflow-hidden">
         <motion.div 
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              x: [0, 50, 0], 
              y: [0, 30, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-[100px]" 
        />
        <motion.div 
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.2, 1],
              x: [0, -30, 0], 
              y: [0, 50, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px]" 
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6 mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-black text-gray-900 tracking-tighter">
            ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">ME</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="md:col-span-5 space-y-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="group bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <User size={120} />
              </div>
              
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform">
                <User size={24} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Profile</h3>
              <p className="text-gray-600 leading-relaxed text-lg relative z-10">
                Software Engineer with extensive experience designing, developing, and deploying full-stack web and mobile applications. Skilled in <span className="text-purple-600 font-semibold">AI integration</span>, cloud computing, and UI/UX optimization.
              </p>
            </motion.div>

            {/* Tech Stack Card - Creative Redesign */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 1 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ delay: 0.1 }}
              className="group bg-gray-900 p-8 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden text-white"
            >
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-white">
                <Code2 size={120} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 -z-10" />

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Code2 size={24} />
                </div>
                <h3 className="text-2xl font-bold">Tech Arsenal</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h5 className="text-xs font-bold text-purple-300 uppercase tracking-widest mb-3 opacity-80">Languages</h5>
                  <div className="flex flex-wrap gap-2">
                    {['TypeScript', 'JavaScript', 'Python', 'Dart', 'SQL'].map((tech) => (
                      <span key={tech} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg text-xs font-medium border border-white/10 hover:border-purple-400 transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                   <h5 className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-3 opacity-80">Frameworks</h5>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'Flutter', 'Angular', 'Django'].map((tech) => (
                      <span key={tech} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg text-xs font-medium border border-white/10 hover:border-blue-400 transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                   <h5 className="text-xs font-bold text-pink-300 uppercase tracking-widest mb-3 opacity-80">Cloud & AI</h5>
                  <div className="flex flex-wrap gap-2">
                    {['GCP / Azure', 'Firebase', 'OpenAI', 'Gemini', 'GraphQL'].map((tech) => (
                      <span key={tech} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg text-xs font-medium border border-white/10 hover:border-pink-400 transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-7 space-y-8">
            {/* Experience Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 2 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ delay: 0.2 }}
              className="group bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Briefcase size={120} />
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Experience</h3>
              </div>

              <div className="space-y-8 relative before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-20px)] before:w-[2px] before:bg-gray-100">
                <div className="relative pl-10">
                   <span className="absolute left-0 top-1.5 w-8 h-8 bg-white border-2 border-purple-500 rounded-full flex items-center justify-center z-10">
                     <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse" />
                   </span>
                   <h4 className="text-xl font-bold text-gray-900">ThreePoint DevHub</h4>
                   <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-1 mb-2">
                     <span className="text-purple-600 font-bold">Co-Founder & Tech Lead</span>
                     <span className="text-gray-400">|</span>
                     <span className="text-gray-500">Part-time</span>
                   </div>
                </div>

                <div className="relative pl-10">
                   <span className="absolute left-0 top-1.5 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center z-10">
                     <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                   </span>
                   <h4 className="text-xl font-bold text-gray-900">Elewa/Italanta</h4>
                   <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-1 mb-2">
                     <span className="text-gray-600 font-medium">Full Stack Engineer</span>
                     <span className="text-gray-400">|</span>
                     <span className="text-gray-500">Aug 2023 - Present</span>
                   </div>
                </div>

                <div className="relative pl-10">
                   <span className="absolute left-0 top-1.5 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center z-10">
                     <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                   </span>
                   <h4 className="text-xl font-bold text-gray-900">Netbot Solutions</h4>
                   <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-1 mb-2">
                     <span className="text-gray-600 font-medium">Full Stack Engineer</span>
                     <span className="text-gray-400">|</span>
                     <span className="text-gray-500">Oct 2022 - Jul 2023</span>
                   </div>
                </div>

                <div className="relative pl-10">
                   <span className="absolute left-0 top-1.5 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center z-10">
                     <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                   </span>
                   <h4 className="text-xl font-bold text-gray-900">Novatta Africa</h4>
                   <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-1 mb-2">
                     <span className="text-gray-600 font-medium">Web Developer</span>
                     <span className="text-gray-400">|</span>
                     <span className="text-gray-500">2019 - 2024</span>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* Education Card - Moved here */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ delay: 0.3 }}
              className="group bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <GraduationCap size={120} />
              </div>

              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                <GraduationCap size={24} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">Education</h3>
              <div>
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Jomo Kenyatta University
                </h4>
                <p className="text-gray-500 text-sm uppercase tracking-wide mt-1 font-medium">BSc Mathematics & Computer Science</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

