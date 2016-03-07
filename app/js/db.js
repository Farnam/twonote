var db = new PouchDB('notes');

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
  return db.search({
    query: keyword,
    fields: ['_id', 'text'],
    include_docs: true,
    highlighting: true
  });
}

//console.log(searchKeyword("neymar"));
