from django.db import models

class Todo(models.Model):

    title = models.CharField(max_length=20) # タイトル
    status = models.BooleanField() # ステータス
    content = models.TextField(max_length=100, blank=True)

    # auto_now_add はインスタンスの作成(DBにINSERT)する度に更新
    created_at = models.DateTimeField('作成日時', auto_now_add=True)
    # # auto_now=Trueの場合はモデルインスタンスを保存する度に現在の時間で更新
    updated_at = models.DateTimeField('更新日時', auto_now=True)

