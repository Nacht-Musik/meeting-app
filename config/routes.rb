Rails.application.routes.draw do

  root to: 'top_pages#index'

  ### Meeting Controller 関連
  # resources :meetings, only: [:create, :show, :destroy, :new, :edit, :update]
  resources :meetings

  ### devise (User) 関連
  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  devise_for :users, :controllers => {
    :sessions => 'users/sessions',
    :registrations => 'users/registrations'
  }

  ### My Controller 関連
  get 'my/page'
  get 'my/meeting'
  get 'my/group'
  get 'my/project'

  # メール送信テスト用.
  get 'my/mail'

  ### Group Controller 関連
  resources :groups

  ### Project Controller 関連
  put '/projects/:id/restore', to: 'projects#restore', as: 'restore_project'
  resources :projects

  ### SystemAdmin Controller 関連
  get 'system_admin/groups'
  get 'system_admin/projects'
  get 'system_admin/users'
  get 'system_admin/meetings'
  get 'system_admin/:id/edit', to: 'system_admin#edit_user', as: 'edit_user'
  patch 'system_admin/:id/update', to: 'system_admin#update_user'

  ### Letter_opener_web
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
