# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180910065824) do

  create_table "attachement_files", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.bigint "meeting_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meeting_id"], name: "index_attachement_files_on_meeting_id"
  end

  create_table "attendees", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "user_id"
    t.bigint "meeting_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meeting_id"], name: "index_attendees_on_meeting_id"
    t.index ["user_id"], name: "index_attendees_on_user_id"
  end

  create_table "authorities", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comment_statuses", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "topic_id"
    t.bigint "parent_id"
    t.bigint "status_id"
    t.bigint "user_id"
    t.string "name"
    t.integer "sort_num", default: 0
    t.integer "indent", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["parent_id"], name: "index_comments_on_parent_id"
    t.index ["status_id"], name: "index_comments_on_status_id"
    t.index ["topic_id"], name: "index_comments_on_topic_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "group_members", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "group_id"
    t.bigint "user_id"
    t.bigint "authority_id"
    t.boolean "admin", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["authority_id"], name: "index_group_members_on_authority_id"
    t.index ["group_id"], name: "index_group_members_on_group_id"
    t.index ["user_id"], name: "index_group_members_on_user_id"
  end

  create_table "groups", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "nick_name"
    t.bigint "parent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["parent_id"], name: "index_groups_on_parent_id"
  end

  create_table "meeting_statuses", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "meetings", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "title", null: false
    t.bigint "user_id"
    t.bigint "inspector_id"
    t.bigint "approver_id"
    t.bigint "status_id"
    t.bigint "project_id"
    t.date "date"
    t.time "start_time"
    t.time "finish_time"
    t.string "place"
    t.date "publish_date"
    t.text "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.index ["approver_id"], name: "index_meetings_on_approver_id"
    t.index ["deleted_at"], name: "index_meetings_on_deleted_at"
    t.index ["inspector_id"], name: "index_meetings_on_inspector_id"
    t.index ["project_id"], name: "index_meetings_on_project_id"
    t.index ["status_id"], name: "index_meetings_on_status_id"
    t.index ["user_id"], name: "index_meetings_on_user_id"
  end

  create_table "notice_categories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notices", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "user_id"
    t.bigint "notifier_id"
    t.bigint "category_id"
    t.boolean "acknowledge", default: false, null: false
    t.string "body"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_notices_on_category_id"
    t.index ["notifier_id"], name: "index_notices_on_notifier_id"
    t.index ["user_id"], name: "index_notices_on_user_id"
  end

  create_table "projects", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "receiver_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "receivers", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "type_id"
    t.bigint "user_id"
    t.bigint "meeting_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meeting_id"], name: "index_receivers_on_meeting_id"
    t.index ["type_id"], name: "index_receivers_on_type_id"
    t.index ["user_id"], name: "index_receivers_on_user_id"
  end

  create_table "recorders", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "user_id"
    t.bigint "meeting_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meeting_id"], name: "index_recorders_on_meeting_id"
    t.index ["user_id"], name: "index_recorders_on_user_id"
  end

  create_table "topic_statuses", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "topics", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "meeting_id"
    t.bigint "status_id"
    t.string "name"
    t.integer "sort_num", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meeting_id"], name: "index_topics_on_meeting_id"
    t.index ["status_id"], name: "index_topics_on_status_id"
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name", default: "", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "last_name", default: "", null: false
    t.string "first_name", default: "", null: false
    t.bigint "authority_id"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "deleted_at"
    t.index ["authority_id"], name: "index_users_on_authority_id"
    t.index ["deleted_at"], name: "index_users_on_deleted_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name"], name: "index_users_on_name", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "attachement_files", "meetings"
  add_foreign_key "attendees", "meetings"
  add_foreign_key "attendees", "users"
  add_foreign_key "comments", "comment_statuses", column: "status_id"
  add_foreign_key "comments", "comments", column: "parent_id"
  add_foreign_key "comments", "topics"
  add_foreign_key "comments", "users"
  add_foreign_key "group_members", "authorities"
  add_foreign_key "group_members", "groups"
  add_foreign_key "group_members", "users"
  add_foreign_key "groups", "groups", column: "parent_id"
  add_foreign_key "meetings", "meeting_statuses", column: "status_id"
  add_foreign_key "meetings", "projects"
  add_foreign_key "meetings", "users"
  add_foreign_key "meetings", "users", column: "approver_id"
  add_foreign_key "meetings", "users", column: "inspector_id"
  add_foreign_key "notices", "notice_categories", column: "category_id"
  add_foreign_key "notices", "users"
  add_foreign_key "notices", "users", column: "notifier_id"
  add_foreign_key "receivers", "meetings"
  add_foreign_key "receivers", "receiver_types", column: "type_id"
  add_foreign_key "receivers", "users"
  add_foreign_key "recorders", "meetings"
  add_foreign_key "recorders", "users"
  add_foreign_key "topics", "meetings"
  add_foreign_key "topics", "topic_statuses", column: "status_id"
  add_foreign_key "users", "authorities"
end
