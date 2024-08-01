import ahocorasick
import os


class QuestionOfClassifier:
    def __init__(self):
        cur_dir = '/'.join(os.path.abspath(__file__).split('/')[:-1])
        # 特征词路径
        self.culture_path = os.path.join(cur_dir, 'culture.txt')
        self.author_path = os.path.join(cur_dir, 'author.txt')
        self.source_path = os.path.join(cur_dir, 'source.txt')

        # 加载特征词
        self.culture_wds = [i.strip() for i in open(self.culture_path, encoding="utf-8", errors='ignore') if i.strip()]
        self.author_wds = [i.strip() for i in open(self.author_path, encoding="utf-8", errors='ignore') if i.strip()]
        self.source_wds = [i.strip() for i in open(self.source_path, encoding="utf-8", errors='ignore') if i.strip()]
        self.field_words = set(self.culture_wds + self.author_wds + self.source_wds)
        self.field_tree = self.build_actree(list(self.field_words))
        # 构建词典
        self.wdtype_dict = self.build_wdtype_dict()

        self.author_qwd = ['作者', '谁写的', '诗人', '词人', '出自谁笔']
        self.source_qwd = ['标题', '题目', '源自']
        self.content_qwd = ['内容是什么', '怎么写的', '咋写的', '怎么背', '请你背写', '默写', '补全', '内容']
        self.mean_qwd = ['解释', '翻译']
        return

    def classify(self, question):
        data = {}
        culture_dict = self.check_culture(question)  # 过滤一下问题
        if not culture_dict:  # 如果为空
            return {}
        data['args'] = culture_dict
        # 收集问题当中的实体类型
        types = []
        for type_ in culture_dict.values():
            types += type_
        question_type = 'others'  # 无意义
        question_types = []
        if self.check_words(self.author_qwd, question) and ('culture' in types):
            question_type = 'culture_author'
            question_types.append(question_type)
        if self.check_words(self.source_qwd, question) and ('culture' in types):
            question_type = 'culture_source'
            question_types.append(question_type)
        if self.check_words(self.content_qwd, question) and ('source' in types):
            question_type = 'source_content'
            question_types.append(question_type)
        if self.check_words(self.author_qwd, question) and ('source' in types):
            question_type = 'source_author'
            question_types.append(question_type)
        if self.check_words(self.mean_qwd, question) and ('culture' in types):
            question_type = 'culture_mean'
            question_types.append(question_type)
        data['question_types'] = question_types

        return data

        # 构建actree加速过滤

    def build_actree(self, wordlist):
        actree = ahocorasick.Automaton()
        for index, word in enumerate(wordlist):
            actree.add_word(word, (index, word))
        actree.make_automaton()
        return actree

    def build_wdtype_dict(self):  # 构造词类型
        wd_dict = dict()
        for wd in self.field_words:  # 找到用户输入的词是什么范围的
            wd_dict[wd] = []
            if wd in self.culture_wds:
                wd_dict[wd].append('culture')
            if wd in self.author_wds:
                wd_dict[wd].append('author')
            if wd in self.source_wds:
                wd_dict[wd].append('source')
        return wd_dict

    def check_culture(self, question):
        field_wds = []
        for i in self.field_tree.iter(question):  # ahocorasick库 匹配问题  iter返回一个元组，i的形式如(3, (23192, '杜甫'))
            wd = i[1][1]  # 匹配到的词
            field_wds.append(wd)
        stop_wds = []
        for wd1 in field_wds:
            for wd2 in field_wds:
                if wd1 in wd2 and wd1 != wd2:
                    stop_wds.append(wd1)  # stopword取重复且较短的词语
        final_wds = [i for i in field_wds if i not in stop_wds]  # final_wds取长词,也就是最后返回的是长词
        final_dict = {i: self.wdtype_dict.get(i) for i in final_wds}  # 来自于构造词典，# 获取词和词所对应的实体类型
        return final_dict

    def check_words(self, wds, sent):
        for wd in wds:
            if wd in sent:
                return True
        return False


if __name__ == '__main__':
    handler = QuestionOfClassifier()
    while True:
        question = input('请输入您的问题:')
        data = handler.classify(question)
        print(data)
