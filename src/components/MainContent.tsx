import { Hero } from './ui/Hero';
import { Projects } from './ui/Projects';
import { About } from './ui/About';
import { Blog } from './ui/Blog';
import { QuickNav } from './ui/QuickNav';
import { ThemeSwitcher } from './ui/ThemeSwitcher';
import { BackgroundCubes } from './3d/BackgroundCubes';
import { Element } from 'react-scroll';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export const MainContent = () => {
  return (
    <div className="relative w-full">
      <BackgroundCubes />
      <QuickNav />
      <ThemeSwitcher />

      <Element name="hero">
        <Hero />
      </Element>

      <Element name="about">
        <About />
      </Element>

      <Element name="projects">
        <Projects />
      </Element>

      <Element name="blog">
        <Blog />
      </Element>

      <footer className="relative z-10 py-20 px-6 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black text-gray-900 mb-2">PAUL KAHURA</h2>
            <p className="text-gray-600 text-sm">Building the future, one line of code at a time.</p>
          </div>

          <div className="flex gap-6">
            {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-3 bg-gray-100 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          <div className="text-center md:text-right text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} All rights reserved.</p>
            <p>Made with 🕷️ & React Three Fiber.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
