class CommentStatus < ApplicationRecord
  has_many :comments, class_name: 'Comment'
end
