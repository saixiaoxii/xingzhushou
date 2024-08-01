from py2neo import Graph


class AnswerOfSearch:
    def __init__(self):  # 调用数据库进行查询
        self.g = Graph('http://115.159.34.165:7474/browser/', auth=("neo4j", "neo4jwuhu527608"), name="neo4j")
        self.num_limit = 5  # 答案种类的限制数目

    def search_main(self, sqls):
        if sqls is None:
            # 处理 sqls 为 None 的情况
            return []
        final_answers = []
        for sq in sqls:
            question_type = sq['question_type']
            queries = sq['sql']
            answers = []

            for query in queries:
                res = self.g.run(query).data()
                answers += res
            final_answer = self.answer_prettify(question_type, answers)
            if final_answer:
                final_answers.append(final_answer)
        return final_answers

    def answer_prettify(self, question_type, answers):
        final_answer = []
        if not answers:
            return ''
        if question_type == 'culture_author':
            desc = [i['n.name'] for i in answers]
            subject = answers[0]['m.name']
            final_answer = '{0}是{1}所创作的'.format(subject, ';'.join(list(set(desc))[:self.num_limit]))
        elif question_type == 'culture_source':
            desc = [i['n.name'] for i in answers]
            subject = answers[0]['m.name']
            final_answer = '{0}来自于{1}'.format(subject, ';'.join(list(set(desc))[:self.num_limit]))
        elif question_type == 'source_content':
            desc = [i['n.name'] for i in answers]
            subject = answers[0]['m.name']
            final_answer = '{0}的内容是{1}'.format(subject, ';'.join(list(set(desc))[:self.num_limit]))
        elif question_type == 'source_author':
            desc = [i['n.name'] for i in answers]
            subject = answers[0]['m.name']
            final_answer = '{0}是{1}所创作的'.format(subject, ';'.join(list(set(desc))[:self.num_limit]))
        elif question_type == 'culture_mean':
            desc = [i['m.mean'] for i in answers]
            subject = answers[0]['m.name']
            final_answer = '{0}的详细赏析如下{1}'.format(subject, ';'.join(list(set(desc))[:self.num_limit]))
        return final_answer


if __name__ == '__main__':
    seacher = AnswerOfSearch()
