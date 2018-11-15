const axios =  require('../config/yargs').axios;

const getClima = async ( lat, lon) => {

    let encodLon = encodeURI(lon);
    let encodLat = encodeURI(lat);

    let temp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${encodLat}&lon=${encodLon}&units=metric&appid=fa4293a4a4fb6ff3d32f939b87e1870a`);

     
    if ( !temp ){
        throw new Error("Error");
    }

    return {
      temperatura:   temp.data.main.temp
    } 
}


module.exports = {
    getClima
}