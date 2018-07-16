class Topic < ApplicationRecord
  belongs_to :meeting
  has_many :comments, class_name: "Comment"
end
