require 'csv'

class Questions

  def self.all
    questions_file = File.expand_path(File.join("config", "questions.csv"))

    CSV.read(questions_file).collect do |row|
      {:question => row[1],
       :correct_choice => row[2],
       :choices => [row[2], row[3], row[4]].sort_by { rand }}
    end
  end

end