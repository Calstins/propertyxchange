import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HiOutlineSpeakerWave } from 'react-icons/hi2';
import ContactItems from './ContactItems';
import CopyrightYear from './CopyrightYear';
import Social from './Social';

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="w-full bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-3 flex items-center justify-between py-4">
          <div
            className="font-bold line-6 text-lg cursor-pointer"
            onClick={() => navigate('/')}
          >
            Property<span className="text-blue-500 font-extrabold">X</span>
            change
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
          >
            <Link className="flex justify-center items-center" to="/advertise">
              <HiOutlineSpeakerWave className="mr-2" /> Advertise with Us
            </Link>
          </button>
        </div>
      </div>
      <div className="bg-gray-700 text-white py-4 flex flex-wrap list-none">
        <div className="flex-1 p-6">
          <h3 className="font-semibold text-start py-4">About Us</h3>
          <p className="text-sm text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum
            officia incidunt ipsum neque. Officiis numquam hic asperiores
            quibusdam sint quam qui debitis repudiandae vero similique?
          </p>
          <li>
            <Link
              to="/about"
              className="hover:text-blue-500 transition-color ease-in-out duration-300 text-sm"
            >
              Read More...
            </Link>
          </li>
        </div>
        <div className="flex-1 p-6">
          <h3 className="font-semibold py-4 text-start">Contact Us</h3>
          <ContactItems />
        </div>
        <div className="flex-1 p-6">
          <h3 className="font-semibold text-start py-4">
            Featured Properties in Nigeria
          </h3>
          <div className="text-sm">
            <li>
              <Link to="/about">Furnished Properties (Rent)</Link>
            </li>
            <li>
              <Link to="/about">Newly Built Properties (Rent)</Link>
            </li>
            <li>
              <Link to="/about">Furnished Properties (Sale)</Link>
            </li>
            <li>
              <Link to="/about">Newly Built Properties (Sale)</Link>
            </li>
          </div>
        </div>
        <div className="flex-1 p-6">
          <h3 className="font-semibold text-start py-4">Popular States</h3>
          <div className="text-sm">
            <li>
              <Link to="/about">Lagos</Link>
            </li>
            <li>
              <Link to="/about">Lagos</Link>
            </li>
            <li>
              <Link to="/about">Lagos</Link>
            </li>
            <li>
              <Link to="/about">Lagos</Link>
            </li>
            <li>
              <Link to="/about">Lagos</Link>
            </li>
          </div>
        </div>
        <div className="flex-1 p-6">
          <h3 className="font-semibold text-start py-4">Popular Cities</h3>
          <div className="text-sm">
            <li>
              <Link to="/about">Ikeja</Link>
            </li>
            <li>
              <Link to="/about">Ikeja</Link>
            </li>
            <li>
              <Link to="/about">Ikeja</Link>
            </li>
            <li>
              <Link to="/about">Ikeja</Link>
            </li>
            <li>
              <Link to="/about">Ikeja</Link>
            </li>
          </div>
        </div>
      </div>
      <div className="border-t border-solid border-gray-400 px-4"></div>
      <div className="bg-gray-700 text-white p-4 flex list-none flex justify-between items-center">
        <CopyrightYear />
        <Social />
      </div>
    </div>
  );
};

export default Footer;
