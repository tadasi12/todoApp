from rest_framework import serializers

from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'status', 'title', 'created_at', 'content', 'updated_at')