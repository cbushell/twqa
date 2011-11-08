$(document).ready(function() {

    $.get("questions.json", function(data) {
        $.each(data, function(index, item) {

            var template =
                    "<div class='question' style='display: none'>" +
                            "<h2>{{question}}</h2>" +
                            "<ol class='choices'>" +
                            "{{#choices}}" +
                            "<li>" +
                            "<a href='#' class='btn large primary'>{{.}}</a>" +
                            "<div class='answer'>{{correct_choice}}</div>" +
                            "</li>" +
                            "{{/choices}}" +
                            "</ol>" +
                            "</div>";
            var question = Mustache.to_html(template, item);
            $("#questions").append(question);
        });

        $(".question").first().toggle();
    });

    $("#questions").on("click", ".choices a", function(event) {
        var choice = $(this).text();
        var correctAnswer = $(this).next(".answer").text();

        // show congratulations of sorry message

        $(this).parents(".question").toggle();
        $(this).parents(".question").next().toggle();
    });
});