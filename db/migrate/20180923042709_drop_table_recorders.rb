class DropTableRecorders < ActiveRecord::Migration[5.1]
  def change
    drop_table :recorders
  end
end
