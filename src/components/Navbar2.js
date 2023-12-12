import { Fragment, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Hamburger from "hamburger-react";
import DayNightSwitch from "./DayNightSwitch";
import { AlertContext } from "../context/AlertContext";
import { logoutUser } from "../utils/api";
import Alert from "./Alert/Alert";

const navigation = [
  { name: "Collections", href: "/", current: true },
  // { name: "Categories", href: "#", current: false },
  { name: "Map", href: "/map", current: false },
  { name: "API", href: "/api", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar2() {
  const { alert, showAlert } = useContext(AlertContext);
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
  // const API_BASE_URL ="http://localhost:3000/";

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      showAlert("Logged out successfully", 5000, "success");
      navigate("/");
    } catch (error) {
      // Handle any errors
      console.error("Logout failed", error);
    }
  };

  return (
    <Disclosure
      as="nav"
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      {({ open }) => (
        <div className="navb">
          {alert.show ? (
            <Alert message={alert.message} type={alert.type} />
          ) : (
            <></>
          )}
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white-100 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Hamburger direction="right" size={18} toggled={open} />
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                <Link className="flex flex-shrink-0 items-center" to="/">
                  <img
                    className="h-7 w-auto pr-2"
                    src="/genavigate-icon.png"
                    alt="Your Company"
                  />
                  <h2 className="hidden md:block dark:text-orange-600 text-orange-600">
                    Genavigate
                  </h2>
                </Link>
                <div className="hidden md:ml-6 md:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "text-dark dark:text-white actyyve"
                              : "dark:text-gray-300 text-gray-700 hover:text-black dark:hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )
                        }
                        aria-current={({ isActive }) =>
                          isActive ? "page" : undefined
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                <DayNightSwitch />

                {/* Profile dropdown */}
                {isLoggedIn ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={`${API_BASE_URL}/img/users/${user.photo}`}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-gray-600 dark:text-gray-300 dark:bg-gray-700 z-50">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active
                                  ? "bg-gray-100 dark:bg-gray-600 dark:text-gray-200"
                                  : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              My Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/favorites"
                              className={classNames(
                                active
                                  ? "bg-gray-100 dark:bg-gray-600 dark:text-gray-200"
                                  : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              My Favorites
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active
                                  ? "bg-gray-100 block w-full text-left dark:bg-gray-600 dark:text-gray-200"
                                  : "",
                                "block px-4 py-2 text-sm w-full text-left"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <>
                    <Link
                      className="relative inline-flex items-center justify-center p-0.5 mx-2 overflow-hidden md:text-sm text-xs font-medium text-gray-900 hover:shadow-md rounded-lg group bg-gradient-to-br from-orange-400 to-red-500 group-hover:from-orange-400 group-hover:to-red-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-red-800"
                      to="/login"
                    >
                      <span className="relative md:px-5 px-1.5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-opacity-0">
                        Login
                      </span>
                    </Link>

                    <Link
                      className="text-white bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 hover:shadow-md focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-red-800 font-medium rounded-lg md:text-sm text-xs md:px-5 px-1.5 py-2 text-center transition-all ease-in"
                      to="/signup"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <Transition
            show={open}
            enter="transition duration-150 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-150 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    // as="a"
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-gray-200 text-black dark:bg-gray-900 dark:text-white"
                          : "text-gray-500 hover:bg-gray-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )
                    }
                    aria-current={({ isActive }) =>
                      isActive ? "page" : undefined
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
}
