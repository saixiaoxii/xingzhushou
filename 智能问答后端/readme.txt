智能问答后端

该文件夹中的代码包含一个消息管理后端，用于管理用户发送的消息以及主题。

文件结构说明：

1. application.properties：项目的配置文件，包含了应用程序的各种配置信息，如数据库连接信息等。

2. logback.xml：日志配置文件，用于配置应用程序的日志输出格式和存储位置。

3. META-INF/maven/com.demo.messagehub：Maven 构建文件相关目录，包含了项目的 Maven 配置文件 pom.xml 和项目的依赖信息。

4. mapper/：存放 MyBatis 的 Mapper XML 文件，包含了对数据库的 CRUD 操作。

5. com/demo/messagehub/：
    - controller/：控制器层，包含了处理 HTTP 请求的控制器类。
    - entity/：实体类，包含了与数据库表对应的实体类，如用户信息、消息等。
    - mapper/：MyBatis 的 Mapper 接口文件，定义了对应的数据库操作方法。
    - service/：服务层，包含了业务逻辑处理的服务类接口。
        - impl/：服务实现类，实现了服务接口定义的具体业务逻辑。
    - util/：工具类，包含了项目中使用的工具类，如 JWTUtils。


