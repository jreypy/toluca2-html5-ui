// Prod
URL = 'ws://'+window.location.hostname+':5000/ws';
if (window.location.hostname == ""){
    // Dev
    // URL = 'ws://localhost:8050/ws';
    URL = 'ws://retruco.club/ws';
}
console.log('hostname', [window.location.hostname]);

