import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Table from "../components/Queue/Table";

function QueueScreen() {
  return (
    <>
      <NavBar screen="Queue" />
      <section>
        <div className="container-fluid">
          <div className="row">
            <Table />
          </div>
        </div>
      </section>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
}

export default QueueScreen;
