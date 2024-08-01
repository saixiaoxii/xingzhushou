from flask import Flask, request
from orc.demo import single_pic_proc
import json, re, os
from werkzeug.utils import secure_filename
from chat.chatbot import handler

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = './uploads'


def return_info(message=None, code=400, data=None):
    if isinstance(message, str):
        try:
            message = json.loads(message)
        except json.JSONDecodeError:
            pass
    data_info = {
        "message": str(message),
        "code": code,
        "data": data  # Remove the str() function
    }
    data_info = json.dumps(data_info, ensure_ascii=False)
    return data_info







@app.route('/api/chat', methods=['POST'])
def orc():
    file = request.files.get('image')
    question_ = request.form.get('question')
    history = request.form.get('history')
    # 设置默认值为 None 或者空字符串
    file = file if file else None
    question_ = question_ if question_ else None
    history = history if history else []
    if file and question_:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        try:
            result, image_framed = single_pic_proc(filepath)
            process_result = ''.join(str(result[key][1]) for key in result)
            print(process_result)
            process_result = process_result.join(question_)
            answer, history = handler.chat_main(process_result, history)
            info = {
                'answer': answer,
                'history': history
            }
            return return_info('File successfully processed', 200, data=info)
        except Exception as e:
            return return_info(f'Error in single_pic_proc: {e}', 500)
        finally:
            os.remove(filepath)
    elif file and question_ is None:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        try:
            result, image_framed = single_pic_proc(filepath)
            process_result = ''.join(str(result[key][1]) for key in result)
            print(process_result)
            answer, history = handler.chat_main(process_result, history)
            info = {
                'answer': answer,
                'history': history
            }
            return return_info('File successfully processed', 200, data=info)
        except Exception as e:
            return return_info(f'Error in single_pic_proc: {e}', 500)
        finally:
            os.remove(filepath)
    elif question_ and file is None:
        answer, history = handler.chat_main(question_, history)
        info = {
            'answer': answer,
            'history': history
        }
        return return_info('answer', 200, data=info)





if __name__ == '__main__':
    app.run(port=6006)
