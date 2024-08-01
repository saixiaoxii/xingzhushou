import numpy as np
import torch
from models.GDCN import GDCNP
import pandas as pd
import json


def return_info(code=200, data=''):
    if code == 200:
        message = 'success'
    else:
        message = 'error'
    return {
        "code": code,
        "message": message,
        "data": data
    }


def run_model(json_text):
    json_data = json.loads(json_text)
    json_data = json_data[0]

    if json_data.get('studyTime') is None and json_data.get('totalTime') is None:
        class_id = json_data['classId']
        interest = json_data['interest']
        scores = json_data['score']

        # 构建DataFrame
        data = {'classId': [class_id] * len(scores),
                'interest': [interest] * len(scores),
                'score': [score['score'] for score in scores],
                'id': [score['id'] for score in scores]}

        df = pd.DataFrame(data)
        df['is_score'] = df['score'].apply(lambda x: 1 if x <= 5 & x >= 0 else 0)
        df['score'] = df['score'].apply(lambda x: 6 if x < 0 else x)
        df['interest'] = df['interest'].apply(lambda x: x.strip('[]').replace(' ', '').split(','))
        study_directions = {
            '通识教育': '71', '公共基础': '49', '经济学': '14', '农学': '20', '管理学': '23', '医学': '21', '文学': '7',
            '教育学': '16',
            '历史学': '17', '理学': '18', '工学': '19', '法学': '163', '哲学': '199', '农林牧渔': '6', '土建': '29',
            '制造': '31',
            '电子信息': '32', '轻纺食品': '35', '财经': '36', '医药卫生': '37', '旅游': '39', '文化教育': '41',
            '艺术设计传媒': '42',
            '法律': '44', '交通运输': '62', '水利': '63', '通识&基础': '72', '生化与药品': '185', '环保': '187',
            '物流': '200',
            '材料与能源': '201', '资源开发与测绘': '202', '资格考证': '80', '职场提升': '91', '企业培训': '1725',
            '互联网培训': '89',
            '升学考研': '78', '语言学习': '90', '兴趣生活': '92'
        }
        df1 = pd.read_csv('./selected_output.csv')
        for interest, code in study_directions.items():
            df[interest] = df['interest'].apply(lambda x: 1 if interest in x else 0)
        df.drop(columns=['interest'], inplace=True)
        classId_to_index = df1.astype(str).set_index('课程编号')['序号'].to_dict()
        df['id'] = df['id'].map(classId_to_index)
        df['classId'] = df['classId'].map(classId_to_index)
        df = df.astype(int)
        df['classId'] = df['classId'] - 1
        df['id'] = df['id'] - 1
        df = df.drop_duplicates(subset=['classId', 'id'])
        features = df

        numpy_features = features.to_numpy()

        tensor_features = torch.tensor(numpy_features, dtype=torch.float32)
        field_dims = np.array(
            [1274, 7, 1274, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
             2, 2,
             2, 2, 2, 2, 2, 2, 2]
        )
        device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        if torch.cuda.is_available():
            print('Test on GPU')
        params_file = 'model_params.pth'
        model = GDCNP(field_dims, 10).to(device)
        model.load_state_dict(torch.load('model_params.pth', map_location=torch.device('cpu')))
        model.eval()

        with torch.no_grad():
            top_indices = []
            top_outputs = []
            for i, input in enumerate(tensor_features):
                input = input.unsqueeze(0).to(device)
                outputs = model(input)
                if len(top_indices) < 5 or outputs > min(top_outputs):
                    if len(top_indices) == 5:
                        min_index = top_outputs.index(min(top_outputs))
                        del top_indices[min_index]
                        del top_outputs[min_index]
                    top_indices.append(i)
                    top_outputs.append(outputs)

        top = []
        df1 = pd.read_csv('./selected_output.csv')
        selected_values = [df.loc[index, 'id'] for index in top_indices]
        selected_values = [int(value) for value in selected_values]
        top_id = []
        for i in selected_values:
            top_id.append(df1[df1['序号'] == (i + 1)]['课程编号'].values[0])
        top_id = [str(value) for value in top_id]
        print(top_id)
    else:

        class_id = json_data['classId']
        interest = json_data['interest']
        scores = json_data['score']
        study_time = json_data['studyTime']
        total_time = json_data['totalTime']
        # 构建DataFrame
        data = {'classId': [class_id] * len(scores),
                'interest': [interest] * len(scores),
                'score': [score['score'] for score in scores],
                'id': [score['id'] for score in scores],
                'studyTime': [study_time] * len(scores),
                'totalTime': [total_time] * len(scores)}

        df = pd.DataFrame(data)
        df['is_score'] = df['score'].apply(lambda x: 1 if x <= 5 & x >= 0 else 0)
        df['score'] = df['score'].apply(lambda x: 6 if x < 0 else x)
        df1 = pd.read_csv('./selected_output.csv')
        df['complete'] = (df['studyTime'] / df['totalTime'] * 100).round()
        df['interest'] = df['interest'].apply(lambda x: x.strip('[]').replace(' ', '').split(','))
        study_directions = {
            '通识教育': '71', '公共基础': '49', '经济学': '14', '农学': '20', '管理学': '23', '医学': '21', '文学': '7',
            '教育学': '16',
            '历史学': '17', '理学': '18', '工学': '19', '法学': '163', '哲学': '199', '农林牧渔': '6', '土建': '29',
            '制造': '31',
            '电子信息': '32', '轻纺食品': '35', '财经': '36', '医药卫生': '37', '旅游': '39', '文化教育': '41',
            '艺术设计传媒': '42',
            '法律': '44', '交通运输': '62', '水利': '63', '通识&基础': '72', '生化与药品': '185', '环保': '187',
            '物流': '200',
            '材料与能源': '201', '资源开发与测绘': '202', '资格考证': '80', '职场提升': '91', '企业培训': '1725',
            '互联网培训': '89',
            '升学考研': '78', '语言学习': '90', '兴趣生活': '92'
        }
        df1 = pd.read_csv('./selected_output.csv')
        for interest, code in study_directions.items():
            df[interest] = df['interest'].apply(lambda x: 1 if interest in x else 0)
        df.drop(columns=['interest'], inplace=True)
        classId_to_index = df1.astype(str).set_index('课程编号')['序号'].to_dict()
        df['id'] = df['id'].map(classId_to_index)
        df['classId'] = df['classId'].map(classId_to_index)
        df = df.astype(int)
        df['classId'] = df['classId'] - 1
        df['id'] = df['id'] - 1
        df = df.drop_duplicates(subset=['classId', 'id'])
        df.drop(columns=['studyTime'], inplace=True)
        df.drop(columns=['totalTime'], inplace=True)
        features = df

        numpy_features = features.to_numpy()

        tensor_features = torch.tensor(numpy_features, dtype=torch.float32)
        field_dims = np.array(
            [1274, 7, 1274, 2, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
             2, 2, 2,
             2, 2, 2, 2, 2, 2, 2, 2]
        )
        device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        if torch.cuda.is_available():
            print('Test on GPU')
        params_file = 'model_params.pth'
        model = GDCNP(field_dims, 10).to(device)
        model.load_state_dict(torch.load('model_params_with_time.pth', map_location=torch.device('cpu')))
        model.eval()

        with torch.no_grad():
            top_indices = []
            top_outputs = []
            for i, input in enumerate(tensor_features):
                input = input.unsqueeze(0).to(device)
                outputs = model(input)
                if len(top_indices) < 5 or outputs > min(top_outputs):
                    if len(top_indices) == 5:
                        min_index = top_outputs.index(min(top_outputs))
                        del top_indices[min_index]
                        del top_outputs[min_index]
                    top_indices.append(i)
                    top_outputs.append(outputs)

        top = []
        df1 = pd.read_csv('./selected_output.csv')
        selected_values = [df.loc[index, 'id'] for index in top_indices]
        selected_values = [int(value) for value in selected_values]
        top_id = []
        for i in selected_values:
            top_id.append(df1[df1['序号'] == (i + 1)]['课程编号'].values[0])
        top_id = [str(value) for value in top_id]
    return top_id


