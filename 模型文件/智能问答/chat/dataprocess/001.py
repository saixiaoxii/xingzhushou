import pandas as pd

# 读取Excel文件
df = pd.read_excel("D:/A11数据/2.xlsx")

# 拆分数据框
single_choice_df = df[df['题目类型'] == '单选题']
multiple_choice_df = df[df['题目类型'] == '多选题']
fill_in_the_blank_df = df[df['题目类型'] == '填空题']

# 将拆分后的数据框保存为新的Excel文件
single_choice_df.to_excel('D:/A11数据/单选题.xlsx', index=False)
multiple_choice_df.to_excel('D:/A11数据/多选题.xlsx', index=False)
fill_in_the_blank_df.to_excel('D:/A11数据/填空题.xlsx', index=False)
