const validation = require("../validation");


//AUTHOR VALIDATION

test('Validates a valid author object', () => {
    let author = { author: "Akhil Goyal", articles: [] };
    const expected = [true];
    expect(validation.validateAuthor(author)).toEqual(expect.arrayContaining(expected));
})

test('Validates an invalid author object with a missing author key', () => {
    let author = { articles: [] };
    const expected = [false];
    expect(validation.validateAuthor(author)).toEqual(expect.arrayContaining(expected));
})

test('Validates an invalid author object with invalid article type', () => {
    let author = { author: "Akhil Goyal", articles: 5 };
    const expected = [false];
    expect(validation.validateAuthor(author)).toEqual(expect.arrayContaining(expected));
})

test('Validates an invalid author object with additional keys', () => {
    let author = { code: 555, author: "Akhil Goyal", articles: [], address: "Lapoesr" };
    const expected = [false];
    expect(validation.validateAuthor(author)).toEqual(expect.arrayContaining(expected));
})




//ARTICLES VALIDATION ON "POST" REQUEST

const validArticle = {title:"Understanding Node.js File System Module",url:"https://levelup.gitconnected.com/understanding-node-js-file-system-module-b16da1e01949",keywords:["Nodejs","Filesystem"],modifiedAt:"06/24/2019",publishedAt:"06/24/2019",author:"Swathi Prasad",readMins:3, author_id : "604f8671c5315e4d20f9d9e5"}
const invalidArticle = {title:"",url:"http://levelup.gitconnected.com/understanding-node-js-file-system-module-b16da1e01949",keywords:[],modifiedAt:"06/24/2019",publishedAt:"06/24/2019",author:"Swathi Prasad",readMins:50, author_id : "604f8671c59d9e5"}

test('Validates a valid article object', () => {
    const expected = [true];
    
    expect(validation.validateArticle(validArticle, "POST")).toEqual(expect.arrayContaining(expected));
})

test('Validates an invalid article object', () => {
    const expected = [false];
    expect(validation.validateArticle(invalidArticle, "POST")).toEqual(expect.arrayContaining(expected));
})

const invalidArticleTitle = {
    title: "",
    url: "https://levelup.gitconnected.com/understanding-node-js-file-system-module-b16da1e01949",
    keywords: [
        "Nodejs",
        "Filesystem"
    ],
    modifiedAt: "06/24/2019",
    publishedAt: "06/24/2019",
    author: "Swathi Prasad",
    readMins: 3,
    author_id : "604f8671c5315e4d20f9d9e5"
}

test('Validates an invalid article object with an invalid title key', () => {
    const expected = [false];
    expect(validation.validateArticle(invalidArticleTitle, "POST")).toEqual(expect.arrayContaining(expected));
})

const invalidArticleUrl = {
    title: "Understanding Node.js File System Module",
    url: "http://levelup.gitconnected.com/understanding-node-js-file-system-module-b16da1e01949",
    keywords: [
        "Nodejs",
        "Filesystem"
    ],
    modifiedAt: "06/24/2019",
    publishedAt: "06/24/2019",
    author: "Swathi Prasad",
    readMins: 3,
    author_id : "604f8671c5315e4d20f9d9e5"
}

test('Validates an invalid article object with an invalid url key', () => {
    const expected = [false];
    expect(validation.validateArticle(invalidArticleUrl, "POST")).toEqual(expect.arrayContaining(expected));
})

const invalidArticleKeywords = {
    title: "Understanding Node.js File System Module",
    url: "https://levelup.gitconnected.com/understanding-node-js-file-system-module-b16da1e01949",
    keywords: [],
    modifiedAt: "06/24/2019",
    publishedAt: "06/24/2019",
    author: "Swathi Prasad",
    readMins: 3,
    author_id : "604f8671c5315e4d20f9d9e5"
}

test('Validates an invalid article object with an invalid keywords key', () => {
    const expected = [false];
    expect(validation.validateArticle(invalidArticleKeywords, "POST")).toEqual(expect.arrayContaining(expected));
})

const invalidArticlemodifiedAt = {
    title: "Understanding Node.js File System Module",
    url: "https://levelup.gitconnected.com/understanding-node-js-file-system-module-b16da1e01949",
    keywords: [
        "Nodejs",
        "Filesystem"
    ],
    modifiedAt: "06/24/2021",
    publishedAt: "06/24/2019",
    author: "Swathi Prasad",
    readMins: 3,
    author_id : "604f8671c5315e4d20f9d9e5"
}

