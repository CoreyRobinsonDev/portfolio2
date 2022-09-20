import About from '../components/About';
import CLI from '../components/CLI/CLI';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import './App.css';

function App() {
  return <>
    <CLI/>
    <main>
    <Header />
      <About/>
      <h2 id="projects" className="main__title">Projects</h2>
      <Projects />
      <h2 id="skills" className="main__title">Skills</h2>
      <Skills />
      <h2 id="contact" className="main__title">Contact</h2>
      <Contact/>
    </main>
    <Footer/>
  </>
}

export default App;
