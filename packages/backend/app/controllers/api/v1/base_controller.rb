module Api::V1
  class BaseController < ActionController::API
    include ActionController::HttpAuthentication::Token::ControllerMethods
    include Pagy::Backend

    rescue_from StandardError, with: :error_handler

    def authenticate_user!
      authenticate_or_request_with_http_token do |token, options|
        # user = User.find_by(token: token)
        user_token = 'mysecrettouploadcsv' # user.token

        ActiveSupport::SecurityUtils.secure_compare(token, user_token)
      end
    end

    def error_handler(exception)
      render json: { error: ['Something went wrong', exception.message] }, status: :bad_request
    end
  end
end
