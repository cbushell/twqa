require 'csv'

class Questions
  def initialize
    CSV.foreach(File.expand_path(File.join("app", "models", "questions.csv"))) do |row|
      @questions ||= []
      @questions << {
          :question => row[1],
          :correct_choice => row[2],
          :choices => [row[2], row[3], row[4]]
      }
    end
  end

  def random(num_of_questions)
    @questions.sort_by { rand }[0..(num_of_questions-1)]
  end
end
