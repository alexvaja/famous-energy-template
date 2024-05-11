$(function () {

    $("#newsletterContactForm input").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var email = $("input#newsletterEmail").val();

            $this = $("#newsletterButton");
            $this.prop("disabled", true);

            var mailSubject = 'Email trimis automat din sectiunea Abonare - famousenergy.ro';
            var mailBody = "<!DOCTYPE html>" + 
                            "<html>" +
                            "<head></head>" +
                            "<body>" +
                            "Salutare, <br><br>" +
                            "Prin formularul de newsletter al site-ului famousenergy.ro v-a fost trimis: <br>" +
                            "<strong>Email: " + email + "</strong><br><br>" +
                            "Va rog sa luati legatura cu persoana care v-a comunicat datele de contact! <br><br>" + 
                            "<em>Echipa Famous Energy Live Stream </em><br><br>" +
                            "</body>" +
                            "</html>";

            Email.send({
                SecureToken : "fe8c8173-07be-477a-93f1-7a328b94ec13",
                To : 'contact@famousenergy.ro',
                From : "contact@famousenergy.ro",
                Subject : mailSubject,
                Body : mailBody
            }).then(
                function () {
                    $('#successNewsletter').html("<div class='alert alert-success'>");
                    $('#successNewsletter > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#successNewsletter > .alert-success')
                            .append("<strong>Your message has been sent. </strong>");
                    $('#successNewsletter > .alert-success')
                            .append('</div>');
                    $('#contactForm').trigger("reset");

                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            );
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#successNewsletter').html('');
});
