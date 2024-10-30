const { admin, db } = require("../config/firebaseConfig");

// User Registration
const registerUser = async (req, res) => {
    const { mail, password, name, phone } = req.body;

    const createdAt = Date.now();
    const updatedAt = createdAt;

    try {
        // Create a user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email: mail,
            password,
            displayName: name,
        });

        // Save user info in Firestore
        await db.collection("users").doc(userRecord.uid).set({
            id: userRecord.uid,
            name,
            mail,
            phone,
            password, // Consider hashing the password for security
            created_at: createdAt,
            updated_at: updatedAt,
        });

        res.status(201).send({ message: "User registered successfully!", uid: userRecord.uid });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// User Login
const loginUser = async (req, res) => {
    const { mail, password } = req.body;

    try {
        const userSnapshot = await db.collection("users").where("mail", "==", mail).limit(1).get();

        if (userSnapshot.empty) {
            return res.status(401).send({ error: "Email does not exist!" });
        }

        const userDoc = userSnapshot.docs[0].data();

        // Compare password
        if (userDoc.password !== password) {
            return res.status(401).send({ error: "Incorrect password!" });
        }

        // Login successful
        res.status(200).send({ message: "Login successful!", uid: userDoc.id }); // Return uid directly
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Update User
const updateUser = async (req, res) => {
    const { uid, name, mail, phone, password } = req.body; // Include UID in the request body

    try {
        // Check if the user exists
        const userDoc = await db.collection("users").doc(uid).get(); // Use UID to find user

        if (!userDoc.exists) {
            return res.status(404).send({ error: "User not found!" });
        }

        // Update user info in Firestore
        await db.collection("users").doc(uid).update({
            name,
            mail, // Optionally update mail
            phone,
            password, // Again, consider hashing the password
            updated_at: Date.now(), // Update the timestamp
        });

        res.status(200).send({ message: "User information updated successfully!" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { registerUser, loginUser, updateUser };
