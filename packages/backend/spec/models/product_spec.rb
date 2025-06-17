require 'rails_helper'

RSpec.describe Product, type: :model do
  describe 'validations' do
    it { expect(build(:product)).to be_valid }

    it { expect(build(:product, price: 1.0)).to be_valid }

    it { expect(build(:product, name: nil)).to be_invalid }
    it { expect(build(:product, expiration_at: nil)).to be_invalid }
    it { expect(build(:product, price: 0)).to be_valid }
    it { expect(build(:product, price: nil)).to be_invalid }
    it { expect(build(:product, currencies: {})).to be_valid }
    it { expect(build(:product, currencies: { 'USD' => 1.0, 'EUR' => 1.0, 'GBP' => 1.0, 'JPY' => 1.0, 'CNY' => 1.0 })).to be_valid }
  end

  describe 'associations' do
  end

  describe 'class_methods' do
  end

  describe 'instance_methods' do
  end
end
