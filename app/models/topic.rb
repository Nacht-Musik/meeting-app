class Topic < ApplicationRecord
  belongs_to :meeting
  has_many :comments, class_name: "Comment"
  accepts_nested_attributes_for :comments
end
