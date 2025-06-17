# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_04_25_041245) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"
  enable_extension "pgcrypto"

  create_table "products", force: :cascade do |t|
    t.string "name", null: false
    t.uuid "uid", default: -> { "gen_random_uuid()" }, null: false
    t.integer "upload_id"
    t.decimal "price", precision: 14, scale: 10, null: false
    t.datetime "expiration_at", null: false
    t.jsonb "currencies", default: {}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["expiration_at"], name: "index_products_on_expiration_at"
    t.index ["name"], name: "index_products_on_name"
    t.index ["price"], name: "index_products_on_price"
    t.index ["uid"], name: "index_products_on_uid"
  end

  create_table "uploads", force: :cascade do |t|
    t.string "file_encrypt_key", null: false
    t.string "file_name"
    t.string "file_type"
    t.bigint "file_size"
    t.string "file_status"
    t.bigint "total_rows", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["file_encrypt_key"], name: "index_uploads_on_file_encrypt_key", unique: true
    t.index ["file_name"], name: "index_uploads_on_file_name"
    t.index ["file_size"], name: "index_uploads_on_file_size"
    t.index ["file_status"], name: "index_uploads_on_file_status"
    t.index ["file_type"], name: "index_uploads_on_file_type"
  end
end
