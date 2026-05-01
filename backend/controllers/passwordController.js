const { ObjectId } = require('mongodb');
const connectDB = require('../db/connect');

const getAll = async (req, res) => {
  try {
    const db = await connectDB();
    const passwordsCollection = db.collection('passwords');
    const passwords = await passwordsCollection.find({ userId: new ObjectId(req.user.userId) }).sort({ createdAt: -1 }).toArray();
    res.status(200).json(passwords);
  } catch (error) {
    console.error('getAll error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const create = async (req, res) => {
  try {
    const { site, username, password, category } = req.body;
    
    if (!site || !username || !password) {
      return res.status(400).json({ error: 'Site, username, and password are required.' });
    }
    if (typeof site !== 'string' || site.trim() === '') {
      return res.status(400).json({ error: 'Site must be a non-empty string.' });
    }

    const db = await connectDB();
    const passwordsCollection = db.collection('passwords');

    const duplicate = await passwordsCollection.findOne({ 
      userId: new ObjectId(req.user.userId), 
      site: site.trim(), 
      username: username.trim() 
    });

    if (duplicate) {
      return res.status(409).json({ error: 'A password for this site + username already exists.' });
    }

    const newPassword = {
      userId: new ObjectId(req.user.userId),
      site: site.trim(),
      username: username.trim(),
      password: password,
      category: category || 'Other',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await passwordsCollection.insertOne(newPassword);
    res.status(201).json({ ...newPassword, _id: result.insertedId });
  } catch (error) {
    console.error('create error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { site, username, password, category } = req.body;

    if (!site || !username || !password) {
      return res.status(400).json({ error: 'Site, username, and password are required.' });
    }

    const db = await connectDB();
    const passwordsCollection = db.collection('passwords');

    const existing = await passwordsCollection.findOne({ _id: new ObjectId(id), userId: new ObjectId(req.user.userId) });
    if (!existing) {
      return res.status(404).json({ error: 'Password not found.' });
    }

    const duplicate = await passwordsCollection.findOne({ 
      _id: { $ne: new ObjectId(id) },
      userId: new ObjectId(req.user.userId), 
      site: site.trim(), 
      username: username.trim() 
    });

    if (duplicate) {
      return res.status(409).json({ error: 'A password for this site + username already exists.' });
    }

    const updatedDoc = {
      $set: {
        site: site.trim(),
        username: username.trim(),
        password: password,
        category: category || existing.category,
        updatedAt: new Date()
      }
    };

    await passwordsCollection.updateOne({ _id: new ObjectId(id), userId: new ObjectId(req.user.userId) }, updatedDoc);
    
    const returnedDoc = await passwordsCollection.findOne({ _id: new ObjectId(id) });
    res.status(200).json(returnedDoc);
  } catch (error) {
    console.error('update error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDB();
    const passwordsCollection = db.collection('passwords');

    const result = await passwordsCollection.deleteOne({ _id: new ObjectId(id), userId: new ObjectId(req.user.userId) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Password not found.' });
    }

    res.status(200).json({ message: 'Deleted.' });
  } catch (error) {
    console.error('remove error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { getAll, create, update, remove };
