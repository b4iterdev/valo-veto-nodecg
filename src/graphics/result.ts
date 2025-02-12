const data = nodecg.Replicant('result');

data.on('change', (newVal:any) => {
    console.log(newVal);
});