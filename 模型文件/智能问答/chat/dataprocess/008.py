import csv
import json


def csv_to_json(csv_file, json_file):
    data = []
    with open(csv_file, 'r', encoding='utf-8') as csvfile:
        csvreader = csv.DictReader(csvfile)
        for row in csvreader:
            data.append(row)

    with open(json_file, 'w', encoding='utf-8') as jsonfile:
        json.dump(data, jsonfile, indent=4, ensure_ascii=False)


csv_file = "D:/A11数据/Final.csv"
json_file = '../data_of_graph.json'

csv_to_json(csv_file, json_file)

with open(json_file, 'r', encoding='utf-8') as file:
    data = json.load(file)

keys_to_keep = ["﻿大题题干", "答案"]
filtered_data = [{key: value for key, value in item.items() if key in keys_to_keep} for item in data]
for item in filtered_data:
    item['属性'] = item.pop('﻿大题题干', None)
    item['实体'] = item.pop('答案', None)
    item['实体'] = item['实体'].split('@')

with open(json_file, 'w', encoding='utf-8') as file:
    json.dump(filtered_data, file, indent=4, ensure_ascii=False)

print("JSON 文件已成功修改，只保留了指定的键。")
