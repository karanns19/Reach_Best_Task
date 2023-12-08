import Navbar from "../navbar/navbar";
import '../main.css'
import React, { useState } from 'react';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import data from '../mainbody/service'

// Component Including the Main Book App with Navbar Component

const Mainbody = ({ isLogin, username }) => {
    const [topMatches, setTopMatches] = useState([]);
    const [genres, setGenres] = useState("")
    const [authors, setAuthors] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleGenreChange = (event) => {
        setGenres(event.target.value);
    };

    // Created Submit Data Button Function - Which fetch books data from Google API and Update User Inputs in Database
    const submitData = () => {
        if (!submitted) {
            const genre = genres;
            const query = `subject:${genre}`;

            // Fetch book data from Google Books API based on the genre

            Loading.hourglass()
            axios.get('https://www.googleapis.com/books/v1/volumes', {
                params: {
                    q: query,
                    key: 'AIzaSyDqUrObCDtb6mCwWKtWFyM4aotE-RD_giY',
                },
            })
                .then(response => {
                    const books = response.data.items || [];
                    if (books.length === 0) {
                        console.log('No books found based on the given genre.');
                        return;
                    }

                    const ratedBooks = books
                        .filter(book => book.volumeInfo.averageRating !== undefined)
                        .sort((a, b) => b.volumeInfo.averageRating - a.volumeInfo.averageRating);

                    // Select top 5 books with the best average rating

                    const matches = ratedBooks.slice(0, 5).map(book => {
                        const bookInfo = book.volumeInfo;
                        return {
                            title: bookInfo.title,
                            author: bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author',
                            averageRating: bookInfo.averageRating,
                        };
                    });
                    setTopMatches(matches);
                    Loading.remove()
                    Notify.success("Submitted Successfully")
                    setSubmitted(true)
                })
                .catch(error => {
                    console.error('Error fetching book data:', error.message);
                });
                
                axios.put('http://localhost:3001/users/update/'+ data.id, {genres,authors});
        }
    }
    return (
        <>
            {isLogin === "loggedIn" ?
                (<div className="mainbody">
                    <Navbar user={username}></Navbar>
                    <div className="p-6 flex justify-between">
                        <div className="w-6/12 p-6 bg-gray-800">
                            <h1 className="font-semibold text-white text-xl">Input Fields :-</h1>
                            <label className="userLabel" htmlFor="">Which genres do you enjoy reading ?</label>
                            <select id="genre" value={genres} onChange={handleGenreChange} disabled={submitted}>
                                <option value="">Select Your Option</option>
                                <option value="Mystery">Mystery</option>
                                <option value="Science">Science</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Horror">Horror</option>
                                <option value="Historical">Historical</option>
                                <option value="Biography">Biography</option>
                                <option value="Philosophy">Philosophy</option>
                            </select>
                            <label className="userLabel" htmlFor="">Who is your favorite author ?</label>
                            <input type="text" value={authors} onChange={(e)=>setAuthors(e.target.value)} className="userInput" disabled={submitted} />
                            <button className="text-gray-800 bg-white p-2 pl-6 pr-6 mt-8 rounded-lg" onClick={submitData}>Submit</button>
                        </div>
                        <div className="w-5/12 p-6 bg-gray-800">
                            <h1 className="font-semibold text-white text-xl">Results (Top 5 Matches):-</h1>
                            <ul className="lists">
                                {topMatches.map((match, index) => (
                                    <li key={index}>
                                        <strong>{match.title}</strong> by {match.author} (Average Rating: {match.averageRating})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>) : (
                    <div>
                        <h1>Please Login in order to access the Page {isLogin}</h1>
                    </div>
                )
            }
        </>

    );
};

export default Mainbody;