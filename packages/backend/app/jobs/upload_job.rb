class UploadJob
  include Sidekiq::Job

  sidekiq_options queue: :high, retry: 3

  def perform(file_name, file_type, file_size, file_encrypt_key, file_chunk, file_status)
    params = {
      file_name:,
      file_type:,
      file_size:,
      file_encrypt_key:,
      file_chunk:,
      file_status:
    }

    Upload::Csv::CreateOrUpdateProduct.execute(**params)
  end
end
