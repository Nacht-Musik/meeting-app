class ProjectMember < ApplicationRecord
  # paranoia(論理削除用Gem)の有効/無効 設定
  acts_as_paranoid

  belongs_to :project
  belongs_to :user
  belongs_to :authority
end
