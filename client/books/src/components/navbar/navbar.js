import React, { useState } from 'react';
import book from '../assets/book.png'

const Navbar = ({ user }) => {

    // Created a Toggle for Navigation Bar in Small Screens
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    // Created Dummy Data Such as - Home, About & Books
    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center ml-5">
                    <img src={book} width={30} alt="" />
                    <span className="text-white text-lg font-bold ml-5">Books Matching Web App</span>
                </div>
                <div className="md:hidden">
                    <button
                        type="button"
                        className="text-white focus:outline-none focus:text-white"
                        onClick={toggleNavbar}
                    >
                        {isOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        )}
                    </button>
                </div>
                <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
                    <ul className="md:flex space-x-20">
                        <li>
                            <span className="text-white hover:text-gray-300 cursor-pointer">Home</span>
                        </li>
                        <li>
                            <span className="text-white hover:text-gray-300 cursor-pointer">About</span>
                        </li>
                        <li>
                            <span className="text-white hover:text-gray-300 cursor-pointer">Books</span>
                        </li>
                        <li>
                            <a href="/" className="text-white hover:text-gray-300">
                                Logout -  {user}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
