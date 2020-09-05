var languageButtonsEl = document.querySelector("#language-buttons");
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEL = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getFeaturedRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
  
    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                displayRepos(data.items, language);
            });
        }
        else{
            alert("error:" +response.statusText);
        }
    });
  };

var getUserRepos = function(user){
    //format the github api url
    var apiURL = "https://api.github.com/users/" +user+ "/repos";
    //make a request to the url
    fetch(apiURL).then(function(response){
        if (response.ok){
        response.json().then(function(data){
            displayRepos(data, user);
        });
    }
    else {
        alert("Error: " + response.statusText);
    }
    })

    .catch(function(error){
        //notice this .catch() getting chained to the end of the .then()
        alert("Unable to connect to GitHub");
    });


};


var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a GitHub username");
    }

};

var displayRepos = function(repos, searchTerm) {
    if(repos.length === 0){
        repoContainerEL.textContent = "No repositories found.";
        return;
    }
repoContainerEL.textContent = "";
repoSearchTerm.textContent = searchTerm;

//loop over repos
for (var i = 0; i < repos.length; i++ ){
    //format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    //create a container for each repo
    var repoEL = document.createElement("a");
    repoEL.classList = "list-item flex-row justify-space-between align-center";
    repoEL.setAttribute("href", "./single-repo.html?repo="+ repoName);

    //create a span to hold repo name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    //append to container
    repoEL.appendChild(titleEl);

    //create status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";
    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";

    }
    else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    //append to container
    repoEL.appendChild(statusEl);

    //append container to dom
    repoContainerEL.appendChild(repoEL);
}
};
var buttonClickHandler = function(event){
var language = event.target.getAttribute("data-language");
if (language){
    getFeaturedRepos(language);

    //clear old content
    repoContainerEL.textContent = "";
}

};



userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);