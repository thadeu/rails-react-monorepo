require 'rails_helper'

RSpec.describe Api::V1::UploadsController, type: :request do
  describe 'index' do
    it 'returns a respose status ok' do
      headers = { 'Authorization' => "Token token=mysecrettouploadcsv" }

      get '/api/v1/uploads/csv', params: {}, headers: headers

      expect(response).to have_http_status(:ok)
    end

    it 'returns a list of uploads' do
      upload = create(:upload, file_name: 'bigger.csv')

      headers = { 'Authorization' => "Token token=mysecrettouploadcsv" }

      get '/api/v1/uploads/csv', params: {}, headers: headers

      json = JSON.parse(response.body)
      item = json['items'].first

      expect(item['file_encrypt_key']).to eq(upload.file_encrypt_key)
      expect(item['file_name']).to eq(upload.file_name)
      expect(item['file_size']).to eq(0)
      expect(item['file_type']).to eq('text/csv')
      expect(item['file_status']).to eq('importing')
    end
  end
end
