class MeetingType < ApplicationRecord
  has_many :meetings, class_name: "Meeting", foreign_key: "type_id"
end
