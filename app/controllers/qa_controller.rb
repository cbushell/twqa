class QaController < ApplicationController

  def questions
    render :json => Questions.all
  end

end
