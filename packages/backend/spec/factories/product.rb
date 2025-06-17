FactoryBot.define do
  factory :product, class: Product::Record do
    name { "Product" }
    price { 1.00 }
    uid { SecureRandom.uuid }
    expiration_at { Time.current }
    currencies { { usd: 1.0 } }
    upload { create(:upload) }
  end
end
