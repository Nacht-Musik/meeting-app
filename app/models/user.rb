class User < ApplicationRecord
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

  belongs_to :authority,        class_name: 'Authority'

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
