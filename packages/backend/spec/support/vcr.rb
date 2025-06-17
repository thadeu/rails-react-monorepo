require 'vcr'

VCR.configure do |c|
  vcr_mode = ENV.fetch('VCR_MODE', :once)

  c.allow_http_connections_when_no_cassette = true
  c.cassette_library_dir = 'spec/fixtures/vcr_cassettes'

  # VCR_MODE=all bundle exec rspec spec/
  c.default_cassette_options = { record: vcr_mode.to_sym }

  c.hook_into :webmock
  c.configure_rspec_metadata!
end

RSpec.configure do |c|
  c.around(:each, :vcr) do |example|
    name = example.metadata[:full_description].split(/\s+/, 2).join('/').underscore.gsub(%r{[^\w/]+}, '_')
    options = example.metadata.slice(:record, :match_requests_on).except(:example_group)
    VCR.use_cassette(name, options) { example.call }
  end
end
