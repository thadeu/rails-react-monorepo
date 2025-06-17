require 'rails_helper'

RSpec.describe Summary::Aggregations do
  it 'returns the correct summary' do
    upload = create(:upload)
    create(:product, price: 1.000, upload_id: upload.id)

    result = described_class.execute(user: 1)

    expect(result).to eq([1, 1, 1.000])
  end

  it 'returns the correct summary with multiple products' do
    upload = create(:upload)
    create(:product, price: 1.000, upload_id: upload.id)
    create(:product, price: 2.000, upload_id: upload.id)

    result = described_class.execute(user: 1)

    expect(result).to eq([2, 1, 3.000])
  end
end
