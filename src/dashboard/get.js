const Setup = nodecg.Replicant('setup');

function getResult() {
    const sessionId = document.getElementById('sessionId');
    Setup.value.sessionId = sessionId.value;
    nodecg.sendMessage('getResult');
}

function getLive() {
    const sessionId = document.getElementById('sessionId');
    const interval = document.getElementById('interval');
    Setup.value.interval = parseInt(interval.value);
    Setup.value.sessionId = sessionId.value;
    nodecg.sendMessage('getLive');
}