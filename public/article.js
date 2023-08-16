var params = new URLSearchParams(location.search);
var article = params.get('title');
var writer = params.get('name');

function loadArticle() {
  if (article != "" && writer != "") {
    firebase.firestore().collection('Stories').doc(writer + " " + article).get().then(function(doc) {
      if (doc && doc.exists) {
        var story = doc.data();
        displayStory(story.content, story.name, story.title, story.fileName);

        allowEditing(story.name);
      }
    })
  } else {
    document.getElementById('storyTitle').innerHTML = "Non-existent story";
    alert('Story Does Not Exist');
  }
}

function displayStory(content, name, title, fileName) {
  document.getElementById('storyTitle').innerHTML = title;
  document.getElementById('storyName').innerHTML = name;
  document.getElementById('storyContent').innerHTML = content;
  var finalImg = document.getElementById('storyImg');
  var theImg = firebase.storage().ref().child(name + "/" + fileName);
  theImg.getDownloadURL().then(function(url){
    finalImg.src = url;
  }).catch(function(error){
    console.error(error);
  })
}

function checkAuthor(otherName){
  return displayName === otherName;
}

function allowEditing(someName){
  if (checkAuthor(someName)){
    document.getElementById('edit').style.display = "block";
  }
}

function editStory() {
  document.getElementById('submitIt').style.display = "block";
  var editedContent = document.getElementById('editContent');
  var storyContent = document.getElementById('storyContent').innerHTML;
  editContent.style.display = "block";
  document.getElementById('storyContent').style.display = "none";
  editedContent.value = storyContent;

}

function submitStory() {
  var editedContent = document.getElementById('editContent').value;
  var storyContent = editedContent.replace(/(?<=->).*?(?=<-)/g, "");
  var storyContent = editedContent.replace(/\n/g, '<br>');
  var storyTitle = document.getElementById('storyTitle').innerHTML;
  if(storyContent != ""){
    firebase.firestore().collection('Stories').doc(displayName + " " + storyTitle).update({
      content: storyContent
    });
  }
  location.reload();
}

loadArticle();
