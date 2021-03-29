// ARTICLE VALIDATION //

const articleSchema = {
  title: "",
  url: "",
  keywords: "",
  modifiedAt: "",
  publishedAt: "",
  author: "",
  readMins: "",
  author_id: "",
};


function validateArticle(objectToValidate, reqMethod) {
  let errorLog = {};
  let successLog = { message: "File validated!"};
  let arrayOfKeys = Object.keys(objectToValidate);

  let invalidKeys = [];
  arrayOfKeys.forEach(element => {
    if (element in articleSchema === false) {
      invalidKeys.push(element);
      errorLog.invalidKey = {
        invalidKeys: invalidKeys,
        message: "those keys are not allowed",
        };
    }
  });
      
  //title
  if ("title" in objectToValidate) {
    if (typeof (objectToValidate.title) !== "string") {
      errorLog.titleT = {
        invalidValue: objectToValidate.title,
        message: "title should be a string",
      };
    }
    if (objectToValidate.title.length > 255) {
      errorLog.titleL = {
        invalidValue: objectToValidate.title,
        message: "title has a 255 character limit",
      };
    } 
    if (objectToValidate.title === "" || null) {
      errorLog.titleN = {
        invalidValue: objectToValidate.title,
        message: "title should not be empty or null",
      };
    }
  } else if ("title" in objectToValidate === false && reqMethod !== 'PATCH') {
    errorLog.title = { message: "title property does not exist" };
  }

  //author
  if ("author" in objectToValidate) {
    if (typeof (objectToValidate.author) !== "string") {
      errorLog.authorT = {
        invalidValue: objectToValidate.author,
        message: "author should be a string",
      };
    } 
    if (objectToValidate.author.length > 100) {
      errorLog.authorL = {
        invalidValue: objectToValidate.author,
        message: "author has a 100 character limit",
      };
    }
    if (objectToValidate.author === "" || null) {
      errorLog.authorE = {
        invalidValue: objectToValidate.author,
        message: "author should not be empty or null",
      };
    }
  } else if ("author" in objectToValidate === false && reqMethod !== 'PATCH') {
    errorLog.author = { message: "author property does not exist" };
  }

  //url
  if ("url" in objectToValidate && (objectToValidate.url === "" || null)) {
    if (typeof(objectToValidate.url) !== "string") {
        errorLog.urlT = {
            invalidValue: objectToValidate.url,
            message: "url must be a string"
        };
    }
    
    if ((objectToValidate.url === "" || null) && !(objectToValidate.publishedAt === "" || null)) {
      errorLog.url = {
        invalidValue: objectToValidate.url,
        message: "url can only be empty if publishedAt is"
      };
    }
  } else if ("url" in objectToValidate && !(objectToValidate.url === "" || null)) {
    if (objectToValidate.url.split("//")[0] !== "https:") {
            errorLog.url = {
                invalidValue: objectToValidate.url,
                message: "url must begin with https"
            };
        }
  } else if ("url" in objectToValidate === false && reqMethod !== 'PATCH') {
    errorLog.url = { message: "url property does not exist" };
  }

  //keywords
  if ("keywords" in objectToValidate) {
    if (!Array.isArray(objectToValidate.keywords)) {
      errorLog.keywordsT = {
          invalidValue: objectToValidate.keywords,
          message: "keywords must have an array"
      };
    } else if (Array.isArray(objectToValidate.keywords)) {
      let arrayErrorType = false;

      objectToValidate.keywords.forEach(element => {
        if (typeof(element) !== "string") {
          arrayErrorType = true;
          errorLog.keywordsTE = {
            invalidValue: objectToValidate.keywords,
            message: "keywords must be of string type"
          };
        }
      });

      if (objectToValidate.keywords.length > 3 || objectToValidate.keywords.length < 1) {
        errorLog.keywordsL = {
          invalidValue: objectToValidate.keywords,
          message: "keywords must contain an array with 1 to 3 values"
        };
      }
    }
  } else if ("keywords" in objectToValidate === false && reqMethod !== 'PATCH') {
    errorLog.keywords = { message: "keywords property does not exist" };
  }

  //date
  let dateNow = new Date();
  dateNow = dateNow.toLocaleDateString("en-US");
  let subdividedDateNowString = dateNow.split("/");
  let subdividedDateNow = [];

  subdividedDateNowString.forEach(element => {
    subdividedDateNow.push(parseInt(element))
  });

  //modifiedAt
  if ("modifiedAt" in objectToValidate) {
    let subdividedDateArticle = objectToValidate.modifiedAt.split("/");

    subdividedDateArticle.forEach(element => {
      if(!Number(element)) {
        errorLog.modifiedAtNaN = { message: 'date should be a number'};
      }
    });
    
    if (subdividedDateArticle.length === 3) {
      if (subdividedDateArticle[0].length > 2){
       errorLog.modifiedAtF = { message: 'date should have mm/dd/yyyy format'};
      } else if (subdividedDateArticle[1].length > 2) {
       errorLog.modifiedAtF = { message: 'date should have mm/dd/yyyy format'};
      } else if (subdividedDateArticle[2].length > 4) {
        errorLog.modifiedAtF = { message: 'date should have mm/dd/yyyy format'};
      }
    } else {
      errorLog.modifiedAtF = { message: 'date should have mm/dd/yyyy format'};
    }

    if (parseInt(subdividedDateArticle[2]) > subdividedDateNow[2]) {    
      errorLog.modifiedAtLowerDate = { message: 'date cannot be higher than today'};
    } else if (parseInt(subdividedDateArticle[0]) > subdividedDateNow[0] && subdividedDateArticle[2] >= subdividedDateNow[2]) {
      errorLog.modifiedAtLowerDate = { message: 'date cannot be higher than today'};
    } else if (parseInt(subdividedDateArticle[1]) > subdividedDateNow[1] && parseInt(subdividedDateArticle[0]) == subdividedDateNow[0]) {
      errorLog.modifiedAtLowerDate = { message: 'date cannot be higher than today'};
    }
   
    if (objectToValidate.modifiedAt === "" || null) {
      errorLog.modifiedAtN = {
        invalidValue: objectToValidate.author,
        message: "modifiedAt should not be empty or null",
      };
    }
  } else if ("modifiedAt" in objectToValidate !== false && reqMethod !== 'PATCH') {
    errorLog.modifiedAt = { message: "modifiedAt property does not exist" };
  }

  //publishedAt
  if ("publishedAt" in objectToValidate && !(objectToValidate.publishedAt === "" || null)) {
    let subdividedDateArticle = objectToValidate.publishedAt.split("/");
    
    subdividedDateArticle.forEach(element => {
      if(!Number(element)) {
        errorLog.publishedAtNaN = { message: 'date should be a number'};
      }
    });

    if (subdividedDateArticle.length === 3) {
      if (subdividedDateArticle[0].length > 2){
        errorLog.publishedAtF = { message: 'date should have mm/dd/yyyy format'};
      } else if (subdividedDateArticle[1].length > 2) {
        errorLog.publishedAtF = { message: 'date should have mm/dd/yyyy format'};
      } else if (subdividedDateArticle[2].length > 4) {
        errorLog.publishedAtF = { message: 'date should have mm/dd/yyyy format'};
      }
    } else {
      errorLog.publishedAtF = { message: 'date should have mm/dd/yyyy format'};
    }

    if (subdividedDateArticle[2] > subdividedDateNow[2]) {      //check type int JS?
      errorLog.publishedAtLowerDate = { message: 'date cannot be higher than today'};
    } else if (parseInt(subdividedDateArticle[0]) > subdividedDateNow[0] && subdividedDateArticle[2] >= subdividedDateNow[2]) {
      errorLog.publishedAtLowerDate = { message: 'date cannot be higher than today'};
    } else if (parseInt(subdividedDateArticle[1]) > subdividedDateNow[1] && parseInt(subdividedDateArticle[0]) == subdividedDateNow[0]) {
      errorLog.publishedAtLowerDate = { message: 'date cannot be higher than today'};
    }
  } else if ("publishedAt" in objectToValidate === false && reqMethod !== 'PATCH') {
    errorLog.publishedAt = { message: "publishedAt property does not exist"};
  }

  //readMins

  if ("readMins" in objectToValidate) {
    if (typeof (objectToValidate.readMins) !== "number") {
      errorLog.readMinsT = {
        invalidValue: objectToValidate.readMins,
        message: "readMins should be a number",
      };
    } 
    if (!(objectToValidate.readMins >= 1 && objectToValidate.readMins <= 20)) {
      errorLog.readMinsL = {
        invalidValue: objectToValidate.readMins,
        message: "readMins should be between 1 and 20",
      };
    }
    if (objectToValidate.readMins === "" || null) {
      errorLog.readMinsE = {
        invalidValue: objectToValidate.readMins,
        message: "readMins should not be empty or null",
      };
    }
  } else if ("readMins" in objectToValidate === false && reqMethod !== 'PATCH') {
    errorLog.readMins = { message: "readMins property does not exist" };
  }

  //author_id
  if ("author_id" in objectToValidate) {
    if (typeof (objectToValidate.author_id) !== "string") {
      errorLog.author_idT = {
        invalidValue: objectToValidate.author_id,
        message: "author_id should be a string",
      };
    }
    if (objectToValidate.author_id.length !== 24) {
      errorLog.author_idL = {
        invalidValue: objectToValidate.author_id,
        message: "author_id length should be 24",
      };
    } 
    if (objectToValidate.author_id === "" || null) {
      errorLog.author_idN = {
        invalidValue: objectToValidate.author_id,
        message: "author_id should not be empty or null",
      };
    }
  } else if ("author_id" in objectToValidate === false && reqMethod !== 'PATCH') {
    errorLog.author_id = { message: "author_id property does not exist" };
  }

  if (Object.keys(errorLog).length > 0) {
    return [false, errorLog]; //probar styles
  } else {
    return [true, successLog];
  }
}

