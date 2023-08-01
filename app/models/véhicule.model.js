// const express = require('express');
// const bodyParser = require('body-parser');
// const sql = require('mssql');
// const db = require('../config/db.config');
// require('dotenv').config();

// const app = express();



// // Middleware pour parser les requêtes POST
// app.use(bodyParser.json());

// // Route pour créer un nouveau véhicule
// app.post('/vehicules', async (req, res) => {
//   try {
//     const pool = await sql.connect(config);
//     const result = await pool.request()
//       .input('marque', sql.NVarChar(50), req.body.marque)
//       .input('model', sql.NVarChar(50), req.body.model)
//       .input('version', sql.Int, req.body.version)
//       .input('couleur', sql.NVarChar(50), req.body.couleur)
//       .query('INSERT INTO vehicules (marque, model, version, couleur) VALUES (@marque, @model, @version, @couleur)');
//     res.status(201).json(result.recordsets[0]);
//   } catch (err) {
//     console.log("Err de creation du vehicules :", err);
//     res.status(400).json({ message: "Err de creation du vehicules" });
//   }
// });

// // Route pour récupérer tous les véhicules
// app.get('/vehicules', async (req, res) => {
//   try {
//     const pool = await sql.connect(config);
//     const result = await pool.request()
//       .query('SELECT * FROM vehicules');
//     res.status(200).json(result.recordset);
//   } catch (err) {
//     console.log("Erreur de récupération des véhicules :", err);
//     res.status(400).json({ message: "Erreur de récupération des véhicules" });
//   }
// });

// // Route pour récupérer un véhicule par son ID
// app.get('/vehicules/:id', async (req, res) => {
//   try {
//     const pool = await sql.connect(config);
//     const result = await pool.request()
//       .input('id', sql.Int, req.params.id)
//       .query('SELECT * FROM vehicules WHERE id = @id');
//     if (result.recordset.length === 0) {
//       res.status(404).json({ message: "Véhicule non trouvé" });
//     } else {
//       res.status(200).json(result.recordset[0]);
//     }
//   } catch (err) {
//     console.log("Erreur de récupération du vehicules :", err);
//     res.status(400).json({ message: "Erreur de récupération du vehicules" });
//   }
// });

// // Route pour mettre à jour un véhicule par son ID
// app.put('/vehicules/:id', async (req, res) => {
//   try {
//     const pool = await sql.connect(config);
//     const result = await pool.request()
//       .input('id', sql.Int, req.params.id)
//       .input('marque', sql.NVarChar(50), req.body.marque)
//       .input('modele', sql.NVarChar(50), req.body.modele)
//       .input('version', sql.Int, req.body.version)
//       .input('couleur', sql.NVarChar(50), req.body.couleur)
//       .query('UPDATE vehicules SET marque = @marque, modele = @modele, annee = @annee, couleur = @couleur WHERE id = @id');
//     if (result.rowsAffected[0] === 0) {
//       res.status(404).json({ message: "vehicules non trouvé" });
//     } else {
//       res.status(200).json({ message: "vehicules mis à jour avec succès" });
//     }
//     catch (err) {
//         console.log("Erreur de mise à jour du vehicules :", err);
//         res.status(400).json({ message: "Erreur de mise à jour du vehicules" });
//         }
//         });
        
//         // Route pour supprimer un véhicule par son ID
//         app.delete('/vehicules/:id', async (req, res) => {
//         try {
//         const pool = await sql.connect(config);
//         const result = await pool.request()
//         .input('id', sql.Int, req.params.id)
//         .query('DELETE FROM vehicules WHERE id = @id');
//         if (result.rowsAffected[0] === 0) {
//         res.status(404).json({ message: "véhicule non trouvé" });
//         } else {
//         res.status(200).json({ message: "véhicule supprimé avec succès" });
//         }
//         } catch (err) {
//         console.log("Erreur de suppression du véhicule :", err);
//         res.status(400).json({ message: "Erreur de suppression du véhicule" });
//         }
//         });
        
      
      