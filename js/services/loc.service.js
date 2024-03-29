var locs = [{lat: 11.22, lng: 22.11}]

function getLocs1() {
    return Promise.resolve(locs);
}

function getLocs() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(locs);
        }, 2000)
    });

}


function getPosition() {
    console.log('Getting Pos');
    
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}



export default {
    getLocs :getLocs,
    getPosition: getPosition
}