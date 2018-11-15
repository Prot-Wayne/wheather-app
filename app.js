const argv = require('./config/yargs').argv;
const axios =  require('./config/yargs').axios;
const clima = require('./clima/clima').getClima;


const getLugarLatLong = async ( direccion ) => {

    let encodedURL = encodeURI(direccion);
    let resp  = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}&key=AIzaSyA-HXVa2jtkGfKtIJwisxgC46RaWqC1xuI`)
    
    if (  resp.data.status === "ZERO_RESULTS") {
        throw new Error(`No se encontró informaicón para la ciudad ${direccion}`);
    }
    
    let loc = resp.data.results[0];
    let coors = loc.geometry.location;

    return  {
        direccion: loc.formatted_address,
        lat: coors.lat,
        long: coors.lng
    }      
     /*    console.log(loc.formatted_address);
        console.log(coors.lat, coors.lng);    */
}

let getInfo = async (direccion) => {

    try {
        
        let coor = await getLugarLatLong( direccion);
        let temp = await clima(coor.lat, coor.long);

        return `Ciudad: ${coor.direccion} \n\n Temperatura: ${temp.temperatura}`;

    } catch (error) {
        
        return `No se pudo encontrar clima en ${direccion}`
    }

    
}

getInfo(argv.direccion).then(resp => console.log(resp)).catch(e => console.log(e));
 

getInfo


