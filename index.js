const axios = require('axios');
const jsdom = require('jsdom');
const fs = require('fs');

const { JSDOM } = jsdom;

async function fetchWebsiteHTML(url) {
    try {
        
        const response = await axios.get(url);
        const dom = new JSDOM(response.data);
        const iframe = dom.window.document.querySelector('iframe');

        if (iframe) {
            const iframeSrc = iframe.src;
            const iframeResponse = await axios.get(iframeSrc);
            return iframeResponse.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching website HTML:', error);
        throw error;
    }
}

// Usage example
const websiteURL = 'https://perchance.org/ai-text-to-image-generator';
fetchWebsiteHTML(websiteURL)
    .then(html => {
        console.log('Website HTML:', html);
        const content = html; // Replace with the variable containing the content you want to write to the file

        fs.writeFile('test.txt', content, (error) => {
            if (error) {
                console.error('Error writing to file:', error);
            } else {
                console.log('Content written to file successfully!');
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });