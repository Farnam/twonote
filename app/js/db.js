var db = new PouchDB('notes');

// db.info().then(function (info) {
//   document.getElementById('display').innerHTML = 'We have a database: ' + JSON.stringify(info);
// });
// db.info().then(function (info) {
//   console.log(info);
// });

// db.get('2012-04-23T18:25:43.511Z').then(function (myNote) {
//   console.log(myNote);
// });

function parseTags(text) {
  return text.match(/#\S+/g);
}

function parseMentions(text) {
  return text.match(/@\S+/g);
}

function saveNote() {
  var text = document.getElementById('note').value;
  var note = {
    "_id": (new Date()).toJSON(), // id is the date (with time)
    "text": text,
    "tags": parseTags(text),
    "mentions": parseMentions(text)
  };
  db.put(note);
}

function searchKeyword(keyword) {
  db.plugin(require('pouchdb-quick-search'));
  return db.search({
    query: keyword,
    fields: ['_id', 'text'],
    include_docs: true,
    highlighting: true
  });
}

console.log(searchKeyword("neymar"));
// }).then(function (res) {
//   console.log(res.rows[0].doc.text); // "It's-a me, Mario!"
//   console.log(res.rows[0].highlighting); // {"text": "It's-a me, <strong>Mario</strong>!"}
// });
