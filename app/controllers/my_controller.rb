class MyController < ApplicationController
  before_action :set_meetings, only: [:meeting]
  before_action :set_projects, only: [:meeting]
  before_action :set_users, only: [:meeting]

  def page
  end

  def meeting
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
end
