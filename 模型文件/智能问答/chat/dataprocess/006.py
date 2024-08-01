import pandas as pd


def merge_excel_files(files, output_file):
    # 创建一个空的DataFrame来存储所有数据
    combined_data = pd.DataFrame()

    # 遍历Excel文件并将它们合并到combined_data中
    for file in files:
        data = pd.read_excel(file)
        combined_data = pd.concat([combined_data, data], ignore_index=True)

    # 将合并后的数据保存到新的Excel文件中
    combined_data.to_excel(output_file, index=False)
    print("合并后的数据已保存到:", output_file)


# 示例用法

excel_files = ["D:/A11数据/tian1.xlsx", "D:/A11数据/dan1.xlsx", "D:/A11数据/duo1.xlsx"]  # 要合并的Excel文件列表
output_file = 'D:/A11数据/final.xlsx'  # 合并后的Excel文件名

merge_excel_files(excel_files, output_file)
