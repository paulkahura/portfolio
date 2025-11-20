import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';
import { Link } from 'react-router-dom';

export const Blog = () => {
  return (
    <section id="blog" className="min-h-screen w-full py-32 px-6 lg:px-12 relative bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <h2 className="text-5xl md:text-7xl font-black text-gray-900">
            LATEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">INSIGHTS</span>
          </h2>
          <p className="text-gray-600 max-w-md text-right">
            Deep dives into engineering challenges, system architecture, and the future of AI integration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex gap-4 text-xs text-gray-500 mb-4 font-mono">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-500 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                      <Tag size={10} /> {tag}
                    </span>
                  ))}
                </div>

                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-red-500 transition-colors mt-auto"
                >
                  Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

