function sendStory() {
  var storyTitle = document.getElementById('storyTitle').value;
  var storyIntro = document.getElementById('storyIntro').value;
  var storyContent = document.getElementById('storyContent').value;
  var file = document.getElementById('storyImage').files[0];
  console.log(storyTitle, storyIntro, storyContent);
  var storyContent = storyContent.replace(/(?<=->).*?(?=<-)/g, "");
  var storyContent = storyContent.replace(/\n/g, '<br>');

  if (storyTitle != false && storyIntro != false && storyContent != false && file != false) {

   console.log(storyContent);
    firebase.firestore().collection('Stories').doc(displayName + " " + storyTitle).set({
      title: storyTitle,
      intro: storyIntro,
      name: displayName,
      content: storyContent,
      fileName: file.name
    });
    storageRef = firebase.storage().ref(displayName + "/" + file.name);
    storageRef.put(file);

  } else {
    alert('Please complete all files');
  }


  document.getElementById('storyTitle').value = "";
  document.getElementById('storyIntro').value = "";
  document.getElementById('storyContent').value = "";
}