// AUTHOR VALIDATION //

const authorSchema = {
  author: "",
  articles: "",
};

function validateAuthor(objectToValidate) {
  let errorLog = {};
  let successLog = { message: "File validated!" };
  let arrayOfKeys = Object.keys(objectToValidate);

  let invalidKeys = [];
  arrayOfKeys.forEach(element => {
    if (element in authorSchema === false) {
      invalidKeys.push(element);
      errorLog.invalidKey = {
        invalidKeys: invalidKeys,
        message: "those keys are not allowed",
        };
    }
  });

  if ("author" in objectToValidate) {
    if (objectToValidate.author === "" || null) {
      errorLog.authorE = {
        invalidValue: objectToValidate.author,
        message: "author should not be empty or null",
      };
    }
  } else if ("author" in objectToValidate === false) {
    errorLog.author = { message: "author property does not exist" };
  }

  if ("articles" in objectToValidate) {
    if (Array.isArray(objectToValidate.articles) === false) {
      errorLog.articlesT = {
        invalidValue: objectToValidate.articles,
        message: "articles should be an array",
      };
    }
  } else if ("articles" in objectToValidate === false) {
    errorLog.articles = { message: "articles property does not exist" };
  }

  if (Object.keys(errorLog).length > 0) {
    return [false, errorLog];
  } else {
    return [true, successLog];
  }
}

module.exports = { validateArticle, validateAuthor };