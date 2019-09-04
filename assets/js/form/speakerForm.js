const scriptURL = 'https://script.google.com/macros/s/AKfycbzCNvndziqSX2A8qkFpUakEbk3VgGpjM7RyrFQiTQSEmMssUqJU/exec';
const form = document.forms['submit-to-google-sheet'];

var $inputs = $("input[name='phone number'], input[name='email'");
$inputs.on('input', function() {
    $inputs.not(this).prop('required', !$(this).val().length);
})

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, {method: 'POST', mode: 'no-cors', body: new FormData(form)})
        .then(res => {
            if(res.status < 400){
                return;
            } else {
                throw new Error('Fail');
            }
        })
        .then(() => {
            $("#success-message").attr("class", "alert alert-success alert-dismissible");
            document.getElementById("message").innerText = "Thank you for your suggestion! The team will review them all shortly!";
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