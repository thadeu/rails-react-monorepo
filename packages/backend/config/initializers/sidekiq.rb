# https://github.com/mperham/sidekiq/issues/117#issuecomment-9495980

require 'sidekiq'
require 'sidekiq/web'

if Rails.env.staging?
  Sidekiq.configure_client do |config|
    config.redis = { size: 1 }
  end
  # so one sidekiq can have 6 connections
  Sidekiq.configure_server do |config|
    config.redis = { size: 6 }
    # config.logger = Sidekiq::Logger.new($stdout) if Rails.env.development?
  end
end
