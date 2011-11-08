class QaController < ApplicationController

  def questions
    number_of_questions = 3
    @questions = Questions.new.random(number_of_questions)
    render :json => @questions
  end

end
