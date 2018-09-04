class NoticeCategory < ApplicationRecord
  has_many :notices, class_name: "Notice"
end
