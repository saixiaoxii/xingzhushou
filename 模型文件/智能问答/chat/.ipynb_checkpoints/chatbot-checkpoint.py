# -*- coding: utf-8 -*-

from qutestion_of_parer import *
from question_of_classifier import *
from answer_of_search import *
from transformers import AutoTokenizer, AutoModel


class ChatGraph:
    def __init__(self):
        self.classifier = QuestionOfClassifier()
        self.parser = QuestionOfParer()
        self.Search = AnswerOfSearch()

    def chat_main(self, sent, histories):
        res_classify = self.classifier.classify(sent)  # 对问题进行分类

        if not res_classify:  # 如果没有找到合适的分类就返回初始answer
            return answer
        res_sql = self.parser.parser_main(res_classify)
        final_answers = self.Search.search_main(res_sql)
        if not final_answers:  # 最终未找到合适的答案
            response, histories = model.chat(tokenizer, sent, history=histories)
            return response, histories
        else:
            return '\n'.join(final_answers), histories


if __name__ == '__main__':
    handler = ChatGraph()
    tokenizer = AutoTokenizer.from_pretrained('../chatglm3-6b', trust_remote_code=True)
    model = AutoModel.from_pretrained('../chatglm3-6b', trust_remote_code=True, device="cpu")
    model = model.eval()
    history = []
    while True:
        question = input('Uesr:')
        answer, history = handler.chat_main(question, history)
        print('Chatbot:', answer)
