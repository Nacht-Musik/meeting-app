class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  # ログイン後に遷移するpath
  def after_sign_in_path_for(resource)
    my_page_path
  end

  # ログアウト後に遷移するpath
  def after_sign_out_path_for(resource)
    root_path
  end

  protected
    # User.name or emailでログインするための設定
    def configure_permitted_parameters
      added_attrs = [:name, :email, :password, :password_confirmation, :remember_me]
      devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
      devise_parameter_sanitizer.permit :account_update, keys: added_attrs
    end
end
