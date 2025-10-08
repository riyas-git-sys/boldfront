import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ urls, onSearchResults }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (term) => {
        setSearchTerm(term);
        
        if (!term.trim()) {
            setIsSearching(false);
            onSearchResults(null); // Clear search, show all URLs
            return;
        }

        setIsSearching(true);
        
        const filteredUrls = urls.filter(url => 
            url.longUrl.toLowerCase().includes(term.toLowerCase()) ||
            url.shortCode.toLowerCase().includes(term.toLowerCase()) ||
            `${import.meta.env.VITE_API_BASE_URL}/${url.shortCode}`.toLowerCase().includes(term.toLowerCase())
        );
        
        onSearchResults(filteredUrls);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setIsSearching(false);
        onSearchResults(null);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        handleSearch(value);
    };

    return (
        <div className="search-bar">
            <div className="search-container">
                <div className="search-input-wrapper">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by long URL, short code, or short URL..."
                        value={searchTerm}
                        onChange={handleInputChange}
                        className="search-input"
                    />
                    {searchTerm && (
                        <button 
                            onClick={clearSearch}
                            className="clear-search-btn"
                            title="Clear search"
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>
                
                {isSearching && (
                    <div className="search-info">
                        <span className="searching-text">
                            🔍 Searching...
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;