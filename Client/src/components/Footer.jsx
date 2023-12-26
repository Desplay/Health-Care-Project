function Footer() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 me-auto col12">
          <h5 className="mb-lg-4 mb-3">Contact me</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex">
              <p>
                Email:{" "}
                <a href="mailto:desplayshido@proton.me">
                  {" "}
                  desplayshido@proton.me{" "}
                </a>
              </p>
            </li>
            <li className="list-group-item d-flex">
              <p>
                Phone number:{" "}
                <a href="tel:+84 712 345 678"> +84 712 345 678 </a>
              </p>
            </li>
          </ul>
        </div>
        <div className="col-lg-5 col-md-6 ms-auto">
          <h4 className="mb-2">Socials</h4>
          <ul className="socical-icon mb-lg-2"></ul>
          <a
            href="https://www.facebook.com/desplay.shido/"
            target="_blank"
            rel="noreferrer"
            className="social-icon-link bi-facebook"
          ></a>
          <a
            href="https://twitter.com/desplayshido"
            target="_blank"
            rel="noreferrer"
            className="social-icon-link bi-twitter"
          ></a>
          <a
            href="https://discord.gg/Zt4rE6phBu"
            target="_blank"
            rel="noreferrer"
            className="social-icon-link bi-discord"
          ></a>
          <p className="copyright-text">Thank for:</p>
          <p className="copyright-text">
            Design by
            <a
              href="https://templatemo.com/"
              target="_blank"
              rel="noreferrer"
              className="_parent"
            >
              {" "}
              TemplateMo{" "}
            </a>
          </p>
          <p className="copyright-text">
            Distributed by
            <a
              href="https://themewagon.com/"
              target="_blank"
              rel="noreferrer"
              className="_parent"
            >
              {" "}
              Themewagon{" "}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
