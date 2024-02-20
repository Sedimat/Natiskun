from django.contrib import admin
from .models import UserProfile, UserList, Messeg, Group, GroupMesseg, SoundMesseg

admin.site.register(UserProfile)
admin.site.register(UserList)
admin.site.register(Messeg)
admin.site.register(Group)
admin.site.register(GroupMesseg)
admin.site.register(SoundMesseg)

# Register your models here.
