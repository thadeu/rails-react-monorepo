class ExchangeRate
  def self.find_by_code(...)
    new.find_by_code(...)
  end

  attr_reader :cache

  def initialize(cache = Cache)
    @cache = cache
  end

  def find_by_code(code)
    data = cache.hget('exchange_rates', code)
    return JSON.parse(data) if data.present? && data != 0

    make_request(code)
      .parsed_response
      .then { upsert_cache(code, it) }
      .then { it }
  rescue StandardError => e
    Rails.logger.error(e.message)

    {}
  end

  def make_request(code)
    HTTParty.get(primary_url(code))
  rescue StandardError => e
    Rails.logger.error(e.message)

    HTTParty.get(fallback_url(code))
  end

  def upsert_cache(code, data)
    key = 'exchange_rates'
    usd = data.dig(code)

    value = {
      brl: usd.dig('brl'), # Brazilian Real
      btc: usd.dig('btc'), # Bitcoin
      eur: usd.dig('eur'), # Euro
      gbp: usd.dig('gbp'), # British Pound
      cad: usd.dig('cad'), # Canadian Dollar
      usd: usd.dig('usd')  # US Dollar
    }

    cache.hset(key, code, value.to_json)
    cache.expireat(key, Time.now.end_of_day.to_i)

    value
  end

  def primary_url(code)
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/#{code}.json"
  end

  def fallback_url(code)
    "https://latest.currency-api.pages.dev/v1/currencies/#{code}.json"
  end

  class Cache
    class << self
      delegate :hset, :hget, :expireat, to: :client

      def client
        @client ||= ::Redis.new(url: ENV.fetch('REDIS_URL'))
      end
    end
  end
end
