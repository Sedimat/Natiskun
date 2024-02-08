from django.contrib import admin
from .models import UserProfile, UserList, Messeg, Group, GroupMesseg

admin.site.register(UserProfile)
admin.site.register(UserList)
admin.site.register(Messeg)
admin.site.register(Group)
admin.site.register(GroupMesseg)
# Register your models here.
