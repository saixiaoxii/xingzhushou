import json


def load_json_file(file_path, encoding='utf-8'):  # 指定正确的编码
    with open(file_path, 'r', encoding=encoding) as file:
        return json.load(file)


# 用法示例
json_file = 'data_of_graph.json'
data = load_json_file(json_file)


def remove_outliers(data):
    return data.replace('\n', '')


# 提取属性列
names = []
for item in data:
    str_item = remove_outliers(item['属性'])
    names.append(str_item)


# 打印提取的属性列
def save_list_to_txt(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as file:
        for item in data:
            file.write(str(item) + '\n')


file_path = 'output.txt'
save_list_to_txt(names, file_path)
