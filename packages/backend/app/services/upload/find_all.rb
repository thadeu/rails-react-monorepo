class Upload::FindAll
  include Pagy::Backend

  async def self.execute(...)
    new(...).execute
  end

  def initialize(params)
    @params = params
  end

  def execute
    collection = Upload::Record.all.order(updated_at: :desc)

    @pagy, @records = pagy(
      collection,
      limit: @params.fetch(:limit, 100),
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

  def create_item(record)
    {
      file_encrypt_key: record.file_encrypt_key,
      file_name: record.file_name,
      file_size: record.file_size,
      file_type: record.file_type,
      file_status: record.file_status,
      created_at: record.created_at,
      updated_at: record.updated_at
    }
  end
end
