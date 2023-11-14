import React from 'react';
import { Link } from 'react-router-dom';
import {
  RiFacebookLine,
  RiInstagramLine,
  RiLinkedinLine,
} from 'react-icons/ri';

const Social = () => {
  return (
    <div className="flex items-center gap-x-3 text-base">
      <Link
        to="https://github.com/Calstins"
        className="hover:text-accent transition-all duration-300"
        target="_blank"
      >
        <RiFacebookLine />
      </Link>
      <Link
        to="https://www.instagram.com/calstins/"
        className="hover:text-accent transition-all duration-300"
        target="_blank"
      >
        <RiLinkedinLine />
      </Link>
      <Link
        to="https://www.instagram.com/calstins/"
        className="hover:text-accent transition-all duration-300"
        target="_blank"
      >
        <RiInstagramLine />
      </Link>
    </div>
  );
};

export default Social;
