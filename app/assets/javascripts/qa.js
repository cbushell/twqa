$(document).ready(function() {

    $.get("questions.json", function(data) {
        console.log(data);
        $.each(data, function(index, item) {

            var template =
                    "<div class='question'>" +
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
            var question = Mustache.to_html(template, item)
            $("#questions").append(question);
        });

    })

    $("#questions").on("click", ".choices a", function(event) {
        var choice = event.currentTarget.text;
        var correctAnswer = $(event.target.parentElement).find(".answer").text()
        
    });

});