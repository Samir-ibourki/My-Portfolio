import { About } from "./components/About";
import { Navigation } from "./components/Navigation";
import { Projects } from "./components/Projects";
import { Hero } from "./components/Hero";

function App() {
  return (
    <div>
      <Navigation />
      <Hero />
      <About />
      <Projects />
    </div>
  );
}

export default App;
