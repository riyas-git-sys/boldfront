import React, { useState } from 'react';
import { shortenUrl } from '../services/api';

const UrlShortener = ({ onUrlCreated }) => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!longUrl.trim()) {
            setError('Please enter a URL');
            return;
        }

        if (!validateUrl(longUrl)) {
            setError('Please enter a valid URL (include http:// or https://)');
            return;
        }

        setLoading(true);

        try {
            const result = await shortenUrl(longUrl);
            setShortUrl(result.shortUrl);
            onUrlCreated(result);
            setLongUrl('');
        } catch (err) {
            setError(err.message || 'Failed to shorten URL. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenShortUrl = () => {
        if (shortUrl) {
            window.open(shortUrl, '_blank');
        }
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(shortUrl)
            .then(() => alert('URL copied to clipboard!'))
            .catch(() => alert('Failed to copy URL'));
    };

    return (
        <div className="url-shortener">
            <h2>🔗 URL Shortener</h2>
            <p>Paste your long URL below to shorten it</p>
            
            <form onSubmit={handleSubmit} className="shortener-form">
                <div className="input-group">
                    <input
                        type="url"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        placeholder="https://example.com/very-long-url-path"
                        disabled={loading}
                        required
                    />
                    <button 
                        type="submit" 
                        disabled={loading || !longUrl.trim()}
                        className="shorten-btn"
                    >
                        {loading ? '⏳ Shortening...' : '🚀 Shorten URL'}
                    </button>
                </div>
            </form>
            
            {error && (
                <div className="error-message">
                    ⚠️ {error}
                </div>
            )}
            
            {shortUrl && (
                <div className="result-container">
                    <p className="success-message">✅ URL shortened successfully!</p>
                    <div className="short-url-display">
                        <span className="short-url" onClick={handleOpenShortUrl}>
                            {shortUrl}
                        </span>
                        <div className="url-actions">
                            <button onClick={handleOpenShortUrl} className="action-btn open-btn">
                                🔗 Open
                            </button>
                            <button onClick={handleCopyUrl} className="action-btn copy-btn">
                                📋 Copy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UrlShortener;