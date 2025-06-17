class Product::FindAll
  include Pagy::Backend

  async def self.execute(...)
    new(...).execute
  end

  def initialize(params)
    @params = params
  end

  def execute
    collection = Product::Record.all.order(expiration_at: :desc)

    @pagy, @records = pagy(
      collection,
      limit: @params.fetch(:limit, 1000),
      page: @params.fetch(:page, 1)
    )

    result_with @pagy, @records
  rescue Pagy::OverflowError => e
    result_with(@pagy, [])
  end

  def result_with(paggy, records = [])
    {
      page: paggy&.page || @params.fetch(:page, 1).to_i,
      next_page: paggy&.next,
      total_items: records&.count || 0,
      items: records.map(&method(:create_item))
    }
  end

  private def create_item(record)
    {
      pk: record.uid,
      name: record.name,
      price: record.price.to_f,
      currencies: record.currencies,
      expiration_at: record.expiration_at,
      updated_at: record.updated_at
    }
  end
end
