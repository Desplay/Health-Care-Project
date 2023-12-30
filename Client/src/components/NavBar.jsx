import { Link } from "react-router-dom";

export default function NavBar(props) {
  // eslint-disable-next-line react/prop-types
  const screen = props.screen;
  return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top shadow-lg">
      <div className="container">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                to="/Lobby"
                className={
                  screen == "Lobby"
                    ? "navbar-brand d-none d-lg-block"
                    : "nav-link"
                }
              >
                Lobby Room
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/QueueRoom"
                className={
                  screen == "Queue"
                    ? "navbar-brand d-none d-lg-block"
                    : "nav-link"
                }
              >
                Queue Room
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
