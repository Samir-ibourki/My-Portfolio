import { About } from "./components/About";
import { Navigation } from "./components/Navigation";
import { Projects } from "./components/Projects";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";

function App() {
  return (
    <div>
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
    </div>
  );
}

export default App;
