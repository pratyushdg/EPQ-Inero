var storiesArray = [];
function loadStories() {
  var query = firebase.firestore().collection('Stories');

  // Start listening to the query.
  query.onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
      var message = change.doc.data();
      displayMessage(message.name, message.intro, message.title, message.fileName);

    });
  });
}

function displayMessage(name, intro, title, fileName) {
  if (name != null && intro != null && title != null && fileName != null) {
    var cardy = document.createElement('div');
    cardy.classList.add('cardy');
    var cont = document.createElement('div');
    cont.classList.add('containery');
    var titleIn = document.createElement('h4');
    titleIn.classList.add('makeBold');
    titleIn.innerHTML = title;
    var introIn = document.createElement('p');
    introIn.innerText = intro.trim();
    var a = document.createElement('a');
    a.onclick = function() {
      redirect(title, name);
    };
    a.classList.add('btn');
    a.classList.add('btn-primary');
    a.innerHTML = "Go";
    var finalImg = document.createElement('img');
    var theImg = firebase.storage().ref().child(name + "/" + fileName);
    theImg.getDownloadURL().then(function(url) {
      finalImg.src = url;
      console.log(url)
    }).catch(function(error) {
      console.log(error);
    });
    finalImg.classList.add('someImg');
    cont.appendChild(finalImg);
    cont.appendChild(titleIn);
    cont.appendChild(introIn);
    cont.appendChild(a);
    cardy.appendChild(cont);
    document.getElementById('bigCont').appendChild(cardy);
  }
}

function redirect(title, name) {
  location.assign('../article?' + 'title=' + title + '&name=' + name);
}

function myFunction() {
  // Declare variables
  var input, filter, cards, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  allCards = document.getElementsByClassName('cardy')

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < allCards.length; i++) {
    a = allCards[i].getElementsByTagName("h4")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      allCards[i].style.display = "";
    } else {
      allCards[i].style.display = "none";
    }
  }
}

loadStories();
