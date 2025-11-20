import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainContent } from './components/MainContent';
import { BlogPost } from './components/ui/BlogPost';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen font-sans bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-white">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
