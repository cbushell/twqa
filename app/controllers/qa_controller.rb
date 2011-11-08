class QaController < ApplicationController

  def index
    number_of_questions = 3
    @questions = Questions.new.random(number_of_questions)
  end

end
