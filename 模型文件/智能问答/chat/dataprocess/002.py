import pandas as pd

# 读取Excel文件
df = pd.read_excel("D:/A11数据/单选题.xlsx")

# 选择需要的列
selected_columns = ['大题题干', '正确答案', '选项A', '选项B', '选项C', '选项D', '选项E', '选项F']
df_selected = df[selected_columns]

# 将处理后的数据保存为新的Excel文件
df_selected.to_excel('D:/A11数据/dan.xlsx', index=False)
