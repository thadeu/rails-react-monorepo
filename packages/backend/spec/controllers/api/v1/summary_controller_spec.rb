require 'rails_helper'

RSpec.describe Api::V1::SummaryController, type: :request do
  describe 'GET #index' do
    it 'returns a 200 response' do
      headers = { 'Authorization' => "Token token=mysecrettouploadcsv" }

      get '/api/v1/summary', params: {}, headers: headers

      expect(response).to have_http_status(:ok)
    end

    it 'returns the correct summary' do
      upload = create(:upload)
      create(:product, price: 10.0, upload: upload)

      headers = { 'Authorization' => "Token token=mysecrettouploadcsv" }

      get '/api/v1/summary', params: {}, headers: headers

      json = JSON.parse(response.body)

      expect(json['total_uploads']).to eq(1)
      expect(json['total_products']).to eq(1)
      expect(json['evaluated_products']).to eq('10.0')
    end
  end
end
