class Topic < ApplicationRecord
  belongs_to :meeting

  #### nested_formfields対応
  # has_many :comments, class_name: "Comment"
  has_many :comments, class_name: "Comment", dependent: :destroy
  accepts_nested_attributes_for :comments
end
