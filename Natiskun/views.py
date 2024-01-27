from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from .forms import UserRegistrationForm
from .models import UserProfile


# Create your views here.

def U_Prof(request):
    try:
        user = User.objects.get(username=request.user.username)
        user_prof = UserProfile.objects.get(id_user=user)
        return {"user_prof": user_prof}
    except:
        return {"a": 0}


def index(request):
    context = {}
    if request.user.username:
        user = User.objects.get(username=request.user.username)
        context.update({"user": user})
        context.update(U_Prof(request))

    if request.method == "POST":
        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            user = user_form.save()
            login(request, user)
            # profile = UserProfile(id_user=user, avatar='avatar/avatar_crj2ayQ.jpg', phone=' ', address=' ')
            # profile.save()
            return render(request, 'Natiskun/index.html', context={"a": "Ви успішно зареєструвались"})
        else:
            # Якщо форма не валідна, отримайте доступ до помилок
            errors = user_form.errors
            return render(request, 'Natiskun/index.html', context={"a": errors})

    return render(request, 'Natiskun/index.html', context=context)

def logout_view(request):
    logout(request)
    return redirect('index')