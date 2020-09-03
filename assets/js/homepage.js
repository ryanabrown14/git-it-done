var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var getUserRepos = function(user){
    //format the github api url
    var apiURL = "https://api.github.com/users/" +user+ "/repos";
    //make a request to the url
    fetch(apiURL).then(function(response){
        response.json().then(function(data){
            console.log(data);
        });
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

userFormEl.addEventListener("submit", formSubmitHandler);