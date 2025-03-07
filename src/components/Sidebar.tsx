import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="bg-white text-white w-64 h-full pt-4 pb-4">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-black block p-2 bg-gray-200"
                : "text-black block p-2"
            }
          >
            Stores
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/skus"
            className={({ isActive }) =>
              isActive
                ? "text-black block p-2 bg-gray-200"
                : "text-black block p-2"
            }
          >
            SKUs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/planning"
            className={({ isActive }) =>
              isActive
                ? "text-black block p-2 bg-gray-200"
                : "text-black block p-2"
            }
          >
            Planning
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/charts"
            className={({ isActive }) =>
              isActive
                ? "text-black block p-2 bg-gray-200"
                : "text-black block p-2"
            }
          >
            Charts
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
