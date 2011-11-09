$(document).ready(function() {

    function play() {
        $("#win").hide();
        $("#loose").hide();
        $("#questions .question").remove();

        $.get("questions.json", function(data) {
            $.each(data, function(index, item) {

                var template =
                        "<div class='question'>" +
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
    }

    function ask(question, score) {

        if (question.length === 0) {
            mark(score);
        } else {
            question.toggle();
        }

        question.on("click", ".choices a", function(event) {
            var answer = $(this).text();
            var correctAnswer = question.find(".answer").text();

            if (answer == correctAnswer) {
                score += 1;
            }

            question.toggle();
            ask(question.next(), score);
        });
    }

    function mark(score) {
        if ($(".question").length === score) {
            $("#win").toggle();
        } else {
            $("#loose").toggle();
        }
    }

    $(".alert-actions a").on("click", function(event) {
        play();
    });

    play();
});