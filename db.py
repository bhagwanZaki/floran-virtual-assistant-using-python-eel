import sqlite3


class database:
    def __init__(self):
        self.conn = sqlite3.connect('floran.db') 
        self.cur = self.conn.cursor() 
        self.create_table()
        pass

    def create_table(self):
        self.conn.execute("create table if not exists User(id INT PRIMARY KEY NOT NULL, name TEXT NULL,mode INT NOT NULL DEFAULT 0)")
    def count(self):
        self.cur.execute("select count(*) from User")
        return self.cur.fetchone()
    def get_mode(self):
        self.cur.execute("select mode from User where id=1")
        return self.cur.fetchone()
    def insert_username(self,name,mode=0):
        self.cur.execute('''insert into User(id,name,mode) values (?,?,?)''',(1,name,mode))
        self.conn.commit()  
        return name
    def update_username(self,name):
        self.cur.execute("update user set name=? where id=1",(name,))
        self.conn.commit()
        return name
    def update_mode(self,mode):
        self.conn.execute("update user set mode=? where id=1",(mode,))
        self.conn.commit()
        pass