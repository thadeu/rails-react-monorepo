module Upload::Csv
  class CreateOrUpdateProduct
    include Zx

    def self.execute(...)
      new.execute(...)
    end

    def execute(**options)
      @file_encrypt_key = options.delete(:file_encrypt_key)
      @file_name = options.delete(:file_name)
      @file_type = options.delete(:file_type)
      @file_size = options.delete(:file_size)
      @file_chunk = options.delete(:file_chunk)
      @file_status = options.delete(:file_status)

      @parsed_csv = {}
      @exchange_rates = {}
      @upload = Upload::Record.find_or_create_by!(file_encrypt_key:)

      Given(file_chunk)
        .and_then(:parse_csv)
        .and_then(:get_exchange_rates)
        .and_then(:update_upload_status)
        .and_then(:serialize)
        .and_then(:upsert_all)
        .and_then(:expose_result)
    end

    def get_exchange_rates(*)
      @exchange_rates = ExchangeRate.find_by_code('usd')

      Success(true)
    end

    def parse_csv(chunk)
      @parsed_csv = Parsify.call(chunk: chunk)

      Success(true)
    end

    def update_upload_status(*)
      upload.update_columns(
        file_encrypt_key:,
        file_name:,
        file_type:,
        file_size:
      )

      upload.finished! if file_status.to_sym == :finished
      Success(upload)
    end

    def serialize(*)
      lines = []

      parsed_csv[:rows].each do |row|
        next if row.to_h[:name].blank?

        name = Util.html_escape(row.to_h[:name])
        price = Util.normalize_price(row.to_h[:price])
        date = Util.normalize_date(row.to_h[:expiration])

        lines << {
          upload_id: upload.id,
          name: name,
          price: price,
          expiration_at: date,
          currencies: @exchange_rates.each_with_object({}) do |(k, v), h|
            h[k] = { rate: v, price: (price.to_f * v) }
          end
        }
      end

      Try { lines }
    end

    def upsert_all(products)
      promises = []

      products.each_slice(1000).map do |batch|
        promises << Ract { Product::Record.insert_all(batch) }
      end

      Ract.take(promises, raise_on_error: false)

      Success(true)
    rescue StandardError => e
      Failure({
        error: e.message || 'Something went wrong when save your file',
        status: :unprocessable_entity
      }, type: :failure)
    end

    def expose_result(*)
      Success.call({
        message: 'Products created successfully',
        status: :ok
      }, type: :success)
    end

    private

    attr_reader :upload, :parsed_csv,
      :file_name, :file_type, :file_size,
      :file_encrypt_key, :file_chunk, :file_status
  end
end
