class Topic < ApplicationRecord
  belongs_to :meeting

  has_many :comments, class_name: "Comment"
  #### nested_formfields対応
  # has_many :comments, class_name: "Comment", dependent: :destroy

  accepts_nested_attributes_for :comments, allow_destroy: true
end
