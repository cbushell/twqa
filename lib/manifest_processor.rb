class ManifestProcessor
  def initialize(manifest_in)
    @lines = []

    File.open(manifest_in) do |f|
      f.readlines.each do |ln|
        ln.strip!

        if File.exists? 'public/' + ln
          h = Digest::SHA2.file('public/' + ln).hexdigest
          @lines << "#{ln} # #{h}"
        else
          @lines << ln
        end
      end
    end

    raise "MANIFEST template doesn't end with '.manifest.in'" unless /\.manifest\.in$/.match manifest_in
    @manifest_fn = manifest_in[/.*(?=\.in)/]
  end

  def write
    File.open(@manifest_fn, 'w') do |f|
      @lines.each { |l| f.puts l }
    end
  end
end

