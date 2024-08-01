FROM python:3.8.0

WORKDIR /code

COPY . .

RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple gunicorn gevent

RUN pip3 install torch==1.8.1 torchvision==0.9.1 --no-cache-dir

RUN pip3 install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple --no-cache-dir

EXPOSE 80

CMD gunicorn  -c gun.conf app:app
