import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Github, Smartphone, Monitor } from 'lucide-react';
import { useState } from 'react';

const projects = [
  {
    title: "Payola",
    role: "Lead Engineer",
    description: "Cross-platform crypto payment app authenticated via biometrics. Built with Flutter for iOS/Android with a web-based admin dashboard for analytics.",
    tags: ["Flutter", "iOS/Android", "Web3", "Biometrics"],
    link: "#",
    platforms: ["mobile", "web"],
    color: "#ff6b6b"
  },
  {
    title: "Haba",
    role: "Full Stack Architect",
    description: "AI-powered group buying marketplace. Mobile app for users to find and co-import products, supported by a robust web dashboard for logistics management.",
    tags: ["Flutter", "AI Search", "Logistics", "Marketplace"],
    link: "#",
    platforms: ["mobile", "web"],
    color: "#4ecdc4"
  },
  {
    title: "Cory",
    role: "AI Developer",
    description: "Skin analysis mobile application using on-device computer vision. Features a web dashboard for dermatologists to review complex cases.",
    tags: ["Flutter", "Computer Vision", "HealthTech", "Mobile"],
    link: "#",
    platforms: ["mobile", "web"],
    color: "#95e1d3"
  },
  {
    title: "FarmBetter IVR",
    role: "Architect & Developer",
    description: "AI-powered IVR solution for farmers using Azure TTS, Twilio, and Google Cloud Functions.",
    tags: ["Azure", "Twilio", "Node.js", "AI"],
    link: "#",
    platforms: ["web"],
    color: "#f38181"
  },
  {
    title: "Smart Sustainability",
    role: "Full Stack Engineer",
    description: "IoT-enabled recycling ecosystem with smart bins and deposit refund system.",
    tags: ["IoT", "Backend", "Real-time"],
    link: "#",
    platforms: ["web", "hardware"],
    color: "#aa96da"
  },
  {
    title: "Crisis Comms",
    role: "Lead Architect",
    description: "AI-driven multi-tenant crisis management system with sentiment analysis.",
    tags: ["AI", "Sentiment Analysis", "Dashboard"],
    link: "#",
    platforms: ["web"],
    color: "#fcbad3"
  },
  {
    title: "Building Management",
    role: "Backend Developer",
    description: "End-to-end solution for managing tenants, visitors, and security access.",
    tags: ["Django", "Flutter", "REST APIs"],
    link: "#",
    platforms: ["mobile", "web"],
    color: "#ffd93d"
  }
];

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group cursor-pointer"
    >
      <div 
        className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
        style={{
          transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
          transition: 'transform 0.5s',
        }}
      >
        <div 
          className="absolute top-0 left-0 w-full h-2 rounded-t-3xl"
          style={{ backgroundColor: project.color }}
        />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-3xl font-black text-gray-900">{project.title}</h3>
            <div className="flex gap-2 text-gray-400">
              {project.platforms?.includes('mobile') && (
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Smartphone size={18} />
                </div>
              )}
              {project.platforms?.includes('web') && (
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Monitor size={18} />
                </div>
              )}
            </div>
          </div>

          <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">{project.role}</p>
          <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <a
              href={project.link}
              className="flex-1 flex justify-center items-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold text-sm"
            >
              <Github size={18} /> Code
            </a>
            <a
              href={project.link}
              className="flex-1 flex justify-center items-center gap-2 px-4 py-3 border-2 border-gray-900 text-gray-900 rounded-xl hover:bg-gray-900 hover:text-white transition-all font-semibold text-sm"
            >
              <ExternalLink size={18} /> Demo
            </a>
          </div>
        </div>

        <div 
          className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-10"
          style={{ backgroundColor: project.color }}
        />
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="min-h-screen w-full py-32 px-6 lg:px-12 relative bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            A collection of innovative solutions built with modern technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
