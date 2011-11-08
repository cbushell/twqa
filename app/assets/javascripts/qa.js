$(document).ready(function() {

    $.get("questions.json", function(data) {
        console.log(data);
        $.each(data, function(index, item) {

            var template =
                    "<div class='question'>" +
                            "<h2>{{question}}</h2>" +
                            "<ol class='answers'>" +
                            "{{#choices}}" +
                            "<li><a href='#' class='btn large primary'>{{.}}</a></li>" +
                            "{{/choices}}" +
                            "</ol>" +
                            "</div>";
            var question = Mustache.to_html(template, item)
            $("#questions").append(question);
        });

    })

});