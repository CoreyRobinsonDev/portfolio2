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
    <Header />
    <main>
      <About/>
      <Projects />
      <Skills />
      <Contact/>
    </main>
    <Footer/>
  </>
}

export default App;
