const { db, bucket } = require('../config/firebaseAdmin');
const { v4: uuidv4 } = require('uuid');

const fungiCollection = db.collection('fungi');

async function createFungus(req, res) {
  try {
    const data = req.body;
    const id = uuidv4();
    let images = [];

    // upload images
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const filename = `fungi/${id}/${Date.now()}_${file.originalname}`;
        const fileRef = bucket.file(filename);

        await fileRef.save(file.buffer, {
          metadata: { contentType: file.mimetype }
        });

        const [url] = await fileRef.getSignedUrl({
          action: 'read',
          expires: Date.now() + 1000 * 60 * 60 * 24 * 365
        });

        images.push(url);
      }
    }

    const doc = {
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      commonName: data.commonName || "",
      scientificName: data.scientificName || "",
      taxonomy: data.taxonomy || {},
      images: images,
      location: data.location || {},
      collectionData: data.collectionData || {},
      labNotes: data.labNotes || "",
    };

    await fungiCollection.doc(id).set(doc);
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create fungus" });
  }
}

async function listFungi(req, res) {
  try {
    const snapshot = await fungiCollection.get();
    const results = [];
    snapshot.forEach(doc => results.push(doc.data()));
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch fungi" });
  }
}

async function getFungus(req, res) {
  try {
    const id = req.params.id;
    const doc = await fungiCollection.doc(id).get();

    if (!doc.exists) return res.status(404).json({ error: "Not found" });

    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch fungus" });
  }
}

async function deleteFungus(req, res) {
  try {
    const id = req.params.id;
    await fungiCollection.doc(id).delete();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete fungus" });
  }
}

module.exports = {
  createFungus,
  listFungi,
  getFungus,
  deleteFungus
};
