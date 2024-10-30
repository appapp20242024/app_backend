// controllers/moduleController.js
const { db } = require("../config/firebaseConfig");

const searchModules = async (req, res) => {
    const { query } = req.body; 

    try {
        const moduleSnapshot = await db.collection("modules")
            .where("name", ">=", query) 
            .where("name", "<=", query + '\uf8ff') // Để bao gồm các kết quả tương tự
            .get();

        if (moduleSnapshot.empty) {
            return res.status(404).send({ message: "No modules found." });
        }

        const modules = moduleSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).send({ modules });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { searchModules };
