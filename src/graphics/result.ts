
const data = nodecg.Replicant('result');

data.on('change', (newVal:any) => {
    update();
});

function update() {
    const result = data.value;
    let leftLogo = document.getElementById('team-logo-left') as HTMLImageElement;
    let rightLogo = document.getElementById('team-logo-right') as HTMLImageElement;
    let leftName = document.getElementById('team-name-left') as HTMLDivElement;
    let rightName = document.getElementById('team-name-right') as HTMLDivElement;
    let bestOf = document.getElementById('bestOf') as HTMLDivElement;
    let bannedTopLeft = document.getElementById('banned-map-topleft') as HTMLImageElement;
    let bannedTopRight = document.getElementById('banned-map-topright') as HTMLImageElement;
    let bannedBotLeft = document.getElementById('banned-map-botleft') as HTMLImageElement;
    let bannedBotRight = document.getElementById('banned-map-botright') as HTMLImageElement;
    let pickedFirst = document.getElementById('picked-map-first') as HTMLImageElement;
    let pickedSecond = document.getElementById('picked-map-second') as HTMLImageElement;
    let pickedDecider = document.getElementById('picked-map-decider') as HTMLImageElement;
    leftLogo.src = result.data.leftLogo !== "" ? result.data.leftLogo : undefined;
    rightLogo.src = result.data.rightLogo !== "" ? result.data.rightLogo : undefined;
    leftName.innerHTML = result.data.leftTeam;
    rightName.innerHTML = result.data.rightTeam;
    bestOf.innerHTML = `Best of ${result.data.bestOf}`;
    let banSorted = result.data.mapStates
        .filter((map: { banned: any; }) => map.banned)
        .sort((a: { order: number; }, b: { order: number; }) => a.order - b.order);
    let pickSorted = result.data.mapStates
        .filter((map: { picked: any; }) => map.picked)
        .sort((a: { order: number; }, b: { order: number; }) => a.order - b.order);
    bannedTopLeft.src = banSorted[0].imageUrl;
    bannedTopRight.src = banSorted[1].imageUrl;
    bannedBotLeft.src = banSorted[2].imageUrl;
    bannedBotRight.src = banSorted[3].imageUrl;
    (document.getElementById('banned-text-topleft') as HTMLDivElement).innerHTML = `${banSorted[0].bannedBy === 0 ? result.data.leftTeam : result.data.rightTeam} ban`;
    (document.getElementById('banned-text-topright') as HTMLDivElement).innerHTML = `${banSorted[1].bannedBy === 0 ? result.data.leftTeam : result.data.rightTeam} ban`;
    (document.getElementById('banned-text-botleft') as HTMLDivElement).innerHTML = `${banSorted[2].bannedBy === 0 ? result.data.leftTeam : result.data.rightTeam} ban`;
    (document.getElementById('banned-text-botright') as HTMLDivElement).innerHTML = `${banSorted[3].bannedBy === 0 ? result.data.leftTeam : result.data.rightTeam} ban`;
    pickedFirst.src = pickSorted[0].imageUrl;
    pickedSecond.src = pickSorted[1].imageUrl;
    pickedDecider.src = pickSorted[2].imageUrl;
    (document.getElementById('picked-mapname-first') as HTMLDivElement).innerHTML = pickSorted[0].name;
    (document.getElementById('picked-mapname-second') as HTMLDivElement).innerHTML = pickSorted[1].name;
    (document.getElementById('picked-mapname-decider') as HTMLDivElement).innerHTML = pickSorted[2].name;
    (document.getElementById('picked-first') as HTMLDivElement).innerHTML = pickSorted[0].selectedBy === 0 ? result.data.leftTeam : result.data.rightTeam;
    (document.getElementById('picked-second') as HTMLDivElement).innerHTML = pickSorted[1].selectedBy === 0 ? result.data.leftTeam : result.data.rightTeam;
    (document.getElementById('picked-decider') as HTMLDivElement).innerHTML = pickSorted[2].selectedBy === 0 ? result.data.leftTeam : result.data.rightTeam;
    let orderSorted = result.data.vetoOrder
        .filter((map: { type: any; }) => map.type === 'pick' || map.type === 'decider')
        .sort((a: { order: number; }, b: { order: number; }) => a.order - b.order);
    (document.getElementById('defender-first') as HTMLDivElement).innerHTML = getDef(0,orderSorted,pickSorted) === 0 ? result.data.rightTeam : result.data.leftTeam;
    (document.getElementById('defender-second') as HTMLDivElement).innerHTML = getDef(1,orderSorted,pickSorted) === 0 ? result.data.rightTeam : result.data.leftTeam;
    (document.getElementById('defender-decider') as HTMLDivElement).innerHTML = getDef(2,orderSorted,pickSorted) === 0 ? result.data.rightTeam : result.data.leftTeam;
}

function getDef(num: number, orderSorted: any,pickSorted: any) {
    // return 0 for left, 1 for right
    if(orderSorted[num].side === 0) { // left
        return pickSorted[num].side === 0 ? 1 : 0;
    } else { // right
        return pickSorted[num].side === 0 ? 0 : 1;
    }
}