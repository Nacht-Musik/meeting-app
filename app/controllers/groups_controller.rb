class GroupsController < ApplicationController
  before_action :set_users, only: [:show, :new, :edit]
  before_action :set_group, only: [:show, :edit, :update, :destroy]
  before_action :set_authorities, only: [:show, :new, :edit]

  def show

  end

  def new
    @group = Group.new

    # Group作成者を管理者権限付きで自動登録
    admin_user = @group.group_members.build
    admin_user.user_id = current_user.id
    admin_user.admin = 1
    admin_user.authority_id = 1
  end

  def create
    params = group_params
    group = Group.new(params)

    if group.save
      p "グループ作成成功"
      flash = {success: "#{group.name} グループを作成しました"}
      redirect_to my_page_path, flash: flash
    else
      p "グループ作成失敗..."

    end

  end

  def edit

  end

  def update
    params = group_params

    if @group.update(params)
      flash = {success: 'グループ情報を更新しました。'}
      redirect_to my_page_path, flash: flash
    else
      # 更新処理失敗。。。

    end

  end

  def destroy

  end

  private
    def set_group
      @group = Group.find(params[:id])
    end

    def set_users
      @users = User.all
    end

    def set_authorities
      @authorities = Authority.all
    end

    def group_params
      params.require(:group).permit(:id,
                                    :name,
                                    :nick_name,
                                    :parent_id,
                                    group_members_attributes: [
                                        :id,
                                        :group_id,
                                        :user_id,
                                        :authority_id,
                                        :admin,
                                        :_destroy
                                    ]
      )
    end
end
