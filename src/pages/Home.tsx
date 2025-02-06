import { Outlet } from "react-router-dom";
import { NavMenu } from "../components/NavMenu";

function Home() {
  return (
    <div className="pokemon-league-registration">
      <NavMenu />
      <div id="page-container" className="p-4">
        {/* This is where the page content is loaded */}
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
