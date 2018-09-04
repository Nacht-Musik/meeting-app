class User < ApplicationRecord
  # paranoia(論理削除用Gem)の有効/無効 設定
  # acts_as_paranoid

  #nameを必須・一意とする
  validates_uniqueness_of :name
  validates_presence_of :name

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :authentication_keys => [:login]

  has_many :meetings
  has_many :inspect_meetings,     class_name: 'Meeting', foreign_key: 'inspecter_id'
  has_many :approve_meetings,     class_name: 'Meeting', foreign_key: 'authorither_id'

  ### 必要？ (記録者、参加者、配信先)
  has_many :recorderes, class_name: 'Recorder'
  has_many :attendees, class_name: 'Attendee'
  has_many :receiveres, class_name: 'Receiver'

  ### ユーザー権限（マストにするか悩み中）
  # belongs_to :authority,          class_name: 'Authority'
  belongs_to :authority,          class_name: 'Authority', optional: true

  ### Group
  has_many :group_members
  has_many :groups, through: :group_members, source: :group

  ### Notice
  has_many :notices
  has_many :notifier, class_name: "Notice", foreign_key: "notifier_id"

  # ログイン用パラメータ(login)の設定
  attr_accessor :login

  def self.find_first_by_auth_conditions(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions).where(["name = :value OR lower(email) = lower(:value)", { :value => login }]).first
    else
      where(conditions).first
    end
  end
end
