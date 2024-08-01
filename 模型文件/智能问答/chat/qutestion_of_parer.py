class QuestionOfParer:
    def build_entity(self, args):
        entity_dict = {}
        for arg, types in args.items():
            for type in types:
                if type not in entity_dict:
                    entity_dict[type] = [arg]
                else:
                    entity_dict[type].append(arg)
        return entity_dict

    def parser_main(self, res_classify):
        args = res_classify['args']
        entity_dict = self.build_entity(args)
        question_types = res_classify['question_types']
        sqls = []
        for question_type in question_types:
            sq = {}
            sq['question_type'] = question_type
            sql = []
            if question_type == 'culture_author':
                sql = self.sql_transfer(question_type, entity_dict.get('culture'))
            elif question_type == 'culture_source':
                sql = self.sql_transfer(question_type, entity_dict.get('culture'))
            elif question_type == 'source_content':
                sql = self.sql_transfer(question_type, entity_dict.get('source'))
            elif question_type == 'source_author':
                sql = self.sql_transfer(question_type, entity_dict.get('source'))
            elif question_type == 'culture_mean':
                sql = self.sql_transfer(question_type, entity_dict.get('culture'))
            if sql:
                sq['sql'] = sql
                sqls.append(sq)
            return sqls

    def sql_transfer(self, question_type, entities):  # 针对不同的问题进行转换
        if not entities:
            return []
        # 查询语句
        sql = []
        if question_type == 'culture_author':
            sql = [
                "MATCH (m:Culture)-[r:created_by]->(n:Author) where m.name='{0}' return m.name,r.name,n.name".format(i)
                for i in entities]
        elif question_type == 'culture_source':
            sql = [
                "MATCH (m:Culture)-[r:from]->(n:Author) where m.name='{0}' return m.name,r.name,n.name".format(i)
                for i in entities]
        elif question_type == 'source_content':
            sql = [
                "MATCH (m:Source)-[r:include]->(n:Culture) where m.name='{0}' return m.name,r.name,n.name".format(i)
                for i in entities]
        elif question_type == 'source_author':
            sql = [
                "MATCH (m:Source)-[r:written]->(n:Author) where m.name='{0}' return m.name,r.name,n.name".format(i)
                for i in entities]
        elif question_type == 'culture_mean':
            sql = ["MATCH (m:Culture) where m.name = '{0}' return m.name, m.mean".format(i) for i in entities]
        return sql


if __name__ == '__main__':
    handler = QuestionOfParer()
