class MeetingScope < ApplicationRecord
  has_many :meetings, class_name: "Meeting", foreign_key: "scope_id"
end
