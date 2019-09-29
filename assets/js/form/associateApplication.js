//https://gist.github.com/tanaikech/2f16f467c94612dc83920a3158614d95
var currentTab = 0; 
var scriptURL = "https://script.google.com/macros/s/AKfycbxq0GIXDVKGZc09Auk_RakCT25xXawb7Mg6IYm0S-pyHdOmhwU/exec";
const form = document.forms['submit-to-google-sheet'];
showTab(currentTab); 

$('#resume').on('change', function() {

  var file = this.files[0];
  var fr = new FileReader();
  fr.fileName = file.name;
  fr.onload = function(e) {
    e.target.result;
    html = '<input type="hidden" name="data" value="' + e.target.result.replace(/^.*,/, '') + '" >';
    html += '<input type="hidden" name="mimetype" value="' + e.target.result.match(/^.*(?=;)/)[0] + '" >';
    html += '<input type="hidden" name="filename" value="' + e.target.fileName + '" >';
    $("#data").empty().append(html);
  }
  fr.readAsDataURL(file);
});

form.addEventListener("submit", () => {
  span = document.getElementById("span");
  nextBtn = document.getElementById("nextBtn");
  prevBtn = document.getElementById("prevBtn");

  span.style.display="none";
  nextBtn.style.display="none";
  prevBtn.style.display="none";
  console.log("submit clicked")
})

function showMessage(e){

  $('#progress').html(e);
}

function hideMessage() {
  $('.' + $('.close').attr('data-hide')).hide();
}

function showTab(n) {
  
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }

  fixStepIndicator(n)
}

function nextPrev(n) {

  var x = document.getElementsByClassName("tab");

  if (n == 1 && !validateForm()) return false;

  x[currentTab].style.display = "none";

  currentTab = currentTab + n;

  if (currentTab >= x.length) {
      
      var data = new FormData();
      data.append('resume', document.getElementById('resume').files);

      fetch(scriptURL, {method: 'POST', body: data })
      .then(response => {
        console.log('Success!', response)
        span = document.getElementById("span");
        nextBtn = document.getElementById("nextBtn");
        prevBtn = document.getElementById("prevBtn");

        span.style.display="none";
        nextBtn.style.display="none";
        prevBtn.style.display="none";

        $("#success-message").attr("class", "alert alert-success alert-dismissible");
        document.getElementById("message").innerText = "Thank you very much for your application! Please note that only successful candidates will be contacted";
        $('.alert').show();
      })
      .catch(error => {
        console.error('Error!', error.message)
        $("#success-message").attr("class", "alert alert-danger alert-dismissible");
        document.getElementById("message").innerText = "Error! Something went wrong";
        $('.alert').show();
      })

      document.getElementById("regForm").submit();
    
    return false;
  }

  showTab(currentTab);
}

function validateForm() {

  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].querySelectorAll("input, textarea");

  for (i = 0; i < y.length; i++) {

    if (y[i].value == "") {

      y[i].className += " invalid";

      valid = false;
    }
  }

  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  if(currentTab == 3) {
    valid = true;
  }
  return valid;
}

function fixStepIndicator(n) {

  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }

  x[n].className += " active";
}

