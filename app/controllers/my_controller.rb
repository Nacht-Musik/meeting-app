class MyController < ApplicationController
  before_action :set_meetings, only: [:meeting]
  before_action :set_projects, only: [:meeting]
  before_action :set_users, only: [:meeting]
  before_action :set_finished_projects, only: [:page]

  def page
  end

  def meeting
    if user_signed_in?
      @meeting = Meeting.new
    end
  end

  def mail
    SystemMailer.with(user: current_user).welcome_email.deliver_now
  end

  private
    def set_meetings
      @meetings = Meeting.all
    end

    def set_users
      @users = User.all
    end

    def set_projects
      @projects = Project.all
    end

    def set_finished_projects
      @finished_projects = current_user.projects.only_deleted
    end

end
