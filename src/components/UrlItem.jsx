import React from 'react';

const UrlItem = ({ url, onUrlVisit }) => {
    console.log('🔗 UrlItem rendering:', url); // Debug log

    // Construct the proper short URL using shortCode
    const shortUrl = `${import.meta.env.VITE_API_BASE_URL || 'https://boldback.vercel.app'}/${url.shortCode}`;

    const handleOpenUrl = () => {
        // Open the URL in new tab
        window.open(shortUrl, '_blank');
        
        // Notify parent component to update visit count
        if (onUrlVisit && url.shortCode) {
            onUrlVisit(url.shortCode);
        }
        
        console.log('Opening URL:', shortUrl);
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(shortUrl)
            .then(() => alert('URL copied to clipboard!'))
            .catch(() => alert('Failed to copy URL'));
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Invalid date';
        }
    };

    const truncateUrl = (url, maxLength = 50) => {
        if (!url) return 'No URL';
        if (url.length <= maxLength) return url;
        return url.substring(0, maxLength) + '...';
    };

    return (
        <div className="url-item">
            <div className="url-content">
                <div className="url-info">
                    <p className="long-url" title={url.longUrl}>
                        {truncateUrl(url.longUrl)}
                    </p>
                    <div className="short-url-container">
                        <span 
                            className="short-url" 
                            onClick={handleOpenUrl}
                            title="Click to open"
                        >
                            {shortUrl}
                        </span>
                    </div>
                    <div className="url-meta">
                        <span className="visits">👁️ {url.visits || 0} visits</span>
                        <span className="created-at">📅 {formatDate(url.createdAt)}</span>
                    </div>
                </div>
                <div className="url-actions">
                    <button onClick={handleOpenUrl} className="action-btn open-btn">
                        🔗 Open
                    </button>
                    <button onClick={handleCopyUrl} className="action-btn copy-btn">
                        📋 Copy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UrlItem;