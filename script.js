
   /*
    window.onload = function() {
      document.getElementById("search").addEventListener('click', showResults)
    };
    

    function showResults() {
      var searchTerm = document.querySelector('input[name="searchTerm"]').value
      var url='https://en.wikipedia.org/w/api.php?format=json&action=opensearch&origin=*&search='+searchTerm;
      var output = document.querySelector('#output');
      output.innerHTML="";
      
      
      var url1 = 'https://www.googleapis.com/youtube/v3/search/?part=snippet&key=AIzaSyCnDV9klQbq9IBCrUyCmkWcXwO9TNO1M1k&q='+searchTerm+'&maxResults=8';

      ajaxJS(url1,function(data){
        for (var x in data.items){
          //var title = data.items[x].snippet.title;
          //var desc = data.items[x].snippet.description;
         // var thumb = data.items[x].snippet.thumbnails.default.url;
          var videoID = data.items[x].id.videoId;
          output.innerHTML += '<div class="yt-cont"><iframe class="yt-videos" src="https://youtube.com/embed/'+videoID+'"></iframe></div>';
        }
      })
    }

    function ajaxJS(url, callback){
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status == 200)
        callback(JSON.parse(xhr.responseText));
      }

      xhr.open('GET',url, true)
      xhr.send();
    }
 */



var pageToken = {};
$(document).ready(function() {
  $(".popup").hide();
  $(".overlayBg").hide();
  $("#searchButton").click(function() {
    searchYoutube();
  });
  $(".tokenClass").click(function() {
    pageToken.current =
      $(this).val() == "Next" ? pageToken.nextPage : pageToken.prevPage;
    searchYoutube();
  });
  $(".overlayBg").click(function() {
    //$(".popup").hide();
   // $(".overlayBg").hide();
  });
  $(".popup").click(function() {
    $(".overlayBg").hide();
  });
  $(".fa-moon").click(function(){
    $(".overlayBg").show();
  })
  $(".fa-sun").click(function(){
    $(".overlayBg").hide();
  })
  $("#output").on("click", ".thumbnail", function() {
    $(".popup").show();
    //$(".overlayBg").show();
    $(window).scrollTop(0);

    $(".popup iframe").attr(
      "src",
      "https://www.youtube.com/embed/" + $(this).attr("videoID")
    );
  });
});

function searchYoutube() {
  
  $.ajax({
    url: "https://www.googleapis.com/youtube/v3/search",
    dataType: "json",
    type: "GET",
    data: {
      key: "AIzaSyCmM7FR3svt34-EZc6WHfZkOkeIbmV4l5E",
      q: $("#search").val(),
      part: "snippet",
      maxResults: 8,
      pageToken: pageToken.current
    }
  })
  .done(function(data) {
    pageToken.nextPage = data.nextPageToken;
    pageToken.prevPage = data.prevPageToken;
    var html = "";
    $.each(data["items"], function(index, value) {
     // html += '<div><div class="video-title">' + value.snippet.title + "</div>";
      html +=
      
        '<div class="yt-cont"><p class="video-title">' + value.snippet.title + '</p><img class="thumbnail" src="' +
        value.snippet.thumbnails.medium.url +
        '"videoID="' +
        value.id.videoId +
        '"></div>';
     // html += '<div class="footer"><p class="footer-text">'+ "Now Playing: " + value.snippet.title.videoId +'</p></div>'
    });
    $("#output").html(html);
  });
}


// Get the input field
var input = document.getElementByIds("search");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("searchButton").click();
  }
});