if __name__ == '__main__':
    # 示例 JSON 文本
    json_text = '[{"classId":"1027199","interest":"[历史, 语文]","score":[{"score":3,"id":"1027199"},{"score":4,"id":"127282"},{"score":-1,"id":"127290"},{"score":-1,"id":"1607346"},{"score":5,"id":"1607349"},{"score":-1,"id":"168817"},{"score":-1,"id":"168831"},{"score":-1,"id":"168963"},{"score":6,"id":"169086"},{"score":-1,"id":"169123"},{"score":-1,"id":"169145"},{"score":-1,"id":"169154"},{"score":-1,"id":"169190"},{"score":-1,"id":"2224665"},{"score":-1,"id":"279858"},{"score":-1,"id":"279864"},{"score":-1,"id":"279895"},{"score":-1,"id":"279899"},{"score":-1,"id":"279922"},{"score":-1,"id":"279929"},{"score":-1,"id":"486467"},{"score":-1,"id":"486511"},{"score":-1,"id":"7288083"},{"score":-1,"id":"7288084"},{"score":-1,"id":"7288086"},{"score":-1,"id":"7288087"},{"score":-1,"id":"7288091"},{"score":-1,"id":"7288093"},{"score":-1,"id":"7288094"},{"score":-1,"id":"821927"}],"studyTime":8,"totalTime":60}]'
    print(return_info(200, run_model(json_text)))
