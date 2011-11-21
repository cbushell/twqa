require 'manifest_processor'

MANIFEST_IN_FILENAME = 'public/index.manifest.in'

namespace :package do
  desc "packages into offline version of app"
  task :offline => [:create_index_html, :create_json, :copy_to_public, :create_manifest]

  desc "create manifest from manifest.in file"
  task :create_manifest do
    ManifestProcessor.new(MANIFEST_IN_FILENAME).write
  end


  desc "create questions.json"
  task :create_json do
    require 'json'
    require 'csv'
    questions_file = File.expand_path(File.join("config", "questions.csv"))

    qs = CSV.read(questions_file).collect do |row|
      {:question => row[1],
       :correct_choice => row[2],
       :choices => [row[2], row[3], row[4]].sort_by { rand }}
    end

    json_file = File.expand_path(File.join("public", "questions.json"))
    f = File.open(json_file, "w")
    f.write(qs.to_json)
    f.close
  end

  desc "copy javascript, stylesheets, images to public"
  task :copy_to_public do
    ["images", "javascripts", "stylesheets"].each do |dir|
      FileList["app/assets/#{dir}/*"].each do |source|
        target = source.sub("app/assets/#{dir}", 'public/assets')
        cp source, target, :verbose => true
      end
    end
  end

  desc "create offline index.html"
  task :create_index_html do
    require 'erb'
    layout_file = File.expand_path(File.join("app", "views", "layouts", "offline_application.html.erb"))
    content_file = File.expand_path(File.join("app", "views", "qa", "index.html.erb"))
    offline_file = File.expand_path(File.join("public", "index.html"))
    template = ERB.new(File.read(layout_file))
    template.instance_eval do
      def populate
        result(binding)
      end
    end
    f = File.open(offline_file, "w")
    f.write(template.populate { File.read(content_file) })
    f.close
  end

  desc "clean package"
  task :clean do
    File.open(MANIFEST_IN_FILENAME) do |f|
      f.readlines.each do |ln|
        ln.strip!
        if File.exists? 'public/' + ln
          rm 'public/' + ln
        end
      end
    end
  end


end
