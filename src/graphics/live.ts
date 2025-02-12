const data = nodecg.Replicant('live');

data.on('change', (newVal:any) => {
    console.log(newVal);
});