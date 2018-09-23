class Project < ApplicationRecord
  # paranoia(論理削除用Gem)の有効/無効 設定
  acts_as_paranoid

  validates :name, presence: true

  has_many :meetings,   class_name: "Meeting"

  belongs_to :parent, class_name: "Project", foreign_key: "parent_id", optional: true
  has_many :children, class_name: "Project", foreign_key: "parent_id"
  accepts_nested_attributes_for :children

  has_many :project_members, class_name: "ProjectMember", dependent: :destroy
  has_many :users, through: :project_members, source: :user
  accepts_nested_attributes_for :project_members, allow_destroy: true
end
