module Upload::Csv
  class Parsify
    class << self
      def call(chunk:)
        rows = ::CSV.parse(chunk, **csv_options)

        { count: rows.count, rows: rows }
      end

      private

      def csv_options
        {
          headers: true,
          header_converters: :symbol,
          encoding: 'UTF-8',
          col_sep: ';'
        }
      end
    end
  end
end
