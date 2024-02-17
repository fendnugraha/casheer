import ApplicationLogo from "@/Components/ApplicationLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import NavLink from "./NavLink";

export default function NavBar() {
  const [isActive, setIsActive] = useState(false);

  function toggleActive() {
    setIsActive(!isActive);
  }
  return (
    <>
      <nav className='bg-slate-800 h-16'>
        <div className='container mx-auto flex h-full items-center justify-between'>
          <div className='nav-brand text-2xl font-black text-white'>
            Co.Cash<span className='text-orange-400'>ee</span>r
          </div>
          <ul className='flex gap-5 text-white'>
            <li>
              <NavLink href='#' className='hover:text-yellow-100'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink href='/sales' className='hover:text-yellow-100' active={isActive}>
                Sales Order
              </NavLink>
            </li>
            <li>
              <NavLink href='#' className='hover:text-yellow-100' active={isActive} onClick={() => toggleActive}>
                Purchase Order
              </NavLink>
            </li>
            <li>
              <NavLink href='#' className='hover:text-yellow-100'>
                About
              </NavLink>
            </li>
            <li>
              <NavLink href='#' className='hover:text-yellow-100'>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className='sub-nav bg-gray-600 p-1 flex justify-center'>
        <ul className='flex gap-3 text-white'>
          <li>
            <NavLink href='/products' className='hover:text-yellow-100'>
              List of product
            </NavLink>
          </li>
          <li>
            <NavLink href='#' className='hover:text-yellow-100'>
              Transaction
            </NavLink>
          </li>
          <li>
            <NavLink href='#' className='hover:text-yellow-100'>
              Report
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
