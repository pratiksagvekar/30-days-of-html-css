// Function to fetch user data from GitHub API
function getUserData() {
    const username = document.getElementById('username').value;

    if (username === "") {
        alert('Please enter a GitHub username');
        return;
    }

    // Clear any existing data
    clearPreviousData();

    // GitHub API endpoint for user info
    const userUrl = `https://api.github.com/users/${username}`;
    
    // Fetch user data
    fetch(userUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            // Display user data
            displayUserInfo(data);

            // Fetch repositories
            fetchRepos(data.repos_url);
        })
        .catch(error => {
            alert(error.message);
        });
}

// Function to fetch user repositories
function fetchRepos(reposUrl) {
    fetch(reposUrl)
        .then(response => response.json())
        .then(data => {
            const repoList = document.getElementById('repos');
            if (data.length === 0) {
                repoList.innerHTML = '<li>No repositories found</li>';
                return;
            }

            data.forEach(repo => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
                repoList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            document.getElementById('repos').innerHTML = '<li>Error loading repositories</li>';
        });
}

// Function to display user info
function displayUserInfo(data) {
    document.getElementById('avatar').src = data.avatar_url || '';
    document.getElementById('name').textContent = data.name || 'No Name';
    document.getElementById('bio').textContent = data.bio || 'No bio available';
    document.getElementById('location').textContent = data.location || 'No location available';
    document.getElementById('githubLink').href = data.html_url || '#';
    document.getElementById('githubLink').textContent = 'View GitHub Profile';
}

// Function to clear previous data
function clearPreviousData() {
    document.getElementById('avatar').src = '';
    document.getElementById('name').textContent = '';
    document.getElementById('bio').textContent = '';
    document.getElementById('location').textContent = '';
    document.getElementById('githubLink').href = '';
    document.getElementById('githubLink').textContent = '';
    document.getElementById('repos').innerHTML = '';
}
