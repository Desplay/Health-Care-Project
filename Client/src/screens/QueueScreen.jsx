import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import DoctorCard from "../components/Queue/DoctorCard";
import Table from "../components/Queue/Table";

function QueueScreen() {
  return (
    <>
      <NavBar screen="Queue" />
      <section>
        <div className="container-fluid">
          <div className="row">
            <DoctorCard />
            <Table />
          </div>
        </div>
      </section>
      <footer className="site-footer section-padding">
        <Footer />
      </footer>
    </>
  );
}

export default QueueScreen;
