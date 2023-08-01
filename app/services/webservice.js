
const axios = require('axios');
const  httpntlm = require('httpntlm')
//const url = "http://desktop-hv6bj4m:7048/BC160/ODataV4/Company('LE%20MOTEUR%20SA')/Voiture";
const url ="http://desktop-hv6bj4m:7048/BC160/ODataV4/Company('LE%20MOTEUR%20SA')/vehiculeDisponible"
console.log(url)


const options = {
  username: 'Maher',
  password: 'maher',
  workstation: '',
  domain: 'DESKTOP-HV6BJ4M'
};

httpntlm.get({
  url: url,
  username: options.username,
  password: options.password,
  workstation: options.workstation,
  domain: options.domain
}, (err, response) => {
  if (err) {
    console.error(err);
    return;
  }

  const responseData = response.body;
  console.log(responseData);
});

