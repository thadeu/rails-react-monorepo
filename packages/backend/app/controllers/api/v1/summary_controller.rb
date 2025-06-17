class Api::V1::SummaryController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    summary = Summary::Aggregations.execute(user: 1)
    total_products, total_uploads, evaluated_products = summary

    render json: { total_uploads:, total_products:, evaluated_products: }, status: :ok
  end
end
