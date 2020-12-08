
const commentInput = $("#comment_input");
const latestComment= $("#latest_comment");
const postComment = $("#post_comment");
const commentOutput = $("#comment_output");

var firestore = firebase.firestore();
const databaseDocumentRef = firestore.doc("comments/latestCommentSubmission");

function voteSuccess() {
  console.log("vote saved!");
}

function generalErrorHandler(errer) {
    console.log("Got an error", error);
};

function submitComment() {
    console.log('submitting comment: ' + commentInput.val());
    databaseDocumentRef.set(
      {
          latestComment: commentInput.val()
      }
    ).then(voteSuccess).catch(generalErrorHandler);
}

postComment.click(submitComment);

function getCommentDocument(doc) {
  if (doc && doc.exists){
    var myData = doc.data();
    console.log(myData);
    commentOutput.html("<p>"+myData.latestComment+"</p>");
  }
}

function getLatestVote() {
  databaseDocumentRef.get().then(getCommentDocument).catch(generalErrorHandler);
}

latestComment.click(getLatestVote);

function getRealTimeUpdate() {
  databaseDocumentRef.onSnapshot(getCommentDocument)
}

getRealTimeUpdate();
