import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <div style={{ paddingRight: "1em" }}>
          <a href="https://www.linkedin.com/in/michelle-sangeun-yi">
            <i class="fab fa-linkedin fa-2x"></i>
          </a>
        </div>
        <div style={{ paddingLeft: "1em" }}>
          <a href="https://github.com/M-eLL">
            <i class="fab fa-github fa-2x"></i>
          </a>
        </div>
      </div>
      <p style={{ fontSize: "medium" }}>
        CREATED BY MICHELLE YI
      </p>
    </div>
  );
};

export default Footer;
