import numpy as np
import pandas as pd
import torch
from torch.utils.data import Dataset
from models.GDCN import GDCNP
from torch.optim.lr_scheduler import ReduceLROnPlateau

data = pd.read_csv('./data/criteo_data.csv')
label = data['label']
features = data.drop(columns=['label'])

numpy_label = label.to_numpy(dtype=float)
numpy_features = features.to_numpy()

tensor_label = torch.tensor(numpy_label, dtype=torch.float32)
tensor_features = torch.tensor(numpy_features, dtype=torch.float32)


class TextDataset(Dataset):
    def __init__(self, features, labels):
        self.features = features
        self.labels = labels

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        label = self.labels[idx]
        feature = self.features[idx]
        return feature, label


data = TextDataset(tensor_features, tensor_label)

train_dataset, valid_dataset = torch.utils.data.random_split(data, [40000, 10000])

train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=256, shuffle=True, num_workers=0)
valid_Loader = torch.utils.data.DataLoader(valid_dataset, batch_size=256, shuffle=True, num_workers=0)

field_dims = np.array(
    [1274, 1274, 7, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
     2, 2, 2, 2, 2, 2, 2, 2]
)
device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')
if torch.cuda.is_available():
    print("使用 GPU 进行训练")
model = GDCNP(field_dims, 10).to(device)
model = model.to(device)

loss_fn = torch.nn.BCEWithLogitsLoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)
scheduler = ReduceLROnPlateau(optimizer, mode='min', factor=0.1, patience=5)

for epoch in range(100):
    train_loss = 0.0
    for inputs, labels in train_loader:
        inputs = inputs.to(device)
        labels = labels.unsqueeze(1).to(device)  # 将标签维度扩展为 [batch_size, 1]
        optimizer.zero_grad()
        outputs = torch.sigmoid(model(inputs))
        loss = loss_fn(outputs, labels)
        loss.backward()
        optimizer.step()
        train_loss += loss.item() * inputs.size(0)

    # 计算验证集损失
    valid_loss = 0.0
    for inputs, labels in valid_Loader:
        inputs = inputs.to(device)
        labels = labels.unsqueeze(1).to(device)
        outputs_valid = model(inputs)
        loss = loss_fn(outputs_valid, labels)
        valid_loss += loss.item() * inputs.size(0)

    scheduler.step(valid_loss)

    print(
        f"第 {epoch + 1} 轮, 训练损失: {train_loss / len(train_dataset)}, 验证损失: {valid_loss / len(valid_dataset)}")
torch.save(model.state_dict(), 'model_params.pth')
