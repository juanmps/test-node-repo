const mongodbClient = require("../mongodb");
const ObjectId = require("mongodb").ObjectID;

const validate = require("../validation").validateAuthor;

const DATABASE = "academy_juan";
const COLLECTION = "authors";


// GET

const getAllAuthors = async (req, res) => {
  let collection = await mongodbClient.client
    .db(DATABASE)
    .collection(COLLECTION)
    .find({})
    .toArray();

  res.status(200).json(collection);
};


// GET BY ID

const getAuthorByID = async (req, res) => {
  let idFromReq = req.params.id;

  try {
    let author = await mongodbClient.client
      .db(DATABASE)
      .collection(COLLECTION)
      .findOne({ _id: new ObjectId(idFromReq) });

    if (author) {
      res.status(200).json(author);
    } else if (!author) {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid ID - " + error.message });
  }
};

// POST

const postAuthor = async (req, res) => {
  const content = req.body;

  let validationResult = validate(content);

  if (validationResult[0]) {
    const result = await mongodbClient.client
      .db(DATABASE)
      .collection(COLLECTION)
      .insertOne(content);

    res.status(201).json(result.ops[0]);
  } else if (!validationResult[0]) {
    res
      .status(400)
      .json({ message: "Invalid Author", error: validationResult[1] });
  }
};

// PUT

const checkId = async (id) => {
  return await mongodbClient.client
      .db(DATABASE)
      .collection(COLLECTION)
      .findOne({ _id: new ObjectId(id)});
}

const putAuthor = async (req, res) => {
  const content = req.body;

  let idFromReq = req.params.id;

  let validationResult = validate(content);

  if (validationResult[0]) {
    try {
      let checkReqId = await checkId(idFromReq);

      if (!checkReqId) {
        res.status(400).json({ message: "Invalid author ID"});
      } else {
        let author = await mongodbClient.client
        .db(DATABASE)
        .collection(COLLECTION)
        .replaceOne({ _id: new ObjectId(idFromReq) }, content);

        res.status(200).json(author.ops[0]);
      }
      
    } catch (error) {
      console.log(error, " PUT error");
      res.status(400).json({ message: "Invalid ID - " + error.message });
    }
  } else if (!validationResult[0]) {
    res.status(403).json({ message: "Invalid Author", error: validationResult[1] });
  }
};

// DELETE

const deleteAuthor = async (req, res) => {
  let idFromReq = req.params.id;

  try {
    const authorArticles = await mongodbClient.client
      .db(DATABASE)
      .collection(COLLECTION)
      .findOne({ _id: new ObjectId(idFromReq) });

    let idObject = [];

    authorArticles.articles.forEach((element) => {
      idObject.push(new ObjectId(element));
    });

    const articlesDeleted = await mongodbClient.client
      .db(DATABASE)
      .collection("posts")
      .deleteMany({ _id: { $in: idObject } });

    const result = await mongodbClient.client
      .db(DATABASE)
      .collection(COLLECTION)
      .deleteOne({ _id: new ObjectId(idFromReq) });

    res.status(201).json({ message:`${result.deletedCount} author deleted, ${articlesDeleted.result.n} documents from articles deleted`});
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid ID - " + error.message });
  }
};


module.exports = {
  getAllAuthors,
  getAuthorByID,
  postAuthor,
  putAuthor,
  deleteAuthor,
};
