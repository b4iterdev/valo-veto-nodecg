const Setup = nodecg.Replicant('setup');
function saveServerUrl() {
    const serverInput = document.getElementById('vetoServerUrl');
    Setup.value.vetoServerUrl = serverInput.value;
}