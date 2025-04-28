import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Musicians } from './pages/Musicians';
import { Concerts } from './pages/Concerts';
import { InMemoriam } from './pages/InMemoriam';
import { Donate } from './pages/Donate';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/musicians" element={<Musicians />} />
          <Route path="/concerts" element={<Concerts />} />
          <Route path="/in-memoriam" element={<InMemoriam />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
