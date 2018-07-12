class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :responsible_meetings, class_name: 'Meeting', foreign_key: 'user_id'
  has_many :inspect_meetings,     class_name: 'Meeting', foreign_key: 'inspecter_id'
  has_many :approve_meetings,     class_name: 'Meeting', foreign_key: 'authorither_id'
end
