class Summary::Aggregations
  attr_accessor :user

  CACHE_KEY = 'user_{:user_id}_summary'
  CACHE_OPTS = { expires_in: 5.seconds }

  delegate :cache, to: :Rails

  def self.execute(...)
    new(...).execute
  end

  def initialize(user:)
    self.user = user
  end

  def execute
    promises = [
      total_products,
      total_uploads,
      sum_prices
    ]

    cache.fetch(CACHE_KEY, **CACHE_OPTS) { Ract.take(promises, raise_on_error: false) }
  end

  def total_uploads
    ract { Upload::Record.count }
  end

  def total_products
    ract { Product::Record.count }
  end

  def sum_prices
    ract do
      Product::Record
        .select('SUM(price) as sum_prices')
        .where('expiration_at < ?', Time.now)
        .map { |record| record.sum_prices || 0 }
        .sum
    end
  end
end
