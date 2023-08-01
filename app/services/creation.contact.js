const axios = require('axios');
const prompt = require('prompt');

const basicConfig = {
  username: 'maher',
  password: 'Maher@25'
};

// Fonction pour envoyer un contact à votre service web
const envoyerContact = (contact) => {
  return axios.post("http://192.168.101.39:8048/Mobile/ODataV4/Company('LE%20MOTEUR%20SA')/creationContact", contact, {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      username: basicConfig.username,
      password: basicConfig.password
    }
  })
  .then(response => {
    console.log('Réponse du service web pour le contact', contact.address, contact.name, ':', response.data);
  })
  .catch(error => {
    console.error('Erreur lors de la communication avec le service web pour le contact', contact.address, contact.name, ':', error);
  });
};

// Demander à l'utilisateur de saisir les informations de contact
prompt.start();

prompt.get(['address', 'eMail', 'firstName', 'mobilePhoneNo', 'name'], function (err, result) {
  if (err) { return onErr(err); }

  // Créer l'objet de contact
  const contact = {
    name: result.name,
    firstName: result.firstName,
    eMail: result.eMail,
    mobilePhoneNo: result.mobilePhoneNo,
    address: result.address

  };

  // Envoyer le contact à votre service web
  envoyerContact(contact);
});

function onErr(err) {
  console.error(err);
  return 1;
}
