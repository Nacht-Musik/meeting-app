source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.6'
# Use mysql as the database for Active Record
gem 'mysql2', '>= 0.3.18', '< 0.6.0'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'

# haml系
gem 'haml-rails'
gem 'erb2haml'

# user関連処理
gem 'devise'
gem 'cancancan'
# gem 'rails_admin'
gem 'switch_user'

# 論理削除
gem 'paranoia'

# 日本語化
gem 'rails-i18n'

# Date/Time Picker
gem 'momentjs-rails'
gem 'bootstrap4-datetime-picker-rails'

# Bootstrap
gem 'bootstrap', '~> 4.1.1'

# jQuery
gem 'jquery-rails'
gem 'jquery-ui-rails'

# Font Awesome
# gem 'sassc', '~> 2.0.0'
# gem 'font-awesome-sass', '~> 5.2.0'
gem 'font-awesome-rails'

# Figaro (環境変数設定用)
gem 'figaro'

# config (定数管理用Gem)
gem 'config'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  # Debug関係
  gem 'better_errors'
  gem 'binding_of_caller'
  # mail送受信テスト
  gem 'letter_opener_web'
  # ActiveRecord Console表示整形
  gem 'hirb'
  gem 'hirb-unicode'

  # cron management
  # gem 'whenever', require: false

  # Deploy
  gem 'capistrano', require: false
  gem 'capistrano-bundler', require: false
  gem 'capistrano-rails', require: false
  gem 'capistrano-rbenv', require: false
  gem 'capistrano3-puma', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# cron management
gem 'whenever', require: false

gem 'rake', '~> 12.3.1'