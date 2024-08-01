该模型文件目录结构包含智能问答和内容推荐两个主要部分。以下是目录结构的详细说明：

智能问答部分：
-----------
    - app.py： 用于智能问答的应用程序文件。
    - Dockerfile：服务器一键构建镜像，方便项目部署。
    - chat目录： 包含智能问答系统的相关文件。
        - chatbot.py： 实现智能问答机器人的Python文件。
        - data.json： 存储智能问答系统所需数据的JSON文件。
        - question-classifier.py： 用于分类问题的Python文件。
        - question-parser.py： 用于解析问题的Python文件。
        - answer-search.py： 用于搜索答案的Python文件。
        - utils目录： 包含用于数据处理和其他实用工具的Python文件。
    -orc目录：用于文字识别的应用程序文件
	-checkpoints：储存文字识别的模型权重
	-detect：文本框筛选模型
	-recognize：文本框中文字识别模型
	-train code：训练代码
	-demo.py：测试文件
        - requirements.txt： 包含所需Python库的文件。

内容推荐部分：
-----------
    - app.py：用于内容推荐的应用程序文件。
    - Dockerfile：服务器一键构建镜像，方便项目部署。
    - models目录： 包含已经训练好的内容推荐模型文件。
      -GDCN.py：推荐模型代码
    - utils目录： 包含内容推荐过程中使用的工具文件。
      -test.py：模型效果测试文件
      -train.py：模型训练代码
      -recommend.py：推荐系统运行代码
      - requirements.txt： 包含所需Python库的文件。


