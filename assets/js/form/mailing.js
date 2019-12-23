const scriptURL = 'https://script.google.com/macros/s/AKfycbyQoOrRhtBe6EszGXC517GEug52Pt6_YFxboEKwSb4qXg22br7N/exec';
const form = document.forms['submit-to-mailing-list'];

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
            document.getElementById("fname").value = "";
            document.getElementById("lname").value = "";
            document.getElementById("email").value = "";
        }).catch(() => {
            $("#success-message").attr("class", "alert alert-danger alert-dismissible");
            document.getElementById("message").innerText = "Error!";
            $('.alert').show();
        });
}); 

function hideMessage() {
    $('.' + $('.close').attr('data-hide')).hide();
}