import pandas as pd
import re


def count_continuous_underscores(text):
    pattern = re.compile(r'_+')
    matches = pattern.findall(text)
    consecutive_count = 0
    for match in matches:
        consecutive_count += 1
    return consecutive_count


def count_continuous_kuoc(text):
    pattern = re.compile(r'（\s*）')
    matches = pattern.findall(text)
    consecutive_count = 0
    for match in matches:
        consecutive_count += 1
    return consecutive_count


def count_continuous_kuoe(text):
    pattern = re.compile(r'\(\s*\)')
    matches = pattern.findall(text)
    consecutive_count = 0
    for match in matches:
        consecutive_count += 1
    return consecutive_count


df = pd.read_excel("D:/A11数据/duo.xlsx")
result = []
for index, row in df.iterrows():
    correct_answers = row['正确答案']
    found_text = []
    # 在列中查找相同内容
    for correct_answer in correct_answers:
        for column in df.columns:
            if correct_answer == column:
                found_text.append(str(row[column]))
                break

    q_text = str(row['大题题干'])
    q_text1 = str(row['大题题干'])

    if count_continuous_underscores(q_text1) == len(found_text) or count_continuous_kuoe(q_text1) == len(
            found_text) or count_continuous_kuoc(q_text1) == len(found_text):
        for a in found_text:
            q_text = re.sub(r'（\s*）', a, q_text, count=1)
            q_text = re.sub(r'_+', a, q_text, count=1)
            q_text = re.sub(r'\(\s*\)', a, q_text, count=1)
    elif count_continuous_underscores(q_text1) == 1 or count_continuous_kuoe(q_text1) == 1 or count_continuous_kuoc(
            q_text1) == 1:
        str_var = '、'.join(found_text)
        q_text = re.sub(r'（\s*）', str_var, q_text, count=1)
        q_text = re.sub(r'_+', str_var, q_text, count=1)
        q_text = re.sub(r'\(\s*\)', str_var, q_text, count=1)
    else:
        q_text += '（'
        for a in found_text:
            q_text += a + '、'
        q_text = q_text[:-1]
        q_text += '）'
    result.append('@'.join(found_text))

    # 更新大题题干列
    df.at[index, '大题题干'] = q_text
df['答案'] = result
# 保存修改后的Excel文件
df.to_excel("D:/A11数据/duo1.xlsx", index=False)
