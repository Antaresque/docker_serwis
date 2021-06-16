var _table_ = document.createElement('table'),
  _tr_ = document.createElement('tr'),
  _th_ = document.createElement('th'),
  _td_ = document.createElement('td');
  _btn_ = document.createElement('button');

// Builds the HTML Table out of myList json data from Ivy restful service.
function buildHtmlTable(arr) {
  var table = _table_.cloneNode(false),
    columns = addAllColumnHeaders(arr, table);
  for (var i = 0, maxi = arr.length; i < maxi; ++i) {
    var tr = _tr_.cloneNode(false);
    for (var j = 0, maxj = columns.length; j < maxj; ++j) {
      var td = _td_.cloneNode(false);
      cellValue = arr[i][columns[j]];
      td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
      tr.appendChild(td);
    }
    tr.setAttribute('id', arr[i][columns[0]]);
    var btn = _btn_.cloneNode(false);
    btn.addEventListener('click', (e) => deleteThis(e))
    btn.innerHTML = "X";
    tr.appendChild(btn);
    table.appendChild(tr);
  }
  return table;
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
function addAllColumnHeaders(arr, table) {
  var columnSet = [],
    tr = _tr_.cloneNode(false);
  for (var i = 0, l = arr.length; i < l; i++) {
    for (var key in arr[i]) {
      if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
        columnSet.push(key);
        var th = _th_.cloneNode(false);
        th.appendChild(document.createTextNode(key));
        tr.appendChild(th);
      }
    }
  }
  table.appendChild(tr);
  return columnSet;
}

function deleteThis(e) {
  var target = e.target;
  let el = target.parentNode;
  let id = el.id;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const tb = urlParams.get('tab');

  axios.get('http://localhost/token.php').then(res => {
    let token = res.data;
    if(token !== null) {
      var url = document.location.protocol + "//" + document.location.hostname + ":4000";
      var api = `${url}/${tb}/${id}`;
      var options = { headers: { "Authorization": "Bearer " + token } };
      
        axios.delete(api, options).then(res => {
            el.style.display = "none";
            console.log(`usuniety ${el.id}`)
        }).catch(err => {
            console.log(err);
        });
      }
    
  }).catch(err => {
      console.log(err);
  });
}
