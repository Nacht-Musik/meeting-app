class MyController < ApplicationController
  include ApplicationHelper
  before_action :set_meetings, only: [:meetings]
  before_action :set_users, only: [:meetings, :published_meetings]
  before_action :set_projects, only: [:meetings, :published_meetings]
  before_action :set_published_meetings, only: [:published_meetings]

  def page
    if user_signed_in?
      set_finished_projects
    else
      redirect_to root_path
    end
  end

  def meetings
    if user_signed_in?
      # @meeting = Meeting.new
    end
  end

  def published_meetings
    # @meeting = Meeting.new
  end

  def editing_meeting
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

    def set_planning_meetings
      # 定義を良く考える事！
      @planning_meetings = Meeting.all
    end

    def set_editing_meetings
      @editing_meetings = Meeting.all.where(status_id: Settings.meeting.status.editing )
    end

    def set_inspecting_meetings
      @inspecting_meetings = Meeting.all.where(status_id: Settings.meeting.status.inspecting )
    end

    def set_approving_meetings
      @approving_meetings = Meeting.all.where(status_id: Settings.meeting.status.approving )
    end

    def set_approved_meetings
      @approved_meetings = Meeting.all.where(status_id: Settings.meeting.status.approved )
    end

    def set_published_meetings
      @published_meetings = Meeting.all.where(status_id: Settings.meeting.status.published )
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
