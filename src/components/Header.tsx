
import '../styles/header.scss';

interface HeaderProps {
  title: string;
}

export function Header(props: HeaderProps) {
  return (
    <header>
      <span className="category">Categoria:<span> {props.title}</span></span>
    </header>
  );
}