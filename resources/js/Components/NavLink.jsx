import { Link } from "@inertiajs/react";

export default function NavLink({ active = false, className = "", children, ...props }) {
  return (
    <Link {...props} className={"transition duration-150 ease-in-out focus:outline-none " + (active ? "border-indigo-400 text-yellow-500 focus:border-indigo-700 " : "border-transparent text-white hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ") + className}>
      {children}
    </Link>
  );
}
