import pandas as pd

# 读取Excel文件
excel_file = "D:/A11数据/final.xlsx"  # 替换为你的Excel文件路径
df = pd.read_excel(excel_file)

# 将数据写入CSV文件
csv_file = 'D:/A11数据/Final.csv'  # 输出CSV文件路径
df.to_csv(csv_file, index=False, encoding='utf-8-sig')

print("Excel数据已成功导出为CSV文件。")
