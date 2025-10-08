import React, { useState, useEffect } from 'react';
import UrlShortener from './components/UrlShortener';
import UrlList from './components/UrlList';
import SearchBar from './components/SearchBar';
import { getAllUrls, testBackendConnection } from './services/api';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

// Import social icons
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaInstagram, FaTwitter } from 'react-icons/fa';

function App() {
    const [serverUrls, setServerUrls] = useState([]);
    const [localUrls, setLocalUrls] = useLocalStorage('shortenedUrls', []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [connectionStatus, setConnectionStatus] = useState('checking');
    const [searchResults, setSearchResults] = useState(null);
    const [isSearchActive, setIsSearchActive] = useState(false);

    // Debug: Log current states
    console.log('🔍 App State:', {
        serverUrls,
        localUrls,
        allUrls: [...localUrls, ...serverUrls],
        searchResults,
        isSearchActive
    });

    // Simple combination - show server URLs first, then local URLs
    const allUrls = React.useMemo(() => {
        // Remove duplicates by shortCode, prioritizing server data
        const urlMap = new Map();
        
        // Add server URLs first
        serverUrls.forEach(url => {
            urlMap.set(url.shortCode, { ...url, source: 'server' });
        });
        
        // Add local URLs (won't override server URLs with same shortCode)
        localUrls.forEach(url => {
            if (!urlMap.has(url.shortCode)) {
                urlMap.set(url.shortCode, { ...url, source: 'local' });
            }
        });
        
        const combined = Array.from(urlMap.values());
        return combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [serverUrls, localUrls]);

    // URLs to display - either search results or all URLs
    const displayUrls = searchResults || allUrls;

    // Load URLs from server on component mount
    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            setError('');
            
            // Test connection first
            console.log('🔗 Testing backend connection...');
            await testBackendConnection();
            setConnectionStatus('connected');
            console.log('✅ Backend connection successful');
            
            // Then load URLs
            await loadServerUrls();
            
        } catch (err) {
            setConnectionStatus('failed');
            console.error('❌ Backend connection failed:', err);
            setError('Backend connection issue. Using local storage only.');
            setLoading(false);
        }
    };

    const loadServerUrls = async () => {
        try {
            console.log('🔄 Loading URLs from server...');
            const data = await getAllUrls();
            console.log('📥 Server URLs received:', data);
            setServerUrls(data || []);
        } catch (err) {
            console.error('❌ Error loading URLs from server:', err);
            setServerUrls([]);
        } finally {
            setLoading(false);
        }
    };

    const handleUrlCreated = (newUrl) => {
        console.log('🆕 New URL created:', newUrl);
        
        // Add to local storage with proper structure
        const urlWithDefaults = { 
            ...newUrl, 
            visits: newUrl.visits || 0,
            createdAt: newUrl.createdAt || new Date().toISOString()
        };
        
        setLocalUrls(prevUrls => [urlWithDefaults, ...prevUrls]);
        
        // Clear search when new URL is created
        setSearchResults(null);
        setIsSearchActive(false);
        
        // Refresh server URLs to get updated data
        setTimeout(() => {
            loadServerUrls();
        }, 1000);
    };

    // Function to update visit count for a specific URL
    const updateUrlVisitCount = (shortCode) => {
        console.log('👆 Updating visit count for:', shortCode);
        
        setLocalUrls(prevUrls => 
            prevUrls.map(url => 
                url.shortCode === shortCode 
                    ? { ...url, visits: (url.visits || 0) + 1 }
                    : url
            )
        );
        
        // Refresh from server to get accurate count
        setTimeout(() => {
            loadServerUrls();
        }, 500);
    };

    const handleSearchResults = (results) => {
        console.log('🔍 Search results:', results);
        setSearchResults(results);
        setIsSearchActive(results !== null);
    };

    const clearSearch = () => {
        setSearchResults(null);
        setIsSearchActive(false);
    };

    const handleRefresh = async () => {
        console.log('🔄 Manual refresh triggered');
        try {
            setLoading(true);
            // Clear search when refreshing
            setSearchResults(null);
            setIsSearchActive(false);
            await loadServerUrls();
        } finally {
            setLoading(false);
        }
    };

    const retryConnection = async () => {
        setConnectionStatus('checking');
        setError('');
        await loadInitialData();
    };

    return (
        <div className="App">
            <header className="App-header">
                <div className="header-content">
                    <h1>⚡Bold URL Shortener</h1>
                    <p>Shorten your URLs instantly and track their performance</p>
                    <div className="connection-status">
                        <span className={`status ${connectionStatus}`}>
                            Backend: {connectionStatus === 'connected' ? '✅ Connected' : 
                                    connectionStatus === 'failed' ? '❌ Disconnected' : '🔄 Checking...'}
                        </span>
                        {connectionStatus === 'failed' && (
                            <button onClick={retryConnection} className="retry-btn">
                                🔄 Retry Connection
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="main-content">
                <UrlShortener onUrlCreated={handleUrlCreated} />
                
                <div className="urls-section">
                    <div className="section-header">
                        <h2>Your Shortened URLs</h2>
                        <div className="header-actions">
                            <span className="url-count">
                                {displayUrls.length} URL{displayUrls.length !== 1 ? 's' : ''}
                                {isSearchActive && (
                                    <span className="search-count">
                                        {' '}({searchResults?.length || 0} found)
                                    </span>
                                )}
                            </span>
                            <button 
                                onClick={handleRefresh} 
                                className="refresh-btn"
                                disabled={loading}
                            >
                                {loading ? '🔄 Refreshing...' : '🔄 Refresh'}
                            </button>
                        </div>
                    </div>

                    {/* Search Bar Component */}
                    <SearchBar 
                        urls={allUrls}
                        onSearchResults={handleSearchResults}
                    />
                    
                    {isSearchActive && searchResults && searchResults.length === 0 && (
                        <div className="no-results-message">
                            <p>🔍 No URLs found matching your search criteria.</p>
                            <button onClick={clearSearch} className="clear-search-link">
                                Show all URLs
                            </button>
                        </div>
                    )}
                    
                    {error && connectionStatus === 'failed' && (
                        <div className="warning-message">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Debug info - remove in production */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="debug-info">
                            <p>📊 Debug: {allUrls.length} total URLs ({serverUrls.length} from server, {localUrls.length} from local)</p>
                        </div>
                    )}
                    
                    <UrlList 
                        urls={displayUrls} 
                        onUrlVisit={updateUrlVisitCount}
                        showAll={true}
                    />
                </div>
            </main>

            <footer className="App-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <p>Bold URL Shortener</p>
                        <div className="bonus-features">
                            <span>⭐ Created by Rizznexus</span>
                        </div>
                    </div>
                    
                    <div className="footer-section">
                        <h2 className="connect-title">
                            Let's Connect
                        </h2>

                        {/* Social Icons */}
                        <div className="social-icons">
                            <a 
                                href="https://github.com/riyas-git-sys" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="social-link"
                            >
                                <FaGithub />
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/riyas-ahameda" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="social-link"
                            >
                                <FaLinkedin />
                            </a>
                            <a 
                                href="mailto:ecriyasahameda@gmail.com?subject=Let%27s%20Connect%20-%20Saw%20Your%20Portfolio&body=Hi%20Riyas%2C%0D%0AI%20just%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you." 
                                className="social-link"
                            >
                                <FaEnvelope />
                            </a>
                            <a 
                                href="https://wa.me/916380123825?text=Hi%20Riyas%2C%20I%20just%20visited%20your%20portfolio%20and%20I%E2%80%99m%20impressed%20with%20your%20work.%20Let%E2%80%99s%20connect!" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="social-link"
                            >
                                <FaWhatsapp />
                            </a>
                            <a 
                                href="https://www.instagram.com/devil._dank_" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="social-link"
                            >
                                <FaInstagram />
                            </a>
                            <a 
                                href="https://x.com/RiyasA77124" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="social-link"
                            >
                                <FaTwitter />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;