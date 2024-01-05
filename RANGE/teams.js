function toggleTeamsDropdown() {
  var dropdownContent = document.getElementById("teams-dropdown-content");
  dropdownContent.classList.toggle("hidden");
}

// create a new team
function createNewTeam() {
  var teamName = prompt("Enter the team name:");
  if (teamName) {
    var teamLink = document.createElement("a");
    teamLink.href = "./team.html?team=" + encodeURIComponent(teamName);
    teamLink.textContent = teamName;
    teamLink.addEventListener("click", function (event) {
      event.preventDefault();
      var teamName = decodeURIComponent(this.href.split("?team=")[1]);
      window.location.href = "./team.html?team=" + encodeURIComponent(teamName);
    });

    var dropdownContent = document.getElementById("teams-dropdown-content");
    var teamsSection = document.getElementById("teams-section");
    dropdownContent.insertBefore(teamLink, teamsSection.nextSibling);
    saveTeamsToLocalStorage(getTeamsFromLocalStorage());
  }
}

// Function to populate the teams dropdown on page load
function populateTeamsDropdown() {
  var teams = getTeamsFromLocalStorage();
  var teamsSection = document.getElementById("teams-section");

  teams.forEach(function (team) {
    var teamLink = document.createElement("a");
    teamLink.href = "./team.html?team=" + encodeURIComponent(team);
    teamLink.textContent = team;
    teamLink.addEventListener("click", function (event) {
      event.preventDefault();
      var teamName = decodeURIComponent(this.href.split("?team=")[1]);
      window.location.href = "./team.html?team=" + encodeURIComponent(teamName);
    });

    teamsSection.appendChild(teamLink);
  });
}

// Function to retrieve existing teams from local storage
function getTeamsFromLocalStorage() {
  var teams = localStorage.getItem("teams");
  if (teams) {
    return JSON.parse(teams);
  } else {
    return [];
  }
}

// Function to save teams to local storage
function saveTeamsToLocalStorage(teams) {
  localStorage.setItem("teams", JSON.stringify(teams));
}

// Add event listener to the "Teams" dropdown link
document.getElementById("teams-dropdown").addEventListener("click", function (event) {
  event.preventDefault();
  toggleTeamsDropdown();
});

// Add event listener to the "Create New Team" link
document.getElementById("create-team-link").addEventListener("click", function (event) {
  event.preventDefault();
  createNewTeam();
});

populateTeamsDropdown();