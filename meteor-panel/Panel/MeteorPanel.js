(function () {

  // This will run once on panel page load, which is basically
  // whenever you open the dev tools.
  //
  // How do we find out when the inspected page changes?
  //
  // If we want to keep state across closing the dev tools,
  // there are definitely mechanisms for that, like
  // "background pages."

  var page = new inspectedPage();
  page.onloaded = function(hasMeteor, stats){
    if (hasMeteor){
      document.getElementById('unsupported').style.display = "none";
      if (stats.injected){
        document.getElementById('uninjected').style.display = "none";
        var click = function(){
          selectListElement(this);
          page.loadCollection(this.innerText, function(response){
            displayTable(response);
          });
        };
        var collectionsList = document.getElementById('collections');
        collectionsList.innerHTML = '';
        for (var i = 0; i < stats.collections.length; i++) {
          var el = document.createElement('li');
          el.innerText = stats.collections[i];
          el.addEventListener('click',click);
         collectionsList .appendChild(el);
        };
      } else {
        document.getElementById('uninjected').style.display = "block";
      }
    } else {
      document.getElementById('unsupported').style.display = "block";
    }
  };

  var showSessions = function(){
    selectListElement(this);
    page.getSessions(function(sessions){
      document.querySelector("#tableData thead tr").innerHTML = '<th>Key</th><th>Value</th>';
      var body = document.querySelector("#tableData tbody");
      body.innerHTML = "";
      for (var key in sessions) {
        var row = document.createElement('tr');
        row.innerHTML = '<td>' + key + '</td><td>' + sessions[key] + '</td>';
        body.appendChild(row);
      };
    });
  };
  document.getElementById('listSession').addEventListener('click', showSessions);

  var selectListElement = function(element){
    var elements = document.querySelectorAll('li.selected');
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('selected');
    }
    element.classList.add('selected');
  };

  var displayTable = function(data){
    var head = document.querySelector("#tableData thead tr");
    var body = document.querySelector("#tableData tbody");
    var el;
    var headers = [];

    head.innerHTML = "";
    body.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
      for(var key in data[i]){
        if (headers.indexOf(key) == -1){
          headers.push(key);
        }
      }
    }
    for (var i = 0; i < headers.length; i++) {
      el = document.createElement('th');
      el.innerText = headers[i];
      head.appendChild(el);
    }
    for (var i = 0; i < data.length; i++) {
      var row = document.createElement('tr');
      for (var h = 0; h < headers.length; h++) {
        el = document.createElement('td');
        el.innerText = String(data[i][headers[h]]) || "";
        row.appendChild(el);
      };
      body.appendChild(row);
    }
  }

  var inject = function(){
    page.reload(getSnifferScript());
  }
  document.getElementById('reload').addEventListener('click', inject);

})();
