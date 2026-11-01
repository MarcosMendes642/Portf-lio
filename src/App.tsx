import Header from "./components/Header";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Trajectory from "./components/Trajectory";
import About from "./components/About";
import Footer from "./components/Footer";
import { useLenis } from "./lib/useLenis";

export default function App() {
  useLenis();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <Skills />
        <Trajectory />
        <About />
      </main>
      <Footer />
    </>
  );
}
