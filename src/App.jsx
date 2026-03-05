import { About } from "./components/About";
import { Navigation } from "./components/Navigation";
import { Projects } from "./components/Projects";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div>
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact/>
      <Footer />
    </div>
  );
}

export default App;
