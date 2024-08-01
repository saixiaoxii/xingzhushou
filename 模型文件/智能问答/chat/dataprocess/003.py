import pandas as pd
import re


def has_parentheses1(input_string):
    match = re.search(r'（\s*）', input_string)
    return bool(match)


def has_parentheses2(input_string):
    match = re.search(r'\(\s*\)', input_string)
    return bool(match)


def has_parentheses3(input_string):
    match = re.search(r'_+', input_string)
    return bool(match)


# 读取Excel文件
df = pd.read_excel("D:/A11数据/dan.xlsx")
result=[]
# 遍历每一行
for index, row in df.iterrows():
    correct_answer = row['正确答案']
    found_text = None

    # 在列中查找相同内容
    for column in df.columns:
        if correct_answer == column:
            found_text = str(row[column])
            break

    # 更新大题题干列的内容
    q_text = str(row['大题题干'])
    if has_parentheses1(q_text):
        updated_q_text = re.sub(r'（\s*）', found_text, q_text, count=1)
    elif has_parentheses2(q_text):
        updated_q_text = re.sub(r'\(\s*\)', found_text, q_text, count=1)
    elif has_parentheses3(q_text):
        updated_q_text = re.sub(r'_+', found_text, q_text, count=1)
    else:
        updated_q_text = q_text + '(' + found_text + ')'

    df.at[index, '大题题干'] = updated_q_text

    result.append(found_text)
# 保存修改后的Excel文件
df['答案'] = result
df.to_excel("D:/A11数据/dan1.xlsx", index=False)
