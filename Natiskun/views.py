import datetime

from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render, redirect
from .forms import UserRegistrationForm
from .models import UserProfile, UserList, Messeg
from django.db.models import Q
import random
import string


# Create your views here.

def list_messeg(user, name, x=0):
    user_p = UserProfile.objects.get(id_user=user)
    user1 = User.objects.get(username=name)
    user_p1 = UserProfile.objects.get(id_user=user1)
    key = ""
    if user.id < user1.id:
        key = f"{user_p.key}{user_p1.key}"
    else:
        key = f"{user_p1.key}{user_p.key}"

    messegs = Messeg.objects.filter(key=key).order_by("-timestamp")  # сортує по даті додавання
    if x == 0:
        return {"messegs": messegs}
    else:
        list_messeg = []
        for m in messegs:
            list_messeg.append([m.user_1, m.messeg_1, m.timestamp.strftime("%d %B %Y р. %H:%M")])
        return {"messegs": list_messeg}


def contact_list(user):
    list_contact = UserList.objects.filter(id_user=user)
    list_cont = []
    for cont in list_contact:
        user_p = UserProfile.objects.get(id_user=cont.list_user)
        user_n = User.objects.get(username=cont.list_user)
        list_cont.append([user_p.avatar, user_n.username, "Це тестове повідомленя"])

    return {"list_cont": list_cont}


def generate_random_string():
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for _ in range(8))

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

        context.update(contact_list(user)) # отримуемо список контактів

    if request.method == "POST":
        search = request.POST.get('search')
        if search:
            list_user = User.objects.filter(username__icontains=search)
            context.update({"list_user": list_user})

        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            user = user_form.save()
            login(request, user)
            profile = UserProfile(id_user=user, avatar='avatar/1234.jpg', phone=' ', key=generate_random_string())
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
        context.update(contact_list(user))  # отримуемо список контактів

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


def add(request, id=None):
    user = User.objects.get(username=request.user.username)
    user_contact = User.objects.get(id=id)
    u_list = UserList(id_user=user, list_user=user_contact, status=1)
    u_list.save()
    return redirect('index')


def contact(request, name=None):
    context = {}
    if request.user.username:
        user = User.objects.get(username=request.user.username)
        context.update({"user": user})
        context.update(U_Prof(request))
        list_contact = UserList.objects.filter(id_user=user)
        list_cont = []
        for cont in list_contact:
            user_p = UserProfile.objects.get(id_user=cont.list_user)
            user_n = User.objects.get(username=cont.list_user)
            list_cont.append([user_p.avatar, user_n.username, "Це тестове повідомленя"])

        context.update({"list_cont": list_cont})
        context.update({"name": name})

        context.update(list_messeg(user, name))

    if request.method == "POST":
        messeg = request.POST.get('messeg')
        if messeg:
            user = User.objects.get(username=request.user.username)
            user_p = UserProfile.objects.get(id_user=user)
            user1 = User.objects.get(username=name)
            user_p1 = UserProfile.objects.get(id_user=user1)

            key = ""
            if user.id < user1.id:
                key = f"{user_p.key}{user_p1.key}"
            else:
                key = f"{user_p1.key}{user_p.key}"

            mess = Messeg(key=key, user_1=user.username, messeg_1=messeg)
            mess.save()


    return render(request, 'Natiskun/contact.html', context=context)


def get_data(request, name=None):
    double_list_user = ["Привіт", "це", "текст", "з вюшки"]
    context = {"list_user": double_list_user}
    if request.user.username:
        user = User.objects.get(username=request.user.username)
        context.update(list_messeg(user, name,1))

    return JsonResponse(context)