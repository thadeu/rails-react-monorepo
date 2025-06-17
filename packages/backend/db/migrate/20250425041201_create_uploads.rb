class CreateUploads < ActiveRecord::Migration[8.0]
  def change
    create_table :uploads do |t|
      t.string :file_encrypt_key, null: false
      t.string :file_name, null: true
      t.string :file_type, null: true
      t.bigint :file_size, null: true
      t.string :file_status, null: true
      t.bigint :total_rows, null: true, default: 0

      t.timestamps
    end

    add_index :uploads, :file_encrypt_key, unique: true
    add_index :uploads, :file_name
    add_index :uploads, :file_type
    add_index :uploads, :file_size
    add_index :uploads, :file_status
  end
end
