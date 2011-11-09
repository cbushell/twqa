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
                            "</li>" +
                            "{{/choices}}" +
                            "</ol>" +
                            "<div class='answer'>{{correct_choice}}</div>" +
                            "</div>";
            var question = Mustache.to_html(template, item);
            $("#questions").append(question);
        });

        ask($(".question").first(), 0);
    });

    function ask(question, score) {
        if (question.length === 0) {
            mark(score);
        } else {
            question.toggle();
        }

        question.on("click", ".choices a", function(event) {
            var choice = $(this).text();
            var correctAnswer = question.find(".answer").text();

            if (choice == correctAnswer) {
                score += 1;
            }

            question.toggle();
            ask(question.next(), score);
        });
    }

    function mark(score) {
        console.log("Your score is " + score);
    }
});