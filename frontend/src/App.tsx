import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Link to="/"> Home </Link>
        <Link to="/otherpage"> Other Page </Link>
      </div>
      <Outlet />
    </>
  );
}

export default App;
