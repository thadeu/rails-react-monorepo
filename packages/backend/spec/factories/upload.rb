FactoryBot.define do
  factory :upload, class: Upload::Record do
    file_name { 'test' }
    file_type { 'text/csv' }
    file_size { 0 }
    file_encrypt_key { SecureRandom.uuid }
    file_status { 'importing' }
  end
end
