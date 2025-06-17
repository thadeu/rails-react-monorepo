class Upload::EnqueueChunk
  def self.execute(...)
    new(...).execute
  end

  def initialize(params)
    @file_name = params.fetch(:file_name)
    @file_type = params.fetch(:file_type)
    @file_size = params.fetch(:file_size)
    @file_encrypt_key = params.fetch(:file_encrypt_key)
    @file_chunk = params.fetch(:file_chunk)
    @file_status = params.fetch(:file_status)
  end

  def execute
    UploadJob.perform_async(*job_params)
  end

  private def job_params
    [
      @file_name,
      @file_type,
      @file_size,
      @file_encrypt_key,
      @file_chunk,
      @file_status
    ]
  end
end
