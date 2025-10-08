import React from 'react';
import UrlItem from './UrlItem';

const UrlList = ({ urls, onUrlVisit, showAll = false }) => {
    console.log('📋 UrlList rendering with URLs:', urls); // Debug log

    // When search is active, show all results without limiting
    const displayUrls = showAll ? urls : urls.slice(0, 5);

    return (
        <div className="url-list">
            <div className="list-header">
                <h3>📋 {showAll ? 'All Shortened URLs' : 'Recent URLs'}</h3>
                {!showAll && urls.length > 5 && (
                    <span className="count-badge">{urls.length} total</span>
                )}
            </div>
            
            {displayUrls.length === 0 ? (
                <div className="empty-state">
                    <p>No URLs shortened yet. Create your first short URL above! 🎯</p>
                </div>
            ) : (
                <div className="urls-grid">
                    {displayUrls.map((url, index) => (
                        <UrlItem 
                            key={url.shortCode || url._id || index} 
                            url={url} 
                            onUrlVisit={onUrlVisit}
                        />
                    ))}
                </div>
            )}
            
            {!showAll && urls.length > 5 && (
                <div className="view-all-note">
                    <p>Showing 5 of {urls.length} URLs</p>
                </div>
            )}
        </div>
    );
};

export default UrlList;