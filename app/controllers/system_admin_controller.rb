class SystemAdminController < ApplicationController
  def groups
    set_groups
  end

  def projects
    set_projects
  end

  def users
    set_users
  end

  def meetings
    set_meetings
  end


  private
    def are_you_admin?
      return current_user.admin?
    end

    def set_groups
      @groups = Group.with_deleted
    end

    def set_projects
      @projects = Project.with_deleted
    end

    def set_users
      @users = User.all
    end

    def set_meetings
      @meetings = Meeting.all
    end

end
