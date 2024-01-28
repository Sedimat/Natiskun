from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from .forms import UserRegistrationForm
from .models import UserProfile
from django.db.models import Q


# Create your views here.

def U_Prof(request):
    try:
        user = User.objects.get(username=request.user.username)
        user_prof = UserProfile.objects.get(id_user=user)
        return {"user_prof": user_prof}
    except:
        return {"a": 0}


def index(request):
    # query = request.POST.get('query')
    # post = Post.objects.filter(Q(title__icontains=query) | Q(content__icontains=query)).order_by("-published_date")  # сортує по даті додавання


    context = {}
    if request.user.username:
        user = User.objects.get(username=request.user.username)
        context.update({"user": user})
        context.update(U_Prof(request))

    if request.method == "POST":
        search = request.POST.get('search')
        print(search)
        if search:
            list_user = User.objects.filter(username__icontains=search)
            context.update({"list_user": list_user})

        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            user = user_form.save()
            login(request, user)
            profile = UserProfile(id_user=user, avatar='avatar/1234.jpg', phone=' ', key='1')
            profile.save()
        else:
            # Якщо форма не валідна, отримайте доступ до помилок
            errors = user_form.errors

    return render(request, 'Natiskun/index.html', context=context)

def logout_view(request):
    logout(request)
    return redirect('index')


def search(request, id=None):
    context = {}
    if request.user.username:
        user = User.objects.get(username=request.user.username)
        context.update({"user": user})
        context.update(U_Prof(request))

    if id == 1:
        list_user = User.objects.all()
        double_list_user = []
        for i in list_user:
            user_p = UserProfile.objects.get(id_user=i.id)
            double_list_user.append([i.username, user_p.avatar, i.id])

        context.update({"list_user": double_list_user})

    if request.method == "POST":
        search = request.POST.get('search')
        if search:
            list_user = User.objects.filter(username__icontains=search)
            double_list_user = []
            for i in list_user:
                user_p = UserProfile.objects.get(id_user=i.id)
                double_list_user.append([i.username, user_p.avatar, i.id])

            context.update({"list_user": double_list_user})

    return render(request, 'Natiskun/search.html', context=context)