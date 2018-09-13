class Group < ApplicationRecord
  has_many :children, class_name: "Group", foreign_key: "parent_id", dependent: :destroy
  belongs_to :parent, class_name: "Group", foreign_key: "parent_id", optional: true

  has_many :group_members, class_name: "GroupMember", dependent: :destroy
  has_many :users, through: :group_members, source: :user
  accepts_nested_attributes_for :group_members, allow_destroy: true

end
