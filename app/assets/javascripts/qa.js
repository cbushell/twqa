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

        ask($(".question").first(), 0);
    });

    function ask(question, score) {
        if (question.length === 0) {
            mark(score);
        }

        question.toggle();

        question.on("click", ".choices a", function(event) {
            var choice = $(this).text();
            var correctAnswer = $(this).next(".answer").text();

            if (choice == correctAnswer) {
                score += 1;
            }

            $(this).parents(".question").toggle();
            ask($(this).parents(".question").next(), score);
        });
    }

    function mark(score) {
        console.log("Your score is " + score);
    }
});