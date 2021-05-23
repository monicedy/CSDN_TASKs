#-- coding:UTF-8 --
from xmlrpc.server import SimpleXMLRPCServer  # 用于创建服务器
from xmlrpc.client import ServerProxy ,Fault # 用于向其它节点发出请求
from urllib.parse import urlparse  # 用于URL解析
from os.path import join, isfile ,exists , abspath # 用于路径处理和文件查询
from os import mkdir
import sys

MAX_HISTORY_LENGTH = 6  # 访问链最大长度
OK = 1 # 查询状态：正常
FAIL = 2 # 查询状态：无效
EMPTY = '' # 空数据

SimpleXMLRPCServer.allow_reuse_address = 1  # 保证节点服务器重启时能够立即访问
UNHANDLED = 100  # 文件不存在的异常代码
ACCESS_DENIED = 200  # 文件访问受限的异常代码

class UnhandledQuery(Fault):  # 创建自定义异常类
    def __init__(self, message='无法处理请求！'):  # 定义构造方法
        Fault.__init__(self, UNHANDLED, message)  # 重载超类构造方法

class AccessDenied(Fault):  # 创建自定义异常类
    def __init__(self, message='访问资源受限！'):  # 定义构造方法
        Fault.__init__(self, ACCESS_DENIED, message)  # 重载超类构造方法

def inside(dir_path, file_path):  # 定义文件路径检查的方法
    directory = abspath(dir_path)  # 获取共享目录的绝对路径
    file = abspath(file_path)  # 获取请求资源的绝对路径
    return file.startswith(join(directory, ''))  # 返回请求资源的路径是否以共享目录路径开始

def get_port(url):  # 定义获取端口号的函数
    result = urlparse(url)[1]  # 解析并获取URL中的[域名:端口号]
    port = result.split(':')[-1]  # 获取以":"进行分割后的最后一组
    return int(port)  # 转换为整数后返回

class Node:
    def __init__(self, url, dir_name, secret):
        self.url = url
        self.dirname = dir_name
        self.secret = secret
        self.known = set()

    def _start(self):  # 定义启动服务器的方法
        server = SimpleXMLRPCServer(('', get_port(self.url)), logRequests=False)
        server.register_instance(self)  # 注册类的实例到服务器对象
        server.serve_forever()

    def _handle(self, filename):  # 定义处理请求的内部方法
        file_path = join(self.dirname, filename)  # 获取请求路径
        if not isfile(file_path):  # 如果路径不是一个文件
            # return FAIL, EMPTY  # 返回无效状态和空数据
            raise UnhandledQuery  # 抛出文件不存在的异常
        if not inside(self.dirname, file_path):  # 如果请求的资源不是共享目录中的资源
            raise AccessDenied  # 抛出访问资源受限异常
        return open(file_path).read()  # 未发生异常时返回读取的文件数据
        # return OK, open(file_path).read()  # 返回正常状态和读取的文件数据

    def _broadcast(self, filename, history):  # 定义广播的内部方法
        for other in self.known.copy():
            if other in history:
                continue
            try:
                server = ServerProxy(other)
                return server.query(filename, history)
            except Fault as f:  # 如果捕获访问故障异常获取异常代码
                if f.faultCode == UNHANDLED:  # 如果是文件不存在异常
                    pass  # 不做任何处理
                else:  # 如果是其它故障异常
                    self.known.remove(other)  # 从已知节点列表中移除节点
            except:  # 如果捕获其它异常（非故障异常）
                self.known.remove(other)  # 从已知节点列表中移除节点
        raise UnhandledQuery  # >>如果已知节点都未能请求到资源<<，抛出文件不存在异常。    

        # for other in self.known.copy():  # 遍历已知节点的列表
        #     if other in history:  # 如果已知节点存在于历史记录
        #         continue  # 继续下一个已知节点信息
        #     try:
        #         server = ServerProxy(other)  # 访问非历史记录中的已知节点
        #         state, data = server.query(filename, history)  # 向已知节点发出请求
        #         if state == OK:  # 如果状态为正常
        #             return OK, data  # 返回有效状态和数据
        #     except OSError:
        #         self.known.remove(other)  # 如果发生异常从已知节点列表中移除节点
        # return FAIL, EMPTY  # 返回无效状态和空数据

    def query(self, filename, history=[]):  # 定义接受请求的方法
        
        try:
            return self._handle(filename)
        except UnhandledQuery:  # 如果捕获文件不存在的异常
            history.append(self.url)
            if len(history) >= MAX_HISTORY_LENGTH:
                raise
            return self._broadcast(filename, history)
        # state, data = self._handle(filename)  # 获取处理请求的结果
        # if state == OK:  # 如果是正常状态
        #     return state, data  # 返回状态和数据
        # else:  # 否则
        #     history.append(self.url)  # 历史记录添加已请求过的节点
        #     if len(history) >= MAX_HISTORY_LENGTH:  # 如果历史请求超过6次
        #         return FAIL, EMPTY  # 返回无效状态和空数据
        #     return self._broadcast(filename, history)  # 返回广播结果

    def hello(self, other):  # 定义向添加其它节点到已知节点的方法
        self.known.add(other)  # 添加其它节点到已知节点
        return OK  # 返回值是必须的

    def fetch(self, filename, secret):  # 定义下载的方法
        '''
        一个问题： 此处fetch是 将query的数据写入 已连接的ServerProxy上 
        并没有下载到客户端
        '''
        if secret != self.secret:  # 如果密钥不匹配
            raise AccessDenied  # 抛出访问资源受限异常
        result = self.query(filename)
        with open(join(self.dirname, filename), 'w') as file:
            file.write(result)
        return 0  # 必须返回非None的值
        # if secrt != self.secret:  # 如果密钥不匹配
        #     return FAIL, EMPTY  # 返回无效状态和空数据
        # state, data = self.query(filename)  # 处理请求获取文件状态与与数据
        # if state == OK:  # 如果返回正常的状态
        #     if not exists(self.dirname):
        #         print('mkdir')
        #     with open(join(self.dirname, filename), 'w') as file:  # 写入模式打开文件
        #         file.write(data+'verified')  # 将获取到的数据写入文件
        #     return OK  # 返回值是必须的
        # else:
        #     return FAIL  # 返回值是必须的


def main(): 
    url, directory, secret = sys.argv[1:]
    # url = 'http://127.0.0.1:6666'
    # directory = 'NodeFiles01'
    # secret = '123456'

    node = Node(url, directory, secret)
    node._start()

if __name__ == '__main__':   
    main()