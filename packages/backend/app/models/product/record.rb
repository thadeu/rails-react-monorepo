class Product::Record < ApplicationRecord
  self.table_name = 'products'

  belongs_to :upload, class_name: 'Upload::Record',
    primary_key: 'id',
    foreign_key: 'upload_id'

  attribute :name, :string
  attribute :price, :decimal, precision: 14, scale: 10
  attribute :expiration_at, :datetime, default: -> { Time.current }
  attribute :currencies, :jsonb, default: {}

  validates :name, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 0 }
  validates :expiration_at, presence: true

  normalizes :price, with: -> { Upload::Csv::Util.normalize_price(it) }
end
