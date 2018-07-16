class CreateMeetings < ActiveRecord::Migration[5.1]
  def change
    create_table :meetings do |t|
      t.string :title, null: false
      t.references :user, foreign_key: true
      t.references :inspector, foreign_key: { to_table: :users }
      t.references :authorither, foreign_key: { to_table: :users }
      t.references :project, foreign_key: true
      t.date :date
      t.time :start_time
      t.time :finish_time
      t.string :place
      t.date :publish_date
      t.text :note

      t.timestamps
    end
  end
end
