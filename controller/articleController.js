const mongodbClient = require("../mongodb");
const ObjectId = require("mongodb").ObjectID;

const { validateArticle: validate } = require("../validation");

const DATABASE = "academy_juan";
const COLLECTION = "posts";


// GET

const getAllArticles = async (req, res) => {
  let collection = await mongodbClient.client
    .db(DATABASE)
    .collection(COLLECTION)
    .find({})
    .toArray();

  let articlesDetails = collection.map((item) => ({
    _id: item._id,
    title: item.title,
    url: item.url,
  }));

  res.status(200).json(articlesDetails);
};


// GET BY ID

const getArticleByID = async (req, res) => {
  let idFromReq = req.params.id;

  try {
    let article = await mongodbClient.client
      .db(DATABASE)
      .collection(COLLECTION)
      .findOne({ _id: new ObjectId(idFromReq) });

    if (article) {
      res.status(200).json(article);
    } else if (!article) {
      res.status(404).json({ message: "Article not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid ID - " + error.message });
  }
};

// POST

const postArticle = async (req, res) => {
  const content = req.body;

  let validationResult = validate(content, req.method);

  if (validationResult[0]) {
    const articleAuthors = await mongodbClient.client
      .db(DATABASE)
      .collection("authors")
      .findOne({ _id: new ObjectId(content.author_id)});

    if (articleAuthors) {
      const result = await mongodbClient.client
      .db(DATABASE)
      .collection(COLLECTION)
      .insertOne(content);

      res.status(201).json(result.ops[0]);

      await mongodbClient.client
      .db(DATABASE)
      .collection("authors")
      .updateOne(
        { _id: new ObjectId(articleAuthors._id)},
        { $push: { articles: result.ops[0]._id } }
      );
    } else {
      res.status(400).json({ message: "following author_id does not exist", error: content.author_id});
    }
    

  } else if (!validationResult[0]) {
    res
      .status(400)
      .json({ message: "Invalid Article", error: validationResult[1] });
  }
};

// PUT

const checkId = async (id) => {
  return await mongodbClient.client
      .db(DATABASE)
      .collection(COLLECTION)
      .findOne({ _id: new ObjectId(id)});
}

const putArticle = async (req, res) => {
  const content = req.body;

  let idFromReq = req.params.id;

  let validationResult = validate(content, req.method);

  if (validationResult[0]) {
    try {
      let checkReqId = await checkId(idFromReq);

      if (!checkReqId) {
        res.status(400).json({ message: "Invalid article ID"});
      } else {
        let article = await mongodbClient.client
        .db(DATABASE)
        .collection(COLLECTION)
        .replaceOne({ _id: new ObjectId(idFromReq) }, content);

        res.status(200).json(article.ops[0]);
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid ID - " + error.message });
    }
  } else if (!validationResult[0]) {
    res.status(403).json({ message: "Invalid Article", error: validationResult[1] });
  }
};

// PATCH

const patchArticle = async (req, res) => {
  const content = req.body;

  let idFromReq = req.params.id;

  const validationResult = validate(content, req.method);

  if (validationResult[0]) {
    try {
      let checkReqId = await checkId(idFromReq);

      if (!checkReqId) {
        res.status(400).json({ message: "ID does not exist"});
      } else {
        const result = await mongodbClient.client
          .db(DATABASE)
          .collection(COLLECTION)
          .updateOne({ _id: new ObjectId(idFromReq) }, { $set: content }); 

        res.status(201).json(`${result.modifiedCount} field modified`); //check for number of field modified
      }
    } catch (error) {
      console.log(error, " PATCH error");
      res.status(400).json({ message: "Invalid ID - " + error.message });
    }
  } else if (!validationResult[0]) {
    res
      .status(403)
      .json({ message: "Invalid PATCH request", error: validationResult[1] });
  }
};

// DELETE

const deleteArticle = async (req, res) => {
  let idFromReq = req.params.id;

  try {
    let articleAuthor = await mongodbClient.client
      .db(DATABASE)
      .collection(COLLECTION)
      .findOne({ _id: new ObjectId(idFromReq) });

    await mongodbClient.client
      .db(DATABASE)
      .collection("authors")
      .updateOne(
        { _id: new ObjectId(articleAuthor.author_id) },
        { $pull: { articles: articleAuthor._id } }
      );

    const result = await mongodbClient.client
      .db(DATABASE)
      .collection(COLLECTION)
      .deleteOne({ _id: new ObjectId(idFromReq) });

    res.status(201).json({ message: `${result.deletedCount} documents deleted` });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid ID " + error.message });
  }
};


module.exports = {
  getAllArticles,
  getArticleByID,
  postArticle,
  putArticle,
  patchArticle,
  deleteArticle,
};
