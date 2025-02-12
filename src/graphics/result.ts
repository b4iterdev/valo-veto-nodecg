import { update } from "lodash";

const data = nodecg.Replicant('result');

data.on('change', (newVal:any) => {
    console.log(newVal);
    update();
});

function update() {
    const result = data.value;
    let leftLogo = document.getElementById('team-logo-left') as HTMLImageElement;
    let rightLogo = document.getElementById('team-logo-right') as HTMLImageElement;
    let leftName = document.getElementById('team-name-left') as HTMLDivElement;
    let rightName = document.getElementById('team-name-right') as HTMLDivElement;
    let bestOf = document.getElementById('bestOf') as HTMLDivElement;
    leftLogo.src = result.data.leftLogo !== "" ? result.data.leftLogo : undefined;
    rightLogo.src = result.data.rightLogo !== "" ? result.data.rightLogo : undefined;
    leftName.innerHTML = result.data.leftTeam;
    rightName.innerHTML = result.data.rightTeam;
    bestOf.innerHTML = `Best of ${result.data.bestOf}`;
}