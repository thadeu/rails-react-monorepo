require 'rails_helper'

RSpec.describe Api::V1::ProductsController, type: :request do
  describe 'GET /api/v1/products' do
    it 'response ok' do
      headers = { 'Authorization' => "Token token=mysecrettouploadcsv" }

      _product = create(:product, name: 'Test Product', upload: create(:upload))

      get '/api/v1/products', headers: headers

      expect(response).to have_http_status(:ok)
    end

    it 'returns a list of products' do
      headers = { 'Authorization' => "Token token=mysecrettouploadcsv" }

      product = create(:product, name: 'Test Product', upload: create(:upload))

      get '/api/v1/products', headers: headers

      item = JSON.parse(response.body)['items'].first.with_indifferent_access

      expect(item[:name]).to eq(product.name)
      expect(item[:price]).to eq(product.price.to_f)
      expect(item[:currencies]).to eq(product.currencies)
      expect(item[:expiration_at].to_date).to eq(product.expiration_at.to_date)
    end
  end
end
