module Upload::Csv
  module Util
    module_function

    def html_escape(str)
      ERB::Util.html_escape(str)
    end

    def html_unescape(str)
      ERB::Util.html_unescape(str)
    end

    def normalize_price(price)
      (price || '0').to_s.gsub('$', '').to_f
    end

    def normalize_date(date)
      month, day, year = (date || Time.current.to_s)&.split('/')
      Time.parse("#{year}-#{month}-#{day}")
    end
  end
end
