class Api::V1::ProductsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    execute_params = params.slice(:limit, :page)
    result = Product::FindAll.execute_async(execute_params).await

    render json: result, status: :ok
  end
end
