const scriptURL = 'https://script.google.com/macros/s/AKfycbw3938jM6S4ZkYqMZmkEO7Y6BKPR57ON6YEuWIgX9QgDFWCtprt/exec';
const form = document.forms['submit-to-google-sheet'];

var $inputs = $("input[name='phone number'], input[name='email']");
$inputs.on('input', function() {
    $inputs.not(this).prop('required', !$(this).val().length);
})

var $inputRadio = $('input[type="radio"][name="host/performer"]');
$inputRadio.click(function() {
    var related_class = $(this).val();
    $('.' + related_class).prop('disabled', false);  

    $inputRadio.not(':checked').each(function() {
        var other_class = $(this).val();
        $('.' + other_class).prop('disabled', true);
    })
});

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

form.addEventListener('submit', e => {
    var data = new FormData(form);
    if(document.getElementById("resume").files.length != 0){
        data.append('resume', document.getElementById('resume').files);
    }

    e.preventDefault();
    fetch(scriptURL, {method: 'POST', mode: 'no-cors', body: data})
        .then(res => {
            if(res.status < 400){
                return;
            } else {
                throw new Error('Fail');
            }
        })
        .then(() => {
            $("#success-message").attr("class", "alert alert-success alert-dismissible");
            document.getElementById("message").innerText = "Application submitted successfully";
            $('#data').empty();
            document.getElementById("resume").value = "";
            $('#resume').prop("disabled", true);
            $('#performance').prop("disabled", true);
            document.getElementById("submit-to-google-sheet").reset();
            $('.alert').show();
        }).catch(() => {
            $("#success-message").attr("class", "alert alert-danger alert-dismissible");
            document.getElementById("message").innerText = "Error!";
            $('.alert').show();
        });
}); 

function hideMessage() {
    $('.' + $('.close').attr('data-hide')).hide();
}