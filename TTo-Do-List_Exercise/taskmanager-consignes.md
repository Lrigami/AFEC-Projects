### **Contexte du projet**
Vous allez développer une application de gestion des tâches (*To-Do List Manager*). Cette application permettra aux utilisateurs de créer, lire, mettre à jour et supprimer des tâches. Les données seront stockées dans une base de données MongoDB.

---

### **Étapes du projet**

#### **1. Mise en place de l'environnement**
- Installez Node.js et MongoDB sur votre machine.
- Créez un nouveau projet Node.js :
  ```bash
  mkdir todo-manager
  cd todo-manager
  npm init -y
  ```
- Installez les dépendances nécessaires :
  ```bash
  npm install express mongoose body-parser cors
  ```
- Lancez MongoDB localement ou configurez un cluster MongoDB Atlas si nécessaire.

#### **2. Conception de la base de données**
- Modélisez les données pour les tâches. Chaque tâche doit contenir :
  - Un titre (*title*) : chaîne de caractères (obligatoire).
  - Une description (*description*) : chaîne de caractères.
  - Un statut (*completed*) : booléen (par défaut à `false`).
  - Une date de création (*createdAt*) : date générée automatiquement.
  
Exemple de schéma Mongoose :
```javascript
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
```

#### **3. Développement des routes API REST**
Créez un serveur Express.js et implémentez les routes suivantes :

1. **Créer une tâche** (`POST /tasks`)  
   Exemple d'entrée JSON :
   ```json
   {
     "title": "Acheter du lait",
     "description": "Aller au supermarché avant 18h"
   }
   ```

2. **Lire toutes les tâches** (`GET /tasks`)  
   Retourne toutes les tâches stockées dans la base de données.

3. **Lire une tâche spécifique** (`GET /tasks/:id`)  
   Retourne une tâche par son ID.

4. **Mettre à jour une tâche** (`PUT /tasks/:id`)  
   Permet de modifier le titre, la description ou le statut d'une tâche.

5. **Supprimer une tâche** (`DELETE /tasks/:id`)  
   Supprime une tâche par son ID.

#### Exemple de route Express.js :
```javascript
const express = require('express');
const Task = require('./models/task'); // Importez le modèle Mongoose
const router = express.Router();

// Route pour créer une tâche
router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
```

#### **4. Test et validation des fonctionnalités**
- Utilisez un outil comme Postman ou Thunder Client pour tester vos routes API.
- Vérifiez que toutes les opérations CRUD fonctionnent correctement avec la base de données MongoDB.

#### **5. Bonus (si le temps le permet)**
- Implémentez une pagination pour la route `GET /tasks`.
- Ajoutez un filtre pour récupérer uniquement les tâches complétées ou non complétées (`GET /tasks?completed=true`).
- Hébergez votre API sur un service cloud comme Heroku ou Render.

---

### **Rappels importants**
1. **Travaillez en branches :** Créez une branche différente pour chaque fonctionnalité (par exemple `feature/create-task`, `feature/get-tasks`). Une fois qu'une fonctionnalité est terminée et testée, mergez-la dans la branche principale.
2. **Commits réguliers :** Faites des commits fréquents avec des messages clairs décrivant vos changements (par exemple : `git commit -m "Ajout de la route POST /tasks"`).
3. **Push régulier :** Pensez à pousser vos modifications sur votre dépôt distant régulièrement pour éviter toute perte de travail.

---

### **Livrables attendus**
1. Code source complet du projet (organisé dans des fichiers clairs).
2. Documentation minimale expliquant les routes API et leur utilisation.
3. Screenshots ou captures d'écran des tests réalisés avec Postman.

---

### **Note importante**
Si vous n’avez pas terminé aujourd’hui, ce n’est pas grave ! Nous pourrons continuer demain selon mon état de santé. Concentrez-vous sur la qualité du code et la compréhension des concepts avant tout. Bon courage ! 🚀

Sources
