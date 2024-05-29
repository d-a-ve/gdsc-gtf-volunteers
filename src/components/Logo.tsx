import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link className="w-full block" to="/">
      <img
        src="/assets/logo/icon.png"
        alt="Google Tech Fair"
        width={150}
        height={150}
        className="w-full"
      />
    </Link>
  );
}
