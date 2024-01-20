import Footer from "../components/Footer";
import Background from "../components/Home/Background";
import NavBar from "../components/NavBar";

export default function HomeScreen() {
  return (
    <>
      <NavBar screen="Home"/>
      <section className="section-padding">
        <Background />
      </section>
      <footer className="site-footer section-padding">
        <Footer />
      </footer>
    </>
  );
}
