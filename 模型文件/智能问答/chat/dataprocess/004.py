import pandas as pd
import re

# 读取Excel文件
df = pd.read_excel("D:/A11数据/tian.xlsx")
result = []
# 定义替换函数
for index, row in df.iterrows():
    found_text = None
    answer = []
    for column in ['A', 'B', 'C', 'D', 'E', 'F']:
        if pd.notna(row[column]):
            answer.append(str(row[column]))

    # 更新大题题干列
    q_text = str(row['大题题干'])
    # 查找括号或下划线，并替换为正确答案
    for a in answer:
        q_text = re.sub(r'（\s*）', a, q_text, count=1)
        q_text = re.sub(r'\(\s*\)', a, q_text, count=1)
        q_text = re.sub(r'_+', a, q_text, count=1)

    # 更新大题题干列
    df.at[index, '大题题干'] = q_text
    result.append('@'.join(answer))
# 保存修改后的Excel文件
df['答案'] = result
df.to_excel("D:/A11数据/tian1.xlsx", index=False)
