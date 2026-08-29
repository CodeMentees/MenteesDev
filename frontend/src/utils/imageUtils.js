export const FALLBACK_IMAGE_URL = "https://placehold.co/600x400?text=No+Image+Available";
export const INVALID_IMAGE_URL = "https://placehold.co/400x300?text=Invalid+Image+URL";

/**
 * Normalizes an image URL, specifically handling Google Drive links
 * to ensure they can be rendered directly as images.
 * 
 * @param {string} url - The raw image URL from the database
 * @returns {string} - The direct image/thumbnail URL or the original URL
 */
export const getDirectImageUrl = (url) => {
    if (!url) return "";

    // Handle Google Drive links
    if (url.includes("drive.google.com")) {
        // Handle various formats: /file/d/ID/view, /uc?id=ID, /open?id=ID, etc.
        const match = url.match(/\/d\/([^/&?]+)/) ||
            url.match(/[?&]id=([^&]+)/) ||
            url.match(/\/file\/d\/([^/&?]+)/) ||
            url.match(/\/open\?id=([^&]+)/);

        if (match && match[1]) {
            const fileId = match[1];
            // Use thumbnail for reliable embedding with sz=w1000 for high qual
            return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
        }
    }

    return url;
};

/**
 * Standard image error handler that sets a fallback image
 * @param {Event} e - The error event from the img tag
 * @param {string} fallback - Optional specific fallback URL
 */
export const handleImageError = (e, fallback = FALLBACK_IMAGE_URL) => {
    if (!e.target.dataset.error) {
        e.target.dataset.error = "true";
        e.target.src = fallback;
    }
};
