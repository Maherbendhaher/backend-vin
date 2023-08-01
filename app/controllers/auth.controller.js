const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const axios = require("axios");


/*
exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    nom: req.body.nom,
    prenom: req.body.prenom,
    numero: req.body.numero,
    email: req.body.email,
    adresse: req.body.adresse,
    gouvernorat: req.body.gouvernorat,
    password: bcrypt.hashSync(req.body.password, 8)
  })
 

  
    .then(user => {
      if (req.body.roles) {
        console.log(req.body.roles)
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

    
};
*/
const basicConfig = {
  username: 'maher',
  password: 'Maher@25'
};
exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    nom: req.body.nom,
    prenom: req.body.prenom,
    numero: req.body.numero,
    email: req.body.email,
    adresse: req.body.adresse,
    gouvernorat: req.body.gouvernorat,
    password: bcrypt.hashSync(req.body.password, 8),
  })
  .then(user => {
    // L'utilisateur est créé dans la base de données locale, maintenant créons l'utilisateur dans Business Central
    const userPayload = {
      nom: user.nom,
      prenom: user.prenom,
      numero: user.numero,
      email: user.email,
      adresse: user.adresse,
      gouvernorat: user.gouvernorat,
      password: user.password,
      // Ajoutez d'autres champs requis par l'API de Business Central
    };

    // Effectuer la requête POST vers l'API de Business Central
    axios.post('http://192.168.81.39:8048/Mobile/ODataV4/Company(\'LE%20MOTEUR%20SA\')/CreationContact', userPayload, {
      headers: {
        'Content-Type': 'application/json'
      },
      auth: {
        username: basicConfig.username,
        password: basicConfig.password
      }
    })
    .then(response => {
      // Gérer la réponse réussie de Business Central
      console.log(response.data);
      // Si des rôles sont spécifiés dans la requête, nous devons continuer le traitement
      if (req.body.roles) {
        console.log(req.body.roles);
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            // Envoyer la réponse une seule fois après le traitement terminé
            res.send({ message: "Utilisateur enregistré avec succès !" });
          });
        });
      } else {
        // rôle utilisateur = 1
        user.setRoles([1]).then(() => {
          // Envoyer la réponse une seule fois après le traitement terminé
          res.send({ message: "Utilisateur enregistré avec succès !" });
        });
      }
    })
    .catch(err => {
      // Gérer les erreurs de l'API de Business Central
      console.error("Erreur lors de la création de l'utilisateur dans Business Central :", err);
      res.status(500).send({ message: "Erreur lors de la création de l'utilisateur dans Business Central" });
    });
  })
  .catch(err => {
    // Gérer les erreurs de l'opération dans la base de données locale
    res.status(500).send({ message: err.message });
  });
};

exports.signIn = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          numero: user.numero,
          email: user.email,
          adrese: user.adresse,
          gouvernorat: user.gouvernorat,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
    
    
    
   
    
  
};

exports.createAdmin=()=>{
  User.findOne({ email: "admin@admin.com" }).then((data)=>{
    if(!data){
      User.create({
        nom: "admin",
        prenom: "admin",
        numero: 1,
        email: "admin@admin.com",
        adresse: "",
        gouvernorat: "",
        password: bcrypt.hashSync("12345678", 8)
      }).then(user=>{
        user.setRoles([3])
      })
    }
    
  })
 
}
exports.CreateManager = (req, res)=>{
  User.create({
    nom: req.body.nom,
    prenom: req.body.prenom,
    numero: req.body.numero,
    email: req.body.email,
    adresse: req.body.adresse,
    gouvernorat: req.body.gouvernorat,
    password: bcrypt.hashSync(req.body.password, 8),

  }).then(user=>{
    user.setRoles([2])
    res.status(200).send({ message: "modirator created" });
  }).catch(err => {
    // Gérer les erreurs de l'API de Business Central
    console.error("Erreur lors de la création de l'utilisateur dans Business Central :", err);
    res.status(500).send({ message: "Erreur lors de la création de l'utilisateur dans Business Central" });
  });
}