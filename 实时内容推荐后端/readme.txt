该文件夹中的代码包含一个星助手后端，用于管理用户信息于业务逻辑。

文件结构说明:
1.application.yml:项目的配置文件，包含了应用程序的各种配置信息，如数据库连接信息等。

2.mapper/:存放MyBatis的 Mapper XML文件，包含了对数据库的CRUD操作。

3.com/example/fuchuang/:

- controller/:控制器层，包含了处理HTTP请求的控制器类。
- DTO/ & domain/:实体类，包含了与数据库表对应的实体类，如用户信息、消息等。-
-  mapper/: MyBatisPlus的接口文件，定义了对应的数据库操作方法。-
-  service/:服务层，包含了业务逻辑处理的服务类接口。
- impl/:服务实现类，实现了服务接口定义的具体业务逻辑。-
-  util/:工具类，包含了项目中使用的工具类，如JWTUtils。