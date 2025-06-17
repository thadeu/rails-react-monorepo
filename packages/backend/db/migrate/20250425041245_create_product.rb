class CreateProduct < ActiveRecord::Migration[8.0]
  disable_ddl_transaction!

  def change
    create_table :products do |t|
      t.string :name, null: false
      t.uuid :uid, null: false, default: 'gen_random_uuid()'
      t.integer :upload_id, null: true
      t.decimal :price, null: false, precision: 14, scale: 10
      t.datetime :expiration_at, null: false
      t.jsonb :currencies, null: true, default: {}

      t.timestamps
    end

    add_index :products, :uid, if_not_exists: true, algorithm: :concurrently
    add_index :products, :name, if_not_exists: true, algorithm: :concurrently
    add_index :products, :price, if_not_exists: true, algorithm: :concurrently
    add_index :products, :expiration_at, if_not_exists: true, algorithm: :concurrently
  end
end
