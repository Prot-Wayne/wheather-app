const opt = {
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad',
        demand:true
    }
}

const argv = require('yargs').options(opt).help().argv;

const axios = require('axios');

module.exports = {
    argv,
    axios
}