
// Default data
let players = [
{ name: "BRO KA", number: 224, position: "Goalkeeper", avatar: "🥅" },
];

let matchData = {
homeTeam: "Thunder FC",
homeTeamLogo: "⚡",
awayTeam: "Rivals FC", 
awayTeamLogo: "🔥",
date: "2024-08-15",
time: "15:00",
stadium: "Thunder Stadium",
league: "Premier League"
};

const adminPassword = "admin123";

// Initialize data from memory or defaults
function initializeData() {
const savedPlayers = window.teamData?.players;
const savedMatch = window.teamData?.matchData;

if (savedPlayers) {
    players = savedPlayers;
}
if (savedMatch) {
    matchData = savedMatch;
}

renderTeam();
renderMatch();
}

// Save data to memory
function saveData() {
if (!window.teamData) {
    window.teamData = {};
}
window.teamData.players = players;
window.teamData.matchData = matchData;
}

// Navigation
function showSection(section) {
// Hide all sections
document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

// Show selected section
document.getElementById(section).classList.add('active');
event.target.classList.add('active');
}

// Render team players
function renderTeam() {
const teamGrid = document.getElementById('teamGrid');
teamGrid.innerHTML = '';

players.forEach(player => {
    const playerCard = document.createElement('div');
    playerCard.className = 'player-card';
    playerCard.innerHTML = `
        <div class="player-avatar">${player.avatar}</div>
        <div class="player-name">${player.name}</div>
        <div class="player-position">${player.position}</div>
        <div class="player-jersey">Jersey #${player.number}</div>
    `;
    teamGrid.appendChild(playerCard);
});
}

// Render match information
function renderMatch() {
document.getElementById('homeTeamLogo').textContent = matchData.homeTeamLogo;
document.getElementById('awayTeamLogo').textContent = matchData.awayTeamLogo;

const matchInfo = document.getElementById('matchInfo');
const matchDate = new Date(matchData.date + 'T' + matchData.time);

matchInfo.innerHTML = `
    <div class="info-item">
        <div class="info-label">Teams</div>
        <div class="info-value">${matchData.homeTeam} vs ${matchData.awayTeam}</div>
    </div>
    <div class="info-item">
        <div class="info-label">Date & Time</div>
        <div class="info-value">${matchDate.toLocaleDateString()} at ${matchDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
    </div>
    <div class="info-item">
        <div class="info-label">Stadium</div>
        <div class="info-value">${matchData.stadium}</div>
    </div>
    <div class="info-item">
        <div class="info-label">League</div>
        <div class="info-value">${matchData.league}</div>
    </div>
`;
}

// Admin functions
function toggleAdminPanel() {
showSection('admin');
document.querySelector('.nav-btn[onclick="showSection(\'admin\')"]').classList.add('active');
}

function adminLogin() {
const password = document.getElementById('adminPassword').value;
const alertDiv = document.getElementById('loginAlert');

if (password === adminPassword) {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminPanel').classList.add('active');
    
    // Populate form with current data
    document.getElementById('homeTeamName').value = matchData.homeTeam;
    document.getElementById('homeTeamLogoInput').value = matchData.homeTeamLogo;
    document.getElementById('awayTeamName').value = matchData.awayTeam;
    document.getElementById('awayTeamLogoInput').value = matchData.awayTeamLogo;
    document.getElementById('matchDate').value = matchData.date;
    document.getElementById('matchTime').value = matchData.time;
    document.getElementById('matchStadium').value = matchData.stadium;
    document.getElementById('matchLeague').value = matchData.league;
    
    alertDiv.innerHTML = '<div class="alert alert-success">Login successful!</div>';
} else {
    alertDiv.innerHTML = '<div class="alert alert-error">Incorrect password!</div>';
}
}

function logout() {
document.getElementById('adminLogin').style.display = 'block';
document.getElementById('adminPanel').classList.remove('active');
document.getElementById('adminPassword').value = '';
document.getElementById('loginAlert').innerHTML = '';
}

function updateMatch() {
matchData = {
    homeTeam: document.getElementById('homeTeamName').value || 'Thunder FC',
    homeTeamLogo: document.getElementById('homeTeamLogoInput').value || '⚡',
    awayTeam: document.getElementById('awayTeamName').value || 'Rivals FC',
    awayTeamLogo: document.getElementById('awayTeamLogoInput').value || '🔥',
    date: document.getElementById('matchDate').value || '2024-08-15',
    time: document.getElementById('matchTime').value || '15:00',
    stadium: document.getElementById('matchStadium').value || 'Thunder Stadium',
    league: document.getElementById('matchLeague').value || 'Premier League'
};

saveData();
renderMatch();

document.getElementById('adminAlert').innerHTML = '<div class="alert alert-success">Match information updated successfully!</div>';
// Clear form
document.getElementById('homeTeamName').value = '';
document.getElementById('homeTeamLogoInput').value = '';
document.getElementById('awayTeamName').value = '';
document.getElementById('awayTeamLogoInput').value = '';
document.getElementById('matchDate').value = '';
document.getElementById('matchTime').value = '';
document.getElementById('matchStadium').value = '';
document.getElementById('matchLeague').value = '';

}

// Replace the saveData function with:
function saveData() {
    localStorage.setItem('teamPlayers', JSON.stringify(players));
    localStorage.setItem('matchData', JSON.stringify(matchData));
}

// Replace the initializeData function with:
function initializeData() {
    const savedPlayers = localStorage.getItem('teamPlayers');
    const savedMatch = localStorage.getItem('matchData');
    
    if (savedPlayers) {
        players = JSON.parse(savedPlayers);
    }
    if (savedMatch) {
        matchData = JSON.parse(savedMatch);
    }
    
    renderTeam();
    renderMatch();
}
function addPlayer() {
const name = document.getElementById('playerName').value;
const number = document.getElementById('playerNumber').value;
const position = document.getElementById('playerPosition').value;

if (!name || !number || !position) {
    document.getElementById('adminAlert').innerHTML = '<div class="alert alert-error">Please fill all player fields!</div>';
    return;
}

// Check if jersey number already exists
if (players.find(p => p.number == number)) {
    document.getElementById('adminAlert').innerHTML = '<div class="alert alert-error">Jersey number already exists!</div>';
    return;
}

const avatarMap = {
    'Goalkeeper': '🥅',
    'Defender': '🛡️',
    'Midfielder': '⚡',
    'Forward': '⚽'
};

const newPlayer = {
    name: name,
    number: parseInt(number),
    position: position,
    avatar: avatarMap[position] || '⚽'
};

players.push(newPlayer);
saveData();
renderTeam();

// Clear form
document.getElementById('playerName').value = '';
document.getElementById('playerNumber').value = '';
document.getElementById('playerPosition').value = '';

document.getElementById('adminAlert').innerHTML = '<div class="alert alert-success">Player added successfully!</div>';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
initializeData();

});
