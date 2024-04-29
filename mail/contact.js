$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            var mailSubject = 'Email trimis automat din sectiunea Contact al famousenergy.ro';
            var mailBody = "<!DOCTYPE html>" + 
                            "<html>" +
                            "<head></head>" +
                            "<body>" +
                            "Salutare, <br><br>" +
                            "Prin formularul de contact al site-ului famousenergy.ro v-au fost trimise urmatoarele detalii: <br>" +
                            "<strong>Nume: " + name + "</strong><br>" +
                            "<strong>Email: " + email + "</strong><br>" +
                            "<strong>Subiect: " + subject + "</strong><br>" +
                            "<strong>Mesaj: " + message + "</strong><br><br>" +
                            "Va rog sa luati legatura cu persoana care v-a comunicat datele de contact! <br><br>" + 
                            "<em>Echipa Famous Energy Live Stream </em><br><br>" +
                            "</body>" +
                            "</html>";

            Email.send({
                SecureToken : "35e33990-6acd-43d7-aa7f-2837978cd7c3",
                To : 'sanduteo96@gmail.com',
                From : "sanduteo96@gmail.com",
                Subject : mailSubject,
                Body : mailBody
            }).then(
                function () {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-success')
                            .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                            .append('</div>');
                    $('#contactForm').trigger("reset");

                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            );

            // $.ajax({
            //     url: "contact.php",
            //     type: "POST",
            //     data: {
            //         name: name,
            //         email: email,
            //         subject: subject,
            //         message: message
            //     },
            //     cache: false,
            //     success: function () {
            //         $('#success').html("<div class='alert alert-success'>");
            //         $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            //                 .append("</button>");
            //         $('#success > .alert-success')
            //                 .append("<strong>Your message has been sent. </strong>");
            //         $('#success > .alert-success')
            //                 .append('</div>');
            //         $('#contactForm').trigger("reset");
            //     },
            //     error: function () {
            //         $('#success').html("<div class='alert alert-danger'>");
            //         $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            //                 .append("</button>");
            //         $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
            //         $('#success > .alert-danger').append('</div>');
            //         $('#contactForm').trigger("reset");
            //         $('#success').html("<div class='alert alert-success'>");
            //         $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            //                 .append("</button>");
            //         $('#success > .alert-success')
            //                 .append("<strong>Your message has been sent. </strong>");
            //         $('#success > .alert-success')
            //                 .append('</div>');
            //         $('#contactForm').trigger("reset");
            //     },
            //     complete: function () {
            //         setTimeout(function () {
            //             $this.prop("disabled", false);
            //         }, 1000);
            //     }
            // });
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
    $('#success').html('');
});