test('Validates an invalid article object with an invalid modifiedAt key', () => {
    const expected = [false];
    expect(validation.validateArticle(invalidArticlemodifiedAt, "POST")).toEqual(expect.arrayContaining(expected));
})

const invalidArticlepublishedAt = {
    title: "Understanding Node.js File System Module",
    url: "https://levelup.gitconnected.com/understanding-node-js-file-system-module-b16da1e01949",
    keywords: [
        "Nodejs",
        "Filesystem"
    ],
    modifiedAt: "06/24/2019",
    publishedAt: "06/24/201i",
    author: "Swathi Prasad",
    readMins: 3,
    author_id : "604f8671c5315e4d20f9d9e5"
}

test('Validates an invalid article object with an invalid publishedAt key', () => {
    const expected = [false];
    expect(validation.validateArticle(invalidArticlepublishedAt, "POST")).toEqual(expect.arrayContaining(expected));
})

const invalidArticleAuthor = {
    title: "Understanding Node.js File System Module",
    url: "https://levelup.gitconnected.com/understanding-node-js-file-system-module-b16da1e01949",
    keywords: [
        "Nodejs",
        "Filesystem"
    ],
    modifiedAt: "06/24/2019",
    publishedAt: "06/24/2019",
    author: 5,
    readMins: 3,
    author_id : "604f8671c5315e4d20f9d9e5"
}

test('Validates an invalid article object with an invalid author key', () => {
    const expected = [false];
    expect(validation.validateArticle(invalidArticleAuthor, "POST")).toEqual(expect.arrayContaining(expected));
})

const invalidArticlereadMins = {
    title: "Understanding Node.js File System Module",
    url: "https://levelup.gitconnected.com/understanding-node-js-file-system-module-b16da1e01949",
    keywords: [
        "Nodejs",
        "Filesystem"
    ],
    modifiedAt: "06/24/2019",
    publishedAt: "06/24/2019",
    author: "Swathi Prasad",
    readMins: 0,
    author_id : "604f8671c5315e4d20f9d9e5"
}

test('Validates an invalid article object with an invalid readMins key', () => {
    const expected = [false];
    expect(validation.validateArticle(invalidArticlereadMins, "POST")).toEqual(expect.arrayContaining(expected));
})

const invalidArticleauthor_id = {
    title: "Understanding Node.js File System Module",
    url: "https://levelup.gitconnected.com/understanding-node-js-file-system-module-b16da1e01949",
    keywords: [
        "Nodejs",
        "Filesystem"
    ],
    modifiedAt: "06/24/2019",
    publishedAt: "06/24/2019",
    author: "Swathi Prasad",
    readMins: 3,
    author_id : "604f86715e4d2"
}

test('Validates an invalid article object with an invalid author_id key', () => {
    const expected = [false];
    expect(validation.validateArticle(invalidArticleauthor_id, "POST")).toEqual(expect.arrayContaining(expected));
})




//ARTICLES VALIDATION ON "PATCH" REQUEST

const validArticlePatch = {
  title: "Understanding Node.js File System Module",
  url:
    "https://levelup.gitconnected.com/understanding-node-js-file-system-module-b16da1e01949",
  keywords: ["Nodejs", "Filesystem"],
};

const invalidArticlePatch = {
    title: "Understanding Node.js File System Module",
    url:
      "https://levelup.gitconnected.com/understanding-node-js-file-system-module-b16da1e01949",
    keywords: [],
  };

const invalidArticlePatchAdditional = {
  additionalKey: "limosin",
  title: "Understanding Node.js File System Module",
};


test('Validates a valid article object on PATCH request', () => {
    const expected = [true];
    expect(validation.validateArticle(validArticlePatch, "PATCH")).toEqual(expect.arrayContaining(expected));
})

test('Validates an invalid article object on PATCH request', () => {
    const expected = [false];
    expect(validation.validateArticle(invalidArticlePatch, "PATCH")).toEqual(expect.arrayContaining(expected));
})

test('Validates an invalid article object with an additional key on PATCH request', () => {
    const expected = [false];
    expect(validation.validateArticle(invalidArticlePatchAdditional, "PATCH")).toEqual(expect.arrayContaining(expected));
})