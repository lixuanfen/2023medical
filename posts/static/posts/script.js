// Start with first post
let counter = 1;

// Load posts 20 at a time
const quantity = 20;

// Loading state
let loading = false;

// When DOM loads, render the first 20 posts
document.addEventListener('DOMContentLoaded', load);

// If scrolled to bottom, load the next 20 posts
window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
        load();
    }
};

// Load next set of posts
function load() {
    // Prevent multiple simultaneous loads
    if (loading) return;
    
    loading = true;
    
    // Show loading indicator
    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'block';

    // Set start and end post numbers, and update counter
    const start = counter;
    const end = start + quantity - 1;
    counter = end + 1;

    // Get new posts and add posts
    fetch(`/posts/posts?start=${start}&end=${end}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        data.posts.forEach(add_post);
        loading = false;
        loadingElement.style.display = 'none';
    })
    .catch(error => {
        console.error('Error loading posts:', error);
        loading = false;
        loadingElement.style.display = 'none';
        loadingElement.innerHTML = '加载失败，请重试';
        
        // Retry after 3 seconds
        setTimeout(() => {
            loadingElement.innerHTML = '正在加载更多帖子...';
        }, 3000);
    });
}

// Add a new post with given contents to DOM
function add_post(contents) {
    // Create new post
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `${contents} <button class="hide">Hide</button>`;

    // Add post to DOM
    document.querySelector('#posts').append(post);
}

// If hide button is clicked, delete the post
document.addEventListener('click', event => {
    // Find what was clicked on
    const element = event.target;

    // Check if the user clicked on a hide button
    if (element.className === 'hide') {
        element.parentElement.style.animationPlayState = 'running';
        element.parentElement.addEventListener('animationend', () => {
            element.parentElement.remove();
        });
    }
});

// Initial load
load();