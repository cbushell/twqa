require 'csv'

class Questions
  def initialize
    questions_file = File.expand_path(File.join("config", "questions.csv"))

    CSV.foreach(questions_file) do |row|
      @questions ||= []
      @questions << {
          :question => row[1],
          :correct_choice => row[2],
          :choices => [row[2], row[3], row[4]].sort_by { rand }
      }
    end
  end

  def random(num_of_questions)
    @questions.sort_by { rand }[0..(num_of_questions-1)]
  end
end
