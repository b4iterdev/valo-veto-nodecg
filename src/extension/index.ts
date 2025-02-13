import type NodeCG from 'nodecg/types';
import fetch from 'node-fetch';

module.exports = function (nodecg: NodeCG.ServerAPI) {
	const Setup = nodecg.Replicant('setup');
	const live = nodecg.Replicant('live');
    const result = nodecg.Replicant('result');
    let intervalId: NodeJS.Timer;

	async function fetchData(rep:any,type:boolean) {
        try {
            let response;
            if (type) {
                response = await fetch(`${Setup.value.vetoServerUrl}/result/${Setup.value.sessionId}`);
            } else {
                response = await fetch(`${Setup.value.vetoServerUrl}/session/${Setup.value.sessionId}`);
            }
            const data = await response.json();
            rep.value = data; 
        } catch (error) {
            nodecg.log.error('Error fetching data:', error);
        }
    }
	nodecg.listenFor('getLive', () => {
		if (intervalId) {
            clearInterval(intervalId as NodeJS.Timeout);
        }
		fetchData(live,false);
        intervalId = setInterval(() => fetchData(live,false), Setup.value.interval);
    });
    nodecg.listenFor('getResult', () => {
        fetchData(result,true);
    });
};
