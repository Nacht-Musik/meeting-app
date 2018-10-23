class Group < ApplicationRecord
  # paranoia(論理削除用Gem)の有効/無効 設定
  acts_as_paranoid

  has_many :meetings,   class_name: "Meeting"

  belongs_to :parent, class_name: "Group", foreign_key: "parent_id", optional: true
  has_many :children, class_name: "Group", foreign_key: "parent_id"
  accepts_nested_attributes_for :children

  has_many :group_members, class_name: "GroupMember", dependent: :destroy
  has_many :users, through: :group_members, source: :user
  accepts_nested_attributes_for :group_members, allow_destroy: true
end
