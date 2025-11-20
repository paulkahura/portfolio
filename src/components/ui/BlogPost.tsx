import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';

export const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <Link to="/" className="text-accent hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-dark relative z-20 pt-24 pb-20 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        <header className="mb-12">
          <div className="flex gap-6 text-sm text-accent font-mono mb-6">
             <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
             <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-3">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div 
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-white
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-ul:text-gray-300
            prose-li:marker:text-accent"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />

        <hr className="my-12 border-white/10" />

        <div className="flex justify-between items-center">
           <p className="text-gray-400 italic">Thanks for reading!</p>
           <button className="flex items-center gap-2 text-white hover:text-accent transition-colors">
             <Share2 size={20} /> Share this post
           </button>
        </div>
      </div>
    </motion.article>
  );
};

