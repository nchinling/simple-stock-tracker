import "./styles/Header.css";

function Header(props) {
  return (
    <header>
      <h1 className="header">{props.title}</h1>
    </header>
  );
}

export { Header };
