Rails.application.routes.draw do
  namespace :api do
    namespace :v1, constraints: { format: :json } do
      get 'summary', to: 'summary#index'

      get 'uploads/csv', to: 'uploads#index'
      post 'uploads/csv', to: 'uploads#create'

      get 'products', to: 'products#index'
    end
  end
end
