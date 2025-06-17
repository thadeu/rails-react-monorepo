class Upload::Record < ApplicationRecord
  self.table_name = 'uploads'

  has_many :products, class_name: 'Product::Record',
    primary_key: 'id',
    foreign_key: 'upload_id'

  STATUS = %i[importing finished].freeze

  enum :file_status, STATUS.index_by(&:itself), default: :importing

  attribute :file_encrypt_key, :string
  attribute :file_name, :string
  attribute :file_type, :string
  attribute :file_size, :integer, default: 0
  attribute :file_status, :string, default: -> { :importing }
  attribute :total_rows, :integer, default: 0

  validates :file_encrypt_key, presence: true
end
