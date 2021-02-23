import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <div style={{ paddingRight: "1em" }}>
          <a href="https://www.linkedin.com/in/michelle-sangeun-yi">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        </div>
        <div style={{ paddingLeft: "1em" }}>
          <a href="https://github.com/M-eLL">
            <i className="fab fa-github fa-2x"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
