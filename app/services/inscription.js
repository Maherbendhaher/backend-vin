// const axios = require('axios');
// const prompt = require('prompt');

// const basicConfig = {
//   username: 'maher',
//   password: 'Maher@25'
// };

// // Fonction pour envoyer un contact à votre service web
// const envoyerConta = (conta) => {
//   return axios.post("http://192.168.97.39:8048/Mobile/ODataV4/Company('LE%20MOTEUR%20SA')/conta", conta, {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     auth: {
//       username: basicConfig.username,
//       password: basicConfig.password
//     }
//   })
//     .then(response => {
//       console.log('Réponse du service web pour le conta', conta.NumeroTEL, conta.Nom, ':', response.data);
//     })
//     .catch(error => {
//       console.error('Erreur lors de la communication avec le service web pour le conta', conta.NumeroTEL, conta.Nom, ':', error);
//     });
// };

// // Demander à l'utilisateur de saisir les informations de contact
// prompt.start();

// prompt.get(['Id', 'Nom', 'NumeroTEL', 'Prenom', 'Ville'], function (err, result) {
//   if (err) {
//     return onErr(err);
//   }

//   // Créer l'objet de contact
//   const conta = {
//     ID: result.Id,
//     Nom: result.Nom,
//     NumeroTEL: result.NumeroTEL,
//     Prenom: result.Prenom,
//     Ville: result.Ville
//   };

//   // Envoyer le contact à votre service web
//   envoyerConta(conta);
// });

// function onErr(err) {
//   console.error(err);
//   return 1;
// }

// const axios = require('axios');
// const prompt = require('prompt');

// // Configuration de l'authentification Basic
// const username = 'maher';
// const password = 'Maher@25';
// const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

// // URL du point de terminaison pour créer les données
// const url = "http://192.168.97.39:8048/Mobile/ODataV4/Company('LE%20MOTEUR%20SA')/conta";

// // Configuration du prompt
// prompt.start();

// // Schéma des champs à récupérer
// const schema = {
//   properties: {
//     id: {},
//     nom: {},
//     numeroTEL: {},
//     prenom: {},
//     ville: {}
//   }
// };

// // Fonction pour envoyer la requête POST
// function createData(data) {
//   // En-têtes de la requête
//   const headers = {
//     'Authorization': auth,
//     'Content-Type': 'application/json'
//   };

//   // Envoi de la requête POST
//   axios.post(url, data, { headers })
//     .then(response => {
//       console.log('Données créées avec succès :', response.data);
//     })
//     .catch(error => {
//       console.error('Erreur lors de la création des données :', error.response.data);
//     });
// }

// // Demande des valeurs des champs à l'utilisateur
// prompt.get(schema, function (err, result) {
//   if (err) {
//     console.error('Erreur lors de la saisie des champs :', err);
//     return;
//   }

//   // Création des données à partir des valeurs saisies
//   const data = {
//     id: result.id,
//     nom: result.nom,
//     numeroTEL: result.numeroTEL,
//     prenom: result.prenom,
//     ville: result.ville,
//     //'@odata.type': "Company('LE%20MOTEUR%20SA')/conta"
//   };

//   // Appel de la fonction pour envoyer la requête POST avec les données
//   createData(data);
// });

const axios = require('axios');
const prompt = require('prompt');
const uuid = require('uuid');

// Configuration de l'authentification Basic
const username = 'maher';
const password = 'Maher@25';
const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

// URL du point de terminaison pour créer les données
//const url = "http://192.168.236.39:8080/Mobile/ODataV4/Company('LE%20MOTEUR%20SA')/conta";
const url = "http://192.168.185.39:8080/Mobile/ODataV4/Company('LE%20MOTEUR%20SA')/conta";


// Configuration du prompt
prompt.start();

// Schéma des champs à récupérer
const schema = {
  properties: {
    nom: {},
    numeroTEL: {},
    prenom: {},
    ville: {},
   // MotDePasse: {}
  }
};

// Fonction pour envoyer la requête POST
function createData(data) {
  // En-têtes de la requête
  const headers = {
    'Authorization': auth,
    'Content-Type': 'application/json'
  };

  // Envoi de la requête POST
  axios.post(url, data, { headers })
    .then(response => {
      console.log('Données créées avec succès :', response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la création des données :', error.response.data);
    });
}

// Demande des valeurs des champs à l'utilisateur
prompt.get(schema, function (err, result) {
  if (err) {
    console.error('Erreur lors de la saisie des champs :', err);
    return;
  }

  // Création des données à partir des valeurs saisies
  const data = {
    id: uuid.v4(), // Génération d'un identifiant unique
    nom: result.nom,
    numeroTEL: result.numeroTEL,
    prenom: result.prenom,
    ville: result.ville,
    //MotDePasse: result.MotDePasse,
  };

  // Appel de la fonction pour envoyer la requête POST avec les données
  createData(data);
});
