const content = document.getElementById("content");

const postsEndpoint = 'https://jsonplaceholder.typicode.com/posts';
const commentsEndpoint = 'https://jsonplaceholder.typicode.com/comments';
const usersEndpoint = 'https://jsonplaceholder.typicode.com/users';

const state = {
    posts: [],
    singlePost: {},
    comments: [],
    author: {},
    timeouts: [],
}

const delayInterval = 10;

// Helpers
function clearTimeouts() {
    state.timeouts.map(id => clearTimeout(id));
    state.timeouts = [];
}

function scrollToPageTop() {
    window.scrollTo(0, 0);
}

// Redirect
function goHome() {
    history.pushState(null, null, 'index.html');
}

function goBack() {
    window.history.back();
    const renderTimeout = setTimeout(renderPage, delayInterval);
    state.timeouts = [ ...state.timeouts, renderTimeout ]
}

function goToPost(id) {
    const url = `?postId=${id}`;
    history.pushState(null, null, url);
    renderPage();
}

function goToAuthor(id) {
    const url = `?userId=${id}`;
    history.pushState(null, null, url);
    renderPage();
}

/* Error */
function createError(){
    const html = `
        <div class="text-left">
            <button type="button" class="btn btn-info btn-sm" onclick="goBack()">< Back </button>
        </div>
        <div class="jumbotron text-center">
            <p>Sorry, an error occurred!</p>
        </div>
    `;
    content.innerHTML = html;
}

function createNoDataMessage(){
    const html = `
        <div class="text-left">
            <button type="button" class="btn btn-info btn-sm" onclick="goBack()">< Back </button>
        </div>
        <div class="jumbotron text-center">
            <h4>No data is currently available!</h4>
        </div>
    `;
    content.innerHTML = html;
}

/* All Posts */
function createPosts(){
    const html = state.posts.map(post => {
        return `
            <div class="text-left">
                <h3>${post.title}</h3>
                <p>${post.body.substr(0, 200)}</p>
                <button type="button" class="btn btn-info" onclick="goToPost(${post.id})">See More ></button>
                <br />
                <br />
                <hr />  
            </div>
        `;
    }).join('');
    content.innerHTML = '<h2 id="main-header"><b>All Posts:</b></h2><br />' + html;
}

/*  Post with Comments  */
function createSinglePost(){
    const { singlePost } = state;
    const html = `
        <div class="text-left">
            <button type="button" class="btn btn-info btn-sm" onclick="goBack()">< Back </button>
            <br />
            <br />
            <h1 class="text-center"><b>${singlePost.title}</b></h1>
            <br />
            <p>${singlePost.body}</p>
            <br />
            <button type="button" class="btn btn-info" onclick="goToAuthor(${singlePost.userId})"> See Author ></button>
            <br />
            <br />
            <hr />
            <br />
        </div>
    `;
    content.innerHTML = html;
}

function createComments(){
    const html = state.comments.map(comment => {
        return `
            <div class="text-left">
                <br />
                <h5 class="text-right">${comment.name}</h5>
                <p>${comment.body}</p>
                <br /> 
            </div>
        `;
    }).join('');
    const node = document.createElement('div');
    node.innerHTML = '<h4>Comments:</h4>'+ html;
    content.appendChild(node);
    const appendCommentssTimeout = setTimeout(() => content.appendChild(node), delayInterval);
    state.timeouts = [ ...state.timeouts, appendCommentssTimeout ];
}

/*  Author  */
function createAuthor(){
    const { author } = state;
    const html = `
        <div class="text-left">
            <button type="button" class="btn btn-info btn-sm" onclick="goBack()">< Back </button>
        </div>
        <div class="jumbotron text-center">
            <h2>${author.name}</h2>
            <br />
            <p>${author.email}</p>
            <br />
            <i>${author.company.name}</i>
            <hr />
        </div>
    `;
    content.innerHTML = html;
}

function createAllAuthorPosts(){
    const html = state.posts.map(post => {
        return `
            <div class="text-left">
                <br />
                <h3>${post.title}</h3>
                <p>${post.body.substr(0, 200)}</p>
                <button type="button" class="btn btn-info" onclick="goToPost(${post.id})">See More ></button>
                <br />
                <br />  
            </div>
        `;
    }).join('');
    const node = document.createElement('div');
    node.innerHTML = '<h4 class="text-left">Other posts of this author:</h4>'+ html;
    const appendPostsTimeout = setTimeout(() => content.appendChild(node), delayInterval);
    state.timeouts = [ ...state.timeouts, appendPostsTimeout ];
}

/* Display functions */
function displayPosts() {
    fetch(postsEndpoint)
        .then(blob => blob.json())
        .then(data => state.posts = [ ...data ])
        .then(createPosts)
        .catch(err => createError())
}
 
function displaySinglePost(id) {
    fetch(`${postsEndpoint}/${id}`)
        .then(blob => blob.json())
        .then(data => state.singlePost = { ...data })
        .then(createSinglePost)
        .catch(err => createError())
}

function displayComments(id) {
    fetch(`${commentsEndpoint}?postId=${id}`)
        .then(blob => blob.json())
        .then(data => state.comments = [ ...data ])
        .then(createComments)
        .catch(err => createError())
}

function displayAuthor(id) {
    fetch(`${usersEndpoint}?userId=${id}`)
        .then(blob => blob.json())
        .then(data => state.author = data.filter(data => data.id.toString() === id)[0])
        .then(createAuthor)
        .catch(err => createError())
}

function displayAllAuthorPosts(id) {
    fetch(`${postsEndpoint}?userId=${id}`)
        .then(blob => blob.json())
        .then(data => state.posts = [ ...data ])
        .then(createAllAuthorPosts)
        .catch(err => createError())
}

function displayNoData() {
    createNoDataMessage();
}

function renderPage() {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('postId');
    const userId = params.get('userId');

    if (postId) {
        displaySinglePost(postId);
        displayComments(postId)
    } else if (userId) {
        if (parseInt(userId) <= 10){
            displayAuthor(userId);
            displayAllAuthorPosts(userId);
        } else {
            displayNoData();
        }
    } else {
        displayPosts();
    }
    
    clearTimeouts();
    scrollToPageTop();
}

renderPage();
