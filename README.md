### Login to MySQL (as root)

```shell
mysql -u root -p
```

### MySQL commands

```mysql
create database blog_project;
create user blog_project_admin identified by 'blog_project_admin_pass123';
grant all privileges on blog_project.* to blog_project_admin;
flush privileges;
use blog_project;
```

### npm commands

npm init -y
npm install express sequelize mysql2
