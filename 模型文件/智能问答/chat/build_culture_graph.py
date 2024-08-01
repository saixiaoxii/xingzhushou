import os
import json
from py2neo import Graph, Node


class CultureGraph:
    def __init__(self):
        cur_dir = '/'.join(os.path.abspath(__file__).split('/')[:-1])
        self.data_path = os.path.join(cur_dir, "./data.json")
        self.g = Graph(
            'http://115.159.34.165:7474/browser/',
            auth=("neo4j", "neo4jwuhu527608"), name='neo4j')

    def read_nodes(self):
        culture = []  # 文化点
        source = []  # 来源
        author = []  # 作者

        culture_infos = []  # 文化信息

        rel_create = []  # 创作关系
        rel_from = []  # 来源关系
        rel_write = []  # 书写关系
        rel_content = []  # 标题内容关系
        rel_author = []  # 标题作者关系
        count = 0
        with open(self.data_path, encoding='utf-8') as f:
            culture_data = json.load(f)
            count = 0
            for data_json in culture_data:
                culture_dict = {}
                count += 1
                print(count)
                culture_content = data_json['quote']
                culture_dict['content'] = culture_content
                culture.append(culture_content)
                culture_dict['meaning'] = ''
                if "author" in data_json:
                    author.append(data_json['author'])
                    rel_create.append([culture_content, data_json['author']])
                if "source" in data_json:
                    source.append(data_json['source'])
                    rel_from.append([culture_content, data_json['source']])
                if "source" in data_json and "author" in data_json:
                    rel_write.append([data_json['author'], data_json['source']])
                if "source" in data_json and "quote" in data_json:
                    rel_content.append([data_json['source'], culture_content])
                if "author" in data_json and "source" in data_json:
                    rel_author.append([data_json['source'], data_json['author']])
                if "meaning" in data_json:
                    culture_dict['meaning'] = data_json['meaning']
                culture_infos.append(culture_dict)
        return set(culture), set(source), set(
            author), culture_infos, rel_create, rel_from, rel_write, rel_content, rel_author

    def create_node(self, label, nodes):
        count = 0
        for node_name in nodes:
            node = Node(label, name=node_name)
            self.g.create(node)
            count += 1
            print(count, len(nodes))
        return

    def create_culture_nodes(self, culture_infos):
        count = 0
        for culture_dict in culture_infos:
            node = Node("Culture", name=culture_dict['content'], mean=culture_dict['meaning'])
            self.g.create(node)
            count += 1
            print(count)
        return

    def create_graphnodes(self):
        culture, source, author, culture_infos, rel_create, rel_from, rel_write, rel_content, rel_author = self.read_nodes()
        self.create_culture_nodes(culture_infos)
        self.create_node('Source', source)
        self.create_node('Author', author)
        return

    def create_graphrels(self):
        culture, source, author, culture_infos, rel_create, rel_from, rel_write, rel_content, rel_author = self.read_nodes()
        self.create_relationship('Culture', 'Author', rel_create, 'created_by', '被创作')
        self.create_relationship('Culture', 'Source', rel_from, 'from', '源自')
        self.create_relationship('Author', 'Source', rel_write, 'write', '书写')
        self.create_relationship('Source', 'Culture', rel_content, 'include', '包含')
        self.create_relationship('Source', 'Author', rel_author, 'written', '被书写')

    def create_relationship(self, start_node, end_node, edges, rel_type, rel_name):
        count = 0
        # 去重处理
        set_edges = []
        for edge in edges:
            set_edges.append('###'.join(edge))
        all = len(set(set_edges))
        for edge in set(set_edges):
            edge = edge.split('###')
            p = edge[0]
            q = edge[1]
            query = "match(p:%s),(q:%s) where p.name='%s' and q.name='%s' create (p)-[rel:%s{name:'%s'}]->(q)" % (
                start_node, end_node, p, q, rel_type, rel_name)
            try:
                self.g.run(query)
                count += 1
                print(rel_type, count, all)
            except Exception as e:
                print(e)
        return

    def export_data(self):
        culture, source, author, culture_infos, rel_create, rel_from, rel_write, rel_content, rel_author = self.read_nodes()
        f_culture = open('culture.txt', 'w+', encoding='utf-8')
        f_author = open('author.txt', 'w+', encoding='utf-8')
        f_source = open('source.txt', 'w+', encoding='utf-8')

        f_culture.write('\n'.join(list(culture)))
        f_author.write('\n'.join(list(author)))
        f_source.write('\n'.join(list(source)))

        f_culture.close()
        f_author.close()
        f_source.close()
        return


if __name__ == '__main__':
    handler = CultureGraph()
    print("step1:导入图谱节点中")
    handler.create_graphnodes()
    print("step2:导入图谱边中")
    handler.create_graphrels()
    handler.export_data()
