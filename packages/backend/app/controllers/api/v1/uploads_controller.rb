class Api::V1::UploadsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    execute_params = params.slice(:limit, :page)
    result = Upload::FindAll.execute_async(execute_params).await

    render json: result, status: :ok
  rescue StandardError => e
    render json: { error: e.message }, status: :bad_request
  end

  def create
    Upload::EnqueueChunk.execute(create_params)

    render json: { message: 'enqueued' }, status: :ok
  end

  private def create_params
    params.require(:upload).permit(
      :file_encrypt_key,
      :file_name,
      :file_size,
      :file_type,
      :file_chunk,
      :file_status
    )
  end
end
