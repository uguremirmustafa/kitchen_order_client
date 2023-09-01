import { useAuth } from 'components/wrappers/auth-wrapper';
import { MENU_ITEMS } from 'lib/constants';
import { Link, useLocation } from 'react-router-dom';

export default function DefaultNavbar() {
  const location = useLocation();
  const { logout, user } = useAuth();
  return (
    <nav className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown md:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
          >
            {MENU_ITEMS.map((x) => {
              return (
                <li key={x.path}>
                  <Link className={x.path === location.pathname ? 'active' : ''} to={x.path}>
                    {x.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <ul tabIndex={0} className="menu menu-horizontal px-1">
          {MENU_ITEMS.map((x) => {
            return (
              <li key={x.path}>
                <Link className={x.path === location.pathname ? 'active' : ''} to={x.path}>
                  {x.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Kitchenaro
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end ">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://www.gravatar.com/avatar/4673e7b84bc6ea92c9ed70d90a452dc0?s=160&d=mp&r=PG" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu dropdown-content bg-base-300 rounded-box w-40"
          >
            <li>
              <Link to="/profile">Profile ({user?.firstName})</Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={() => logout()}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
