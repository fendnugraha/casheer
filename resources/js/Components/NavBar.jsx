import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  return (
    <>
      <nav className='bg-slate-800 h-16'>
        <div className='container mx-auto flex h-full items-center justify-between'>
          <div className='nav-brand text-2xl font-black text-white'>
            Co.Cash<span className='text-orange-400'>ee</span>r
          </div>
          <ul className='flex gap-5 text-white'>
            <li>
              <a href='#' className='hover:text-yellow-100'>
                Home
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-yellow-100'>
                About
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-yellow-100'>
                Contact
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-yellow-100'>
                <FontAwesomeIcon icon={faCartShopping} />
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className='sub-nav bg-gray-600 p-1 flex justify-center'>
        <ul className='flex gap-3 text-white'>
          <li>
            <a href='#' className='hover:text-yellow-100'>
              List of product
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-yellow-100'>
              Transaction
            </a>
          </li>
          <li>
            <a href='#' className='hover:text-yellow-100'>
              Report
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
