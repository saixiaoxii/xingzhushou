import json

# 读取 JSON 文件
json_file = '../data_of_graph.json'
with open(json_file, 'r', encoding='utf-8') as file:  # 指定UTF-8编码
    datas = json.load(file)

# 创建空列表用于存储 JSON 对象
output_data = []

for data in datas:
    # 获取原始的键值对
    original_key = '实体'
    original_value = data.get(original_key, [])
    save_value = data.get('属性', [])
    i = data['属性']
    # 生成多个JSON对象
    for item in original_value:
        # 创建新的字典
        new_data = {
            "实体": item,
            "属性": i
        }
        # 添加到列表中
        output_data.append(new_data)

# 保存列表中的所有 JSON 对象到文件
with open('../data_for_graph.json', 'w', encoding='utf-8') as output_file:
    json.dump(output_data, output_file, indent=4, ensure_ascii=False)

print("多个JSON对象已成功生成并写入到文件中。")
